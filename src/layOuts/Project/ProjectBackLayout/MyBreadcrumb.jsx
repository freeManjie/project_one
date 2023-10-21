import React from 'react'
import { Breadcrumb } from "antd";

const getNowMenu = (menuList, currentPath) => {
    for (let item of menuList) {
        if (item.key === currentPath) {
            return item;
        } else if (item.children) {
            for (let child of item.children) {
                if (child.key === currentPath) {
                    return item;
                }
            }
        }
    }
    return null;
}

export const MyBreadcrumb = (props) => {
    const { role, menuList, currentPath } = props
    if (currentPath === `/project/backHome`) {
        return <div style={ { height: 15 } }></div>
    } else {
        const nowMenu = getNowMenu(menuList, currentPath)
        return (
            <>
                {
                    nowMenu && !nowMenu?.children ?
                        <Breadcrumb className="pageRouter">
                            <Breadcrumb.Item style={ { color: "#1D66C9" } }>{ nowMenu?.icon }{ nowMenu?.label }</Breadcrumb.Item>
                        </Breadcrumb>
                        :
                        <Breadcrumb className="pageRouter">
                            <Breadcrumb.Item style={ { color: "#10A693" } }>{ nowMenu?.icon }{ nowMenu?.label }</Breadcrumb.Item>
                            <Breadcrumb.Item
                                style={ { color: "#00000073" } }>{ nowMenu?.children.find(child => child.key === currentPath).label }</Breadcrumb.Item>
                        </Breadcrumb>
                }
            </>
        );
    }
};

export default MyBreadcrumb;