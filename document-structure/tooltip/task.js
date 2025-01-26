let selectedTooltip = null;

document.body.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('has-tooltip')) {
        insertTooltip(e.target);
        showTooltip(e.target);
    }
})

function insertTooltip(item) {
    const tooltip = item.getAttribute('title');
    const tooltipElem = `<div class="tooltip">${tooltip}</div>`;
    item.insertAdjacentHTML('afterend', tooltipElem);
}

function showTooltip(item) {
    if (selectedTooltip) {
        selectedTooltip.classList.remove('tooltip_active');
    }
    const getTooltip = item.nextElementSibling;
    getTooltip.classList.add('tooltip_active');
    selectedTooltip = getTooltip;
    getTooltip.style.position = 'absolute';
    const currentPos = getTooltip.getBoundingClientRect();
    const targetPos = item.getBoundingClientRect();
    const diffPos = {
            y: targetPos.y - currentPos.y,
            x: targetPos.x - currentPos.x
    };
    getTooltip.style.transform = `translate(${diffPos.x}px, calc(${diffPos.y}px - ${targetPos.height}px - 10px))`;
}