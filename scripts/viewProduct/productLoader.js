import { verifyIfErrorIsAuth } from "../auth/logout.js";
import { getAuthorizationHeader } from "../auth/verifyAuth.js";
import { API_URL } from "../index.js";
import { handleCartButton, handlePurchaseButton } from "../listenerConfig/buttonAction.js";
import { configureButton } from "../listenerConfig/buttonConfig.js";
import { makeRequest } from "../request/request.js";
import { printProduct } from "./productPrinter.js";

export async function loadOneProductByIdFromAPI(){
    const id = JSON.parse(localStorage.getItem("lastSelectedProduct")).id;
    const body = await makeRequest(`${API_URL}/products/${id}`, "GET");
    return body;
}

export async function loadProductsFromCart(cart){
    const products = await Promise.all(cart.map(async (element) => {
            const body = await makeRequest(`${API_URL}/products/${element.id}`, "GET");
            body.quantity = element.quantity;
            
            return body;
        }))
    return products;

}

export function configureButtons() {
    configureButton(document.querySelector("#purchase-button"), handlePurchaseButton);
    configureButton(document.querySelector("#add-to-cart-button"), handleCartButton);
}

export async function loadAllProductsFromAPI(){
    const body = await makeRequest(`${API_URL}/products`, "GET");
    if (Array.isArray(body)){
        
        for (const product of body){
            printProduct(product);
        }
    }
}

export async function fetchAllProductsFromAPI() {
    try{
        const body = await makeRequest(`${API_URL}/products`, "GET");
        return body;
    } catch (error){
        console.error(error);
        throw error;
    }
}

export async function fetchAllProductsWithZeroStock() {
    try{
        const body = await makeRequest(`${API_URL}/products/stock/zero`, "GET", undefined, getAuthorizationHeader());
        return body;
    } catch (error){
        verifyIfErrorIsAuth(error, "login.html");
        console.error(error);
        throw error;
    }
}