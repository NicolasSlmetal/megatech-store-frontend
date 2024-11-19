import { verifyIfErrorIsAuth } from "../auth/logout.js";
import { getAuthorizationHeader } from "../auth/verifyAuth.js";
import { API_URL } from "../index.js";
import { configureModal, configureModalContent } from "../listenerConfig/modalConfig.js";
import { makeRequest } from "../request/request.js";

export async function editProfile(editFields) {
    try {
        const updatedProfile = await makeRequest(`${API_URL}/customers/me`, "PUT", editFields, getAuthorizationHeader());
        return updatedProfile;
    } catch (error) {
        localStorage.setItem("lastActivity", "profile");
        verifyIfErrorIsAuth(error, "login.html");
        const title = "Erro ao editar perfil";
        let message = "Ocorreu um erro inesperado";
        if (error.status == 400) {
            message = "Email inválido ou nome inválido";
        }
        configureModal();
        configureModalContent(title, message);
    }
}

export async function handleProfileEdit() {
    const name = document.querySelector("#profile-name").value
    const email = document.querySelector("#profile-email").value
    const editFields = { name, email }
    const updatedProfile = await editProfile(editFields);
    if (updatedProfile) {
        window.location.reload();
    }
}