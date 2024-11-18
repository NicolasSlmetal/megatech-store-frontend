export function configureQuantityInput(quantity) {
    const quantityInput = document.querySelector("#quantity-input");
    if (!quantityInput) return;
    quantityInput.value = 1;
    quantityInput.max = quantity;
    quantityInput.addEventListener("change", addLimitToInput(quantityInput, quantity));
}

export function addLimitToInput(quantityInput, quantity) {
    return () => {
        if (quantityInput.value < 1) quantityInput.value = 1;
        if (quantityInput.value > quantity) quantityInput.value = quantity;
    };
}