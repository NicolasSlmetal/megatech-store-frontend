import { handleProfileEdit } from "./editProfile.js";

export function configureEditButton() {
    const nameInput = document.querySelector('#profile-name');
    const emailInput = document.querySelector('#profile-email');
    const editButton = document.querySelector('#profile-edit');
    editButton.addEventListener('click', () => {
        if (nameInput.attributes.getNamedItem('readonly')) {
            nameInput.attributes.removeNamedItem('readonly');
            nameInput.classList.remove("readonly");
        }
        if (emailInput.attributes.getNamedItem('readonly')) {
            emailInput.attributes.removeNamedItem('readonly');
            emailInput.classList.remove("readonly");
        }
    
        editButton.innerText = 'Salvar';
        editButton.addEventListener('click', handleProfileEdit);
        
    });
}