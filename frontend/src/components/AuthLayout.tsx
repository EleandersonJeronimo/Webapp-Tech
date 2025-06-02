import { Outlet } from "react-router";
export function AuthLayout(){
    return(
        <div className="w-screen h-screen bg-gray-400 flex flex-col justify-center items-center text-gray-100 p-8">
            <main className="bg-gray-500 p-8 rounded-md flex items-center flex-col w-full md:max-w-[462px]">
                <h1 className="my-8 text-3xl font-bold">Webapp</h1>

                <Outlet />
            </main>
        </div>
    )
}