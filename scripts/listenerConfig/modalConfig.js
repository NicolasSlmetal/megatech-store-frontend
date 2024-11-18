export function configureModal() {
    const modal = document.querySelector('.modal');
    
    const confirmButton = document.querySelector('#modal-button');
    confirmButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.style.display = 'block';
}

export function configureModalWithTwoButtons() {
    const modal = document.querySelector('#two-buttons-modal');

    const confirmButton = document.querySelector('#modal-button-yes');
    confirmButton.style.display = 'block';
    const cancelButton = document.querySelector('#modal-button-no');
    cancelButton.style.display = 'block';
    cancelButton.innerText = 'Não';
    cancelButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    confirmButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.style.display = 'block';
}

export function configureModalContent(title, message) {
    const modalTitle = document.querySelector('#modal-title');
    const modalMessage = document.querySelector('#modal-text');

    modalTitle.innerText = title;
    modalMessage.innerText = message;
}