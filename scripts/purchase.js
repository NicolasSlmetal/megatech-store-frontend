import { changeMenuIfAuthenticated } from "./listenerConfig/menuAdapter.js";
import { configPurchaseButton } from "./purchase/buttonConfig.js";
import { printPurchase } from "./purchase/purchasePrinter.js";
import { getPurchaseState } from "./purchase/purchaseStateFetcher.js";
import { loadProductsFromCart } from "./viewProduct/productLoader.js";

export async function main(){
    const cartProducts = getPurchaseState();
    if (cartProducts.length === 0){
        window.location.href = "index.html";
    }
    const products = await loadProductsFromCart(cartProducts);
    printPurchase(products);
    configPurchaseButton(products);
    changeMenuIfAuthenticated();
}