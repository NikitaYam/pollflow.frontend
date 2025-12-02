import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import { Survey } from '../types/survey';
import '../styles/App.css';

const DashboardPage: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<{ username: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/auth');
      return;
    }

    setUser(JSON.parse(userData));
    loadSurveys();
  }, [navigate]);

  const loadSurveys = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setLoading(true);
      const data = await apiService.getMySurveys(token);
      setSurveys(data);
    } catch (err) {
      setError('Не удалось загрузить опросы');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleDelete = async (surveyId: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот опрос?')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await apiService.deleteSurvey(surveyId, token);
      setSurveys(surveys.filter(s => s.id !== surveyId));
    } catch (err) {
      alert('Ошибка при удалении опроса');
      console.error(err);
    }
  };

  const copyToClipboard = (surveyId: string) => {
    navigator.clipboard.writeText(surveyId);
    alert(`ID опроса скопирован: ${surveyId}`);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Загрузка опросов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <h1>📊 Мои опросы</h1>
        <p>Управление созданными опросами</p>
        {user && (
          <div style={{ marginTop: '10px', fontSize: '0.9em', opacity: 0.9 }}>
            Пользователь: <strong>{user.username}</strong>
          </div>
        )}
      </header>

      <div className="main-content">
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/constructor')}
          >
            ➕ Создать новый опрос
          </button>
          <button 
            className="btn btn-outline"
            onClick={handleLogout}
          >
            🚪 Выход
          </button>
        </div>

        {error && (
          <div className="message message-error">
            {error}
          </div>
        )}

        {surveys.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            background: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '3em', marginBottom: '20px' }}>📝</div>
            <h3 style={{ color: '#666', marginBottom: '10px' }}>У вас пока нет опросов</h3>
            <p style={{ color: '#999', marginBottom: '30px' }}>
              Создайте свой первый опрос, чтобы начать работу
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/constructor')}
            >
              Создать опрос
            </button>
          </div>
        ) : (
          <div>
            <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>
              Всего опросов: {surveys.length}
            </h3>
            {surveys.map((survey, index) => (
              <div key={survey.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '20px' }}>
                  <div style={{ flex: '1' }}>
                    <h3 style={{ marginBottom: '10px' }}>
                      {index + 1}. {survey.title}
                    </h3>
                    <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '10px' }}>
                      Вопросов: {survey.questions.length}
                    </p>
                    <div style={{ 
                      background: '#e9ecef', 
                      padding: '8px 12px', 
                      borderRadius: '4px',
                      fontSize: '0.85em',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span>ID: <strong>{survey.id}</strong></span>
                      <button
                        onClick={() => copyToClipboard(survey.id)}
                        style={{
                          background: '#3498db',
                          color: 'white',
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.9em'
                        }}
                      >
                        📋 Копировать
                      </button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/survey/${survey.id}`)}
                      style={{ padding: '8px 16px', fontSize: '0.9em' }}
                    >
                      👁️ Просмотр
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => navigate(`/results/${survey.id}`)}
                      style={{ padding: '8px 16px', fontSize: '0.9em' }}
                    >
                      📊 Результаты
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(survey.id)}
                      style={{ padding: '8px 16px', fontSize: '0.9em' }}
                    >
                      🗑️ Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

