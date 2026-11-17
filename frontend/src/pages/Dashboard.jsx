import { useState, useEffect } from "react";
import Sidebar from "../componets/Sidebar.jsx";
import Navbar from "../componets/Navbar.jsx";
import SummaryCard from "../componets/SummaryCard.jsx";
import TransactionTable from "../componets/TransactionTable.jsx";
import AddTransaction from "../componets/AddTransaction.jsx";
import api from "../services/api.js";

function Dashboard({ apiStatus }) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    // Fetch transactions from backend
    const fetchTransactions = async () => {
        try {
            setError("");
            const response = await api.get("/transactions");
            setTransactions(response.data);
        } catch (err) {
            setError("Unable to fetch transactions. Check backend connection.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTransaction = async (data) => {
    try {
        await api.post("/transactions", {
            ...data,
            amount: Number(data.amount)
        });

        await fetchTransactions();

    } catch (err) {
        console.error(err);
        alert(
            err.response?.data?.message || "Failed to add transaction"
        );

        throw err;
    }
};

const handleDeleteTransaction = async (id) => {
    const confirmed = window.confirm(
        "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) return;

    try {
        console.log("Deleting transaction ID:", id);

        const response = await api.delete(`/transactions/${id}`);

        console.log("Delete response:", response.data);

        await fetchTransactions();

        alert("Transaction deleted successfully!");

    } catch (err) {
        console.error("Delete error:", err.response?.data || err.message);

        alert(
            err.response?.data?.message ||
            "Failed to delete transaction"
        );
    }
};
    useEffect(() => {
        fetchTransactions();
    }, []);

    // Calculate totals
    const income = transactions
        .filter(item => item.type === "income")
        .reduce((total, item) => total + Number(item.amount), 0);

    const expenses = transactions
        .filter(item => item.type === "expense")
        .reduce((total, item) => total + Number(item.amount), 0);

    const balance = income - expenses;

  return (
    <div className="dashboard-layout">

      {/* Left Sidebar */}
      <aside className="dashboard-sidebar">
        <Sidebar />
      </aside>

      {/* Right Main Content */}
      <main className="dashboard-main">

        <Navbar search={search} setSearch={setSearch} />

        <div className="dashboard-content">
          <h2 className="dashboard-heading">Dashboard</h2>
          <p className="dashboard-subtitle">
            Overview of your income and expenses
          </p>

          {/* Summary Cards */}
          <div className="summary-grid">
            <SummaryCard title="Balance" amount={balance} />
            <SummaryCard title="Income" amount={income} />
            <SummaryCard title="Expenses" amount={expenses} />
          </div>

          {/* Add Transaction */}
          <AddTransaction onAdd={handleAddTransaction} />

          {/* Transaction Table */}
          <TransactionTable
  transactions={transactions.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  )}
  onDelete={handleDeleteTransaction}
/>
        </div>

      </main>
    </div>
  );
}


export default Dashboard;