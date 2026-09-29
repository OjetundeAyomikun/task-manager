import { useLocation } from 'react-router-dom';
import { FaList } from 'react-icons/fa';
import './NavBar.css'

export default function Navbar() {
  const location = useLocation();

  
  const getPageTitle = (path) => {
    switch (path) {
      case '/':
        return 'Dashboard';
      case '/tasks':
        return 'Tasks';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <nav className="navbar">
      <p className="nav-title">
        <FaList /> Task Manager
      </p>
      <p className="nav-page-name">{getPageTitle(location.pathname)}</p>
    </nav>
  );
}