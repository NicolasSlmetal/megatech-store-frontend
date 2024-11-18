import { API_URL } from "../index.js";
import { makeRequest } from "../request/request.js";

export async function insertProduct(product) {
    try {
        await makeRequest(`${API_URL}/products`, "POST", product);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function getProductFromForm() {
    const product = {
        name: document.getElementById("name").value,
        manufacturer: document.getElementById("manufacturer").value,
        price: document.getElementById("price").value,
        stockQuantity: parseInt(document.getElementById("stockQuantity").value),
        image: document.getElementById("image").value,
    };
    return product;
}