import { useState } from "react";

function AddTransaction({ onAdd }) {
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        transaction_date: new Date().toLocaleDateString("en-CA")
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await onAdd(formData);

        setFormData({
            title: "",
            amount: "",
            type: "expense",
            category: "",
            transaction_date: new Date().toLocaleDateString("en-CA")
        });
    };

    return (
        <div className="card p-3 mb-4">
            <h5>Add Transaction</h5>

            <form onSubmit={handleSubmit}>
                <div className="row g-3">

                    <div className="col-md-6">
                        <input
                            className="form-control"
                            name="title"
                            placeholder="Transaction title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <input
                            className="form-control"
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            min="0.01"
                            step="0.01"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-4">
                        <select
                            className="form-select"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>

                    <div className="col-md-4">
                        <input
                            className="form-control"
                            name="category"
                            placeholder="Category"
                            value={formData.category}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-4">
                        <input
                            className="form-control"
                            type="date"
                            name="transaction_date"
                            value={formData.transaction_date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-12">
                        <button className="btn btn-primary" type="submit">
                            Add Transaction
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default AddTransaction;