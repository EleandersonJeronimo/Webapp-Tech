import logout from "../assets/logout.svg"
import { useAuth } from "../hooks/useAuth"

export function Header(){
    const auth = useAuth()
    return(
        <header className="w-full flex justify-between">
            <h1 className="my-8">Webapp</h1>

            <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-200">{auth.session?.user.name}</span>
                <img
                    src={logout}
                    alt="logout"
                    className="my-8 cursor-pointer hover:opacity-75 transition ease-linear"
                    onClick={() => auth.remove()}
                />
            </div>
        </header>
    )
}