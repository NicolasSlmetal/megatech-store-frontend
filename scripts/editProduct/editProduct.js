import { API_URL } from "../index.js";
import { makeRequest } from "../request/request.js";

export async function editProduct(product) {
    try{
        await makeRequest(`${API_URL}/products/${product.id}`, "PUT", product);
    } catch(error) {
        console.error(error);
        throw error;
    }
    
}

export function getProductFromForm() {
    const product = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        manufacturer: document.getElementById("manufacturer").value,
        price: document.getElementById("price").value,
        stockQuantity: parseInt(document.getElementById("stockQuantity").value),
        image: document.getElementById("image").value,
    };
    return product;
}