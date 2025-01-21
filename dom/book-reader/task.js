const setFontSizebtn = Array.from(document.querySelectorAll('.font-size'));
const books = Array.from(document.querySelectorAll('.book'));

setFontSizebtn.forEach(element => (
    element.addEventListener('click', (event) => {
        event.preventDefault();
        let current = setFontSizebtn.findIndex(element => element.classList.contains('font-size_active'));
        let clickedElement = setFontSizebtn.findIndex(element => element === event.currentTarget);
        console.log(current, clickedElement)
        if (current !== clickedElement) {
            setFontSizebtn[current].classList.remove('font-size_active');
            event.currentTarget.classList.add('font-size_active');
            if (clickedElement === 0) {
                books.forEach(element => element.classList.add('book_fs-small'));
                if (current === 2) {
                    books.forEach(element => element.classList.remove('book_fs-big'));
                }
            } else if (clickedElement === 1) {
                if (current === 0) {
                    books.forEach(element => element.classList.remove('book_fs-small'));
                } else if (current === 2) {
                    books.forEach(element => element.classList.remove('book_fs-big'));
                }
            } else if (clickedElement === 2) {
                books.forEach(element => element.classList.add('book_fs-big'));
                if (current === 0) {
                    books.forEach(element => element.classList.remove('book_fs-small'));
                }
            }
        }
    })
))
