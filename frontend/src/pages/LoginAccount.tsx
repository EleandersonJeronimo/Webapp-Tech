import { useActionState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { z, ZodError } from "zod"
import { api } from "../services/api";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";

const signInSchema = z.object({
    email: z.string().email({message:"Email é invalido"}),
    password: z.string().trim().min(1, {message: "Informe a senha"})
})

export function LoginAccount(){
    const [ state, formAction, isLoading ] = useActionState(signIn, null)

    const auth = useAuth()

    async function signIn(_: any ,formData: FormData){
        try {
            const data = signInSchema.parse({
            email: formData.get("email"),
            password: formData.get("password")
        })

        const response = await api.post("/sessions", data)
        auth.save(response.data)

        console.log(data)
        } catch (error) {
            if(error instanceof ZodError){
                return {message: error.issues[0].message}
            }

            if(error instanceof AxiosError){
                return {message: error.response?.data.message}
            }

            return {message: "Não foi possivel entrar"}
        }
    }

    return(
        <form action={formAction} className="w-full flex flex-col gap-4">
            <Input
                name="email"
                legend="email"
                placeholder="digite seu email"
                type="email"
            />

            <Input
                name="password"
                legend="senha"
                placeholder="digite sua senha"
                type="password"
            />

            <p className="texte-sm text-red-600 text-center my-4 font-medium">{state?.message}</p>

            <Button type="submit" isLoading={isLoading}>Entrar</Button>

            <a href="/signup" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">Criar conta</a>
        </form>
    )
}