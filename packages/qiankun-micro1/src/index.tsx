import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './config';
import { configHistory, QianKunParentProps } from './utils/history';

function render(props: QianKunParentProps) {
    const history = configHistory('/app/micro1', props);
    ReactDOM.render(
        <App history={history} />,
        props?.container ? props?.container.querySelector('#root') : document.querySelector('#root')
    );
}

if (!window.__POWERED_BY_QIANKUN__) {
    render({});
}

export async function bootstrap() {
    console.log('micro1 bootstrap');
}

export async function mount(props: any) {
    render(props);
}

export async function unmount(props: any) {
    const { container } = props;
    const node = container ? container.querySelector('#root') : document.querySelector('#root');
    if (node) {
        ReactDOM.unmountComponentAtNode(node);
    }
}
