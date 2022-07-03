import React, {useCallback} from 'react';
import { LogoutOutlined, SettingOutlined} from '@ant-design/icons';
import {Avatar, Menu, Spin} from 'antd';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { useBaseStore } from '@/models/BaseStore';
import IconFont from '@/components/IconFont';
import { observer } from 'mobx-react';

export interface GlobalHeaderRightProps {
  menu?: boolean;
}


/**
 * 退出登录，并且将当前的 url 保存
 */
export const loginOut = async () => {
  sessionStorage.clear();
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = observer(({menu}) => {
  const {setCurrentUser,userInfo} = useBaseStore();
  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const {key} = event;
      if (key === 'logout') {
        setCurrentUser(undefined);
        loginOut();
        return;
      }
    },
    [],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!userInfo || !userInfo.name) {
    return loading;
  }

  const menuHeaderDropdown = (
    // @ts-ignore
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>

      {menu && (
        <Menu.Item key="info">
          <div style={{color: 'rgba(0,0,0,0.5)', fontWeight: 'bold'}}>
            {userInfo?.name}
          </div>
        </Menu.Item>
      )}
      {menu && <Menu.Divider/>}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined/>
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider/>}

      <Menu.Item key="logout">
        <LogoutOutlined/>
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
         <Avatar size="small" src={userInfo?.avatar || ''}/>
      </span>
    </HeaderDropdown>
  );
});

export default AvatarDropdown;
