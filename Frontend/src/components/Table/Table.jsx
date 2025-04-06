import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import "./Table.css";
import { TransactionContext } from "../../Contexts/TransactionContext";
import useTransactions from "../../hooks/useTransaction";

const Table = () => {
    const [tableTransactions, setTableTransactions] = useState([]);
    const [filterValue, setFilterValue] = useState("All");

    const { loading, error, getTransactions } = useTransactions();
    const { transactions } = useContext(TransactionContext);

    useEffect(() => {
        getTransactions();
    }, []);

    useEffect(()=>{
        let filteredTransactions = transactions.filter(transaction=>{
            return filterValue == "All" || transaction.status === filterValue ? transaction : null;
        });

        setTableTransactions(filteredTransactions);
    }, [transactions, filterValue])



    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <>
            {loading && <p>Loading...</p>}
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
                                    {Object.keys(tableTransactions[0]).map(
                                        (name, index) => {
                                            return <th key={index}>{capitalize(name)}</th>;
                                        }
                                )}
                                </tr>
                            </thead>

                            <tbody>
                                {tableTransactions &&
                                    tableTransactions.map((transaction, tr_index) => {
                                        return (
                                            <Link to={`/transaction/${transaction.id}`} key={tr_index}>
                                                <tr
                                                    key={tr_index}
                                                    data-id={transaction.id}
                                                >
                                                    {Object.keys(transaction).map(
                                                        (name, index) => {
                                                            return (
                                                                <td
                                                                    key={index}
                                                                    className={name}
                                                                >
                                                                    <span
                                                                        className={
                                                                            transaction[
                                                                                name
                                                                            ]
                                                                        }
                                                                    >
                                                                        {
                                                                            transaction[
                                                                                name
                                                                            ]
                                                                        }
                                                                    </span>
                                                                </td>
                                                            );
                                                        }
                                                    )}
                                                </tr>
                                            </Link>
                                        );
                                    })}
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
