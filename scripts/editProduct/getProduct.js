import { API_URL } from "../index.js";
import { makeRequest } from "../request/request.js";

export async function  getProduct(productId) {
    try{
        const product = await makeRequest(`${API_URL}/products/${productId}`, "GET");
        return product;
    } catch (error){
        console.error(error);
    }
}