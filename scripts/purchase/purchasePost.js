import { getAuthorizationHeader } from "../auth/verifyAuth.js";
import { RequestError } from "../error/RequestError.js";
import { API_URL } from "../index.js";
import { makeRequest } from "../request/request.js";

export function buildPurchasePayload(products) {
    const customerId = Number(localStorage.getItem("id"));
    const productsMapping = [];
    products.forEach(product => {
        productsMapping.push({ productId: product.id, quantity: product.quantity });
    });
    const payload = {
        customerId,
        products: productsMapping
    };
    return payload;
}

export async function sendPurchaseRequest(products) {
    try {
        const payload = buildPurchasePayload(products);
        const response = await makeRequest(`${API_URL}/purchases`, "POST", payload, getAuthorizationHeader());
        return response;
    } catch (error) {
        console.log(error);
        throw new RequestError(error.status, error.statusText);
    }
}