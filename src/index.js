import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from '@store';
import './index.css';
import App from './App';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from "antd";

ReactDOM.render(
    <AppProvider>
        <ConfigProvider locale={ zhCN }>
            <App />
        </ConfigProvider>
    </AppProvider>,
    document.getElementById('root')
);