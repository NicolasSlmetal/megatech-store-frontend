export function doLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    window.href = "/index.html";
}