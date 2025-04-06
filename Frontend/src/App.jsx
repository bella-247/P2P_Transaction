import { BrowserRouter as Router, Routes, Route } from "react-router";
import { TransactionProvider } from "./Contexts/TransactionContext";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import TransactionDetail from "./Pages/TransactionDetail/TransactionDetail";

const App = () => {
    return (
        <TransactionProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/transaction/:id" element = {<TransactionDetail/>}/>
                </Routes>
            </Router>
        </TransactionProvider>
    );
};

export default App;
