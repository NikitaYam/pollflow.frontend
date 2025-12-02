import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const EnterNumberPage: React.FC = () => {
  const [surveyNumber, setSurveyNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!surveyNumber.trim()) {
      setError('Пожалуйста, введите номер опроса');
      return;
    }

    // Navigate to survey page with the survey ID
    navigate(`/survey/${surveyNumber}`);
  };

  return (
    <div className="container">
      <header>
        <h1>🔢 Номер опроса</h1>
        <p>Введите номер опроса для прохождения</p>
      </header>

      <div className="main-content">
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="surveyNumber">Номер опроса:</label>
              <input
                id="surveyNumber"
                type="text"
                className="input-field"
                placeholder="Например: 12345 или SURVEY-001"
                value={surveyNumber}
                onChange={(e) => {
                  setSurveyNumber(e.target.value);
                  setError('');
                }}
                autoFocus
              />
            </div>

            {error && (
              <div className="message message-error">
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
              <button 
                type="button"
                className="btn btn-outline"
                onClick={() => navigate('/')}
                style={{ flex: '1' }}
              >
                ← Назад
              </button>
              <button 
                type="submit"
                className="btn btn-primary"
                style={{ flex: '2' }}
              >
                Перейти к опросу →
              </button>
            </div>
          </form>

          <div style={{ 
            marginTop: '40px', 
            padding: '20px', 
            background: '#f8f9fa', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#666', fontSize: '0.9em' }}>
              💡 <strong>Подсказка:</strong> Номер опроса вам должен предоставить создатель опроса
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterNumberPage;

