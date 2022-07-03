declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.less';

declare interface MsgData {
    msg?: string;
    status?: string;
    token?: string;
    data?: any;
}

declare const __ENV__: 'dev'|'pre'|'prod';
declare const __MICRO_APP__: { [key: string]: string };