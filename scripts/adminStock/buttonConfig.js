import { configureModalContent, configureModalWithTwoButtons } from "../listenerConfig/modalConfig.js";
import { deleteProduct } from "../viewProduct/productManager.js";

export function configRemoveButton(button, product) {
    button.addEventListener('click', () => {
        configureModalWithTwoButtons();
        configureModalContent("Remover produto", `Tem certeza que deseja remover o produto ${product.name}`);
        const yesButton = document.querySelector('#modal-button-yes');
        yesButton.addEventListener('click', async () => {
            document.querySelector(".modal").style.display = "none";
            try {
                await deleteProduct(product.id);
                window.location.reload();
            } catch (error) {
                configureModalWithTwoButtons();
                document.querySelector("#modal-button-yes").style.display = "none";
                document.querySelector("#modal-button-no").innerText = "Ok";
                configureModalContent("Erro", "Algo deu errado ao tentar deletar o produto, tente novamente mais tarde");   
            }
        });
    });
}