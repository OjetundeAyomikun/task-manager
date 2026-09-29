import { Link, useLocation } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import './Footer.css';

export default function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <footer className="Footer">
      <Link 
        to="/" 
        title="Home"
        className={`homeMenu ${currentPath === '/' ? 'active' : ''}`}
      >
        <MdDashboard />
        <span>Home</span>
      </Link>

      <Link 
        to="/tasks" 
        title="Tasks"
        className={`taskMenu ${currentPath === '/tasks' ? 'active' : ''}`}
      >
        <FaCheckCircle />
        <span>Tasks</span>
      </Link>

      <Link 
        to="/settings" 
        title="Settings"
        className={`Settings ${currentPath === '/settings' ? 'active' : ''}`}
      >
        <FaGear />
        <span>Settings</span>
      </Link>
    </footer>
  );
}