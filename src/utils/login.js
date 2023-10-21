const loginAdmin = 'ADMIN'
const loginUser = 'User'
const tokenKey = 'AI_Token';
const tokenType = 'User'
export const setToken = (access_token, userName, token_type) => {
    localStorage.setItem(tokenKey, access_token);
    localStorage.setItem(loginUser, userName);
    localStorage.setItem(tokenType, token_type + "");
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
    localStorage.removeItem(tokenType);
}

export const logout = () => {
    localStorage.clear()
    window.location.href = '/'
}

export default { getToken, getLoginUser, removeToken }