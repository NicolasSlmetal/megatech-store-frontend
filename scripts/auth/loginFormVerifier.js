import { API_URL } from "../index.js";
import { loadCart } from "../purchase/cart.js";
import { makeRequest } from "../request/request.js";
import { configureModal, configureModalContent } from "../listenerConfig/modalConfig.js";
import { RequestError } from "../error/RequestError.js";

var errorMessage = document.querySelector(".error-message");
var emailInput = document.querySelector("#email");
var passwordInput = document.querySelector("#password");

export function verifyPassword(password) {
    const regexLowerCase = /[a-z]+/;
    const regexUpperCase = /[A-Z]+/;
    const regexNumber = /[0-9]+/;
    const regexSpecial = /[^A-Za-z0-9]+/;
    return password.length >= 8 && 
    regexLowerCase.test(password) && 
    regexUpperCase.test(password) && 
    regexNumber.test(password) &&
    regexSpecial.test(password);
}

export function verifyEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

export function verifyInputs() {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    if (!email || !verifyEmail(email)) {
        errorMessage.innerText = "Email inválido";
    } else if (!password || !verifyPassword(password)) {
        errorMessage.innerText = "Senha inválida: A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial";
    } else {
        errorMessage.innerText = "";
        return true;
    }
    return false;
    
}

export function makeLogin() {
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    if (verifyInputs()) {
        const user = {
            email: emailInput.value,
            password: passwordInput.value
        }
        authenticateUser(user)
        .then(() => {
            console.log("Autenticado com sucesso");
        }).catch((error) => {
            const title = "Erro ao autenticar usuário";
            let message = "Ocorreu um erro inesperado";
            if (error.status == 401 || error.status == 400) {
                 message = "Email ou senha inválidos";
            }
            configureModal();
            configureModalContent(title, message);
            
        });
    }
}

export async function authenticateUser(user) {

    try {
        const loginRequest = await makeRequest(`${API_URL}/login`, "POST", user);
        localStorage.setItem("token", loginRequest.token);
        if (loginRequest.role == "CUSTOMER") {
            redirectToLastActivity();
            return;
        }
        window.location.href = "adminStock.html";

    } catch (error) {
        throw new RequestError(error.status, error.statusText);
    }
}

export function redirectToLastActivity() {
    const lastActivity = localStorage.getItem("lastActivity");
    if (!lastActivity) {
        window.location.href = "index.html";
        return;
    }
    if (lastActivity == "purchase") {
        const quantity = localStorage.getItem("quantity");
        if (!quantity) {
            window.location.href = "index.html";
            return;
        }
        localStorage.removeItem("quantity");
        loadCart(quantity);
    }

    localStorage.removeItem("lastActivity");
    window.location.href = `${lastActivity}.html`;
    
}


