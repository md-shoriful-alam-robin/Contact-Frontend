import { Link, useLocation } from 'react-router-dom';
import { FiUsers, FiUserPlus } from 'react-icons/fi';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon"><FiUsers size={19} /></div>
          <span className="logo-text">ContactVault</span>
        </Link>
        <nav className="navbar-nav">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            <FiUsers size={15} /><span>Contacts</span>
          </Link>
          <Link to="/add" className="btn-add-nav">
            <FiUserPlus size={15} /><span>Add New</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
