
import $ from 'jQuery';
import BaseComponent from '../base';

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
         * 表格布局
         */
        this.layout = this._getLayout();
    }

    render() {
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

        this.element.empty();
        layui.treeGird({
            elem: this.element,
            nodes: data,
            layout: this.layout
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

            cols.push(col);
        });

        return cols;
    }
}

/**
 * DOM节点属性
 */
TreeGrid.filter = 'div.TreeTable';

/**
 * 依赖模块
 */
TreeGrid.imports = ['tree'];