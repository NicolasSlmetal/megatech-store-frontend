import { makeRequest } from '../request/request.js';
import { API_URL } from '../index.js';
import { getAuthorizationHeader } from '../auth/verifyAuth.js';
import { verifyIfErrorIsAuth } from '../auth/logout.js';

export async function loadPurchasesByProduct() {
    try {
        const purchases = await makeRequest(`${API_URL}/purchases/total-value-by-product`, "GET", undefined, getAuthorizationHeader());
        return purchases;
    } catch (error) {
        verifyIfErrorIsAuth(error, "login.html");
        console.error(error);
    }
}