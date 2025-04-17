import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";
import { TransactionProvider } from "./Contexts/TransactionContext";
import { UserProvider } from "./Contexts/UserContext";
import PageLoader from "./components/PageLoader/PageLoader";

const TransactionDetail = lazy(()=>new Promise(resolve=>{
    setTimeout(()=>resolve(import("./Pages/TransactionDetail/TransactionDetail")), 2000);
}));
const UserProfile = lazy(()=>new Promise(resolve=>{
    setTimeout(()=>resolve(import("./Pages/UserProfile/UserProfile")), 2000);
}));

import Dashboard from "./Pages/Dashboard/Dashboard";

const App = () => {
    return (
        <TransactionProvider>
            <UserProvider>
                <Router>
                    <Suspense fallback={<PageLoader/>}>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/transaction/:id" element = {<TransactionDetail/>}/>
                            <Route path="/profile" element={<UserProfile/>}/>
                            <Route path="*" element={<Dashboard />} />
                        </Routes>
                    </Suspense>
                </Router>
            </UserProvider>
        </TransactionProvider>
    );
};

export default App;
