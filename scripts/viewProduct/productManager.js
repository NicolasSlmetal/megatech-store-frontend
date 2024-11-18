import { API_URL } from "../index.js";
import { makeRequest, makeRequestWithoutJsonReturn } from "../request/request.js";

export async function deleteProduct(id) {
    try {
        const response = await makeRequestWithoutJsonReturn(`${API_URL}/products/${id}`, "DELETE");
        if (response.ok) {
            console.log("Product deleted");
        } else {
            console.error("Failed to delete product");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateProduct(product) {
    const id = product.id;
    try {
        const updated = await makeRequest(`${API_URL}/products/${id}`, "PUT", product);
    } catch (error) {
        console.error(error);
        throw error;
    }
}