function Header() {
  return (
    <header className="header">
      <div className="logo">Xpress Auto Care</div>
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Location</a>
          </li>
        </ul>
      </nav>
      <div className="icons">
        <button>🔍</button> {/* Search Icon */}
        <button>📞</button> {/* Contact Icon */}
        <button>🌍</button> {/* Maps Icon */}
      </div>
    </header>
  );
}

export default Header;
