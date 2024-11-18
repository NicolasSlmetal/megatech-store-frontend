export function configRadioToEnableButton(radio) {
    radio.addEventListener('change', () => {
        const button = document.querySelector('#payment-button');
        button.disabled = false;
        button.classList.remove('disabled__button');
    });
}