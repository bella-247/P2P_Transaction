import React, { useState } from "react";
import "./CreateTransaction.css";
import useTransactions from "../../hooks/useTransaction";
const CreateTransaction = ({setCreatingTransaction}) => {
    const { createTransaction } = useTransactions();
    const [formValues, setFormValues] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

    };
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    return (
        <div className="transaction-creator-form-container">
            <button className="close-button" onClick={() => setCreatingTransaction(false)}>
                X
            </button>
            <form onSubmit={handleSubmit}>
                <h1>Create Transaction</h1>
                <div className="form-group">
                    <input type="text" name="sender" id="sender"  onChange={handleChange}required/>
                    <label htmlFor="sender">Sender</label>
                </div>
                <div className="form-group">
                    <input type="text" name="reciver" id="reciver" onChange={handleChange}required/>
                    <label htmlFor="reciver">Reciever</label>
                </div>
                <div className="form-group">
                    <input type="number" name="amount" id="amount" onChange={handleChange} required/>
                    <label htmlFor="amount">Amount</label>
                </div>

                <div className="form-group">
                    <select id="status" name="status" onChange={handleChange} required>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                    </select>
                    <label htmlFor="status">Status</label>
                </div>
                <div className="form-group">
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    );
};

export default CreateTransaction;
