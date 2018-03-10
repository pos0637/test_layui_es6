
/**
 * 提示信息
 * 
 * @export
 * @class Hint
 */
export default class Hint {
    static showErrorMsg(content) {
        top.layer.msg(content, { icon: 2, time: 5000 });
    }
}

/**
 * 依赖模块
 */
Hint.imports = ['layer'];