import { configureModalContent, configureModalWithTwoButtons } from "../listenerConfig/modalConfig.js";
import { updateProduct } from "../viewProduct/productManager.js";
import { configRemoveButton } from "./buttonConfig.js";

export function printTableProducts(products) {
    const tableBody = document.querySelector("#product-table-body");
    products.forEach(product => {
        let tr =  document.createElement("tr");
        tr.classList.add("table__row");
        let tdName = document.createElement("td");
        tdName.classList.add("table__column");
        tdName.innerText = product.name;
        let tdPrice = document.createElement("td");
        tdPrice.classList.add("table__column");
        tdPrice.innerText = `R$${product.price.toFixed(2)}`;
        let tdQuantity = document.createElement("td");
        tdQuantity.classList.add("table__column");
        tdQuantity.innerText = product.stockQuantity;
        let tdEditButton = document.createElement("td");
        tdEditButton.classList.add("table__column");
        let editButton = document.createElement("button");
        editButton.innerText = "Editar";
        editButton.addEventListener('click', () => {
            window.location.href = `editProduct.html?id=${product.id}`;
        });
        editButton.classList.add("edit__button");
        tdEditButton.appendChild(editButton);
        let tdRemoveButton = document.createElement("td");
        tdRemoveButton.classList.add("table__column");
        let removeButton = document.createElement("button");
        removeButton.innerText = "Remover";
        removeButton.classList.add("remove__button");
        configRemoveButton(removeButton, product);
        tdRemoveButton.appendChild(removeButton);
        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tr.appendChild(tdEditButton);
        tr.appendChild(tdRemoveButton);
        tableBody.appendChild(tr);
    });


}

export function printTableValueInStock(projections) {
    const tableBody = document.querySelector("#stock-value");
    projections.forEach(projection => {
        let tr =  document.createElement("tr");
        tr.classList.add("table__row");
        let tdName = document.createElement("td");
        tdName.classList.add("table__column");
        tdName.innerText = projection.productName;
        let tdEntryDate = document.createElement("td");
        tdEntryDate.classList.add("table__column");
        const entryDate = new Date(projection.entryDate).toLocaleString();
        tdEntryDate.innerText = entryDate;
        let tdPrice = document.createElement("td");
        tdPrice.classList.add("table__column");
        tdPrice.innerText = `R$${projection.productPrice.toFixed(2)}`;
        let tdQuantity = document.createElement("td");
        tdQuantity.classList.add("table__column");
        tdQuantity.innerText = projection.quantity;
        let tdTotalValue = document.createElement("td");
        tdTotalValue.classList.add("table__column");
        tdTotalValue.innerText = `R$${projection.totalValue.toFixed(2)}`;
        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tr.appendChild(tdEntryDate);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdTotalValue);
        tableBody.appendChild(tr);
    });
}

export function printTableProductsWithZeroStock(products) {
    const tableBody = document.querySelector("#zero-stock");
    products.forEach(product => {
        let tr =  document.createElement("tr");
        tr.classList.add("table__row");
        let tdName = document.createElement("td");
        tdName.classList.add("table__column");
        tdName.innerText = product.name;
        let tdPrice = document.createElement("td");
        tdPrice.classList.add("table__column");
        tdPrice.innerText = `R$${product.price.toFixed(2)}`;
        let tdQuantity = document.createElement("td");
        let inputQuantity = document.createElement("input");
        inputQuantity.type = "number";
        inputQuantity.min = 0;
        inputQuantity.value = 0;
        inputQuantity.classList.add("input");
        inputQuantity.classList.add("readonly");
        inputQuantity.readOnly = true;
        tdQuantity.classList.add("table__column");
        tdQuantity.appendChild(inputQuantity);
        let tdButtonFill = document.createElement("td");
        tdButtonFill.classList.add("table__column");
        let fillButton = document.createElement("button");
        fillButton.innerText = "Reabastecer";
        fillButton.classList.add("edit__button");
        fillButton.addEventListener('click', () => {
            if (inputQuantity.readOnly) {
                inputQuantity.readOnly = false;
                inputQuantity.min = 1;
                inputQuantity.value = 1;
                inputQuantity.classList.remove("readonly");
            }
            fillButton.innerText = "Confirmar";
            fillButton.addEventListener("click", async () => {
                const quantity = parseInt(inputQuantity.value);
                
                if (quantity > 0) {
                    try {
                        await updateProduct({id: product.id, stockQuantity: quantity});
                        window.location.reload();
                    } catch (error) {
                        configureModalWithTwoButtons();
                        const noButton = document.querySelector("#modal-button-no");
                        document.querySelector("#modal-button-yes").style.display = "none";
                        noButton.innerText = "Ok";
                        noButton.addEventListener("click", () => {
                            window.location.reload();
                        });
                        configureModalContent("Erro", "Algo deu errado na atualização do produto, tente novamente mais tarde");   
                    }
                }
            });
        });
        inputQuantity.addEventListener("change", () => {
            
        });
        tdButtonFill.appendChild(fillButton);
        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdButtonFill);
        tableBody.appendChild(tr);
    });
}