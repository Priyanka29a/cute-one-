"""
Optional Python backend using Flask.
This simply serves the love app from the same folder.

SETUP:
  1. pip install flask
  2. python main.py
  3. Open http://localhost:5000 in your browser
"""

from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder=".", static_url_path="")

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(".", filename)

if __name__ == "__main__":
    print("💖 Love App is running at http://localhost:5000")
    print("Press Ctrl+C to stop.\n")
    app.run(debug=False, port=5000)
