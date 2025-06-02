export const TYPES = {
    corrente: {
        name: "Corrente",
    },
    poupança: {
        name: "Poupança",
    },
    crédito: {
        name: "Crédito",
    },
    investimento: {
        name: "Investimento",
    },
}

export const TYPES_KEYS = Object.keys(TYPES) as Array<keyof typeof TYPES>