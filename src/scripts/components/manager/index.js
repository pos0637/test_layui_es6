
import Tracker from '../../misc/tracker';
import Popup from '../../misc/popup';
import Hint from '../../misc/hint';
import Request from '../../misc/request';
import BaseGrid from '../baseGrid';
import DataGrid from '../dataGrid';
import TreeGrid from '../treeGrid';

/**
 * 组件管理器
 * 
 * @export
 * @class Manager
 */
export default class Manager {
    /**
     * 初始化
     * 
     * @static
     * @memberof Manager
     */
    static initialize() {
        // TODO: auto generated
        let classes = [Popup, Hint, Request, BaseGrid, DataGrid, TreeGrid];
        let modules = [];

        // 获取所有依赖模块
        for (let i = 0; i < classes.length; ++i) {
            let clazz = classes[i];
            let imports = clazz.imports ? clazz.imports : [];
            modules = modules.concat(imports);
        }

        modules = $.unique(modules);
        Tracker.trace('modules: ' + modules);

        // 加载所有依赖模块
        layui.use(modules, () => {
            Tracker.trace('layui is ready');
            let components = [];
            for (let i = 0; i < classes.length; ++i) {
                let clazz = classes[i];
                let filter = clazz.filter ? clazz.filter : null;
                if (!filter)
                    continue;

                // 创建组件
                let elements = $(filter);
                $(elements).each((index, element) => {
                    let component = new clazz({
                        id: element.id,
                        element: $('#' + element.id)
                    });
                    Manager.components[element.id] = component;
                    components.push(component);
                });
            }

            Tracker.trace('components is ready');
            for (let i = 0; i < components.length; ++i) {
                let component = components[i];
                component.render();
            }

            Tracker.trace('components render finish');
        });
    }
}

/** 
 * 组件列表
 */
Manager.components = [];

export function initialize() {
    Manager.initialize();
}