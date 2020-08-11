import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

export default [
    //专门配置各种路由的地方，要区分路由和路由器
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/search/:keyword?",
        component: Search,
        name: "search"
    },
    {
        path: "/login",
        component: Login,
        meta: {
            isHide: true,
        }
    },
    {
        path: "/register",
        component: Register,
        meta: {
            isHide: true,
        }
    },
    // 重定向:访问根目录时，自动把网页重定向到home页面
    {
        path: "/",
        redirect: "/home"
    }
]