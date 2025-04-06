import { useState, createContext } from "react";


const TransactionContext = createContext();

const TransactionProvider = ({children})=>{
    const [transactions, setTransactions] = useState([]);

    return (
        <TransactionContext.Provider value= {{transactions, setTransactions}}>
            {children}
        </TransactionContext.Provider>
    )
}

export {TransactionContext, TransactionProvider};