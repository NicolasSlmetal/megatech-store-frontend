import { API_URL } from "../index.js";
import { configureRegisterButton } from "./buttonConfigurer.js";

export function validateCEP(cep) {
    return cep.match(/^\d{5}-\d{3}$/);
}

export function fetchAddressByCEP(cep) {
    return fetch(`${API_URL}/addresses?cep=${cep}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
}

export function fillAddressFields(address) {
    document.querySelector("#address").value = address.logradouro ? address.logradouro : "Não encontrado";
    document.querySelector("#city").value = address.localidade ? address.localidade : "Não encontrado";
    document.querySelector("#state").value = address.estado ? address.estado : "Não encontrado";
}

export function clearAddressFields() {
    document.querySelector("#address").value = "";
    document.querySelector("#city").value = "";
    document.querySelector("#state").value = "";
}

export function handleCEPInput() {
    const cepInput = document.querySelector("#cep");
    let address = null;
    cepInput.addEventListener("input", () => {
        document.querySelector("#cep-error").innerText = "";
    });
    cepInput.addEventListener("change", async () => {
        if (!validateCEP(cepInput.value)) {
            informErrorInCEP();
            return;
        }
        try {
            address = await fetchAddressByCEP(cepInput.value);
            validateIfInputsIsEmpty(address);
            if (!address) {
                informErrorInCEP();
                return;
            }

        } catch (error) {
            informErrorInCEP();
            return;
        }
        fillAddressFields(address);
        configureRegisterButton();
    });
}

function informErrorInCEP() {
    clearAddressFields();
    document.querySelector("#cep").value = "";
    document.querySelector("#cep-error").innerText = "CEP inválido";
}

function validateIfInputsIsEmpty(address) {
    if (!address.logradouro || !address.localidade || !address.estado) {
        throw new Error("Invalid address");
    }
    
}
export function configureAddressNumberInput(){
    const addressNumber = document.querySelector("#address-number");
    const addressNumberError = document.querySelector("#address-number-error");
    addressNumber.addEventListener("input", () => {
        addressNumberError.innerText = "";
    });
    addressNumber.addEventListener("change", () => {
        if (!addressNumber.value) {
            addressNumberError.innerText = "Campo obrigatório";
        }
        configureRegisterButton();
    });
}
