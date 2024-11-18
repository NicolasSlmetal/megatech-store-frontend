import { makeLogin } from "./auth/loginFormVerifier.js";
import { configureButton } from "./listenerConfig/buttonConfig.js";

export function main() {
    const button = document.querySelector("#login-button");
    window.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            makeLogin();
        }
    });
    configureButton(button, makeLogin);
}