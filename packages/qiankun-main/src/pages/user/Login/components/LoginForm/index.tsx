import { LockTwoTone, MailTwoTone, MobileTwoTone, UserOutlined } from '@ant-design/icons';
import { Alert, Form, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormText } from '@ant-design/pro-form';
import { useHistory } from 'react-router-dom';
import styles from '../index.less';
import userApi from '@/services/user';
import { SESSION_STORAGE_AUTH_KEY, SESSION_STORAGE_AUTH_TOKEN_KEY } from '@/utils/constants';
import { LoginLabel } from '../..';

const LoginMessage: React.FC<{
    content: string;
}> = ({ content }) => (
    <Alert
        style={{
            marginBottom: 24,
        }}
        message={content}
        type="error"
        showIcon
    />
);

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const goto = (data: any) => {
    // const {query} = history.location;
    // const {redirect} = query as { redirect: string };
    // window.location.href = redirect || '/welcome';
};

const LoginForm: React.FC<{ label: LoginLabel; changeLabel: (label: LoginLabel) => void }> = ({
    label,
    changeLabel,
}) => {
    const [submitting, setSubmitting] = useState(false);
    const [userLoginState, setUserLoginState] = useState<any>({});
    const [type, setType] = useState<string>('account');

    const [form] = Form.useForm();
    const history = useHistory();
    const handleSubmit = async (values: any) => {
        setSubmitting(true);
        try {
            // 登录
            const { usernameLogin: username, passwordLogin: password, captchaLogin: code } = values;
            const response = await userApi.login({ username, password, code });
            if (response?.status === 'ok') {
                message.success(response?.msg);
                // 保存登录信息
                sessionStorage.setItem(SESSION_STORAGE_AUTH_KEY, JSON.stringify(response?.data));
                sessionStorage.setItem(SESSION_STORAGE_AUTH_TOKEN_KEY, response?.token);
                history.push('/app');
                return;
            }
            // 如果失败去设置用户错误信息
            setUserLoginState(response?.msg);
        } catch (error) {
            message.error('登录失败，请重试！');
        }
        setSubmitting(false);
    };

    const { status, msg, data } = userLoginState;
    return (
        <ProForm
            form={form}
            submitter={{
                searchConfig: {
                    submitText: '登录',
                },
                render: (_, dom) => dom.pop(),
                submitButtonProps: {
                    loading: submitting,
                    size: 'large',
                    style: {
                        width: '100%',
                    },
                },
            }}
            onFinish={async (values) => {
                handleSubmit(values);
            }}
        >
            <Tabs activeKey={type} onChange={setType}>
                <Tabs.TabPane key="account" tab="账户密码登录" />
                <Tabs.TabPane key="mobile" tab="手机号登录" />
            </Tabs>

            {status === 'error' && type === 'account' && (
                <LoginMessage
                    content={
                        (msg as string)?.replace(/{}/, data?.num + '')
                    }
                />
            )}
            {type === 'account' && (
                <>
                    <ProFormText
                        name="usernameLogin"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={styles.prefixIcon} />,
                        }}
                        placeholder='用户名'
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="passwordLogin"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockTwoTone className={styles.prefixIcon} />,
                        }}
                        placeholder="密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                    />
                </>
            )}

            {status === 'error' && type === 'mobile' && <LoginMessage content="验证码错误" />}
            {type === 'mobile' && (
                <>
                    <ProFormText
                        fieldProps={{
                            size: 'large',
                            prefix: <MobileTwoTone className={styles.prefixIcon} />,
                        }}
                        name="mobile"
                        placeholder="手机号"
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号！',
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: '手机号格式错误！',
                            },
                        ]}
                    />
                    <ProFormCaptcha
                        fieldProps={{
                            size: 'large',
                            prefix: <MailTwoTone className={styles.prefixIcon} />,
                        }}
                        captchaProps={{
                            size: 'large',
                        }}
                        placeholder="请输入验证码"
                        captchaTextRender={(timing, count) => (timing ? `${count} ${'获取验证码'}` : '获取验证码')}
                        name="captcha"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码！',
                            },
                        ]}
                        onGetCaptcha={async (mobile) => {
                            // const result = await getFakeCaptcha(mobile);
                            // if (result === false) {
                            //   return;
                            // }
                            message.success('获取验证码成功！验证码为：1234');
                        }}
                    />
                </>
            )}
            <div
                style={{
                    marginBottom: 10,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <a
                    style={{
                        float: 'right',
                    }}
                    onClick={() => {
                        changeLabel('register');
                    }}
                >
                    注册账户
                </a>
                <a
                    style={{
                        float: 'right',
                    }}
                    onClick={() => {
                    }}
                >
                    忘记密码
                </a>
            </div>
        </ProForm>
    );
};

export default LoginForm;
