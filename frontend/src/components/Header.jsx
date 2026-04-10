function Header({ totalCount, completedCount }) {
  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="header-title">Task Manager</h1>
        <span className="header-subtitle">
          {completedCount} of {totalCount} completed
        </span>
      </div>
    </header>
  );
}

export default Header;
