import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import DemoBanner from '../components/DemoBanner';
import '../styles/App.css';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    if (username.length < 3) {
      setError('Имя пользователя должно содержать минимум 3 символа');
      return;
    }

    if (password.length < 4) {
      setError('Пароль должен содержать минимум 4 символа');
      return;
    }

    setLoading(true);

    try {
      const response = isLogin 
        ? await apiService.login({ username, password })
        : await apiService.register({ username, password });

      // Save token to localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <DemoBanner />
      <header>
        <h1>🔐 {isLogin ? 'Вход' : 'Регистрация'}</h1>
        <p>{isLogin ? 'Войдите в систему создания опросов' : 'Создайте аккаунт для создания опросов'}</p>
      </header>

      <div className="main-content">
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Имя пользователя:</label>
              <input
                id="username"
                type="text"
                className="input-field"
                placeholder="Введите имя пользователя"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                disabled={loading}
                autoFocus
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Пароль:</label>
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                disabled={loading}
              />
            </div>

            {error && (
              <div className="message message-error">
                {error}
              </div>
            )}

            <div style={{ 
              background: '#e8f5e9', 
              padding: '12px', 
              borderRadius: '6px',
              marginBottom: '15px',
              border: '1px solid #c8e6c9'
            }}>
              <p style={{ color: '#2e7d32', fontSize: '0.85em', margin: 0 }}>
                💡 <strong>Demo учетные данные:</strong><br/>
                admin / admin или demo / demo
              </p>
            </div>

            <button 
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', marginTop: '20px' }}
            >
              {loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#3498db',
                cursor: 'pointer',
                fontSize: '0.95em',
                textDecoration: 'underline'
              }}
            >
              {isLogin 
                ? 'Нет аккаунта? Зарегистрироваться' 
                : 'Уже есть аккаунт? Войти'}
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/')}
            >
              ← Вернуться на главную
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

