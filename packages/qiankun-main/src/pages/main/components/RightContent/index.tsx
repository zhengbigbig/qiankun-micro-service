import { Space, Tag, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import Avatar, { loginOut } from './AvatarDropdown';
import styles from './index.less';
import _ from 'lodash';
import { useBaseStore } from '@/models/BaseStore';
import IconFont from '@/components/IconFont';
import { observer } from 'mobx-react';

export type SiderTheme = 'light' | 'dark';

const ENVTagColor = {
    dev: 'orange',
    pre: 'green',
    prod: '#87d068',
};

const GlobalHeaderRight: React.FC<{ withMenus: boolean }> = observer((props) => {
    const { theme } = useBaseStore();

    let className = styles.right;

    if (theme === 'dark') {
        className = `${styles.right}  ${styles.dark}`;
    }

    return (
        <Space size={12} className={className}>
            {props.withMenus && (
                <>
                    <Avatar menu />
                    <Tooltip placement="bottom" title="使用帮助">
                        <span className={styles.action}>
                            <IconFont className={styles.icon} type="icon-help" />
                        </span>
                    </Tooltip>
                    {__ENV__ && (
                        <span>
                            <Tag color={ENVTagColor[__ENV__]}>{__ENV__}</Tag>
                        </span>
                    )}
                </>
            )}
        </Space>
    );
});
export default GlobalHeaderRight;
