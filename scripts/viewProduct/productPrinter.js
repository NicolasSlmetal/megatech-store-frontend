import { BOARD_CARD_IMAGE_CLASS, BOARD_CARD_PRICE_CLASS, BOARD_CARD_TITLE_CLASS } from "../index.js"
import { handleCartButton, handleContinuePurchase, handlePurchaseButton } from "../listenerConfig/buttonAction.js";
import { configureQuantityInput } from "../listenerConfig/inputAction.js";
import { loadOneProductByIdFromAPI } from "./productLoader.js";

export function printProduct(product) {
    const productBoardCard = document.createElement("section");
    productBoardCard.classList.add("board__card");
    const mainBoard = document.querySelector(".main__board");
    productBoardCard.innerHTML = `
        <img class="${BOARD_CARD_IMAGE_CLASS}" src="${product.image}" alt="${product.name}">
        <h2 class="${BOARD_CARD_TITLE_CLASS}">${product.name}</h2>
        <p class="${BOARD_CARD_PRICE_CLASS}">R$${product.price.toFixed(2)}</p>
    `;
    productBoardCard.addEventListener("click", () => {
        localStorage.setItem("lastSelectedProduct", JSON.stringify(product));
        window.location.href = `/product.html`;
        loadOneProductByIdFromAPI(product.id);
        
    });
    mainBoard.appendChild(productBoardCard);
}

export function printProductDetails(product) {
    const firstButton = document.querySelector("#purchase-button");
    const secondButton = document.querySelector("#add-to-cart-button")
    const cart = localStorage.getItem("cart");
    const input = document.querySelector("#quantity-input");
    const quantityLabel = document.querySelector("label"); 
    if (cart) {
        const cartArray = JSON.parse(cart);
        const productInCart = cartArray.find(productInCart => product.id === productInCart.id);
        if (productInCart) {
            input.remove();
            quantityLabel.remove();
            const status = document.querySelector("#status");
            status.innerText = "Produto adicionado ao carrinho";
            firstButton.innerText = "Finalizar compra";
            secondButton.innerText = "Remover do carrinho";
            firstButton.removeEventListener("click", handlePurchaseButton);
            firstButton.addEventListener("click", handleContinuePurchase);
            secondButton.removeEventListener("click", handleCartButton);
            secondButton.addEventListener("click", () => {
                cartArray.splice(cartArray.indexOf(productInCart), 1);
                localStorage.setItem("cart", JSON.stringify(cartArray));
                window.location.reload();
            });
        } 
    }
    configureQuantityInput(input, product.stockQuantity);
    
    const image = document.querySelector(".display__image");
    image.src = product.image;
    image.alt = product.name;
    const title = document.querySelector(".display__name");
    title.innerText = product.name;
    const price = document.querySelector(".display__price");
    price.innerText = `R$${product.price.toFixed(2)}`;
    const quantity = document.querySelector(".display__quantity");
    quantity.innerText += "Quantidade disponível: " + product.stockQuantity;

    const manufacturer = document.querySelector(".display__manufacturer");
    manufacturer.innerText += "Fabricante: " + product.manufacturer;
}

