import { makeRequest } from '../request/request.js';
import { API_URL } from '../index.js';

export async function loadPurchasesByProduct() {
    try {
        const purchases = await makeRequest(`${API_URL}/purchases/totalValue`, "GET");
        return purchases;
    } catch (error) {
        console.error(error);
    }
}