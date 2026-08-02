export function getToken() {
    return localStorage.getItem("token");
}

export function isLoggedIn() {
    return getToken() !== null;
}

export function getUserRole() {

    const token = getToken();

    if (!token) return null;

    try {

        const payload = JSON.parse(atob(token.split(".")[1]));

        return payload.role;

    } catch {

        return null;
    }
}