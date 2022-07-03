import { DesktopOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Divider, Menu } from 'antd';
import { observer } from 'mobx-react';
import React, { FC, useState } from 'react';
import cls from 'classnames';

import { ThemeEnum, useBaseStore } from '@/models/BaseStore';
import type { MenuProps } from 'antd';
import styles from './index.less';
import IconFont from '@/components/IconFont';
import productConfig from '@/config/product';
import hashHistory from '@/utils/hashHistory';

interface MenuItemProps {
    label: React.ReactNode;
    key: React.Key;
    icon?: React.ReactNode;
    children?: MenuItemProps[];
    type?: 'group';
}

// 支持远程数据返回
const list: MenuItemProps[] = [
    {
        key: '/app',
        label: '首页',
        icon: <PieChartOutlined />,
    },
    {
        key: '/app/micro1',
        label: 'micro1',
        icon: <DesktopOutlined />,
    },
    {
        key: '/app/micro2',
        label: 'micro2',
        icon: <DesktopOutlined />,
        children: [
            { key: '/app/micro2/micro2-1', label: 'micro2-1', icon: <DesktopOutlined /> },
            { key: '/app/micro2/micro2-2', label: 'micro2-2', icon: <DesktopOutlined /> },
        ],
    },
];

const SideMenus: FC = observer(() => {
    const { theme, collapsed, toggleTheme, toggleCollapsed } = useBaseStore();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        const path = e.key;
        if (path) {
            hashHistory(path);
        }
    };

    return (
        <div className={styles.sideMenus}>
            <Menu
                className={styles.menu}
                onClick={onClick}
                mode="inline"
                theme={theme}
                inlineCollapsed={collapsed}
                items={list}
            />

            <div className={cls(styles.operation, { [styles.dark]: theme === ThemeEnum.DARK })}>
                <div
                    onClick={() => {
                        ConfigProvider.config({
                            theme: theme === ThemeEnum.DARK ? productConfig.theme.light : productConfig.theme.dark,
                        });
                        toggleTheme();
                    }}
                    className={styles.icon}
                >
                    {theme === ThemeEnum.LIGHT ? <IconFont type="icon-moon" /> : <IconFont type="icon-sun" />}
                </div>
                <div onClick={toggleCollapsed} className={styles.icon}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </div>
            </div>
        </div>
    );
});

export default SideMenus;
