const dead = document.getElementById('dead');
const lost = document.getElementById('lost');

function getHole(index) {
    return (document.getElementById('hole' + index));
}

for (let i = 1; i < 10; i++) {
    getHole(i).onclick = function(event) {
        if (event.currentTarget.classList.contains('hole_has-mole')) {
            dead.textContent = +dead.textContent + 1;
            if (+dead.textContent === 10) {
                alert('Победа!');
                dead.textContent = 0;
                lost.textContent = 0;
            }
        } else {
            lost.textContent = +lost.textContent + 1;
            if (+lost.textContent === 5) {
                alert('Вы проиграли!');
                dead.textContent = 0;
                lost.textContent = 0;
            }
        }
    }
}
