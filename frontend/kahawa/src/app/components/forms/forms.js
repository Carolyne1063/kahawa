// src/assets/custom-script.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const signUpBtn = document.getElementById('signUp');
    const signInBtn = document.getElementById('signIn');
    const signUpForm = document.getElementById('signUpForm');
    const signInForm = document.getElementById('signInForm');

    if (signUpBtn && signInBtn && signUpForm && signInForm) {
        signUpBtn.addEventListener('click', () => {
            container.classList.add('right-panel-active');
        });
        signInBtn.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
        });
    }
});
