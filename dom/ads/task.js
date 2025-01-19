let rotatorCases = Array.from(document.querySelectorAll('.rotator__case'));


rotatorCases.forEach(element => (
    element.dataset.speed = Math.floor(Math.random() * (2000 - 200 + 1)) + 200
))

function changeActiveElement(elements, activeSelector) {
    let current = elements.findIndex(element => element.classList.contains(activeSelector));
    elements[current].dataset.color = `#`+ Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    elements[current].style.color = elements[current].getAttribute('data-color');
    let timeoutCount = elements[current].getAttribute('data-speed');
    let timeoutId = setTimeout(() => {
        if (current === elements.length - 1) {
            elements[current].classList.remove(activeSelector);
            elements[0].classList.add(activeSelector);
        } else {
            elements[current].classList.remove(activeSelector);
            current++;
            elements[current].classList.add(activeSelector);
        }
        changeActiveElement(elements, activeSelector);
    }, timeoutCount)
}

changeActiveElement(rotatorCases, 'rotator__case_active');
