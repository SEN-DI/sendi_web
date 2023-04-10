from flask import Flask, request, jsonify
from flask_pymongo import PyMongo

mongo = PyMongo()

def init_app(app):
    app.config["MONGO_URI"] = "mongodb://127.0.0.1:55127/sendi"
    mongo.init_app(app)

app = Flask(__name__)
init_app(app)
print(app.config["MONGO_URI"])

# 예시로 emotions 컬렉션을 가져옴
emotions = mongo.db["emotions"]

print("#######################################")
@app.route("/calendar", methods=["POST"])
def save_emotion():
    data = request.get_json()
    date = data.get("date")
    emotion = data.get("emotion")

    if not date or not emotion:
        return jsonify({"error": "Invalid request data"}), 400

    # DB에 저장
    emotions.insert_one({
        "date": date,
        "emotion": emotion
    })
    print("insert correctly")

    return jsonify({"success": True})
