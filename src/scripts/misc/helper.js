
/**
 * 对象是否为空
 * 
 * @param {any} object 对象
 * @returns 是否为空
 */
$.isEmpty = function (object) {
    return (typeof (object) === 'undefined') || (object === null);
};

/**
 * 对象是否为非空字符串
 * 
 * @param {any} object 对象
 * @returns 是否为非空字符串
 */
$.isNotBlank = function (object) {
    return (!$.isEmpty(object) && (object !== ''));
};

/**
 * 将元素属性赋值给集合
 * 
 * @param {any} map 集合
 * @param {any} element 元素
 * @param {any} ...attrs 属性名称
 * @returns 集合
 */
$.assignAttr = function (map, element, ...attrs) {
    for (let i = 2; i < arguments.length; ++i) {
        let attr = arguments[i];
        let value = element.attr(attr);
        if (!$.isEmpty(value))
            map[attr] = value;
    }

    return map;
};

/**
 * 获取属性
 * 
 * @param {any} attributeName 属性名称
 * @param {any} defaultValue 默认值
 * @returns 属性
 */
$.fn.getAttr = function (attributeName, defaultValue) {
    return $.isEmpty(this.attr(attributeName)) ? defaultValue : this.attr(attributeName);
};