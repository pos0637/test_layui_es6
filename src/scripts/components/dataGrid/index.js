
import BaseGrid from '../baseGrid';

/**
 * 数据表格
 * 
 * @export
 * @class DataGrid
 * @extends {BaseGrid}
 */
export default class DataGrid extends BaseGrid {
    constructor(props) {
        super(props);

        // 设置过滤器
        if ($.isEmpty(this.element.attr('lay-filter')))
            this.element.attr('lay-filter', this.id);

        /** 
         * 数据表格
         */
        this.datagrid = null;
    }

    render() {
        let params = {};
        // 获取查询数据
        if (!$.isEmpty(this.querybar))
            $.extend(params, this._getQuerybarData(this.querybar), params);

        let height = this.element.getAttr('height', 'full-135');
        let paging = this.element.getAttr('paging', 'true');
        let pageSize = this.element.getAttr('pageSize', $.config.paging.pageSize);

        // 请求数据
        if (this.autoload) {
            this.datagrid = layui.table.render({
                id: this.id,
                elem: this.element,
                url: $.url(this.url),
                where: params,
                page: paging === 'true',
                method: 'get',
                height: height,
                limits: $.config.paging.limits,
                limit: pageSize,
                cols: this.layout,
                data: [],
                request: {
                    pageName: $.config.paging.request.pageName,
                    limitName: $.config.paging.request.pageSize
                },
                response: {
                    statusName: $.config.paging.response.statusName,
                    statusCode: $.config.paging.response.successCode,
                    msgName: $.config.paging.response.msgName,
                    countName: $.config.paging.response.countName,
                    dataName: $.config.paging.response.dataName
                }
            });
        }
        else {
            this.datagrid = layui.table.render({
                id: this.id,
                elem: this.element,
                page: paging === 'true',
                height: height,
                limits: $.config.paging.limits,
                limit: pageSize,
                cols: this.layout,
                data: [],
                request: {
                    pageName: $.config.paging.request.pageName,
                    limitName: $.config.paging.request.pageSize
                },
                response: {
                    statusName: $.config.paging.response.statusName,
                    statusCode: $.config.paging.response.successCode,
                    msgName: $.config.paging.response.msgName,
                    countName: $.config.paging.response.countName,
                    dataName: $.config.paging.response.dataName
                }
            });
        }

        // 绑定事件
        this._bindEvent();

        // 绑定排序事件
        layui.table.on('sort(' + this.id + ')', (obj) => {
            layui.table.reload(this.id, { initSort: obj, where: { sortField: obj.field, sortType: obj.type } });
        });
    }

    _getLayout() {
        let layout = $(this.element.attr('layout'));
        if (!layout)
            return [];

        let rows = [];
        let cols = [];

        $.each(layout.children(), function () {
            let element = $(this);
            let col = {};

            // 处理换行
            let type = element.attr('type');
            if (type === 'br') {
                rows.push(cols);
                cols = [];
                return;
            }

            $.assignAttr(col, element, 'align', 'fixed', 'style', 'colspan', 'rowspan');
            if ($.isEmpty(element.attr('toolbar'))) // 非工具栏列
                $.assignAttr(col, element, 'type', 'field', 'title', 'width', 'sort', 'templet', 'checkbox', 'edit', 'event', 'LAY_CHECKED');
            else // 工具栏列
                $.assignAttr(col, element, 'width', 'title');

            cols.push(col);
        });

        rows.push(cols);

        return rows;
    }

    _onQueryButtonClick() {
        if (this.refreshable)
            this.render();
    }
}

/**
 * DOM节点属性
 */
DataGrid.filter = 'table.DataGrid';

/**
 * 依赖模块
 */
DataGrid.imports = ['table', 'form', 'laytpl'];