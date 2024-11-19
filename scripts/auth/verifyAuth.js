

export async function verifyAuth() {
    const token = localStorage.getItem("token");
    if (!token) return false;
    return true;
}

export function getAuthorizationHeader() {
    const token = localStorage.getItem("token");
    return {
        "Authorization": `Bearer ${token}`
    };
}


export async function checkAuthForAdmin() {
    const authenticated = await verifyAuth();
    if (!authenticated) {
        window.location.href = "index.html";
    }
}