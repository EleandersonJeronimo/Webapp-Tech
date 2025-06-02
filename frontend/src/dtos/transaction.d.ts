type TransactionAPIResponse = {
    id: string
    userId: string
    name: string
    type: TypesAPIEnum
    amount: number
    user: {
        name: string
    }
}

type TransactionPaginationAPIResponse ={
    transactions: TransactionAPIResponse[],
    pagination: {
        page: number
        perPage: number
        totalRecords: number
        totalPages: number
    }
}