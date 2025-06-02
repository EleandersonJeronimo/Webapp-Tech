import { Route, Routes } from "react-router";
import { LoginAccount } from "../pages/LoginAccount";
import { AuthLayout } from "../components/AuthLayout";
import { Signup } from "../pages/signup";
import { NotFound } from "../pages/NotFound";

export function AuthRoutes(){
    return(
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route path="/" element={<LoginAccount />}/>
                <Route path="/signup" element={<Signup />}/>
            </Route>


            <Route path="*" element={<NotFound />}/>
            
        </Routes>
    )
}