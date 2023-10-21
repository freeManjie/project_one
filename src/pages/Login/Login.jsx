import React, { useState, useEffect, useRef } from "react";
import { LockOutlined, UserOutlined }  from "@ant-design/icons";
import { LoginFormPage, ProConfigProvider, ProFormCaptcha, ProForm, ProFormText, ModalForm } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import "./Login.scss"
import axios from 'axios'
import {useHistory} from "react-router-dom";
import {setToken, getToken} from "../../utils/login";
import {isEmpty} from "../../utils/utils";

export const Login = () => {
    const [form] = Form.useForm()
    const history = useHistory()
    const [loginInfo, setLoginInfo] = useState()

    useEffect(() => {
        const accessToken = getToken()
        if (!isEmpty(accessToken)) {
            history.push("/project/backHome")
        } else {
            history.push("/login")
        }
    }, [])

    const submitRegister = (values) => {
        let params = { ...values }
        axios.post('api/auth/register', params).then(res => {
            console.log(res, '返回信息')
            message.success(res.message)
        }).catch((err) => {
            console.log(err, '错误参数')
        })
    }

    const submitLogin = (values) => {
        let params = { ...values }
        axios.post('api/auth/login', params).then(res => {
            if(res.data.data.access_token) {
                setToken(
                    res.data.data.access_token,
                    res.data.data.username,
                    res.data.data.token_type
                )
                console.log(res, '返回信息')
                message.success(res.data.message)
                history.push("/project/backHome")
            } else {
                message.error(res.data.message)
                return
            }
        }).catch((err) => {
            console.log(err, '错误参数')
        })
        // history.push("/project/backHome")
    }

    const registerModal = <ModalForm title={'注册账号'}
    trigger={<Button type={'primary'}>注册账号</Button>}
    form={ form } autoFocusFirstInput
    submitter={{
        searchConfig: {
            submitText: '确认注册',
            resetText: '取消',
        },
    }}onVisibleChange={(e) => {
        if(!e) {
            form.resetFields()
        }
    }}
    onFinish={async (values) => {
        await submitRegister(values);
        return true;
    }}>
        <ProFormText
            width="md"
            name="username"
            label="用户昵称"
            tooltip="最长为 24 位"
            placeholder="请输入用户昵称"
            rules={[
                {
                    required: true,
                    message: '请输入用户昵称！',
                },
            ]}
        />
        <ProFormText
            width="md"
            name="name"
            label="姓名"
            // tooltip="最长为 24 位"
            placeholder="请输入用户姓名"
            rules={[
                {
                    required: true,
                    message: '请输入用户姓名！',
                },
            ]}
        />

        <ProFormText.Password
            width="md"
            name="password"
            label="密码"
            placeholder="请输入密码"
            rules={[
                {
                    required: true,
                    message: '请输入密码！',
                },
            ]}
        />
        <ProFormText.Password
            width="md"
            name="confirm_pwd"
            label="确认密码"
            placeholder="请再次输入密码"
            // rules={[
            //     {
            //         required: true,
            //         message: '请确认密码！',
            //     },
            // ]}
            rules={[
                ({getFieldValue})=>({
                    validator(rule, value){
                        if(!value || getFieldValue('password') === value){
                            return Promise.resolve()
                        }
                        return Promise.reject("两次密码输入不一致")
                    }
                })
            ]}
        />
        <ProFormText
            width="md"
            name="mail"
            label="邮箱"
            placeholder="请输入邮箱"
            rules={[
                {
                    required: true,
                    message: '请输入邮箱！',
                },
            ]}
        />
    </ModalForm>

    return (
        <>
            <div className='login-login'>
                <div className={'login-content'}>
                    <LoginFormPage
                        onFinish={ submitLogin }
                        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
                        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                        title="欢迎使用"
                        containerstyle={{
                            backgroundColor: 'rgba(0, 0, 0,0.65)',
                            backdropFilter: 'blur(4px)',
                        }}
                        subTitle="AiForu系统"
                    >
                        <>
                            <ProFormText
                                name={'username'}
                                fieldProps={{
                                    size: 'large',
                                    prefix: (
                                        <UserOutlined className={'prefixIcon'} />
                                    ),
                                }}
                                placeholder={'用户名: admin'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名!',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: (
                                        <LockOutlined className={'prefixIcon'} />
                                    ),
                                }}
                                placeholder={'密码: 123456'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                ]}
                            />
                        </>
                        <div style={{ float: 'right', marginBottom: '12px' }}>
                            { registerModal }
                        </div>
                    </LoginFormPage>
                </div>

            </div>
        </>
    )
}