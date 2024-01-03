const loginUser = 'User'
const tokenKey = 'accessToken';
const refreshToken = 'refreshToken'
export const setToken = (access_token, userName, refresh_token) => {
    localStorage.setItem(tokenKey, access_token);
    localStorage.setItem(loginUser, userName);
    localStorage.setItem(refreshToken, refresh_token + "");
    // refreshLoginUserRes();
}

export const getLoginUser = () => {
    return localStorage.getItem(loginUser);
}

export const getToken = () => {
    return localStorage.getItem(tokenKey);
}

export const removeToken = () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(refreshToken);
}

export const logout = () => {
    localStorage.clear()
    window.location.href = '/'
}

export default { getToken, getLoginUser, removeToken, logout }