
import BaseGrid from '../baseGrid';
import Request from '../../misc/request';
import Popup from '../../misc/popup';

/**
 * 树状表格
 * 
 * @export
 * @class TreeGrid
 * @extends {BaseGrid}
 */
export default class TreeGrid extends BaseGrid {
    constructor(props) {
        super(props);

        /** 
         * 表格布局
         */
        this.layout = this._getLayout();
    }

    render() {
        // TODO: delete it
        let data = [
            {
                id: 0,
                name: 'test1',
                path: 'xxxxx',
                children: [
                    { id: 3, name: 'test1_1', path: 'xxxxx', open: true },
                    { id: 4, name: 'test1_2', path: 'xxxxx', open: true }
                ]
            },
            {
                id: 1,
                name: 'test2',
                path: 'xxxxx',
                children: [
                    { id: 5, name: 'test2_1', path: 'xxxxx', open: true },
                    { id: 6, name: 'test2_2', path: 'xxxxx', open: true }
                ]
            },
        ];

        let params = {};
        // 获取查询数据
        if (this.toolbar)
            $.extend(params, this._getToolbarData(this.toolbar), params);

        // 请求数据
        if (this.autoload) {
            new Request(this.url, params).get((result) => {
                this.element.children('.layui-content').empty();
                layui.treeGird({
                    elem: this.element.children('.layui-content'),
                    spreadable: true,
                    nodes: result.data,
                    layout: this.layout
                });
                layui.form.render();
                this._bindEvent();
            }, () => {
                this.element.children('.layui-content').empty();
                layui.treeGird({
                    elem: this.element.children('.layui-content'),
                    spreadable: true,
                    nodes: data,
                    layout: this.layout
                });
                // TODO: fix style
                this.element.children('.layui-content').append('无数据');
                layui.form.render();
                this._bindEvent();
            });
        }
    }

    /**
     * 获取布局
     * 
     * @returns 布局
     * @memberof TreeGrid
     */
    _getLayout() {
        let layout = $(this.element.attr('layout'));
        if (!layout)
            return [];

        let cols = [];

        $.each(layout.children(), function () {
            let node = $(this);
            let col = {};

            if (node.attr('name'))
                col['name'] = node.attr('name');

            if (node.attr('field'))
                col['field'] = node.attr('field');

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
                    return row[col['field']];
            };

            cols.push(col);
        });

        return cols;
    }

    _onQueryButtonClick() {
        if (this.refreshable)
            this.render();
    }

    _onOpenButtonClick(sender) {
        let url = sender.attr('url');
        let title = sender.attr('topTitle');
        let width = sender.attr('topWidth');
        let height = sender.attr('topHeight');
        let isMaximize = sender.attr('isMaximize') && (sender.attr('isMaximize') === 'true');

        Popup.show(title, width, height, url, isMaximize);
    }

    _onCreateButtonClick(sender) {
        let url = sender.attr('url');
        let title = sender.attr('topTitle');
        let width = sender.attr('topWidth');
        let height = sender.attr('topHeight');
        let isMaximize = sender.attr('isMaximize') && (sender.attr('isMaximize') === 'true');

        Popup.show(title, width, height, url, isMaximize, () => {
            if (this.refreshable)
                this.render();
        });
    }

    _onEditButtonClick(sender) {
        let url = sender.attr('url');
        let title = sender.attr('topTitle');
        let width = sender.attr('topWidth');
        let height = sender.attr('topHeight');
        let isMaximize = sender.attr('isMaximize') && (sender.attr('isMaximize') === 'true');

        Popup.show(title, width, height, url, isMaximize, () => {
            if (this.refreshable)
                this.render();
        });
    }

    _onDeleteButtonClick(sender) {
        let handler = () => {
            new Request(sender.attr('url')).delete(() => {
                if (this.refreshable)
                    this.render();
            });
        };

        if (sender.attr('isConfirm'))
            Popup.confirm('询问', sender.attr('confirmMsg') && '是否确定操作选中的数据?', handler);
        else
            handler();
    }
}

/**
 * DOM节点属性
 */
TreeGrid.filter = 'div.TreeTable';

/**
 * 依赖模块
 */
TreeGrid.imports = ['tree', 'form', 'laytpl'];