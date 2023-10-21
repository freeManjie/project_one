import BackHome from "../pages/project/BackHome";
import User from '../pages/project/User/User.jsx'
import ProjectManage from "../pages/project/ProjectManage";

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
]

export default projectRouters