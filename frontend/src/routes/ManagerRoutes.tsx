import { Route, Routes } from "react-router";
import { Dashboard } from "../pages/Dashboard";
import { AppLayout } from "../components/AppLayout";
import { NotFound } from "../pages/NotFound";
import { Transaction } from "../pages/Transaction";

export function ManagerRoutes(){
    return(
        <Routes>
            <Route path="/" element={<AppLayout/>}>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/transaction/:id" element={<Transaction />}/>
            </Route>

            <Route path="*" element={<NotFound />}/>
        </Routes>
    )
}