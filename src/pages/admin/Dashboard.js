import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import Message from '../components/Message';
import { MessageContext, messageReducer, initState } from '../../store/messageStore';
import { useToken } from '../../hooks/useToken';

function Navbar({ onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <p className="text-white mb-0">HEX EATS 後台管理系統</p>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button type="button" className="btn btn-sm btn-light" onClick={onLogout}>
                登出
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [token, setToken] = useToken();
  const [isLoading, setIsLoading] = useState(true);
  const reducer = useReducer(messageReducer, initState);

  const logout = () => {
    setToken('');
    navigate('/login');
  };

  axios.defaults.headers.common['Authorization'] = token;

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!token) {
      return navigate('/login');
    }

    (async () => {
      try {
        await axios.post('/v2/api/user/check');
      } catch (error) {
        console.log(error);
        if (!error.response.data.success) {
          navigate('/login');
        }
      }
    })();
  }, [navigate, token, isLoading]);

  useEffect(() => {
    if (token !== null) {
      setIsLoading(false);
    }
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MessageContext.Provider value={reducer}>
      <Message></Message>
      <Navbar onLogout={logout} />
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <div className="bg-light" style={{ width: '200px' }}>
          <ul className="list-group list-group-flush">
            <Link className="list-group-item list-group-item-action py-3" to="/admin/products">
              <i className="bi bi-cup-fill me-2" />
              產品列表
            </Link>
            <Link className="list-group-item list-group-item-action py-3" to="/admin/coupons">
              <i className="bi bi-ticket-perforated-fill me-2" />
              優惠卷列表
            </Link>
            <Link className="list-group-item list-group-item-action py-3" to="/admin/orders">
              <i className="bi bi-receipt me-2" />
              訂單列表
            </Link>
          </ul>
        </div>
        <div className="w-100">{token && <Outlet />}</div>
      </div>
    </MessageContext.Provider>
  );
}

export default Dashboard;
