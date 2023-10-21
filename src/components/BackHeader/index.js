import { Menu, Dropdown, Image, Badge, Avatar } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./index.scss";
import { logout } from '@utils/login.js'

function Header() {
    const history = useHistory();
    const [logOut, setLogOut] = useState(false);


    useEffect(() => {
        if (logOut) {
            logout()
            return () => {
                setLogOut(false);
            };
        }
    }, [logOut]);

    const menu = (
        <Menu>
            <Menu.Item>
                <div onClick={() => { setLogOut(true); }} >
                    退出账户
                </div>
            </Menu.Item>
        </Menu>
    );

    const goHome = (e) => {
        history.push("/home");
    };

    return (
        <>
            <div className="back-header">
                <h1>头部文件</h1>
                <div className="account-menu">
                    <div style={{ width: 20 }}></div>
                    <Avatar size={32} icon={<UserOutlined />} className="pointer" />
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" style={{marginRight: 10}} onClick={(e) => e.preventDefault()}>
                            {localStorage.getItem("AIO_Login_User")} <DownOutlined />
                        </a>
                    </Dropdown>
                </div>
            </div>

        </>
    );
}

export default Header;