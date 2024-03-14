// всі маршрути до конктретних сторінок на сайті

import Basket from "./pages/Basket"
import Main from "./pages/Main"
import Auth from "./pages/Auth"
import DevicePage from "./pages/DevicePage"

import AdminPanel from "./pages/AdminPanel"
import AdminMainContent from "./components/AdminContent/AdminContent"
import AllUsersInfo from "./components/AdminContent/AllUsersInfo/AllUsersInfo"

import { ADMIN_ROUTE, ADMIN_MAIN_ROUTE, ADMIN_ALLUSERS_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE } from "./utils/consts"

export const authRoutes = [ // маршрути до яких має доступ авторизований користувач
    {
        path: BASKET_ROUTE,
        Component: Basket
    }
]
export const publicRoutes = [ // бублічні маршрути
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,  
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
]
export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPanel
    },
    {
        path: ADMIN_MAIN_ROUTE,  
        Component: AdminMainContent
    },
    {
        path: ADMIN_ALLUSERS_ROUTE,  
        Component: AllUsersInfo
    },
]
