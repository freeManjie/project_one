import BackHome from "../pages/project/BackHome";
import User from '../pages/project/User/User.jsx'
import ProjectManage from "../pages/project/ProjectManage";
import OrderList from '../pages/project/Order'
import ConsumptionRecords from "../pages/project/ConsumptionRecords";
import Login from "../pages/Login";

const redirectPath = "/login"

const projectRouters = [
    {
        path: "/login",//首页
        component: Login,
    },
    {
        path: "/project/backHome",//首页
        component: BackHome,
    },
    {
        path: "/project/user",//用户管理
        component: User,
    },
    {
        path: "/project/projectManage",//项目管理
        component: ProjectManage,
    },
    {
        path: "/project/orderList",//订单管理
        component: OrderList,
    },
    {
        path: "/project/consumptionRecords",//消费记录
        component: ConsumptionRecords,
    },
]

export default projectRouters