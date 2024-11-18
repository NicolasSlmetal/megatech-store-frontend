import { doLogout } from "../auth/logout.js";
import { verifyAuth } from "../auth/verifyAuth.js";

export async function changeMenuIfAuthenticated() {
    const authenticated = await verifyAuth();
    if (authenticated) {
        const firstAnchor = document.getElementById("double-state-li-one");
        const secondAnchor = document.getElementById("double-state-li-two");
        firstAnchor.innerText = "Logout";
        firstAnchor.parentNode.addEventListener("click", doLogout);
        firstAnchor.addEventListener("click", doLogout);
        firstAnchor.href = "index.html";
        secondAnchor.parentNode.addEventListener("click", () => {window.location.href = "profile.html"});
        secondAnchor.innerText = "Perfil";
        secondAnchor.href = "profile.html";
        
    } else {
        const firstAnchor = document.getElementById("double-state-li-one");
        const secondAnchor = document.getElementById("double-state-li-two");
        firstAnchor.innerText = "Entrar";
        firstAnchor.href = "login.html";
        firstAnchor.addEventListener("click", () => {window.location.href = "login.html"});
        secondAnchor.parentNode.addEventListener("click", () => {window.location.href = "register.html"});
        secondAnchor.innerText = "Cadastrar";
        secondAnchor.href = "register.html";
    }
}

export function configListItensForAdmin() {
    const logoutLiAnchor = document.getElementById("double-state-li-one");
    logoutLiAnchor.addEventListener("click", doLogout);
    configHeaderListItens();
    console.log("Configurando itens de menu");
}

export function configHeaderListItens() {
    const listItensAnchors = document.querySelectorAll(".header__menu__link");
    
    listItensAnchors.forEach(anchor => {
        anchor.parentElement.addEventListener("click", () => {
            
            anchor.click();
        });
    });
}

