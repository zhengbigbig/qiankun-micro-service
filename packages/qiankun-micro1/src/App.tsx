import CustomComponent from '@c/CustomComponent';
import 'antd/dist/antd.css';
import { History } from 'history';
import React from 'react';
// import Logo from '../public/logo.png';
import './global.less';

interface Props {
    history: History;
}
function App(props: Props) {
    return (
        <div className="app">
            <CustomComponent />
            <h1>React脚手架</h1>
            {/* <img src={Logo} alt="" style={{ width: 500, height: 500 }} /> */}
            <h4>欢迎使用React脚手架，请在package.json中配置好相关依赖，</h4>
            <h4>支持TypeScript</h4>
        </div>
    );
}

export default App;
