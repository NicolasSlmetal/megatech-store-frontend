export function printPurchases(purchases) {
    const tableBody = document.getElementById("purchase-table");
    purchases.forEach(puchase => {
        let tr = document.createElement("tr");
        tr.classList.add("table__row");
        let tdProductName = document.createElement("td");
        tdProductName.classList.add("table__column");
        tdProductName.innerText = puchase.productName;
        let tdQuantitySold = document.createElement("td");
        tdQuantitySold.classList.add("table__column");
        tdQuantitySold.innerText = puchase.quantitySold;
        let tdTotalValue = document.createElement("td");
        tdTotalValue.classList.add("table__column");
        tdTotalValue.innerText = `R$ ${puchase.totalValue.toFixed(2)}`;
        tr.appendChild(tdProductName);
        tr.appendChild(tdQuantitySold);
        tr.appendChild(tdTotalValue);
        tableBody.appendChild(tr);
    });
}