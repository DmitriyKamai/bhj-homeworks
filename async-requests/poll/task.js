const pollTitle = document.querySelector('#poll__title');
const pollAnswers = document.querySelector('#poll__answers');
let buttons = null;


const xhrRandomPoll = new XMLHttpRequest;
xhrRandomPoll.addEventListener('readystatechange', (e) => {
    if (xhrRandomPoll.readyState === 4) {
        renderAnswers(xhrRandomPoll.response)
    };
})
xhrRandomPoll.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhrRandomPoll.responseType = 'json';
xhrRandomPoll.send();

function renderAnswers(response) {
    const answers = response.data.answers;
    const title = response.data.title;
    pollTitle.textContent = title;
    answers.forEach(element => {
        const answerElement = `<button class="poll__answer">${element}</button>`;
        pollAnswers.insertAdjacentHTML('afterbegin', answerElement);
    })
    buttons = [...document.querySelectorAll('.poll__answer')];
    buttons.forEach(element => {
        element.addEventListener('click', (e) => {
            alert('Спасибо, ваш голос засчитан!')
            const answerId = answers.indexOf(e.target.textContent);
            getPollResult(response.id, answerId);
        })
    })
}

function getPollResult(pollId, answerId) {
    const xhr = new XMLHttpRequest;
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
            console.log(xhr.response)
            showPollResult(xhr.response.stat); 
        };
    })
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.send(`vote=${pollId}&answer=${answerId}`);
}

function showPollResult(stat) {
    pollAnswers.innerHTML = ''
    const sum = stat.reduce((acc, n) => acc + n.votes, 0);
    stat.forEach(element => {
        const answerResultElement = `<p>${element.answer}: <b>${(element.votes / sum * 100).toFixed(2)}%</b></p>`
        pollAnswers.insertAdjacentHTML('afterbegin', answerResultElement);
    })
}