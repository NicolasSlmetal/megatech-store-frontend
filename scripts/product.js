import { changeMenuIfAuthenticated, configHeaderListItens } from "./listenerConfig/menuAdapter.js";
import { configureButtons, loadOneProductByIdFromAPI } from "./viewProduct/productLoader.js";
import { printProductDetails } from "./viewProduct/productPrinter.js";


export function main() {
    loadOneProductByIdFromAPI().then((body) => {
        if (!body) {
            window.location.href = "index.html";
        }
        printProductDetails(body);
        
    });
    changeMenuIfAuthenticated();
    configHeaderListItens();
    configureButtons();
}