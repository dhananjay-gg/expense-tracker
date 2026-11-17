function TransactionTable({ transactions, onDelete }) {
    return (
        <div className="card p-3">
            <h5 className="mb-3">Recent Transactions</h5>

            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No transactions found
                                </td>
                            </tr>
                        ) : (
                            transactions.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        {new Date(item.transaction_date)
                                            .toLocaleDateString("en-IN")}
                                    </td>
                                    <td>{item.type}</td>
                                    <td>
                                        ₹{Number(item.amount).toLocaleString("en-IN")}
                                    </td>
                                    <td>
                                            <button 
                                            className="btn btn-sm btn-danger"
                                            onClick={() => onDelete(item.id)}> Delete </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default TransactionTable;