const editor = document.getElementById('editor');
const card = document.querySelector('.card');
card.insertAdjacentHTML('beforeend', '<button id="clear">Очистить редактор</button>')
const clearButton = document.getElementById('clear');

clearButton.addEventListener('click', clearTextEditor);
editor.addEventListener('keyup', saveText);

restoreText();

function saveText() {
    localStorage.savedText = editor.value;
}

function restoreText() {
    if (localStorage.savedText) {
        editor.value = localStorage.savedText;
    }
}

function clearTextEditor() {
    editor.value = '';
    localStorage.removeItem('savedText');
}