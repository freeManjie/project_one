export const isEmpty = (obj) => {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return true
    }
    return false
}

export const randomColors = () => {//十六进制颜色随机
    const r = Math.floor(Math.random()*256)
    const g = Math.floor(Math.random()*256)
    const b = Math.floor(Math.random()*256)
    const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
    return color
}