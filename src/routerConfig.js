import Login from "./pages/Login";
import BackHome from "./pages/project/BackHome";

const routerConfig = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: BackHome
    },
    {
        path: '/',
        component: Login
    }
]

export default routerConfig;