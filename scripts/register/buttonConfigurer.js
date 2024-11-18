import { authenticateUser, makeLogin, redirectToLastActivity, verifyEmail, verifyPassword } from "../auth/loginFormVerifier.js";
import { API_URL } from "../index.js";
import { configureModal, configureModalContent } from "../listenerConfig/modalConfig.js";
import { makeRequest } from "../request/request.js";

function validateEmptyFields() {
    const fields = [document.getElementById('name'),
    document.getElementById('cpf'),
    document.getElementById('cep'),
    document.getElementById('address'),
    document.getElementById('address-number'),
    document.getElementById('city'),
    document.getElementById('state'),
    document.getElementById('email'),
    document.getElementById('password'),
    document.getElementById('confirm-password')];
    for (const field of fields) {
        if (!field.value) {
            return false;
        }
    }
    return true;
}

export function validateRuledFields() {
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    if (!verifyPassword(password)) {
        return false;
    }
    if (!verifyEmail(email)) {
        return false
    } 

    if (password !== confirmPassword) {
        return false;
    }

    return true;
}

export function configureRegisterButton() {
    const button = document.getElementById('register-button');
    if (validateEmptyFields() && validateRuledFields()) {
        button.disabled = false;
        button.classList.remove('disabled__button');
    } else {
        button.disabled = true;
        button.classList.add('disabled__button');
    }
}

export function configureButtonAction() {
    const button = document.getElementById('register-button');
    button.addEventListener('click', async () => {
        try {
            const payload = getCustomerData();
            const response = await makeRequest(`${API_URL}/customers`, "POST", payload);
            const authPayload = payload.user;
            await authenticateUser(authPayload);
            redirectToLastActivity();
        } catch (error) {
            let errorMessage = '';
            let modalTitle = "Erro ao cadastrar!";
            if (error.status == 400) {
                errorMessage = 'Algum campo está inválido';
            } else {
                errorMessage = "Ocorreu algum erro inesperado";
            }
            configureModal();
            configureModalContent(modalTitle, errorMessage);
        }
    });
}

function getCustomerData() {
    const name = document.getElementById('name').value;
    const cpf = document.getElementById('cpf').value;
    const cep = document.getElementById('cep').value;
    const address = document.getElementById('address').value;
    const number = document.getElementById('address-number').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const customer = {
        name,
        cpf,
        address: {
            street: address,
            number,
            city,
            state,
            zipcode: cep
        },
        user: {
            email,
            password
        }
    };

    return customer;
}
