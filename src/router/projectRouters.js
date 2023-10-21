import BackHome from "../pages/project/BackHome";
import User from '../pages/project/User/User.jsx'
import ProjectManage from "../pages/project/ProjectManage";
import OrderList from '../pages/project/Order'

const redirectPath = "/login"

const projectRouters = [
    {
        path: "/project/backHome",//首页
        component: BackHome,
        redirectPath: redirectPath,
    },
    {
        path: "/project/user",//用户管理
        component: User,
        redirectPath: redirectPath,
    },
    {
        path: "/project/projectManage",//项目管理
        component: ProjectManage,
        redirectPath: redirectPath,
    },
    {
        path: "/project/orderList",//订单管理
        component: OrderList,
        redirectPath: redirectPath,
    },
]

export default projectRouters