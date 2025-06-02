import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { TYPES_KEYS } from "../utils/types";
import { TYPES } from "../utils/types";
import { Select } from "../components/Select";
import { z, ZodError } from "zod"
import { api } from "../services/api";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

const signUpSchema = z.object({
    email: z.string().email({message: "Email invalido"}),
    password: z.string().min(6, {message: "Senha deve ter pelo menos 6 digitos"}),
    name: z.string().trim().min(1, {message: "Informe o nome"}),
    type: z.enum(["nubank", "itaú", "bradesco", "caixa"]),
    balance: z.string().optional()
    
})

export function Signup(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [balance, setBalance] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    const navigate = useNavigate()

    async function onSubmit(e: React.FormEvent){
        e.preventDefault()

        try {
            setIsLoading(true)

            const data = signUpSchema.parse({
                email,
                password,
                name,
                type,
                balance
            })

            await api.post("/users", data)

            if(confirm("Cadastrado com sucesso. Ir ára tela de entrar?")){
                navigate("/")
            }
        } catch (error) {
            console.log(error)
            if(error instanceof ZodError){
                return alert(error.issues[0].message)
            }

            if(error instanceof AxiosError){
                return alert(error.response?.data.message)
            }

            alert("Não foi possivel cadastrar")
        } finally{
            setIsLoading(false)
        }
    }

    return(
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-4 overflow-y-scroll">
            <Input
                required
                legend="email"
                placeholder="digite seu email"
                onChange={(e) => setEmail(e.target.value)}/>

            <Input
                required
                type="password"
                legend="senha"
                placeholder="digite sua senha"
                onChange={(e) => setPassword(e.target.value)}/>

            <Input
                required
                legend="Nome da conta"
                placeholder="ex: Conta corrente Banco X"
                onChange={(e) => setName(e.target.value)}/>

            <Select
                required
                legend="Tipo da conta"
                value={type} onChange={(e) => setType(e.target.value)}>
                        {TYPES_KEYS.map((type) => (
                            <option key={type} value={type}>{TYPES[type].name}</option>
                        ))}
                        </Select>

            <Input
                legend="saldo inical"
                placeholder="ex: Saldo"
                onChange={(e) => setBalance(e.target.value)}/>

            <Button type="submit" isLoading={isLoading}>Cadastrar</Button>

            <a href="/" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">Já tenho uma conta</a>
        </form>
    )
}