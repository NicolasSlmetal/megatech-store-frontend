import { configureRegisterButton } from "./buttonConfigurer.js";

function validateCpfRegex(cpf) {
    const cpfRegex = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/;
    return cpfRegex.test(cpf);
}

export function configurePersonalDataInputs() {
    const name = document.getElementById('name');
    const cpf = document.getElementById('cpf');
    name.addEventListener('input', () => {
        document.querySelector('#name-error').innerText = '';
    });
    name.addEventListener('change', () => {
        if (!name.value) {
            document.querySelector('#name-error').innerText = 'Campo obrigatório';
        }
        configureRegisterButton();
    });

    cpf.addEventListener('input', () => {
        document.querySelector('#cpf-error').innerText = '';
    });
    cpf.addEventListener('change', () => {
        if (!cpf.value || !validateCpfRegex(cpf.value)) {
            document.querySelector('#cpf-error').innerText = 'CPF inválido';
        }
        configureRegisterButton();
    });
}