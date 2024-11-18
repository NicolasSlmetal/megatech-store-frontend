export function loadCart(quantity) {
    const lastSelectedProduct = JSON.parse(localStorage.getItem("lastSelectedProduct"));

    const cart = localStorage.getItem("cart");
    if (!cart) {
        const object = [{ "id": lastSelectedProduct.id, "quantity": Number(quantity) }];

        localStorage.setItem("cart", JSON.stringify(object));
    } else {
        const cartArray = JSON.parse(cart);
        const product = cartArray.find(product => product.id === lastSelectedProduct.id);
        if (product) {
            product.quantity += Number(quantity);
        } else {
            cartArray.push({ "id": lastSelectedProduct.id, "quantity": quantity });
        }
        localStorage.setItem("cart", JSON.stringify(cartArray));
    }
}