import React, { useState, useEffect } from "react";
import { Layout, Col, Row, Breadcrumb } from "antd";
import NoteHeader from "../ProjectBackHeader";
import LeftSider from "@components/BackLeftSider";
import { Menu, Dropdown, Image, Badge, Avatar, message } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import './index.scss'
import { useLocation, Route, Switch } from "react-router-dom";
import { projectMenus } from "@components/BackLeftSider/menuList.js";
import MyBreadcrumb from './MyBreadcrumb.jsx'
import projectRouters from "../../../router/projectRouters.js";
import logo from "../../../assets/icons/logo.png"

const { Header, Sider, Content } = Layout;

function ProjectBackLayout() {
    let currentPath = useLocation().pathname;
    const menuList = projectMenus;
    const [collapsed, setCollapsed] = useState(false);

    const switchLayout = () => {
        return (
            <Col className="flex-auto flex-collapsed" style={ { height: '100%' } }>
                <Switch>
                    {
                        projectRouters.map((item, index) => {
                            const { path, component, authority, redirectPath, ...rest } = item
                            return (
                                <Route
                                    key={index}
                                    path={item.path}
                                    component={item.component}
                                    authority={authority}
                                    redirectPath={redirectPath}
                                    {...rest}
                                >
                                </Route>
                            )
                        })
                    }
                </Switch>
            </Col>
        );
    };

    const toggle = () => {
        setCollapsed(!collapsed)
    }

    return (
        <>
            <Layout className="project-layout" style={ { height: "100vh" } }>
                {/*左边菜单栏区域*/ }
                <Sider trigger={ null } collapsible collapsed={ collapsed }
                       style={ { overflow: 'auto', height: '100vh', position: "fixed", left: 0, top: 0, bottom: 0, overflowX: 'hidden' } }
                >
                    <div className="projectLogo">
                        <div className="projectLogoImg">
                            <Image src={logo} preview={false}/>
                            <div style={{fontWeight: 700, color: '#03a9f4', fontSize: 24}}>AiForu</div>
                        </div>
                    </div>
                    <LeftSider></LeftSider>

                </Sider>
                {/*上边头部区域*/ }
                <Layout className="site-layout" style={ { marginLeft: collapsed ? 80 : 200, left: 0, top: 0, bottom: 0 } }>
                    <Header className="site-layout-background" style={ { padding: 0 } }>
                        <div className="layout-header">
                            <div className="collapsIcon">
                                { React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: toggle,
                                }) }
                            </div>
                            <div className="rightHeader"><NoteHeader></NoteHeader></div>
                        </div>
                    </Header>
                    {/*右边内容区域*/ }
                    <Content style={ { margin: '0 15px', overflow: 'initial', position: "relative", height: 'calc(100vh - 74px)' } }>
                        <MyBreadcrumb menuList={ menuList } currentPath={ currentPath } />
                        <div className="site-layout-background" style={ { height: 'calc(100% - 42px)' } }>
                            {switchLayout()}
                        </div>
                    </Content>
                </Layout>
            </Layout>

        </>
    );
}

export default ProjectBackLayout