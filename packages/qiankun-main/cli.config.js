module.exports = {
    proxy: (env) => {
        const isDev = env !== 'pre';
        return {
            '/': isDev ? 'http://baidu.com/dev' : 'http://baidu.com/pre',
        };
    },
    output: {
        publicPath: '/app',
    },
    devServer: {
        port: 3000,
        host:'localhost',
    },
    env: {
        __ENV__: (env) => {
            return {
                dev: 'dev',
                pre: 'pre',
                prod: 'prod',
            }[env];
        },
        __MICRO_APP__: (env) => {
            if (env !== 'prod') {
                return {
                    micro1: 'http://localhost:5001',
                };
            }
            return {
                micro1: '/app/micro1/',
            };
        },
    },
};
