export function getPurchaseState() {
    const products = [];
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
        window.location.href = "/index.html";
    }
    if (Array.isArray(cart) && cart.length > 0) {
        cart.forEach(element => {
            if (!element.id || !element.quantity) {
                window.location.href = "/index.html";
            }
            products.push({ "id": element.id, "quantity": element.quantity });
        });
    }
    return products;
}

export function calculateTotal(products) {
    return products.reduce((acc, product) => acc + product.price * product.quantity, 0);
}