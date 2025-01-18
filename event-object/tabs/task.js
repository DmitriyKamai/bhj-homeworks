const tabsParent1 = document.getElementById('tabs1');
const tabsParent2 = document.getElementById('tabs2');
var tabs1 = Array.from(tabsParent1.querySelectorAll('.tab'));
var tabs2 = Array.from(tabsParent2.querySelectorAll('.tab'));
var tabContent1 = Array.from(tabsParent1.querySelectorAll('.tab__content'));
var tabContent2 = Array.from(tabsParent2.querySelectorAll('.tab__content'));


tabs1.forEach(element => {
    element.addEventListener('click', () => {
        changeActiveTab(1);
    })
})

tabs2.forEach(element => {
    element.addEventListener('click', () => {
        changeActiveTab(2);
    })
})

function changeActiveTab(tabsNumber) {
    if (!event.currentTarget.classList.contains('tab_active')) {
    const activeIndex = window['tabs' + tabsNumber].indexOf(event.currentTarget);
    const notActivetabs = window['tabs' + tabsNumber].filter((element, index) => index != activeIndex);
    const notActiveTabContent = window['tabContent' + tabsNumber].filter((element, index) => index != activeIndex);
    notActiveTabContent.forEach(element => element.classList.remove('tab__content_active'));
    window['tabContent' + tabsNumber][activeIndex].classList.add('tab__content_active');
    notActivetabs.forEach(element => element.classList.remove('tab_active'));
    window['tabs' + tabsNumber][activeIndex].classList.add('tab_active');
}
}
