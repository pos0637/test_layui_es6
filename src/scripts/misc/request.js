
import Hint from './hint';

/**
 * 请求
 * 
 * @export
 * @class Request
 */
export default class Request {
    constructor(url, params) {
        this.url = url;
        this.params = params;
    }

    get(success, error, complete) {
        return this.do('get', success, error, complete);
    }

    post(success, error, complete) {
        return this.do('post', success, error, complete);
    }

    push(success, error, complete) {
        return this.do('push', success, error, complete);
    }

    delete(success, error, complete) {
        return this.do('delete', success, error, complete);
    }

    /**
     * 执行请求
     * 
     * @param {string} method 请求方式
     * @param {function} success 请求成功处理函数
     * @param {function} error 请求失败处理函数
     * @param {function} complete 请求完成处理函数
     * @memberof Request
     */
    do(method, success, error, complete) {
        let layerId = layer.load();

        $.ajax({
            url: this.url,
            type: method,
            async: true,
            data: this.params,
            dataType: 'json',
            success: (result) => {
                if (!this.checkResult(result)) {
                    error && error(result);
                    return;
                }

                this.success && this.success(result);
            },
            error: (XMLHttpRequest) => {
                this.onError(XMLHttpRequest.responseText);
                error && error(XMLHttpRequest.responseText);
            },
            complete: () => {
                layer.close(layerId);
                complete && complete();
            }
        });
    }

    /**
     * 检查返回结果是否正确
     * 
     * @param {any} result 返回结果
     * @returns 是否正确
     * @memberof Request
     */
    checkResult(result) {
        return (result && (result.code = 200));
    }

    /**
     * 错误处理函数
     * 
     * @param {string} result 结果
     * @memberof Request
     */
    onError(result) {
        if (result && (result.length > 0)) {
            try {
                let message = JSON.parse(result)['message'];
                Hint.showErrorMsg('请求异常:' + message);
            }
            catch (e) {
                Hint.showErrorMsg('请求异常!');
            }
        }
        else {
            Hint.showErrorMsg('请求异常!');
        }
    }
}

/**
 * 依赖模块
 */
Request.imports = ['layer'];