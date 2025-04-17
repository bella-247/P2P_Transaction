import "./Dashboard.css";
import { lazy, Suspense } from "react";
import CreateTransaction from "../../components/CreateTransaction/CreateTransaction";
import { useState } from "react";
import PageLoader from "../../components/PageLoader/PageLoader";
import Table from "../../components/Table/Table";
import { useUser } from "../../Contexts/UserContext";
import { Link } from "react-router";

const Dashboard = () => {
    document.title = "Dashboard";
    const [creatingTransaction, setCreatingTransaction] = useState(false);
    const {state : user_state} = useUser();
    
    return (
        <>
            {creatingTransaction && (
                <Suspense fallback={<PageLoader/>}>
                    <CreateTransaction
                        setCreatingTransaction={setCreatingTransaction}
                    />
                </Suspense>
            )}
            <header id="dashboard">
                <nav>
                    <Link to={"profile/"}>
                        <div className="user-profile">
                            <div className="profile-img-container">
                                <img src = {user_state.user.profileImg}/>
                            </div>
                            <p>{user_state.user.name}</p>
                        </div>
                    </Link>
                    <button
                        id="create-transaction-btn"
                        onClick={() => setCreatingTransaction(true)}
                    >
                        Create Transaction
                    </button>
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
                    <Table />
                </section>
            </main>
        </>
    );
};

export default Dashboard;
