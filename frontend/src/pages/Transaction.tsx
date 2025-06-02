import { Input } from "../components/Input"
import { Select } from "../components/Select"
import { TYPES, TYPES_KEYS } from "../utils/types"
import React, { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { useNavigate, useParams } from "react-router"
import { z, ZodError } from "zod"
import { api } from "../services/api"
import { AxiosError } from "axios"
import { formatCurrency } from "../utils/formatCurrency"

const transactionSchema = z.object({
    name: z.string().min(3, { message: "Informe um nome claro para sua transação" }),
    type: z.string().min(1, { message: "Informe o tipo" }),
    amount: z.coerce.number({ message: "Informe um valor válido" }).positive({ message: "Informe um valor válido e superior a 0" }),
})

export function Transaction() {
    const [type, setType] = useState("")
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const params = useParams<{ id: string }>()

    const isEditing = !!params.id

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()

        try {
            setIsLoading(true)

            const data = transactionSchema.parse({
                name,
                type,
                amount: amount.replace(",", "."),
            })

            if (isEditing) {
                await api.put(`/transactions/${params.id}`, { ...data })
                alert("Transação atualizada com sucesso")
                return navigate("/dashboard")
            }

            await api.post("/transactions", { ...data })
            navigate("/confirm", { state: { fromSubmit: true } })

        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                return alert(error.issues[0].message)
            }

            if (error instanceof AxiosError) {
                return alert(error.response?.data.message)
            }

            alert("Não foi possível realizar a transação")
        } finally {
            setIsLoading(false)
        }
    }

    async function fetchTransaction(id: string) {
        try {
            const response = await api.get(`/transactions/${id}`)

            setName(response.data.name)
            setType(response.data.type)
            setAmount(formatCurrency(response.data.amount))

        } catch (error) {
            console.log(error)

            if (error instanceof AxiosError) {
                return alert(error.response?.data.message)
            }

            alert("Não foi possível carregar a transação")
        }
    }

    useEffect(() => {
        if (isEditing) {
            fetchTransaction(params.id!)
        }
    }, [params.id])

    return (
        <form onSubmit={onSubmit} className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[521px]">
            <header>
                <h1 className="text-xl font-bold text-gray-100">{isEditing ? "Editar transação" : "Nova transação"}</h1>
                <p className="text-sm text-gray-200 mt-2 mb-4">Dados da transação.</p>
            </header>

            <Input
                required
                value={name}
                legend="nome da transação"
                onChange={(e) => setName(e.target.value)}
            />

            <div className="flex gap-4">
                <Select
                    required
                    legend="Destino da transação"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    {
                        TYPES_KEYS.map((type) => (
                            <option key={type} value={type}>
                                {TYPES[type].name}
                            </option>
                        ))
                    }
                </Select>

                <Input
                    required
                    value={amount}
                    legend="valor"
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <Button type="submit" isLoading={isLoading}>
                {isEditing ? "Salvar" : "Enviar"}
            </Button>
        </form>
    )
}
