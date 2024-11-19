import { verifyIfErrorIsAuth } from "../auth/logout.js";
import { getAuthorizationHeader } from "../auth/verifyAuth.js";
import { API_URL } from "../index.js";
import { makeRequest } from "../request/request.js";

export async function fetchPurchaseHistoryOfCustomer() {
    try {
        const response = await makeRequest(`${API_URL}/purchases/me`, "GET", undefined, getAuthorizationHeader());
        return response;
    } catch (error) {
        verifyIfErrorIsAuth(error);
        console.error(error);
    }
}

export function printPurchaseHistoryOrderingByDate(purchases) {
    const section = document.querySelector("#purchase-history");
    const sortedPurchases = purchases.sort((a, b) => new Date(b.date) - new Date(a.date));
    sortedPurchases.forEach(purchase => {
        let total = 0;
        const div = document.createElement("div");
        div.classList.add("purchase");
        const date = new Date(purchase.date).toLocaleString();
        div.innerHTML = `<p>Data da compra: ${date}</p>`;
        const ul = document.createElement("ul");
        ul.classList.add("purchase__list");
        purchase.productQuantities.forEach(product => {
            const li = document.createElement("li");
            li.classList.add("purchase__item");
            li.innerHTML = `
                <img class="little__img" src="${product.productDTO.image}" alt="${product.productDTO.name}">
                <p>${product.productDTO.name}</p>
                <p>Quantidade: ${product.quantity}</p>
                <p>Preço atual: R$${product.productDTO.price.toFixed(2)}</p>
            `;
            total += product.productDTO.price * product.quantity;
            ul.appendChild(li);
        });
        const totalP = document.createElement("p");
        totalP.innerText = `Total pago no período: R$${purchase.totalValue.toFixed(2)}`;
        div.appendChild(ul);
        div.appendChild(totalP);
        div.appendChild(document.createElement("hr"));
        section.appendChild(div);
        
    });
}