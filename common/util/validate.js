/**
 * 验证是不是正整数
 * @param val
 * @returns {boolean}
 */
export const isInteger = val => {
    let isInteger = RegExp(/^[0]$|^[1-9][0-9]*$/);
    return isInteger.test(val);
};


/**
 * 验证邮箱
 * @param val
 * @returns {boolean}
 */

export const isMail = (val) => {
    let isEmail = RegExp(/^([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/);
    return isEmail.test(val)
};

/**
 * 非负数
 * @param val
 * @returns {boolean}
 */
export const isPositiveNumber = (val) => {
    let isRight = RegExp(/^\+?(:?(:?\d+\.\d+)|(:?\d+))$/);
    return isRight.test(val)
};

/**
 * 验证联系方式
 * @param phoneNumber
 * @returns {boolean}
 */
export const isTelephone = phoneNumber => {
    let isMobile = new RegExp(/^0\d{2,3}-?\d{7,8}$/);
    let isPhoneNumber = new RegExp(/^1\d{10}$/);
    return isMobile.test(phoneNumber) || isPhoneNumber.test(phoneNumber);
};


/**
 * 验证邮编
 * @param val
 * @returns {boolean}
 */
export const isZip = (val) => {
    let isRight = RegExp(/^[0-9]+$/);
    return val && val.length === 6 && isRight.test(val)
};