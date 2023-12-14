import React, { useState, useEffect, useRef } from "react";
import {LockOutlined, SafetyOutlined, UserOutlined} from "@ant-design/icons";
import { LoginFormPage, ProConfigProvider, ProFormCaptcha, ProForm, ProFormText, ModalForm } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import "./Login.scss"
import axios from 'axios'
import {useHistory} from "react-router-dom";
import {setToken, getToken} from "../../utils/login";
import {isEmpty} from "../../utils/utils";

export const Login = () => {
    const userNameRef = useRef()
    const passwordRef = useRef()
    const captchCodeRef = useRef()
    const [form] = Form.useForm()
    const history = useHistory()
    const [captcha, setCaptcha] = useState()
    const [tabKey, setTabKey] = useState("login")

    return (
            <div className='login-warp'>
                {/*<h1 className={"login-title"}>平台</h1>*/}
                {/*<div className={"login-title"}>平台</div>*/}
                {tabKey == "login" ? <div className="login-container">
                    <div className={"heading"}>Ai Four</div>
                    <div className={"heading"}>欢 迎 使 用</div>
                    <div className={"login-info"}>
                        <div>
                            <image/>
                            <input className={"login-input"} name={"username"} ref={userNameRef} type={"text"}
                                   placeholder={"请输入用户名"}/>
                        </div>
                        <div>
                            <image/>
                            <input className={"login-input"} name={"password"} ref={passwordRef} type={"password"}
                                   placeholder={"请输入密码"}/>
                        </div>
                        <div>
                            <image/>
                            <input className={"login-input"} ref={captchCodeRef} type={"text"}
                                   placeholder={"请输入验证码"}/>
                        </div>
                        <button className={"login-button"}>登 录</button>
                    </div>
                    <span className="sign-span"><a onClick={() => setTabKey("sign")}>注 册 账 号</a></span>
                </div> : <div className="sign-container">
                    <div className={"heading"}>Ai Four</div>
                    <div className={"heading"}>注 册 账 号</div>
                    <div className={"login-info"}>
                        <div>
                            <image/>
                            <input className={"login-input"} name={"username"} ref={userNameRef} type={"text"}
                                   placeholder={"请输入用户名"}/>
                        </div>
                        <div>
                            <image/>
                            <input className={"login-input"} name={"password"} ref={passwordRef} type={"text"}
                                   placeholder={"请输入账号"}/>
                        </div>
                        <div>
                            <image/>
                            <input className={"login-input"} ref={captchCodeRef} type={"text"}
                                   placeholder={"请输入密码"}/>
                        </div>
                        <div>
                            <image/>
                            <input className={"login-input"} ref={captchCodeRef} type={"email"}
                                   placeholder={"请输入邮箱"}/>
                        </div>
                        <button className={"login-button"}>注 册</button>
                    </div>
                    <span className="sign-span"><a onClick={() => setTabKey("login")}>返 回 登 录</a></span>
                </div>}
            </div>
    )
}