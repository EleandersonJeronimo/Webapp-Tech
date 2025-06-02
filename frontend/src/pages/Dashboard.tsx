import { Input } from "../components/Input"
import React, { useState, useEffect } from "react"
import { Button } from "../components/Button"
import searchSvg from "../assets/search.svg"
import { TransactionItem } from "../components/TransactionItem"
import type { TransactionItemProps } from "../components/TransactionItem"
import { api } from "../services/api"
import { AxiosError } from "axios"
import { formatCurrency } from "../utils/formatCurrency"
import { Pagination } from "../components/Pagination"

const PER_PAGE = 3

export function Dashboard(){
    const [name, setName] = useState("")
    const [page, setPage] = useState(1)
    const [totalOfPage, setTotalOfPage] = useState(0)
    const [transactions, setTransactions] = useState<TransactionItemProps[]>([])

    async function fetchTransactions(){
        try {
            const response = await api.get<TransactionPaginationAPIResponse>(`/transactions?name=${name.trim()}&page=${page}&perPage=${PER_PAGE}`)

            setTransactions(
                response.data.transactions.map((transaction) => ({
                id: transaction.id,
                name: transaction.user.name,
                description: transaction.name,
                amount: formatCurrency(transaction.amount),
            }))
            )

            setTotalOfPage(
                response.data.pagination.totalPages
            )

        } catch (error) {
            console.log(error)

            if(error instanceof AxiosError){
                return alert(error.response?.data.message)
            }

            alert("Não foi possível carregar")
        }
    }

    function onSubmit(e: React.FormEvent){
        e.preventDefault()
        fetchTransactions()
    }

    function handlePagination(action: "next" | "previous"){
        setPage((prevPage) => {
            if(action === "next" && prevPage < totalOfPage){
                return prevPage + 1
            }

            if(action === "previous" && prevPage > 1){
                return prevPage - 1
            }

            return prevPage
    })}

    useEffect(() => {
        fetchTransactions()
    }, [page])

    return(
        <div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px]">
            <h1 className="text-gray-100 font-bold text-xl flex-1">Transações</h1>

            <form onSubmit={onSubmit} className="flex flex-1 items-center justify-between pb-6 border-b-[1px] border-b-gray-400 md:flex-row gap-2 mt-6">
                <Input type="text" placeholder="Pesquisar pelo nome" onChange={(e) => setName(e.target.value)}/>

                <Button variant="icon" type="submit"><img src={searchSvg} alt="" className="w-5"/></Button>
            </form>

            <div className="my-6 flex flex-col gap-4 max-h-[342px] overflow-y-scroll">
                {
                    transactions.map((item) =>
                    <TransactionItem key={item.id} data={item} href={`/transaction/${item.id}`}/>
                )
                }
                
            </div>

            <Pagination
                current={page}
                total={totalOfPage}
                onNext={() => handlePagination("next")}
                onPrevious={() => handlePagination("previous")} />
        </div>
    )}
