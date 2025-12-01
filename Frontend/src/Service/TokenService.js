export function storeToken(tokenValue){
    localStorage.setItem("token", tokenValue);
    console.log(tokenValue);
}

export function getToken(){
    return localStorage.getItem("token");
}

export function removeToken(){
    localStorage.removeItem("token");
}

// Helper to manually get header if not using an interceptor
export function getAuthHeader(){
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}