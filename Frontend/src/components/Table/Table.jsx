import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { TransactionContext } from "../../Contexts/TransactionContext";
import useTransactions from "../../hooks/useTransaction";
import "./Table.css";
import PageLoader from "../PageLoader/PageLoader";

const Table = () => {
    const navigate = useNavigate();
    const [tableTransactions, setTableTransactions] = useState([]);
    const [filterValue, setFilterValue] = useState("All");

    const { loading, error, getTransactions } = useTransactions();
    const { transactions } = useContext(TransactionContext);

    const table_headers = ["id", "sender", "reciever", "amount", "status"];

    useEffect(() => {
        getTransactions();
    }, []);

    useEffect(() => {
        let filteredTransactions = transactions.filter((transaction) => {
            return filterValue == "All" || transaction.status === filterValue
                ? transaction
                : null;
        });

        setTableTransactions(filteredTransactions);
    }, [transactions, filterValue]);

    const handleRowClick = (id)=>{
        navigate(`/transaction/${id}`);
    }

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };


    return (
        <>
            {loading && <PageLoader />}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <div className="table-container">
                    <div className="filter-container">
                        <label>Filter transactions by status</label>
                        <select
                            id="status-filter"
                            value={filterValue}
                            onChange={(e) => {
                                setFilterValue(e.target.value);
                            }}
                        >
                            <option value="All">All</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                            <option value="Failed">Failed</option>
                        </select>
                    </div>

                    {tableTransactions && tableTransactions.length ? (
                        <table>
                            <thead>
                                <tr>
                                    {table_headers.map((name, index) => {
                                        return (
                                            <th key={index}>
                                                {capitalize(name)}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>

                            <tbody>
                                {tableTransactions &&
                                    tableTransactions.map(
                                        (transaction, tr_index) => {
                                            return (
                                                <tr
                                                    key={tr_index}
                                                    data-id={transaction.id}
                                                    onClick={()=>handleRowClick(transaction.id)}
                                                >
                                                    {table_headers.map(
                                                        (name, index) => {
                                                            return (
                                                                <td
                                                                    key={index}
                                                                    className={name}
                                                                >
                                                                    <span
                                                                        className={transaction[name]}
                                                                    >
                                                                        {transaction[name]}
                                                                    </span>
                                                                </td>
                                                            );
                                                        }
                                                    )}
                                                </tr>
                                            );
                                        }
                                    )}
                            </tbody>
                        </table>
                    ) : (
                        <p>No Transactions Yet</p>
                    )}
                </div>
            )}
        </>
    );
};

export default Table;
