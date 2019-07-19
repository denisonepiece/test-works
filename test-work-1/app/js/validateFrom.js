window.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.querySelector('#submitBtn');
    const regForm = document.querySelector('.registration__form');
    const inputs = document.querySelectorAll('.input');
    const firstName = inputs[0],
        lastName = inputs[1],
        email = inputs[2],
        password = inputs[3],
        confirmPassword = inputs[4],
        age = inputs[5];

    // Делает первый символ заглавным, при уходе с инпута
    function firstSymbolUppercase(inpt) {
        inpt.addEventListener('focusout', function () {
            if (inpt.value) {
                inpt.value = inpt.value[0].toUpperCase() + inpt.value.slice(1);
            }
        })
    }

    firstSymbolUppercase(firstName);
    firstSymbolUppercase(lastName);


    function validateName(inpt) {
        const error = inpt.nextElementSibling;
        const regex = /^[а-яА-ЯёЁ\s]+$/;

        if (inpt.value === '') {
            error.innerHTML = 'Поле не должно быть пустым';
        } else if (!regex.test(inpt.value)) {
            error.innerHTML = 'Только русские буквы';

        } else if (inpt.value.length > 30) {
            error.innerHTML = 'Максимум 30 симв.';
        } else {
            error.innerHTML = '';
            return true;
        }

        return false;
    }

    function valdateEmail(inpt) {
        const error = inpt.nextElementSibling;
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (inpt.value === '') {
            error.innerHTML = 'Поле не должно быть пустым';
        } else if (!regex.test(inpt.value)) {
            error.innerHTML = 'Неверный email';
        } else {
            error.innerHTML = '';
            return true;
        }

        return false;
    }

    function validatePassword(inpt) {
        const error = inpt.nextElementSibling;
        const regex = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;

        if (inpt.value === '') {
            error.innerHTML = 'Поле не должно быть пустым';
        } else if (!regex.test(inpt.value)) {
            error.innerHTML = '>8, 1 строчная, 1 заглавная и 1 спец.символ';
        } else {
            error.innerHTML = '';
            return true;
        }

        return false;
    }

    function validateConfirmPassword(pass, confPass) {
        const error = confPass.nextElementSibling;

        if (confirmPassword.value === '') {
            error.innerHTML = 'Подтвердите пароль'
        } else if (pass.value !== confPass.value) {
            error.innerHTML = 'Пароли не совпадают';
        } else {
            error.innerHTML = '';
            return true;
        }

        return false;
    }

    function validateAge(inpt) {
        const error = inpt.nextElementSibling;
        let howOld = ((new Date().getTime() - new Date(inpt.value))
            / (24 * 3600 * 365.25 * 1000)) | 0;

        if (inpt.value == '') {
            error.innerHTML = 'Укажите дату рождения';
        } else if (howOld < 18) {
            error.innerHTML = 'Вам должно быть больше 18 лет';
        } else {
            error.innerHTML = '';
            return true;
        }

        return false;
    }


    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();

        let resultValidation = true;

        validate = [
            validateName(firstName),
            validateName(lastName),
            valdateEmail(email),
            validatePassword(password),
            validateConfirmPassword(password, confirmPassword),
            validateAge(age)
        ];

        for (let i = 0; i < validate.length; i++) {
            resultValidation &= validate[i];
        }

        if (resultValidation) {
            regForm.submit();
        }
    });
});
