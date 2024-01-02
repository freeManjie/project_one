import React, { useState, useEffect, useRef } from "react";
import {LockOutlined, SafetyOutlined, UserOutlined, RedoOutlined } from "@ant-design/icons";
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
    const [captcha, setCaptcha] = useState()

    useEffect(() => {
        getCaptcha()
        const accessToken = getToken()
        if (!isEmpty(accessToken)) {
            history.push("/project/backHome")
        } else {
            history.push("/login")
        }
    }, [])

    const getCaptcha = () => {
        axios.get(`api/v1/auth/captchaHandle?d=${'d'}`, {responseType: 'blob'}).then(res => {
            const myBlob = new window.Blob([res.data], { type: 'image/png' })
            const captcha = window.URL.createObjectURL(myBlob)
            setCaptcha(captcha)
        })
    }

    const submitRegister = (values) => {
        let params = { ...values }
        axios.post('api/v1/auth/register', params).then(res => {
            console.log(res, '返回信息')
            message.success(res.message)
        }).catch((err) => {
            console.log(err, '错误参数')
        })
    }

    const submitLogin = (values) => {
        history.push("/project/backHome")
        //TODO
        // let params = { ...values, d: 'd' }
        // axios.post('api/v1/auth/login', params).then((res) => {
        //     if (res.data.data == null) {
        //         message.error(res.data.message)
        //         getCaptcha()
        //         return;
        //     }
        //     if(res.data.data.access_token) {
        //         setToken(
        //             res.data.data.access_token,
        //             params.username,
        //             res.data.data.refresh_token
        //         )
        //         history.push("/project/backHome")
        //         message.success(res.data.message)
        //         location.reload();
        //     } else {
        //         getCaptcha()
        //         message.error("登录失败，请检查用户名密码!")
        //     }
        // }).catch((err) => {
        //       getCaptcha()
        //       message.error("登录失败，请检查用户名密码!")
        // })
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
            label="账号"
            tooltip="最长为 24 位"
            placeholder="请输入账号"
            rules={[
                {
                    required: true,
                    message: '请输入账号！',
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
        {/*<ProFormText.Password*/}
        {/*    width="md"*/}
        {/*    name="confirm_pwd"*/}
        {/*    label="确认密码"*/}
        {/*    placeholder="请再次输入密码"*/}
        {/*    // rules={[*/}
        {/*    //     {*/}
        {/*    //         required: true,*/}
        {/*    //         message: '请确认密码！',*/}
        {/*    //     },*/}
        {/*    // ]}*/}
        {/*    rules={[*/}
        {/*        ({getFieldValue})=>({*/}
        {/*            validator(rule, value){*/}
        {/*                if(!value || getFieldValue('password') === value){*/}
        {/*                    return Promise.resolve()*/}
        {/*                }*/}
        {/*                return Promise.reject("两次密码输入不一致")*/}
        {/*            }*/}
        {/*        })*/}
        {/*    ]}*/}
        {/*/>*/}
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
                        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                        title="欢迎使用"
                        // containerstyle={{
                        //     backgroundColor: 'rgba(0, 0, 0,0.65)',
                        //     backdropFilter: 'blur(4px)',
                        // }}
                        subTitle="AiForu系统"
                    >
                        <>
                            <ProFormText
                                name={'username'}
                                fieldProps={{
                                    size: 'large',
                                    prefix: (<UserOutlined className={'prefixIcon'} />),
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
                                    prefix: (<LockOutlined className={'prefixIcon'} />),
                                    autoComplete: 'off'
                                }}
                                placeholder={'密码: 123456'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                ]}
                            />
                            <ProFormCaptcha
                                name="captcha"
                                fieldProps={{
                                    size: 'large',
                                    prefix: (<SafetyOutlined className={'prefixIcon'} />),
                                }}
                                captchaProps={{
                                    size: 'large',
                                }}
                                placeholder={'请输入验证码'}
                                captchaTextRender={(timing, count) => {
                                    // if (timing) {
                                    //     return `${count} ${'获取验证码'}`;
                                    // }
                                    // return captcha ? <img src={captcha} style={{width: "80%", borderRadius: 4, height: '120%' }} alt='请刷新'/> : <RedoOutlined />
                                    return <img src={captcha} style={{width: "80%", borderRadius: 4, height: '120%' }} alt='请刷新'/>
                                }}
                                onGetCaptcha={async () => {
                                    getCaptcha()
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码！',
                                    },
                                ]}/>
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