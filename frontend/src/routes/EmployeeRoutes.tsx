import { Route, Routes } from "react-router";
import { Transaction } from "../pages/Transaction";
import { NotFound } from "../pages/NotFound";
import { AppLayout } from "../components/AppLayout";
import { Confirm } from "../pages/Confirm";

export function EmployeeRoutes(){
    return(
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route path="/" element={<Transaction />}/>
                <Route path="/confirm" element={<Confirm />}/>
            </Route>

            <Route path="*" element={<NotFound />}/>
        </Routes>
    )
}