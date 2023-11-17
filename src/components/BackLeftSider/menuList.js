import React from "react"
import backHome from '../../assets/menu/backHome.png'
import user from "../../assets/menu/user.png"
import order from '../../assets/menu/order.png'
import project from '../../assets/menu/project.png'

//项目菜单栏
const projectMenus = [
    {
        label: '首页',
        key: '/project/backHome',
        icon: <img src={ backHome } alt="" style={{ height: '50%' }} />,
    },
    {
        label: '项目列表',
        // key: '/project/projectManage',
        icon: <img src={ project } alt="" style={{ height: '50%' }} />,
        children: [
            {
                label: "AiKou",
                key: "/project/projectManage",
            },
            {
                label: "平台2",
                key: "/project/projectManage/project_2",
            },
        ]
    },
    {
        label: '订单管理',
        key: '/project/orderList',
        icon: <img src={ order } alt="" style={{ height: '50%' }} />,
    },
    {
        label: '消费记录',
        key: '/project/consumptionRecords',
        icon: <img src={ order } alt="" style={{ height: '50%' }} />,
    },
    // {
    //     label: '图谱',
    //     key: '/project/relationCharts',
    //     icon: <img src={ order } alt="" style={{ height: '50%' }} />,
    // },
    {
        label: '用户列表',
        key: '/project/user',
        icon: <img src={ user } alt="" style={{ height: '50%' }} />,
    },
]

export { projectMenus }