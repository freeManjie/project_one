import { Menu } from "antd"
import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { projectMenus } from "./menuList"
import "./index.scss"
import {getToken} from "../../utils/login";

const { SubMenu } = Menu

function LeftSider(props) {
    const { } = props
    const [openKeys, setOpenKeys] = useState([`/project/backHome`])
    let currentPath = useLocation().pathname
    const menuList = projectMenus;
    const rootSubmenuKeys = menuList.map(x => x.key)
    const getMenuNodes = (menuList) => {
        return menuList?.reduce((pre, item) => {
            if (!item.hidden) {
                if (!item.children) {
                    pre.push((
                        <Menu.Item
                            key={ item.key }
                            onClick={ (it) => setOpenKeys(it.keyPath) }
                            icon={ item.icon }
                        >
                            <Link to={ item.key }>
                                <span>{ item.label }</span>
                            </Link>
                        </Menu.Item>
                    ))
                } else {
                    pre.push((
                        <SubMenu
                            key={ item.key }
                            title={ item.label }
                            icon={ item.icon }
                        >
                            { getMenuNodes(item.children) }
                        </SubMenu>
                    ))
                }
            }
            return pre
        }, [])
    }
    console.log(getToken(), 'token')
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys)
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
        }
    }

    return (
        <>
            <div className="leftMenu">
                <Menu selectedKeys={ [currentPath] } openKeys={ openKeys } onOpenChange={ onOpenChange } mode="inline" theme="dark">
                    { getMenuNodes(menuList) }
                </Menu>
            </div>
        </>
    )
}

export default LeftSider