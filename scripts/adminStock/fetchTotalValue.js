import { API_URL } from "../index.js";
import { makeRequest } from "../request/request.js";
import { getAuthorizationHeader } from "../auth/verifyAuth.js";

export async function fetchTotalValuePerProduct() {
    try{
        const projections = await makeRequest(`${API_URL}/products/totalValue`, "GET", undefined, getAuthorizationHeader());
        return projections;
    } catch (error){
        console.error(error);
        verifyIfErrorIsAuth(error);
        throw error;
    }
}