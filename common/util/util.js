/**
 * 获取Url参数
 * @param {*} name
 */
export const getQueryString = name => {
    let obj = {}
    let start = location.search.indexOf('?') + 1
    let str = location.search.substr(start)
    let arr = str.split('&')
    for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=')
        obj[arr2[0]] = arr2[1]
    }
    return obj[name]
}
