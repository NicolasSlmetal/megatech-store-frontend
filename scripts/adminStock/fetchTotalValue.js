import { API_URL } from "../index.js";
import { makeRequest } from "../request/request.js";
import { getAuthorizationHeader } from "../auth/verifyAuth.js";
import { verifyIfErrorIsAuth } from "../auth/logout.js";

export async function fetchTotalValuePerProduct() {
    try{
        const projections = await makeRequest(`${API_URL}/products/stock/value`, "GET", undefined, getAuthorizationHeader());
        return projections;
    } catch (error){
        console.error(error);
        verifyIfErrorIsAuth(error);
        throw error;
    }
}