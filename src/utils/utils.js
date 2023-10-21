export const isEmpty = (obj) => {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return true
    }
    return false
}