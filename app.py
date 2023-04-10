from flask import Flask, render_template, request, jsonify
from flask_pymongo import PyMongo
import openai

app = Flask(__name__)

@app.route("/")
def profile_selection():
    profiles = [
        {"id": 1, "name": "Harry Potter", "avatar": "/static/images/profile/harry.png"},
        {"id": 2, "name": "Hermione Granger", "avatar": "/static/images/profile/hermione.png"},
        {"id": 3, "name": "Ron Wisley", "avatar": "/static/images/profile/ron.png"},
        {"id": 4, "name": "Dobby", "avatar": "/static/images/profile/dobby.png"}
    ]
    return render_template("index.html", profiles=profiles)

# Set your OpenAI API key
# openai.api_key = 

# Set the GPT-3 model ID
# MODEL_ID = 

# Define the function to generate a response from the GPT-3 model
# def generate_response(prompt):
#     return answer


@app.route("/calendar", methods=['GET'])
def calendar():
    return render_template("calendar.html")

# @app.route("/calendar", methods=['POST'])
# def chat():

#     return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)