from flask import Flask, send_file, Response, request, jsonify, send_file, send_from_directory

app = Flask(__name__)


@app.route('/')
def default():
    return send_from_directory('dist', 'index.html')


@app.route('/<path:filename>')
def dist(filename):
    if filename == 'healthCheck':
        return Response(status=200)
    return send_from_directory('dist', filename)


if(__name__ == "__main__"):
    app.run(host='0.0.0.0', port=8000)
