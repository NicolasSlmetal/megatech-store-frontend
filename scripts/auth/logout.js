export function doLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    window.location.href = "/index.html";
}

export function verifyIfErrorIsAuth(error, redirect = "index.html"){
    if (error.status == 401 || error.status == 403) {
        localStorage.removeItem("token");
        window.location.href = redirect;
        return;
    }
}