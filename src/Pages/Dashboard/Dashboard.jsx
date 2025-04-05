import { useState, useContext, useEffect } from "react";
import Table from "../../components/Table/Table";
import useTransaction from "../../Hooks/useTransaction";
import { TransactionContext } from "../../Contexts/TransactionContext";
import "./Dashboard.css";

const Dashboard = () => {
    const { getTransactions } = useTransaction();
    const { transactions } = useContext(TransactionContext);


    useEffect(() => {
        getTransactions();
    }, []);

    return (
        <>
            <header id="dashboard">
              <nav>
                <button id="create-transaction-btn">Create Transaction</button>
              </nav>
            </header>
            <main id="dashboard">
                <section id="hero">
                    <h1>P2P Transaction Dashboard</h1>
                    <p>
                        Track and Manage all your{" "}
                        <span>P2P transactions in one place</span>
                    </p>
                    <p>
                        Filter by status, view detailed information, and stay
                        organized with this intuitive dashboard
                    </p>
                </section>
                <section id="transactions">
                    <Table transactions={transactions} />
                </section>
            </main>
        </>
    );
};

export default Dashboard;
