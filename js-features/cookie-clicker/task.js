const cookie = document.getElementById('cookie');
const clickerCounter = document.getElementById('clicker__counter');
const clickerSpeedmeter = document.getElementById('clicker__speedmeter');
let cookieClickCounter = 0;
let lastClickDate = 0;
cookie.onclick = () => {
    ++cookieClickCounter;
    let clickSpeed = 1 / ((Date.now()- lastClickDate) / 1000);
    clickerCounter.textContent = cookieClickCounter;
    if (cookieClickCounter % 2 === 0) {
        cookie.width = 200;
    } else {
        cookie.width = 150;
    }
    if (!lastClickDate) {
        clickerSpeedmeter.textContent = 1;
    } else {
    clickerSpeedmeter.textContent = clickSpeed.toFixed(2);
    }
    lastClickDate = Date.now();

}