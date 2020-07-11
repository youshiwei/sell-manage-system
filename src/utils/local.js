/**
 * 操作本地存储
 * created by youshiwei on July 11, 2020
 */
export default {
    get(key) {
        return JOSON.parse(localStorage.getItem(key))
    },
    set(key, val) {
        localStorage.setItem(key, JSON.stringify(val))
    },
    remove(key) {
        localStorage.removeItem(key)
    },
    clear() {
        localStorage.clear()
    }
}