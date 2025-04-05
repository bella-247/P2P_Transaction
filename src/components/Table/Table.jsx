import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import "./Table.css";

const Table = ({
    transactions = [],
    headers = ["ID", "Sender", "Reciever", "Amount", "Status"],
}) => {
    console.log("table", transactions)
    const [tableTransactions, setTableTransactions] = useState(transactions);
    const [filterValue, setFilterValue] = useState("All");

    useEffect(()=>{
        let filteredTransactions = transactions.filter(transaction=>{
            return filterValue == "All" || transaction.status === filterValue ? transaction : null;
        });

        setTableTransactions(filteredTransactions);
    }, [transactions, filterValue])

    return (
        <>
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

                {tableTransactions.length ? (
                    <table>
                        <thead>
                            <tr>
                                {headers &&
                                    headers.map((header, index) => {
                                        return <th key={index}>{header}</th>;
                                    })}
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
        </>
    );
};

export default Table;
