import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useTransaction from "../../hooks/useTransaction";
import "./TransactionDetail.css";

const TransactionDetail = () => {
    const { error, loading, getTransaction } = useTransaction();
    const { id } = useParams();
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        getTransaction(id).then((result) => {
            setTransaction(result);
        });
    }, []);

    return (
        <>
            {loading && <p className="loading-message">Loading </p>}
            {error && <p className="error-message">{error}</p>}
            {transaction && (
                <main id="transaction-details">
                    <h1>Transaction Details</h1>
                    <div>Transaction Detail for transaction{id}</div>
                </main>
            )}
        </>
    );
};

export default TransactionDetail;
