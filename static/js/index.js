var emojiPlayer = document.getElementById('emoji-player');
var input = document.getElementById('input');
var button = document.getElementById('analyse-button');
var loading = document.getElementById('loading');

var emojiList = ['😀', '😐', '😡', '😱', '😭', '😎', '😍', '😊', '😃', '😢', '😄', '😋', '😜', '😠', '😈', '😉', '😏', '😎', '😚', '😌', '😛', '😝', '😙', '😓', '😔', '😖', '😘', '😣', '😞', '😢', '😪', '😫', '😩', '😤', '😨', '😰', '😱', '😲', '😳', '😵', '😷'];
var index = 0;

setInterval(() => {
    emojiPlayer.innerHTML = emojiList[index % emojiList.length]
    index++;
}, 200);

function showLoading() {
    loading.style.display = 'block';
    button.style.display = 'none';
};

function hideLoading() {
    loading.style.display = 'none';
    button.style.display = 'block';
}

button.addEventListener('click', function () {
    showLoading();
    fetch('/analyse-sentiment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: input.value
        })
    })
    .then(response => response.json())
    .then(data => {
        hideLoading();

        var result = document.getElementById('result');
        var resultEmoji = document.getElementById('result-emoji');
        var resultText = document.getElementById('result-text');
        var resultAnswer = document.getElementById('result-sentiment');

        resultEmoji.innerHTML = data.emoji;
        resultText.innerHTML = data.text;
        resultAnswer.innerHTML = data.sentiment;

        if (data.sentiment === 'Positive') {
            resultAnswer.style.backgroundColor = '#4CAF50';            
        } else if (data.sentiment === 'Negative') {
            resultAnswer.style.backgroundColor = '#F44336';
        } else {
            resultAnswer.style.backgroundColor = '#FF9800';
        }

        result.style.display = 'flex';
    }).then(hideLoading);
})