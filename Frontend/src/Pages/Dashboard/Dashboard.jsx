import Table from "../../components/Table/Table";
import "./Dashboard.css";
import CreateTransaction from "../../components/CreateTransaction/CreateTransaction";
import { useState } from "react";

const Dashboard = () => {
    document.title = "Dashboard";
    const [creatingTransaction, setCreatingTransaction] = useState(false);

    return (
        <>
            {creatingTransaction && <CreateTransaction setCreatingTransaction = {setCreatingTransaction}/>}
            <header id="dashboard">
              <nav>
                <button id="create-transaction-btn" onClick={() => setCreatingTransaction(true)}>Create Transaction</button>
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
                    <Table/>
                </section>
            </main>
        </>
    );
};

export default Dashboard;
