const reveals = Array.from(document.querySelectorAll('.reveal'));


function isVisible(element) {
    let {top, bottom} = element.getBoundingClientRect();
    if (bottom < 0 || top > window.innerHeight) {
        element.classList.remove('reveal_active');
    } else {
        element.classList.add('reveal_active');
    }
}



document.addEventListener('scroll', () => {
    for (i = 0; i < reveals.length; i++) {
        isVisible(reveals[i]);
    }
})