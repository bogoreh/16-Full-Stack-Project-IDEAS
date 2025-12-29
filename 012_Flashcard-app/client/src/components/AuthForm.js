import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register, login } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      dispatch(register({ username, password })).then(() => navigate('/decks'));
    } else {
      dispatch(login({ username, password })).then(() => navigate('/decks'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      <button type="button" onClick={() => setIsRegister(!isRegister)}>
        Switch to {isRegister ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;