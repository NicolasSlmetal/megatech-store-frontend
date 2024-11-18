import { RequestError } from "../error/RequestError.js";
import { API_URL } from "../index.js";
import { makeRequest } from "../request/request.js";

export async function loadCustomerById() {
    try {
        const id = Number(localStorage.getItem("id"));
        const body = await makeRequest(`${API_URL}/customers/${id}`, "GET");
        return {...body, id};
    } catch (error) {
        console.log(error);
        throw new RequestError("User not found");
    }
}

export function printCustomerInfo(customer) {
    const name = document.querySelector("#profile-name");
    const email = document.querySelector("#profile-email");
    const cpf = document.querySelector("#profile-cpf");
    const register = document.querySelector("#profile-register-date");
    const fullDate = customer.registrationDate + "T00:00:00";
    const formatedDate = new Date(fullDate).toLocaleDateString();
    register.value = formatedDate;
    name.value = customer.name;
    email.value = customer.email;
    cpf.value = customer.cpf;
}