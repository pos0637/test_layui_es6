
import BaseComponent from '../base';
import Request from '../../misc/request';

/**
 * 树状表格
 * 
 * @export
 * @class TreeGrid
 * @extends {BaseComponent}
 */
export default class TreeGrid extends BaseComponent {
    constructor(props) {
        super(props);

        /** 
         * 请求地址
         */
        this.url = this.element.attr('url');

        /** 
         * 查询表单
         */
        this.queryForm = this.element.attr('query');

        /** 
         * 表格布局
         */
        this.layout = this._getLayout();
    }

    render() {
        // TODO: delete it
        let data = [
            {
                id: 1,
                level: 1,
                name: 'test1',
                path: 'xxxxx',
                open: true,
                children: [
                    { id: 3, parentId: 1, level: 2, name: 'test1_1', path: 'xxxxx', open: true },
                    { id: 4, parentId: 1, level: 2, name: 'test1_2', path: 'xxxxx', open: true }
                ]
            },
            {
                id: 2,
                level: 1,
                name: 'test2',
                open: true,
                path: 'xxxxx',
                children: [
                    { id: 5, parentId: 2, level: 2, name: 'test2_1', path: 'xxxxx', open: true },
                    { id: 6, parentId: 2, level: 2, name: 'test2_2', path: 'xxxxx', open: true }
                ]
            },
        ];

        let params = {};
        if (this.queryForm)
            $.extend(params, this._getFormData($(this.queryForm)), params);

        new Request(this.url, params).get((result) => {
            this.element.children('.Content').empty();
            layui.treeGird({
                elem: this.element.children('.Content'),
                nodes: result.data,
                layout: this.layout
            });
        }, () => {
            this.element.children('.Content').empty();
            layui.treeGird({
                elem: this.element.children('.Content'),
                nodes: data,
                layout: this.layout
            });
            // TODO: fix style
            this.element.after('无数据');
        });
    }

    /**
     * 获取布局
     * 
     * @returns 布局
     * @memberof TreeGrid
     */
    _getLayout() {
        let layout = this.element.children('.Layout');
        if (!layout)
            return [];

        let cols = [];

        $.each(layout.children(), function () {
            let node = $(this);
            let col = {};

            if (node.attr('name'))
                col['name'] = node.attr('name');

            if (node.attr('treeNodes'))
                col['treeNodes'] = node.attr('treeNodes');

            if (node.attr('style'))
                col['style'] = node.attr('style');

            if (node.attr('headerClass'))
                col['headerClass'] = node.attr('headerClass');

            if (node.attr('colClass'))
                col['colClass'] = node.attr('colClass');

            if (node.attr('templet'))
                col['templet'] = node.attr('templet');

            col['render'] = function (row) {
                let templet = col['templet'];
                if (templet)
                    return layui.laytpl($(templet).html() || '').render(row);
                else
                    return row[col['name']];
            };

            cols.push(col);
        });

        return cols;
    }

    /**
     * 获取表单数据
     * 
     * @param {any} form 表单
     * @returns 表单数据
     * @memberof TreeGrid
     */
    _getFormData(form) {
        let elements = form.find('input,select,textarea');
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
}

/**
 * DOM节点属性
 */
TreeGrid.filter = 'div.TreeTable';

/**
 * 依赖模块
 */
TreeGrid.imports = ['tree', 'laytpl'];