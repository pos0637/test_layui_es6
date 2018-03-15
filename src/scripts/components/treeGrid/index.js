
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
        if (!$.isEmpty(this.querybar))
            $.extend(params, this._getQuerybarData(this.querybar), params);

        // 空数据处理函数
        let handler = (content) => {
            this.element.empty();
            layui.treeGird({
                elem: this.element,
                spreadable: true,
                nodes: data,
                layout: this.layout
            });
            this.element.append(content);
            layui.form.render();
            this._bindEvents();
        };

        // 请求数据
        if (this.autoload) {
            new Request(this.url, params).get((result) => {
                this.element.empty();
                layui.treeGird({
                    elem: this.element,
                    spreadable: true,
                    nodes: result[$.config.request.response.dataName],
                    layout: this.layout
                });
                layui.form.render();
                this._bindEvents();
            }, () => {
                handler('<div class="layui-none">数据接口请求异常</div>');
            });
        }
        else {
            handler('<div class="layui-none">无数据</div>');
        }
    }

    _getLayout() {
        let layout = $(this.element.attr('layout'));
        if (!layout)
            return [];

        let cols = [];

        $.each(layout.children(), function () {
            let element = $(this);
            let col = {};

            $.assignAttr(col, element, 'name', 'field', 'treeNodes', 'style', 'headerClass', 'colClass', 'templet');

            col['render'] = function (row) {
                let templet = col['templet'];
                if (!$.isEmpty(templet))
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
        let params = $.assignAttr({}, sender, 'url', 'topTitle', 'topWidth', 'topHeight', 'isMaximize');
        params.isMaximize = $.isEmpty(params.isMaximize) ? false : params.isMaximize === 'true';

        Popup.show(params.topTitle, params.topWidth, params.topHeight, params.url, params.isMaximize);
    }

    _onCreateButtonClick(sender) {
        let params = $.assignAttr({}, sender, 'url', 'topTitle', 'topWidth', 'topHeight', 'isMaximize');
        params.isMaximize = $.isEmpty(params.isMaximize) ? false : params.isMaximize === 'true';

        Popup.show(params.topTitle, params.topWidth, params.topHeight, params.url, params.isMaximize, () => {
            if (this.refreshable)
                this.render();
        });
    }

    _onEditButtonClick(sender) {
        let params = $.assignAttr({}, sender, 'url', 'topTitle', 'topWidth', 'topHeight', 'isMaximize');
        params.isMaximize = $.isEmpty(params.isMaximize) ? false : params.isMaximize === 'true';

        Popup.show(params.topTitle, params.topWidth, params.topHeight, params.url, params.isMaximize, () => {
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

        if (sender.getAttr('isConfirm', 'false') === 'true')
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