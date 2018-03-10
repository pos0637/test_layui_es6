
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
        let pageSize = this.element.getAttr('pageSize', '20');

        this.datagrid = layui.table.render({
            id: this.id,
            elem: this.element,
            url: this.url,
            where: params,
            page: paging === 'true',
            method: 'get',
            height: height,
            limits: [10, 20, 30, 50, 100],
            limit: pageSize,
            cols: this.layout,
            data: [],
            request: { pageName: 'pageNum', limitName: 'pageSize' },
            response: { statusName: 'code', statusCode: 200, msgName: 'message', countName: 'data.total', dataName: 'data.list' }
        });
    }

    _getLayout() {
        let layout = $(this.element.attr('layout'));
        if (!layout)
            return [];

        let rows = [];
        let cols = [];

        $.each(layout.children(), function () {
            let node = $(this);
            let col = {};

            // 处理换行
            let type = node.attr('type');
            if (type === 'br') {
                rows.push(cols);
                cols = [];
                return;
            }

            $.assignAttr(col, node, 'align', 'fixed', 'style', 'colspan', 'rowspan');
            if (!$.isEmpty(node.attr('toolbar'))) // 非工具栏列
                $.assignAttr(col, node, 'type', 'field', 'title', 'width', 'sort', 'templet', 'checkbox', 'edit', 'event', 'LAY_CHECKED');
            else // 工具栏列
                $.assignAttr(col, node, 'width', 'title');

            cols.push(col);
        });

        rows.push(cols);

        return rows;
    }
}