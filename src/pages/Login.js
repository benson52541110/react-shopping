import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [loginStatus, setLoginStatus] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      setLoginStatus({ message: '請輸入帳號和密碼' });
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`/v2/admin/signin`, data);
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token};expires=${new Date(expired)}`;
      if (res.data.success) {
        navigate('/admin/products');
      }
    } catch (error) {
      console.log(error);
      setLoginStatus(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <form onSubmit={submit}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2>登入帳號</h2>
            <div
              className={`alert alert-danger ${loginStatus.message ? 'd-block' : 'd-none'}`}
              role="alert"
            >
              {loginStatus.message}
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="form-label w-100">
                Email
                <input
                  id="email"
                  className="form-control"
                  name="username"
                  type="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="form-label w-100">
                密碼
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Loading...' : '登入'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
