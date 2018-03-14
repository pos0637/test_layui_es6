
import BaseComponent from '../base';

/**
 * 表单
 * 
 * @export
 * @class Form
 * @extends {BaseComponent}
 */
export default class Form extends BaseComponent {
    constructor(props) {
        super(props);

        /** 
         * 请求地址
         */
        this.url = this.element.attr('url');

        /** 
         * 是否自动加载
         */
        this.autoload = this.element.getAttr('autoload', 'true') === 'true';
    }

    render() {
        // let params = $.getUrlParam();
    }
}

/**
 * DOM节点属性
 */
Form.filter = 'form';

/**
 * 依赖模块
 */
Form.imports = ['form'];