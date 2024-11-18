import { API_URL } from "../index.js";
import { makeRequestWithoutJsonReturn } from "../request/request.js";

export async function verifyAuth() {
    let authenticated = false;
    const token = localStorage.getItem("token");
    if (!token) return false;
    const authorization = {
        "Authorization": `Bearer ${token}`
    };
    try {
        const request = await makeRequestWithoutJsonReturn(`${API_URL}/auth`, "GET", undefined, authorization)
        if (request.ok) {
            authenticated = true
        } else {
            localStorage.removeItem("token");
            
        }
    } catch (error) {
        console.error(error);
        localStorage.removeItem("cart");
    }
    return authenticated;
}


export async function checkAuthForAdmin() {
    const authenticated = await verifyAuth();
    if (!authenticated) {
        window.location.href = "index.html";
    }
}