
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <i className="bi bi-wallet2"></i>
        <span>Expense<span className="brand-highlight">Track</span></span>
      </div>

      <p className="menu-heading">MENU</p>

      <nav className="side-menu">
        <a href="#dashboard" className="active">
          <i className="bi bi-grid"></i>
          Dashboard
        </a>

        <a href="#transactions">
          <i className="bi bi-arrow-left-right"></i>
          Transactions
        </a>

        <a href="#reports">
          <i className="bi bi-bar-chart"></i>
          Reports
        </a>

        <a href="#categories">
          <i className="bi bi-tags"></i>
          Categories
        </a>
      </nav>

      <div className="sidebar-bottom">
        <a href="#settings">
          <i className="bi bi-gear"></i>
          Settings
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
