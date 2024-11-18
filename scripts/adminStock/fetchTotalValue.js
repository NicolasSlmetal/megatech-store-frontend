import { API_URL } from "../index.js";
import { makeRequest } from "../request/request.js";

export async function fetchTotalValuePerProduct() {
    try{
        const projections = await makeRequest(`${API_URL}/products/totalValue`, "GET");
        return projections;
    } catch (error){
        console.error(error);
        throw error;
    }
}