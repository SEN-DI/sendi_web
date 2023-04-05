from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def profile_selection():
    profiles = [
        {"id": 1, "name": "Harry Potter", "avatar": "/static/images/harry.png"},
        {"id": 2, "name": "Hermione Granger", "avatar": "/static/images/hermione.png"},
        {"id": 3, "name": "Ron Wisley", "avatar": "/static/images/ron.png"},
        {"id": 4, "name": "Dobby", "avatar": "/static/images/dobby.png"}
    ]
    return render_template("index.html", profiles=profiles)


@app.route("/calendar", methods=['GET'])
def calendar():
    return render_template("calendar.html")

if __name__ == "__main__":
    app.run(debug=True)