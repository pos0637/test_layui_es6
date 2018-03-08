
import PropTypes from 'prop-types';

/**
 * 基础组件
 * 
 * @export
 * @class BaseComponent
 */
export default class BaseComponent {
    constructor(props) {
        /**
         * DOM节点索引
         */
        this.id = props.id;

        /**
         * DOM节点
         */
        this.element = props.element;
    }
}

BaseComponent.propTypes = {
    id: PropTypes.string,
    element: PropTypes.element
};