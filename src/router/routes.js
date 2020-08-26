import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import Center from "@/pages/Center";
import GroupOrder from "@/pages/Center/GroupOrder";
import MyOrder from "@/pages/Center/MyOrder"

export default [
    //专门配置各种路由的地方，要区分路由和路由器
    // 用户中心
    {
        path: '/center',
        component: Center,
        children: [{
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {
                path: '',
                redirect: 'myorder'
            }
        ]
    },
    //支付页面
    {
        path: "/pay",
        component: Pay
    },
    // 订单交易页面
    {
        path: "/trade",
        component: Trade
    },
    // 购物车结算页面
    {
        path: '/shopcart',
        component: ShopCart
    },

    // 添加购物车成功
    {
        path: '/addcartsuccess',
        component: AddCartSuccess
    },
    {
        path: '/detail/:skuId',
        component: Detail
    },
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