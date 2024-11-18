import { configureRegisterButton } from "./buttonConfigurer.js";

const regexUpper = /[A-Z]/;
const regexLower = /[a-z]/;
const regexNumber = /[0-9]/;
const regexSpecial = /[^A-Za-z0-9]/;
const liRuleSize = document.querySelector("#rule-size");
const liRuleUpper = document.querySelector("#rule-upper");
const liRuleLower = document.querySelector("#rule-lower");
const liRuleNumber = document.querySelector("#rule-number");
const liRuleSymbol = document.querySelector("#rule-symbol");


function resetClasses() {
    liRuleSize.classList.remove("invalid");
    liRuleUpper.classList.remove("invalid");
    liRuleLower.classList.remove("invalid");
    liRuleNumber.classList.remove("invalid");
    liRuleSymbol.classList.remove("invalid");
    liRuleSize.classList.remove("valid");
    liRuleUpper.classList.remove("valid");
    liRuleLower.classList.remove("valid");
    liRuleNumber.classList.remove("valid");
    liRuleSymbol.classList.remove("valid");
}
export function validateAllRules() {
    resetClasses();
    const firstPassword = document.querySelector("#password").value;
    if (firstPassword.length >= 8) {
        liRuleSize.classList.add("valid");
    } else {
        liRuleSize.classList.add("invalid");
    }

    if (regexUpper.test(firstPassword)) {
        liRuleUpper.classList.add("valid");
    } else {
        liRuleUpper.classList.add("invalid");
    }

    if (regexLower.test(firstPassword)) {
        liRuleLower.classList.add("valid");
    } else {
        liRuleLower.classList.add("invalid");
    }

    if (regexNumber.test(firstPassword)) {
        liRuleNumber.classList.add("valid");
    } else {
        liRuleNumber.classList.add("invalid");
    }

    if (regexSpecial.test(firstPassword)) {
        liRuleSymbol.classList.add("valid");
    } else {
        liRuleSymbol.classList.add("invalid");
    }

}

export function configureFirstPasswordInput() {
    const firstPassword = document.querySelector("#password");
    firstPassword.addEventListener("input", () => {
        validateAllRules();
        configureRegisterButton();
    });
}

export function configureSecondPasswordInput() {
    const secondPassword = document.querySelector("#confirm-password");
    secondPassword.addEventListener("input", () => {
        const firstPassword = document.querySelector("#password").value;
        if (firstPassword !== secondPassword.value) {
            document.querySelector("#confirm-password-error").innerText = "As senhas não coincidem";
        } else {
            document.querySelector("#confirm-password-error").innerText = "";
        }
        configureRegisterButton();
    });
}