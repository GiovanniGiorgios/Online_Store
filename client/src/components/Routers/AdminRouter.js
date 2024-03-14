import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { adminRoutes } from "../../routes";
import { ADMIN_ROUTE, MAIN_ROUTE } from "../../utils/consts";
import { UserStoreContext } from "../..";

const AdminRouter = () => {
    const user = useContext(UserStoreContext)

    return (
        <Routes> 
            
            { user.isAuth && user.user.role === "ADMIN" && adminRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component />} exact/> // exact - означає що путь повинен точно співпадати
            )}
            
        </Routes>
    );
};

export default AdminRouter;