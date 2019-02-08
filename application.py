from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/pricing')
def pricing():
    return render_template("pricing.html")


@app.route('/relations')
def relations():
    return render_template("relations.html")


@app.route('/review')
def review():
    return render_template("review.html")


@app.route('/sizing')
def sizing():
    return render_template("sizing.html")


if __name__ == "__main__":
    app.run(debug=True)
