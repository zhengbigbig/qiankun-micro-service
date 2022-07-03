import React, { FC, useCallback, useRef } from 'react';
import styles from './index.less';
import SideMenus from '../SideMenus';
import { observer } from 'mobx-react';
import cls from 'classnames';
import { useLocation, useHistory } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeEnum, useBaseStore } from '@/models/BaseStore';
import RightContent from '../RightContent';
import productConfig from '@/config/product';

interface Props {
    /**
     * 子应用是否带sidebar和header
     */
    withLayout?: boolean;
    children?: React.ReactNode;
}
// 如果url路径中有该表示，则代表子应用全屏展示
const FULLSCREEN_PATH_KEYWORD = 'fullscreen__';
// 如果url路径中有改字段，则表示不带菜单栏
const WITHOUT_MENUS_PATH_KEYWORD = 'withoutMenus__';

const BasicLayout: FC<Props> = observer((props) => {
    const { children } = props;
    const { theme,collapsed } = useBaseStore();
    const location = useLocation();
    const withLayout = location.pathname.indexOf(FULLSCREEN_PATH_KEYWORD) === -1;
    const withMenus = location.pathname.indexOf(WITHOUT_MENUS_PATH_KEYWORD) === -1;

    const history = useHistory();
    const handleNavigate = useCallback(() => {
        history.push('/app');
    }, []);

    return (
        <>
            <div className={styles.basicLayout}>
                <HelmetProvider>
                    <Helmet>
                        <link rel="icon" type="image/x-icon" href={productConfig?.logo} />
                        <title>{productConfig.name}</title>
                        {/*<meta name="description" content={}/>*/}
                    </Helmet>
                </HelmetProvider>
                {withLayout && withMenus && (
                    <aside
                        className={cls({
                            [styles.sidebar]: true,
                            [styles.collapsed]: collapsed,
                            [styles.dark]: theme === ThemeEnum.DARK,
                            [styles.light]: theme === ThemeEnum.LIGHT,
                        })}
                    >
                        <SideMenus />
                    </aside>
                )}
                <div
                    className={cls({
                        [styles.mainContainer]: withLayout,
                        [styles.collapsed]: collapsed,
                        [styles.fullScreenContainer]: !withLayout,
                        [styles.withOutMenusContainer]: !withMenus,
                    })}
                >
                    {withLayout && (
                        <div className={styles.header}>
                            <span className={styles.leftHeader} onClick={handleNavigate}>
                                <img className={styles.logo} src={productConfig?.logo} />
                                <h1 className={styles.name}>{productConfig?.name}</h1>
                            </span>
                            <div className={styles.rightHeader}>
                                <RightContent withMenus={withMenus} />
                            </div>
                        </div>
                    )}
                    <div className={styles.content}>{children}</div>
                </div>
            </div>
        </>
    );
});

export default BasicLayout;
