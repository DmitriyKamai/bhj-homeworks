// Выполнил все дополнительные задания и проявил немного творчества:
// добавил кнопку для установления таймера

const timerHours = document.getElementById('timerHours');
const timerMinutes = document.getElementById('timerMinutes');
const timerSeconds = document.getElementById('timerSeconds');
const setTimeButton = document.getElementById('setTimeButton');
const fullTimer = document.getElementById('status');
let timerCount;
setTimeButton.onclick = () => {
    fullTimer.style.display = 'block';
    setTimeButton.style.display = 'none';
    timerCount = Number(window.prompt('Введите время в секундах'));
    const timerId = setInterval(timerLogic, 1000);

    function timerLogic() {
        timerCount -= 1;
        const hours = Math.floor(timerCount / (60 * 60));
        const minutes = Math.floor((timerCount / 60) % 60);
        const seconds = Math.floor(timerCount % 60);
        
        function addZero(item) {
            if (item < 10) {
                item = '0' + item;
            }
            return item;
        }
    
        timerHours.textContent = addZero(hours);
        timerMinutes.textContent = addZero(minutes);
        timerSeconds.textContent = addZero(seconds);
        
        if (!timerCount) {
            clearInterval(timerId);
            document.getElementById('invisibleLink').href = 'README.md';
            document.getElementById('invisibleLink').click();
            alert('Вы победили в конкурсе!');
    
        }
    }
    return false;
}
