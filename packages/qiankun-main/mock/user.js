/* mock/list.js */
// https://github.com/jaywcjlove/mocker-api
module.exports = {
    'POST /api/login': (req, res) => {
        return res.json({
            status: 'ok',
            code: 0,
            token: 'admin',
            data: {
                name: 'admin',
                avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                id: '00000001',
                email: '',
            },
        });
    },
};
