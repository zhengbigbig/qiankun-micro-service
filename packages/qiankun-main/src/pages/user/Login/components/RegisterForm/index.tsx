import { Alert, Form, Input, message, Popover, Progress, Select } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import styles from '../index.less';

import { PASSWORD_VALIDATION, TEL_VALIDATION, USERNAME_VALIDATION } from '@/utils/validate';
import ProFormCaptcha from '@ant-design/pro-form/lib/components/Captcha';
import { LockTwoTone, MailTwoTone, UserOutlined } from '@ant-design/icons/lib';
import ProForm from '@ant-design/pro-form';
import ProFormText from '@ant-design/pro-form/lib/components/Text';
import { LoginLabel } from '../..';
import userApi from '@/services/user';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const passwordStatusMap = {
    ok: <div className={styles.success}>强度：强</div>,
    pass: <div className={styles.warning}>强度：中</div>,
    poor: <div className={styles.error}>强度：太短</div>,
};

const passwordProgressMap: {
    ok: 'success';
    pass: 'normal';
    poor: 'exception';
} = {
    ok: 'success',
    pass: 'normal',
    poor: 'exception',
};

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

const RegisterForm: FC<{ label: LoginLabel; changeLabel: (label: LoginLabel) => void }> = ({ label, changeLabel }) => {
    const [submitting, setSubmitting] = useState(false);
    const [userRegisterState, setUserRegisterState] = useState<MsgData>({});

    const [visible, setVisible]: [boolean, any] = useState(false);
    const [prefix, setPrefix]: [string, any] = useState('86');
    const [popover, setPopover]: [boolean, any] = useState(false);

    const confirmDirty = false;
    const [form] = Form.useForm();

    const { status, msg: registerErrorMessage } = userRegisterState;

    const getPasswordStatus = () => {
        const value = form.getFieldValue('password');
        if (value && value.length > 11) {
            return 'ok';
        }
        if (value && value.length > 9) {
            return 'pass';
        }
        return 'poor';
    };

    const handleSubmit = async (values: any) => {
        setSubmitting(true);
        try {
            // 登录
            const response = await userApi.createUser(values);
            if (response?.status === 'ok') {
                message.success(response?.msg);
                if (form) {
                    form.resetFields();
                }
                changeLabel('login');
                return;
            }
            // 如果失败去设置用户错误信息
            setUserRegisterState(response);
        } catch (error) {
            message.error('注册失败，请重试！');
        }
        setSubmitting(false);
    };

    const checkConfirm = (_: any, value: string) => {
        const promise = Promise;
        if (value && value !== form.getFieldValue('password')) {
            return promise.reject('两次输入的密码不匹配!');
        }
        return promise.resolve();
    };

    const checkPassword = (_: any, value: string) => {
        const promise = Promise;
        // 没有值的情况
        if (!value) {
            setVisible(!!value);
            return promise.reject('请输入密码！');
        }
        // 有值的情况
        if (!visible) {
            setVisible(!!value);
        }
        setPopover(!popover);
        if (value.length < 8) {
            return promise.reject('8~16位密码，大小写字母、数字组合！');
        } else if (value.length > 15) {
            return promise.reject('密码最多不超过15位!');
        } else if (!PASSWORD_VALIDATION.test(value)) {
            return promise.reject('密码必须包含大写、小写字母和数字!');
        }
        if (value && confirmDirty) {
            form.validateFields(['password2']);
        }
        return promise.resolve();
    };

    const changePrefix = (value: string) => {
        setPrefix(value);
    };
    const renderPasswordProgress = () => {
        const value = form.getFieldValue('password');
        const passwordStatus = getPasswordStatus();
        return value && value.length ? (
            <div className={styles[`progress-${passwordStatus}`]}>
                <Progress
                    status={passwordProgressMap[passwordStatus]}
                    className={styles.progress}
                    strokeWidth={6}
                    percent={value.length * 10 > 100 ? 100 : value.length * 10}
                    showInfo={false}
                />
            </div>
        ) : null;
    };

    useEffect(() => {
        if (label !== 'register') {
            setVisible(false);
        }
        // setServiceAgreementVisible(showLogin === 2 && !!defaultConfig?.is_service_agreement);
    }, [label]);

    return (
        <div>
            <h3 style={{ fontSize: '18px' }}>注册账户</h3>
            <ProForm
                form={form}
                submitter={{
                    searchConfig: {
                        submitText: '注册',
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
                {status === 'error' && (
                    <LoginMessage
                        content={
                            //   intl.formatMessage({
                            //   id: 'pages.login.accountLogin.errorMessage',
                            //   defaultMessage: 'registerErrorMessage',
                            // })
                            registerErrorMessage + ''
                        }
                    />
                )}
                <ProFormText
                    name="username"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className={styles.prefixIcon} />,
                    }}
                    placeholder="用户名"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                        {
                            pattern: USERNAME_VALIDATION,
                            message: '3~18位大小写字母、数字组合',
                        },
                    ]}
                />
                <Popover
                    getPopupContainer={(node) => {
                        if (node && node.parentNode) {
                            return node.parentNode as HTMLElement;
                        }
                        return node;
                    }}
                    content={
                        visible && (
                            <div style={{ padding: '4px 0' }}>
                                {passwordStatusMap[getPasswordStatus()]}
                                {renderPasswordProgress()}
                                <div style={{ marginTop: 10 }}>8~16位密码，大小写字母、数字组合</div>
                            </div>
                        )
                    }
                    overlayStyle={{ width: 240 }}
                    placement="right"
                    visible={visible}
                >
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockTwoTone className={styles.prefixIcon} />,
                        }}
                        placeholder="8~16位密码，大小写字母、数字组合"
                        rules={[
                            {
                                required: true,
                                message: '8~16位密码，大小写字母、数字组合',
                            },
                            {
                                validator: checkPassword,
                            },
                        ]}
                    />
                </Popover>
                <ProFormText.Password
                    name="rePassword"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockTwoTone className={styles.prefixIcon} />,
                    }}
                    placeholder="确认密码"
                    rules={[
                        {
                            required: true,
                            message: '请再次输入密码！',
                        },
                        {
                            validator: checkConfirm,
                        },
                    ]}
                />
                <ProFormText
                    name="email"
                    fieldProps={{
                        size: 'large',
                        prefix: <MailTwoTone className={styles.prefixIcon} />,
                    }}
                    placeholder="邮箱"
                    rules={[
                        {
                            required: true,
                            message: '请输入邮箱!',
                        },
                        {
                            type: 'email',
                            message: '邮箱地址格式错误！',
                        },
                    ]}
                />
                <InputGroup compact>
                    <Select size="large" value={prefix} onChange={changePrefix} style={{ width: '30%' }}>
                        <Option value="86">+86</Option>
                        <Option value="87">+87</Option>
                    </Select>
                    <FormItem
                        style={{ width: '70%' }}
                        name="tel"
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号！',
                            },
                            {
                                pattern: TEL_VALIDATION,
                                message: '手机号格式错误！',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="手机号" />
                    </FormItem>
                </InputGroup>
                <ProFormCaptcha
                    fieldProps={{
                        size: 'large',
                        prefix: <MailTwoTone className={styles.prefixIcon} />,
                    }}
                    captchaProps={{
                        size: 'large',
                    }}
                    placeholder="请输入验证码"
                    captchaTextRender={(timing, count) => (timing ? `${count} 获取验证码` : '获取验证码')}
                    name="captcha"
                    rules={[
                        {
                            required: true,
                            message: '请输入验证码！',
                        },
                    ]}
                    onGetCaptcha={async () => {
                        const values = await form.validateFields(['tel']);
                        if (!values?.tel) {
                            return;
                        }
                    }}
                />
                <div
                    style={{
                        marginBottom: 24,
                        paddingBottom: 10,
                    }}
                >
                    <a
                        style={{
                            float: 'right',
                        }}
                        onClick={() => {
                            changeLabel('login');
                            if (form) {
                                form.resetFields();
                            }
                        }}
                    >
                        使用已有账户登录
                    </a>
                </div>
            </ProForm>
        </div>
    );
};
export default RegisterForm;
