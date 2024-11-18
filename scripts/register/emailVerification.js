import { configureRegisterButton } from "./buttonConfigurer.js";

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export function configureEmailInput() {
    const emailInput = document.querySelector("#email");
    emailInput.addEventListener("input", () => {
        document.querySelector("#email-error").innerText = "";
    });
    emailInput.addEventListener("change", () => {
        if (!validateEmail(emailInput.value)) {
            document.querySelector("#email-error").innerText = "Email inválido";
        }
        configureRegisterButton();
    });
}