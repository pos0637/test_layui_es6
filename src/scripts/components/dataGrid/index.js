
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
    }

    render() {
        let height = this.element.attr('height');
        if (!height)
            height = 'full-135';

        let params = {};
        // 获取查询数据
        if (this.toolbar)
            $.extend(params, this._getToolbarData(this.toolbar), params);


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
}