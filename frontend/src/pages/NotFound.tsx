export function NotFound(){
    return(
        <div className="w-screen h-screen flex justify-center items-center flex-col">
            <h1 className="text-gray-100 font-semibold text-2xl mb-10">Ops, essa pagina nao existe. 😥</h1>
            <a href="/" className="font-semibold text-center text-green-100 hover:text-green-200 transition ease-linear">Voltar para o inicio</a>
        </div>
    )
}