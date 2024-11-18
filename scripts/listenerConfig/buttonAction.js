
import { verifyAuth } from "../auth/verifyAuth.js";
import { loadCart } from "../purchase/cart.js";

export async function handlePurchaseButton() {
    const quantity = Number(document.querySelector("#quantity-input").value);

    const authenticated = await verifyAuth();
    if (!authenticated) {
        localStorage.setItem("lastActivity", "purchase");
        localStorage.setItem("quantity", quantity);
        window.location.href = "login.html";
        return;
    };
    
    loadCart(quantity);
    window.location.href = "purchase.html";
}


export async function handleCartButton() {
    const quantity = document.querySelector("#quantity-input").value;
    const authenticated = await verifyAuth();
    if (!authenticated) {
        localStorage.setItem("lastActivity", "product");
        localStorage.setItem("quantity", quantity);
        window.location.href = "login.html";
        return;
    };
    loadCart(quantity);
    window.location.reload();
}

export function handleContinuePurchase() {
    window.location.href = "purchase.html";
}
