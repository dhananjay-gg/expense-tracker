
function SummaryCard({ title, amount, icon, color, subtitle }) {
  return (
    <div className="summary-card">
      <div className="summary-top">
        <span>{title}</span>

        <div className={`summary-icon ${color}`}>
          <i className={`bi ${icon}`}></i>
        </div>
      </div>

      <h3>₹{amount.toLocaleString("en-IN")}</h3>

      <small>{subtitle}</small>
    </div>
  );
}

export default SummaryCard;
