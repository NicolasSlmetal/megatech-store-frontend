import { configureModal, configureModalContent } from "../listenerConfig/modalConfig.js";
import { editProduct, getProductFromForm } from "./editProduct.js";

export function configureEditProductButton(){
    const editButton = document.getElementById("add-product-button");
    editButton.addEventListener("click", async () => {
        const product = getProductFromForm();
        try {
            await editProduct(product);
            window.location.href = "/adminStock.html";
        } catch (error) {
            const title = "Erro ao atualizar";
            let message = "Não foi possível atualizar o produto, tente novamente mais tarde";
            if (error.status == 400) {
                message = "Algum campo está inválido";
            }
            configureModal();
            configureModalContent(title, message);
        }
    });
}