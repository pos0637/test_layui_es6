
import BaseComponent from '../base';

/**
 * 菜单
 * 
 * @export
 * @class Menu
 * @extends {BaseComponent}
 */
export default class Menu extends BaseComponent {
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

        /** 
         * 是否可以刷新
         */
        this.refreshable = this.element.getAttr('refreshable', 'true') === 'true';
    }
}