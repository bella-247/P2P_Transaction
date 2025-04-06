import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useTransaction from "../../hooks/useTransaction";
import "./TransactionDetail.css";

const TransactionDetail = () => {
    document.title = "Transaction Detail";
    const { error, loading, getTransaction } = useTransaction();
    const { id } = useParams();
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        getTransaction(id).then((result) => {
            setTransaction(result);
        });
    }, []);

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <>
            {loading && <p className="loading-message">Loading </p>}
            {error && <p className="error-message">{error}</p>}
            {transaction && (
                <main id="transaction-details">
                    <Link to="/">Go Back</Link>
                    <h1>Transaction Details</h1>
                    <div className="transaction-detail-container">
                        <div className="transaction-detail">
                            {Object.keys(transaction).map((key, index) => {
                                return (
                                    <p key={index}>
                                        <span className="key">{capitalize(key)}</span> :{" "}
                                        <span className="value"></span>
                                        {transaction[key]}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </main>
            )}
        </>
    );
};

export default TransactionDetail;
