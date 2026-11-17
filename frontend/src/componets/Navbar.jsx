
function Navbar({ search, setSearch }) {
  return (
    <header className="navbar-custom">
      <div>
        <h5 className="mb-1">Dashboard</h5>
        <small className="text-secondary">
          Welcome back! Here's your financial overview.
        </small>
      </div>

      <div className="nav-actions">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="icon-button" aria-label="Notifications">
          <i className="bi bi-bell"></i>
        </button>

        <div className="profile-avatar">DK</div>
      </div>
    </header>
  );
}

export default Navbar;
