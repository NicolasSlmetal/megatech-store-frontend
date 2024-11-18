export function configureInputValue(product) {
    document.getElementById("name").value = product.name;
    document.getElementById("manufacturer").value = product.manufacturer;
    document.getElementById("price").value = product.price;
    document.getElementById("stockQuantity").value = product.stockQuantity;
    document.getElementById("image").value = product.image;
    document.getElementById("id").value = product.id;
}
