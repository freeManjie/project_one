import React, { useState } from "react";
import { Layout, Row, Col, Image } from "antd";
import NoteHeader from "../../components/BackHeader";
import LeftSider from "../../components/BackLeftSider";
import {projectMenus} from "../../components/BackLeftSider/menuList";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import MyBreadcrumb from './MyBreadcrumb.jsx'
import './index.scss'

const { Header, Sider, Content } = Layout;

function BackLayout(props) {
    const { role } = props
    const [collapsed, setCollapsed] = useState(false);
    let currentPath = useLocation().pathname;
    const menuList = projectMenus;

    const switchLayout = () => {
        return (
            <Col className="flex-auto flex-collapsed">
                {/*<PageRoutes />*/}
            </Col>
        );
    };

    const toggle = () => {
        setCollapsed(!collapsed)
    }

    return (
        <>
            <Layout className="provider-layouts" style={{ height: "100vh" }}>
                {/*左边菜单栏区域*/}
                <Sider trigger={null} collapsible collapsed={collapsed}
                       style={{ overflow: 'auto', height: '100vh', position: "fixed", left: 0, top: 0, bottom: 0 }}
                >
                    <div className="providerLogos">
                        <div className="providerLogoImgs">
                            <Image src={''} preview={false} height='100%' />
                        </div>
                    </div>
                    <LeftSider></LeftSider>
                </Sider>
                {/*上边头部区域*/}
                <Layout className="site-layout" style={{ marginLeft: collapsed ? 110 : 120, left: 0, top: 0, bottom: 0 }}>
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <div className="layout-headers">
                            <div className="collapsIcons">
                                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: toggle,
                                })}
                            </div>
                            <div className="rightHeaders"><NoteHeader></NoteHeader></div>
                        </div>
                    </Header>
                    {/*右边内容区域*/}
                    <Content style={{ margin: '0 15px', overflow: 'initial', position: "relative", height: 'calc(100vh - 74px)' }}>
                        <MyBreadcrumb role={role} menuList={menuList} currentPath={currentPath} />
                        <div className="site-layout-background" style={ { height: 'calc(100% - 42px)' } }>

                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export default BackLayout;
