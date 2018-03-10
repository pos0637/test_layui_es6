
import BaseComponent from '../base';

/**
 * 基础表格
 * 
 * @export
 * @class BaseGrid
 * @extends {BaseComponent}
 */
export default class BaseGrid extends BaseComponent {
    constructor(props) {
        super(props);

        /** 
         * 请求地址
         */
        this.url = this.element.attr('url');

        /** 
         * 工具栏
         */
        this.toolbar = $(this.element.attr('toolbar'));

        /** 
         * 是否可以刷新
         */
        this.refreshable = this.element.attr('refreshable') || true;
    }

    /**
     * 获取查询数据
     * 
     * @param {any} toolbar 工具条
     * @returns 查询数据
     * @memberof BaseGrid
     */
    _getToolbarData(toolbar) {
        let elements = toolbar.find('input,select,textarea');
        let data = {};

        $.each(elements, function (i, element) {
            if (!element.name)
                return;

            if (/^checkbox|radio$/.test(element.type) && !element.checked)
                return;

            let value = element.value;
            if (element.type === 'checkbox') {
                if (data[element.name])
                    value = data[element.name] + ',' + value;
            }

            if (value)
                data[element.name] = value;
        });

        return data;
    }

    /**
     * 绑定事件
     * 
     * @memberof BaseGrid
     */
    _bindEvent() {
        this._bindToolbarButtonEvent();
        this._bindGridButtonEvent();
    }

    /**
     * 绑定工具条按钮事件
     *
     * @memberof BaseGrid
     */
    _bindToolbarButtonEvent() {
        if (!this.toolbar)
            return;

        let _this = this;
        let elements = this.toolbar.find('.layui-btn');
        $.each(elements, function () {
            let botton = $(this);
            let method = botton.attr('lay-event');
            if (!method)
                return;

            botton.off('click');
            botton.on('click', function () {
                if (method === 'query')
                    _this._onQueryButtonClick($(this));
                else if (method === 'create')
                    _this._onCreateButtonClick($(this));
                else if (method === 'edit')
                    _this._onEditButtonClick($(this));
                else if (method === 'delete')
                    _this._onDeleteSelectedButtonClick($(this));
            });
        });
    }

    /**
     * 绑定表格内部按钮事件
     * 
     * @memberof BaseGrid
     */
    _bindGridButtonEvent() {
        let _this = this;
        let elements = this.element.find('.layui-btn');
        $.each(elements, function () {
            let botton = $(this);
            let method = botton.attr('lay-event');
            if (!method)
                return;

            botton.off('click');
            botton.on('click', function () {
                if (method === 'open')
                    _this._onOpenButtonClick($(this));
                else if (method === 'create')
                    _this._onCreateButtonClick($(this));
                else if (method === 'edit')
                    _this._onEditButtonClick($(this));
                else if (method === 'delete')
                    _this._onDeleteButtonClick($(this));
            });
        });
    }

    /**
     * 查询按钮点击事件
     * 
     * @param {any} sender 组件
     * @memberof BaseGrid
     */
    _onQueryButtonClick(sender) {
    }

    /**
     * 查看按钮点击事件
     * 
     * @param {any} sender 组件
     * @memberof BaseGrid
     */
    _onOpenButtonClick(sender) {
    }

    /**
     * 创建按钮点击事件
     * 
     * @param {any} sender 组件
     * @memberof BaseGrid
     */
    _onCreateButtonClick(sender) {
    }

    /**
     * 编辑按钮点击事件
     * 
     * @param {any} sender 组件
     * @memberof BaseGrid
     */
    _onEditButtonClick(sender) {
    }

    /**
     * 删除按钮点击事件
     * 
     * @param {any} sender 组件
     * @memberof BaseGrid
     */
    _onDeleteButtonClick(sender) {
    }

    /**
     * 删除选中项目按钮点击事件
     * 
     * @param {any} sender 组件
     * @memberof BaseGrid
     */
    _onDeleteSelectedButtonClick(sender) {
    }
}