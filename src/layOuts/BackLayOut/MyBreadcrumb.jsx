import React from 'react'
import { Breadcrumb } from 'antd';
import { createIcon } from '../../utils/IconUtil';

const findMenuItemByPath = (menuItems, currentPath) => {
    for (const menuItem of menuItems) {
        if (menuItem.path === currentPath) {
            return menuItem;
        } else if (menuItem.children) {
            const foundItem = findMenuItemByPath(menuItem.children, currentPath);
            if (foundItem) {
                return menuItem;
            }
        }
    }
    return null;
};


const MyBreadcrumb = (props) => {
    const { role, routerMenus, currentPath } = props;
    const isBackHome = currentPath === `/${role}` || currentPath === `/${role}/backHome`;
    const nowMenu = findMenuItemByPath(routerMenus, currentPath);
    const nowMenuChildren = nowMenu?.children;
    const icon = nowMenu?.meta.icon;
    const title = nowMenu?.meta.title;

    if (isBackHome) {
        return <div style={{ height: 15 }}></div>;
    }

    return (
        <Breadcrumb className='pageRouter'>
            <span className='pageName'>
                {nowMenuChildren ? nowMenuChildren?.find(child => child.path === currentPath).meta.title : title}
            </span>
            <Breadcrumb.Item style={{ color: '#16939E' }}>
                <span className='pageIcon'>{createIcon(icon)}</span>
                <span className='pageLabel' style={{ margin: '0px 0px 0px 8px' }}>{title}</span>
            </Breadcrumb.Item>
            {
                nowMenuChildren &&
                (
                    <Breadcrumb.Item style={{ color: '#00000073' }}>
                        <span className='pageLabel'>
                            {nowMenuChildren?.find(child => child.path === currentPath).meta.title}
                        </span>
                    </Breadcrumb.Item>
                )
            }
        </Breadcrumb>
    )
}

export default MyBreadcrumb