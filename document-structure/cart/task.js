const productQuantControl = Array.from(document.querySelectorAll('.product__quantity-control'));
const cartProducts = document.querySelector('.cart__products');
const productAdd = Array.from(document.querySelectorAll('.product__add'));


cartProducts.parentElement.style.display = 'none'

productQuantControl.forEach(element => element.addEventListener('click', (e) => {
    selling.quantityControl(e);
}))

productAdd.forEach(element => element.addEventListener('click', (e) => {
    selling.addToCart(e);
}))



class Cart {
    constructor() {
        this.lastOrderElement = 0;
        this.productsInCart = [];
    }

    quantityControl(e) {
        const showValue = e.target.parentElement.querySelector('.product__quantity-value');
        let currentValue = showValue.textContent;
        if (e.target.classList.contains('product__quantity-control_dec')) {
            if (+currentValue >= 2) {
                showValue.textContent = +currentValue - 1;
            }  
        } else {
            showValue.textContent = +currentValue + 1;
        }
    }

    addToCart(e) {
        const productValue = +e.target.parentElement.querySelector('.product__quantity-value').textContent;
        const imgSrc = e.target.closest('.product').childNodes[3].getAttribute('src');
        const id = +e.target.closest('.product').getAttribute('data-id');

        if (localStorage.getItem(id)) {
            const itemInLS = JSON.parse(localStorage.getItem(id));
            itemInLS.value += productValue;
            localStorage.setItem(id, JSON.stringify(itemInLS));
        } else {
            const product = {id: id, value: productValue, img: imgSrc, order: this.lastOrderElement};
            this.lastOrderElement++;
            localStorage.setItem(id, JSON.stringify(product));
        }
        this.renderCart()
        this.animationCart(id, e);
    }

    createOrder() {
        this.productsInCart.length = 0;
        if (localStorage.length) {
            for (let i = 0; i < localStorage.length; i++) {
                const itemKey = localStorage.key(i);
                const itemInLS = JSON.parse(localStorage.getItem(itemKey));
                this.productsInCart.push(itemInLS);
                if (itemInLS.order > this.lastOrderElement) {
                    this.lastOrderElement = itemInLS.order;
                }
            }
            this.productsInCart.sort((a,b) => {
                if (a.order > b.order) {
                    return 1;
                }
                if (a.order < b.order) {
                    return -1;
                }
            })
        }
    }

    deleteOfCart(e) {
        const id = +e.target.parentElement.getAttribute('data-id');
        const itemInLS = JSON.parse(localStorage.getItem(id));
        itemInLS.value = 0;
        localStorage.setItem(id, JSON.stringify(itemInLS));
        this.renderCart();
        this.cleaner();
    }

    renderCart() {
        this.createOrder();
        cartProducts.parentElement.style.display = 'block'
        const addedProducts = Array.from(cartProducts.querySelectorAll('[data-id]'));
        if (this.productsInCart.length) {
            for (let i = 0; i < this.productsInCart.length; i++) {
                const item = this.productsInCart[i];
                const productElementIndex = addedProducts.findIndex(element => element.getAttribute('data-id') === `${item.id}`);
                if (productElementIndex > -1 && item.value > 0) {
                    addedProducts[productElementIndex].childNodes[3].textContent = item.value;
                } else if (productElementIndex === -1 && (item.value > 0)) {
                    const product = `<div class="cart__product" data-id="${item.id}"><span class="close__btn" onclick="">X</span><img class="cart__product-image" src=${item.img}>
                        <div class="cart__product-count">${item.value}</div></div>`;
                    cartProducts.insertAdjacentHTML('afterBegin', product);
                    const deleteBtn = document.querySelector('.close__btn');
                    deleteBtn.addEventListener('click', (e) => {
                        this.deleteOfCart(e);
                })
                } else if (productElementIndex > -1 && item.value === 0) {
                    addedProducts[productElementIndex].remove();
                    if (!cartProducts.querySelectorAll('[data-id]').length) {
                        cartProducts.parentElement.style.display = 'none';
                    }
                }
            }
        } else {
            cartProducts.parentElement.style.display = 'none';
            this.lastOrderElement = 0;
        }
    }

    cleaner() {
        if (localStorage.length) {
            for (let i = 0; i < localStorage.length; i++) {
                const itemKey = localStorage.key(i)
                const itemInLS = JSON.parse(localStorage.getItem(itemKey));
                if (itemInLS.value === 0)
                    localStorage.removeItem(itemInLS.id);
            }
        }
    }

    // Так и не понял почему без calc и танцев с бубнами картинка не становится на то же место.
    // Или нужно как-то по-другому делать?

    animationCart(id, e) {
        const addedProducts = Array.from(cartProducts.querySelectorAll('[data-id]'));
        console.log(addedProducts)
        const imgInCart = addedProducts.find(element => +element.getAttribute('data-id') === id);
        console.log(imgInCart)
        const img = e.target.closest('.product').childNodes[3].cloneNode(false);
        e.target.closest('.product').insertAdjacentElement('beforeEnd', img);
        img.classList.add('product__image_copy');
        const currentPos = img.getBoundingClientRect();
        const targetPos = imgInCart.getBoundingClientRect();
        const diffPos = {
            y: targetPos.y - currentPos.y + 10,
            x: targetPos.x - currentPos.x
        }
        let i = 1;
        function renderAddProduct(i) {
            setTimeout(() => {
                const oneTickX = diffPos.x / 20;
                const oneTickY = diffPos.y / 20
                img.style.transform = `translate(calc(${oneTickX * i}px + 30%), calc(${oneTickY * i}px))`;
                i++;
                if (i !== 20) {
                    renderAddProduct(i)
                } else {
                    img.remove();
                }
            }, 20, i)
        }
        renderAddProduct(i);
    }

}


const selling = new Cart();
selling.renderCart();