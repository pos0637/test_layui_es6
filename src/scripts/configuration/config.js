
/** 
 * 配置
 */
$.config = {
    request: {
        view: {
            scheme: 'http',
            host: 'localhost',
            port: '8000',
            application: '',
            path: ''
        },
        server: {
            scheme: 'http',
            host: 'localhost',
            port: '8080',
            application: '',
            path: ''
        },
        response: {
            statusName: 'code',
            successCode: 200,
            msgName: 'message',
            dataName: 'data'
        }
    },
    paging: {
        pageSize: 20,
        limits: [10, 20, 30, 50, 100],
        request: {
            pageName: 'pageNum',
            pageSize: 'pageSize'
        },
        response: {
            statusName: 'code',
            successCode: 200,
            msgName: 'message',
            countName: 'total',
            dataName: 'data'
        }
    },
    upload: {
        url: 'file/upload',
        result: 'uploadFilePath',
        dataName: 'data'
    }
};