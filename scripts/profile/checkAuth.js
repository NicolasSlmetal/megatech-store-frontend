import { verifyAuth } from "../auth/verifyAuth.js";

export  async function checkAuth() {
    const authenticated = await verifyAuth();
    if (!authenticated) {
        window.location.href = "login.html";
    }

}