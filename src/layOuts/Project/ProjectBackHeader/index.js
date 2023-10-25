import { Menu, Dropdown, Image, Badge, Row, Col, Button, notification, Space } from "antd"
import { DownOutlined, BellOutlined } from "@ant-design/icons"
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import "./index.scss"
import { logout, getLoginUser } from '@utils/login.js'
import avatar from '../../../assets/images/header/header.png'

function Header() {
    const history = useHistory()
    const [logOut, setLogOut] = useState(false)

    useEffect(() => {
        if (logOut) {
            logout()
            return () => {
                setLogOut(false)
            }
        }
    }, [logOut])


    const menu = (
        <Menu>
            <Menu.Item>
                <div>
                    {getLoginUser()}
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => { setLogOut(true) }} >
                    退出账户
                </div>
            </Menu.Item>
        </Menu>
    )

    const getWeek = (value) => {
        switch (value) {
            case '1':
                return '周一'
            case '2':
                return '周二'
            case '3':
                return '周三'
            case '4':
                return '周四'
            case '5':
                return '周五'
            case '6':
                return '周六'
            case '7':
                return '周日'
            default:
                break
        }
    }

    return (
        <>
            <div className="project-back-header">
                <h1>AiForu</h1>
                <div className="account-menu">
                    <div style={{ width: 20 }}></div>
                    <Image src={avatar} preview={false} />
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" style={{ marginRight: 24 }} onClick={(e) => e.preventDefault()}>
                            <DownOutlined />
                        </a>
                    </Dropdown>
                </div>
            </div>
        </>
    )
}

export default Header