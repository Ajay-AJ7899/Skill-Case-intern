import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { useAuth } from '../hooks/useAuth';
import './home-header.css';

const HomeHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="home-header">
      <div>
        <span className="home-kicker">Skillcase Shorts</span>
        <h1>For You</h1>
      </div>

      <div className="home-header-actions">
        <div className="home-user-chip">
          <span>{user?.name?.slice(0, 1)?.toUpperCase() || 'U'}</span>
          <div>
            <strong>{user?.name || 'User'}</strong>
            <small>{user?.email || ''}</small>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            dispatch(logout());
            navigate('/');
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default HomeHeader;
