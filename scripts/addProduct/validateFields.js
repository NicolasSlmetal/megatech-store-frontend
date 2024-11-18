export function validateFields() {
    const name = document.querySelector("#name");
    const price = document.querySelector("#price");
    const stockQuantity = document.querySelector("#stockQuantity");
    const manufacturer = document.querySelector("#manufacturer");
    const image = document.querySelector("#image");
    if (name.value && price.value && stockQuantity.value && manufacturer.value && image.value ) {
        return true;
    }
    return false;
}

export function configureInputs() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        const errorParagraph = document.querySelector(`#${input.id}-error`);
        input.addEventListener('input', () => {
            const button = document.querySelector("#add-product-button");
            if (validateFields()) {
                button.disabled = false;
                button.classList.remove("disabled__button");
            } else {
                button.disabled = true;
                button.classList.add("disabled__button");
            }
        });
    });
}