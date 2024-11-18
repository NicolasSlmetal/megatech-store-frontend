import {  configureModalContent, configureModalWithTwoButtons } from "../listenerConfig/modalConfig.js";
import { sendPurchaseRequest } from "./purchasePost.js";
import { generateTemplateMessageForModal } from "./purchasePrinter.js";
import { calculateTotal } from "./purchaseStateFetcher.js";

var processingPurchase = false;

export function configPurchaseButton(products) {
    const purchaseButton = document.querySelector("#purchase-button");
    purchaseButton.addEventListener("click", () => {
        configureModalWithTwoButtons();
        document.querySelector("#modal-button-yes").style.display = "block";
        document.querySelector("#modal-button-no").innerText = "Não";
        configureModalContent("Resumo da compra", generateTemplateMessageForModal(products));
        
        const yesBytton = document.querySelector("#modal-button-yes");
        yesBytton.addEventListener("click", async () => {
            if (processingPurchase) {
                return;
            }
            processingPurchase = true;
            try {
                await sendPurchaseRequest(products);
                localStorage.setItem("totalPurchase", calculateTotal(products));
                localStorage.removeItem("cart");
                window.location.href = "payment.html";
            } catch (error) {
                console.log(error);
                configureModalWithTwoButtons();
                document.querySelector("#modal-button-yes").style.display = "none";
                document.querySelector("#modal-button-no").innerText = "Ok";
                configureModalContent("Erro", "Algo deu errado com a sua compra, tente novamente mais tarde");   
            }
        });
    });
}