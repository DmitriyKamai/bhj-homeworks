const signIn = document.getElementById('signin');
const welcome = document.getElementById('welcome');
const signInForm = document.getElementById('signin__form');
const showUserId = document.getElementById('user_id');
let isCheckedLogin = false;

signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch('https://students.netoservices.ru/nestjs-backend/auth', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    auth(result);
    e.target.reset();
})

isLoggedIn();

function auth(response) {
    if (response.success) {
        localStorage.userId = response.user_id;
        isLoggedIn();
    } else {
        alert('Неверный логин/пароль');
    }
}

function isLoggedIn() {
    if (!isCheckedLogin) {
        if (localStorage.userId) {
            signIn.classList.remove('signin_active');
            welcome.classList.add('welcome_active');
            showUserId.textContent = localStorage.userId;
            const createLogoutButton = '<button id="logout">Выйти</button>'
            welcome.insertAdjacentHTML('beforeend', createLogoutButton);
            const logoutButton = document.getElementById('logout');
            logoutButton.addEventListener('click', logout);
            isCheckedLogin = true;
        }
    }
}

function logout() {
    localStorage.removeItem('userId');
    signIn.classList.add('signin_active');
    welcome.classList.remove('welcome_active');
    const logoutButton = document.getElementById('logout');
    welcome.removeChild(logoutButton);
    isCheckedLogin = false;
}

