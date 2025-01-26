const elemWithTT = Array.from(document.querySelectorAll('.has-tooltip'));
let selectedTooltip = null;

elemWithTT.forEach((element, index, array) => {
    element.dataset.id = array.indexOf(element);
})

document.body.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('has-tooltip')) {
        if (e.target.dataset.id === selectedTooltip?.dataset.id) {
            console.log(e.target);
            e.target.nextElementSibling.classList.toggle('tooltip_active');
        } else {
        insertTooltip(e.target);
        showTooltip(e.target);
        }
    }
})

function insertTooltip(item) {
    const tooltip = item.getAttribute('title');
    const tooltipElem = `<div class="tooltip">${tooltip}</div>`;
    item.insertAdjacentHTML('afterend', tooltipElem);
}

function showTooltip(item) {
    if (selectedTooltip) {
        selectedTooltip.nextElementSibling.classList.remove('tooltip_active');
    }
    const getTooltip = item.nextElementSibling;
    getTooltip.classList.add('tooltip_active');
    selectedTooltip = item;
    getTooltip.style.position = 'absolute';
    const currentPos = getTooltip.getBoundingClientRect();
    const targetPos = item.getBoundingClientRect();
    const diffPos = {
            y: targetPos.y - currentPos.y,
            x: targetPos.x - currentPos.x
    };
    getTooltip.style.transform = `translate(${diffPos.x}px, calc(${diffPos.y}px - ${targetPos.height}px - 10px))`;
}