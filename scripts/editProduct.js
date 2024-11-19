import { configureInputs } from "./addProduct/validateFields.js";
import { checkAuthForAdmin } from "./auth/verifyAuth.js";
import { configureEditProductButton } from "./editProduct/configButton.js";
import { getProduct } from "./editProduct/getProduct.js";
import { configureInputValue } from "./editProduct/inputValue.js";
import { configListItensForAdmin } from "./listenerConfig/menuAdapter.js";



export async function main() {
    configListItensForAdmin();
    const productId = new URLSearchParams(window.location.search).get('id');
    const product = await getProduct(productId);
    configureInputValue(product);
    configureInputs();
    configureEditProductButton();
}