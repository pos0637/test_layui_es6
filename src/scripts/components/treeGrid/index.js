
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
        this.layout = null;
    }

    setLayout(layout) {
        this.element.children('.Layout');
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
}

/**
 * DOM节点属性
 */
TreeGrid.filter = 'div.TreeTable';

/**
 * 依赖模块
 */
TreeGrid.imports = ['tree'];