import { EventEmitter } from "events";
// 无关组件的通信
const eventBus = new EventEmitter();
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

/* 节流 */
const throttle = (callback, wait = 2000) => {
    let timer = null;
    let startTime;
    return function () {
        const ctx = this;
        const args = arguments;
        const now = +new Date();
        if (startTime && now < startTime + wait) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                startTime = now;
                callback.apply(ctx, args);
            }, wait);
        } else {
            startTime = now;
            callback.apply(ctx, args);
        }
    }
}

/* 防抖 */
const debounce = (method, delay) => {
    let timer = null;
    return function () {
        let self = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            method.apply(self, args);
        }, delay);
    }
}

export { throttle, debounce }