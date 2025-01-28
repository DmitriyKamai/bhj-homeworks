const loader = document.getElementById('loader');
const items = document.getElementById('items');
let isPreloaded = false;

loadCurrencies();

xhr = new XMLHttpRequest;
xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === 4) {
        console.log(xhr.response)
        showCurrencies(xhr.response); 
    };
})
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
xhr.responseType = 'json';
xhr.send();

function loadCurrencies() {
    if (localStorage.getItem('currencies')) {
        const oldResponse = JSON.parse(localStorage.getItem('currencies'));
        const currencies = oldResponse.response.Valute;
        for (const currency in currencies) {
            const element = `<div class="item"><div class="item__code">${currencies[currency].CharCode}</div><div class="item__value">${currencies[currency].Value}</div><div class="item__currency">руб.</div></div>`;
            items.insertAdjacentHTML('afterbegin', element);
            }
        loader.classList.remove('loader_active');
        isPreloaded = true;
    }
}

function showCurrencies(response) {
    const currencies = response.response.Valute;
    if (isPreloaded) {
        items.innerHTML = "";
    }
    for (const currency in currencies) {
        const element = `<div class="item"><div class="item__code">${currencies[currency].CharCode}</div><div class="item__value">${currencies[currency].Value}</div><div class="item__currency">руб.</div></div>`;
        items.insertAdjacentHTML('afterbegin', element);
        }
    loader.classList.remove('loader_active');
    localStorage.setItem('currencies', JSON.stringify(response));
    }
    