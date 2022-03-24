import mimetypes
from flask import Flask, render_template, request, jsonify
from textblob import TextBlob

mimetypes.add_type('text/css', '.css')
mimetypes.add_type('application/javascript', '.js')

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/analyse-sentiment', methods=['POST'])
def analyse_sentiment():
    text = request.json['text']

    print(f"Analyzing sentiment for text: {text}")

    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    sentiment = ""
    emoji = ""
    if polarity < 0:
        sentiment = 'Negative'
        emoji = '😔'
    elif polarity == 0:
        sentiment = 'Neutral'
        emoji = '😐'
    else:
        sentiment = 'Positive'
        emoji = '😃'

    return jsonify({'sentiment': sentiment, 'text': text, 'emoji': emoji})


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
