const dropdownElements = document.querySelectorAll('.dropdown__link');
const selectedElements = document.querySelectorAll('.dropdown__value');
const dropdownLists = document.querySelectorAll('.dropdown__list');

selectedElements.forEach((element, index) => {
    element.addEventListener('click', () => {
        dropdownLists[index].classList.add('dropdown__list_active');
    })
})

dropdownElements.forEach(element => (
element.addEventListener('click', function(event) {
    event.preventDefault()
    this.closest('.dropdown').querySelector('.dropdown__value').textContent = this.textContent;
    this.closest('.dropdown__list').classList.remove('dropdown__list_active');
    })
))