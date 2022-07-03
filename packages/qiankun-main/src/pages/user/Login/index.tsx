import LoginForm from '@/pages/user/Login/components/LoginForm';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Particles from './components/Particles';
import RegisterForm from './components/RegisterForm';
import styles from './components/index.less';
import productConfig from '@/config/product';

export type LoginLabel = 'login' | 'register';

const Login: React.FC<{}> = () => {
    const [label, setLabel] = useState<LoginLabel>('login');
    return (
        <div className={styles.container}>
            <HelmetProvider>
                <Helmet>
                    <link rel="icon" type="image/x-icon" href={productConfig?.logo} />
                    <title>
                        {label === 'login' ? '登录-' : '忘记密码-'}
                        {productConfig.name}
                    </title>
                    {/*<meta name="description" content={}/>*/}
                </Helmet>
            </HelmetProvider>
            <div className={styles.top}>
                <div className={styles.header}>
                    <Link to="/login">
                        {!!productConfig?.logo ? <img alt="logo" className={styles.logo} src={productConfig?.logo} /> : null}
                        <span className={styles.title}>{productConfig.name}</span>
                    </Link>
                </div>
            </div>
            <div className={styles.contentWrapper}>
                <div
                    className={styles.content}
                    style={
                        productConfig?.loginBackground
                            ? { backgroundImage: `url(${productConfig.loginBackground})`, backgroundSize: 'cover' }
                            : {}
                    }
                >
                    <Particles />
                    <div className={styles.right}>
                        <>
                            <div
                                className={classNames(styles.signIn, {
                                    [styles['inactive-sx']]: label !== 'login',
                                    [styles['active-sx']]: label === 'login',
                                })}
                            >
                                <div className={styles.main}>
                                    <LoginForm label={label} changeLabel={(label) => setLabel(label)} />
                                </div>
                            </div>
                            <div
                                className={classNames(styles.signUp, {
                                    [styles['active-dx']]: label === 'register',
                                    [styles['inactive-dx']]: label !== 'register',
                                })}
                            >
                                <div className={styles.main}>
                                    <RegisterForm
                                        label={label}
                                        changeLabel={(label) => {
                                            setLabel(label);
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.copyright}>
                            推荐使用Chrome72+及其以上版本的浏览器。推荐分辩率为1680*1050或者更高。
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
