
/**
 * 获取属性
 * 
 * @param {any} attributeName 属性名称
 * @param {any} defaultValue 默认值
 * @returns 属性
 */
$.fn.getAttr = function (attributeName, defaultValue) {
    return typeof (this.attr(attributeName)) === 'undefined' ? defaultValue : this.attr(attributeName);
};