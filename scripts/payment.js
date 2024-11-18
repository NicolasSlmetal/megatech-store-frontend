
import { configureButton } from "./listenerConfig/buttonConfig.js";
import { configRadioToEnableButton } from "./payment/radioConfig.js";

export function main() {
    const totalP = document.querySelector("#total");
    const total = Number(localStorage.getItem("totalPurchase"));
    totalP.innerHTML = `Total: R$ ${total}`;
    localStorage.removeItem("totalPurchase");
    const radioPaymentCredit = document.querySelector('#payment-credit');
    const radioPaymentDebit = document.querySelector('#payment-debit');
    const radioPaymentBill = document.querySelector('#payment-bill');
    configRadioToEnableButton(radioPaymentCredit);
    configRadioToEnableButton(radioPaymentDebit);
    configRadioToEnableButton(radioPaymentBill);

    configureButton(document.querySelector("#payment-button"), () => window.location.href = "index.html");
}