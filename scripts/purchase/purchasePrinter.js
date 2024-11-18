import { addLimitToInput } from "../listenerConfig/inputAction.js";
import { configPurchaseButton } from "./buttonConfig.js";



export function printPurchase(products) {
    let total = 0;
    const totalText = document.querySelector("#total-purchase");
    products.forEach(product => {
        let id = product.id;
        total += product.price * product.quantity;
        const productDiv = document.createElement("div");
        productDiv.id = "product__display"
        productDiv.classList.add("product__display");
        productDiv.innerHTML = `
            <img class="display__image" src="${product.image}" alt="${product.name}">
            <h2 class="product__name">${product.name}</h2>
            <p class="product__price">R$${product.price.toFixed(2)}</p>
        `;
        const quantityInput = document.createElement("input");
        quantityInput.classList.add("quantity__input");
        quantityInput.type = "number";
        quantityInput.value = product.quantity;
        quantityInput.min = 1;
        quantityInput.max = product.stockQuantity;
        quantityInput.addEventListener("change", addLimitToInput(quantityInput, product.stockQuantity));
        quantityInput.addEventListener("change", () => {
            let total = 0;
            const quantity = quantityInput.value;
            products.forEach(product => {
                if (product.id === id) product.quantity = quantity;
                total += product.price * product.quantity;
              });
            totalText.innerText = `Total: R$${total.toFixed(2)}`
            configPurchaseButton(products);
        });
        const removeButton = document.createElement("button");
        removeButton.classList.add("remove__button");
        removeButton.classList.add("button");
        removeButton.innerText = "Remover";
        removeButton.addEventListener("click", () => {
            products = products.filter(product => product.id !== id);
            localStorage.setItem("cart", JSON.stringify(products));
            window.location.reload();
        });
        productDiv.appendChild(quantityInput);
        productDiv.appendChild(removeButton);

        
        document.querySelector(".cart__board").appendChild(productDiv);
        totalText.innerText = `Total: R$${total.toFixed(2)}`;
    });
   
}

export function generateTemplateMessageForModal(products) {
    let message = "Aqui está o resumo da sua compra:\n";
    let total = 0;
    products.forEach(product => {
        message += `${product.quantity}x ${product.name}\n`;
        message += `Valor: R$${(product.price * product.quantity).toFixed(2)}\n\n`;
        total += product.price * product.quantity;
    });
    message += `Total: R$${total.toFixed(2)}`;
    message += "\n\nDeseja confirmar a compra?";
    return message;
}