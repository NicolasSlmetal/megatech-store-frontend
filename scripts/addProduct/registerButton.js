import { configureModal, configureModalContent } from "../listenerConfig/modalConfig.js";
import { getProductFromForm, insertProduct } from "./insertProduct.js";

export function configureAddProductButton() {
    const button = document.querySelector("#add-product-button");
    button.addEventListener('click', async () => {
        const product = getProductFromForm();
        try{
            await insertProduct(product);
            window.location.href = "adminStock.html";
        } catch (error) {
            console.error(error);
            configureModal();
            let title = "Erro";
            let message = "Algo deu errado ao tentar adicionar o produto, tente novamente mais tarde";
            if (error.status === 400) {
                message = "Campos inválidos";
            }
            configureModalContent(title, message);
        }
    });
}