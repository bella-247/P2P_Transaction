import axios from 'axios'
import { useContext, useState } from 'react';
import { TransactionContext } from '../Contexts/TransactionContext';
const apiUrl = "http://localhost:5000/transactions";

const useTransactions = ()=>{
    const {setTransactions} = useContext(TransactionContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getTransaction = async (id)=>{
        try{
            setLoading(true)
            const response = await axios.get(`${apiUrl}/${id}`);
            if(response && response.data){
                setError(null)
                return response.data;
            }
            else{
                throw Error("Failed to fetch the Transaction");
            }
        }
        catch(err){
            console.error(err);
            setError(err)
        }
        finally{
            setLoading(false)
        }
    }

    const getTransactions = async ()=>{
        try{
            setLoading(true)
            const response = await axios.get(apiUrl);
            if(response && response.data){
                setTransactions(response.data);
                console.log("i got the transactions", response.data)
                setError(null)
            }
            else{
                throw Error("Failed to fetch the Transactions");
            }
        }
        catch(err){
            console.error(err);
            setError(err)
        }
        finally{
            setLoading(false)
        }
    }
    
    const addTransaction = async (data)=>{
        try{
            setLoading(true)
            const response = await axios.post(apiUrl, data)
            if(response && response.data){
                setError(null)
                setTransactions((prev)=>[...prev, data]);
            }
            else{
                throw Error("Failed to add the Transaction");
            }
        }
        catch(err){
            console.error(err);
            setError(err)
        }
        finally{
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        getTransaction,
        getTransactions,
        addTransaction
    }
}

export default useTransactions;