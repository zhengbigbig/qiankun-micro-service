import { SESSION_STORAGE_AUTH_KEY, SESSION_STORAGE_AUTH_TOKEN_KEY } from '@/utils/constants';
import navigate from '@/utils/navigate';
import { makeAutoObservable, runInAction } from 'mobx';
import React from 'react';

// 本地缓存上次选择的主题
export const LOCAL_STORE_THEME_KEY = 'theme';

/**
 * 菜单主题
 */
export enum ThemeEnum {
    DARK = 'dark',
    LIGHT = 'light',
}

export interface CurrentUser {
    id: string;
    name: string;
    avatar: string;
}

class BaseStore {
    theme: ThemeEnum = ThemeEnum.LIGHT;
    collapsed = false;
    authenticated = false;
    userInfo: Partial<CurrentUser> = {};
    token: string = '';

    constructor() {
        makeAutoObservable(this);
        this.initTheme();
    }

    initTheme = () => {
        const theme = sessionStorage.getItem(LOCAL_STORE_THEME_KEY);
        if (theme) {
            this.theme = theme as ThemeEnum;
        }
    };

    initAuthentication = () => {
        const token = sessionStorage.getItem(SESSION_STORAGE_AUTH_TOKEN_KEY);
        console.log('token', token);
        console.log('this.authenticated', this.authenticated);
        if (token) {
            this.authenticated = true;
            this.token = token;
            this.userInfo = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_AUTH_KEY) || '{}');
        } else {
            // TODO: 这里可以跳转到登录页面
            navigate.redirectToLogin();
            return
        }
    };
    setCurrentUser = (loginData: any) => {
        this.userInfo = loginData?.data;
        this.token = loginData?.token;
        this.authenticated = true;
        sessionStorage.setItem(SESSION_STORAGE_AUTH_KEY, JSON.stringify(loginData?.data));
        sessionStorage.setItem(SESSION_STORAGE_AUTH_TOKEN_KEY, JSON.stringify(loginData?.data));
    };
    toggleTheme = () => {
        const theme = this.theme === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
        this.theme = theme
        sessionStorage.setItem(LOCAL_STORE_THEME_KEY, theme);
    };
    toggleCollapsed = () => {
        this.collapsed = !this.collapsed;
    }
}

export default BaseStore;

export const BaseStoreContext = React.createContext<BaseStore | null>(null);
export const useBaseStore = () => {
    const store = React.useContext(BaseStoreContext);
    if (!store) {
        throw new Error('useBaseStore must be used within a StoreProvider.');
    }
    return store;
};
