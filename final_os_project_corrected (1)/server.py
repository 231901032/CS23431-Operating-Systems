from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_url_path='', static_folder='.')
CORS(app)

# Load phishing list once
with open("phishing_feed.txt", "r") as f:
    phishing_list = [line.strip().lower().replace("https://", "").replace("http://", "").replace("www.", "").rstrip('/') for line in f.readlines()]

@app.route("/")
def root():
    return send_from_directory('.', 'index.html')

@app.route("/<path:path>")
def serve_file(path):
    return send_from_directory('.', path)

@app.route("/check_url")
def check_url():
    url = request.args.get("url", "").strip().lower()
    cleaned_url = url.replace("https://", "").replace("http://", "").replace("www.", "").rstrip('/')
    is_phishing = any(phish in cleaned_url for phish in phishing_list)
    with open("log.txt", "a") as log:
        log.write(f"Checked: {url} - {'PHISHING' if is_phishing else 'SAFE'}\n")
    return jsonify({"phishing": is_phishing})

@app.route("/log")
def get_log():
    if os.path.exists("log.txt"):
        with open("log.txt", "r") as f:
            return f.read()
    return "No logs found."

if __name__ == "__main__":
    app.run(debug=True)
