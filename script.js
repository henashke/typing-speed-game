const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const timerElement2 = document.getElementById('timer2')

document.getElementById('quoteInput').disabled = true
let mistakes = 0
quoteInputElement.addEventListener('keydown', function (e) {
    const key = e.key;
    if (key === "Backspace" || key == "Delete")
        mistakes++;
})
quoteInputElement.addEventListener('input', () => {
    var chars = 0;

    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');

    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        chars++;
        const character = arrayValue[index];
        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct = false;
        }
    })

    if (correct) {
        var words = chars / 5;
        var timerTime = getTimerTime();
        var result = Math.round(words / timerTime * 60);
        var accuracy = (words / (words + mistakes / 5) * 100).toFixed(2);
        quoteInputElement.value = `You did ${result} WPM, With an accuracy of ${accuracy}%`;
    }
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content);
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    });
    quoteInputElement.value = null;
    countBackwards();
}

function countBackwards() {
    var x = document.getElementById("timer");
    setTimeout(function () { x.innerText = "3" }, 1000);
    setTimeout(function () { x.innerText = "2" }, 2000);
    setTimeout(function () { x.innerText = "1" }, 3000);
    setTimeout(function () {
        x.innerText = "Start!";
        startTimer();
        quoteInputElement.disabled = false;
        quoteInputElement.focus();
    }, 4000);

}

let startTime
function startTimer() {
    startTime = new Date()
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()