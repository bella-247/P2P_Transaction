import {useState, useEffect } from "react";
import "./PageLoader.css";

const PageLoader = () => {
    const [dots, setDots] = useState("...");
    useEffect(() => {
        setInterval(() => {
            setDots(dots === "..." ? "." : dots === "." ? ".." : "...");
        }, 500)
    }, [])
    
    return (
        <div className="page-loader-container">
            <div className="spinner"></div>
            <div>Loading{dots}</div>
        </div>
    );
};

export default PageLoader;
