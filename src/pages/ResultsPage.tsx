import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import { SurveyResultsResponse } from '../types/survey';
import '../styles/App.css';

const ResultsPage: React.FC = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const [results, setResults] = useState<SurveyResultsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (surveyId) {
      loadResults();
    }
  }, [surveyId]);

  const loadResults = async () => {
    if (!surveyId) return;

    try {
      setLoading(true);
      const data = await apiService.getSurveyResults(surveyId);
      setResults(data);
    } catch (err) {
      setError('Не удалось загрузить результаты опроса');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getMaxPercentage = (answers: { percentage: number }[]) => {
    return Math.max(...answers.map(a => a.percentage));
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Загрузка результатов...</p>
        </div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="container">
        <header>
          <h1>❌ Ошибка</h1>
        </header>
        <div className="main-content">
          <div className="message message-error">
            {error || 'Результаты не найдены'}
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              ← Вернуться на главную
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <h1>📊 Результаты опроса</h1>
        <p>Статистика ответов</p>
      </header>

      <div className="main-content">
        <div className="message message-info" style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '10px' }}>📈 Общая статистика</h3>
          <p style={{ fontSize: '1.1em', margin: 0 }}>
            Всего ответов: <strong>{results.totalResponses}</strong>
          </p>
          <p style={{ fontSize: '0.9em', marginTop: '5px', opacity: 0.8 }}>
            ID опроса: {results.surveyId}
          </p>
        </div>

        {results.totalResponses === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            background: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '3em', marginBottom: '20px' }}>📭</div>
            <h3 style={{ color: '#666', marginBottom: '10px' }}>Пока нет ответов</h3>
            <p style={{ color: '#999' }}>
              Результаты появятся после того, как кто-то пройдет этот опрос
            </p>
          </div>
        ) : (
          <div>
            {results.questions.map((question, qIndex) => (
              <div key={qIndex} className="card" style={{ marginBottom: '30px', background: 'white', border: '2px solid #e9ecef' }}>
                <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>
                  {qIndex + 1}. {question.question}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {question.answers.map((answer, aIndex) => {
                    const maxPercentage = getMaxPercentage(question.answers);
                    const isTopAnswer = answer.percentage === maxPercentage && answer.count > 0;
                    
                    return (
                      <div key={aIndex}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          marginBottom: '8px',
                          alignItems: 'center'
                        }}>
                          <span style={{ 
                            fontWeight: isTopAnswer ? 600 : 400,
                            color: isTopAnswer ? '#2c3e50' : '#666'
                          }}>
                            {answer.text}
                            {isTopAnswer && ' 🏆'}
                          </span>
                          <span style={{ 
                            fontWeight: 600,
                            color: isTopAnswer ? '#27ae60' : '#666',
                            fontSize: '1.1em'
                          }}>
                            {answer.percentage}% ({answer.count})
                          </span>
                        </div>
                        
                        <div style={{
                          width: '100%',
                          height: '30px',
                          background: '#e9ecef',
                          borderRadius: '15px',
                          overflow: 'hidden',
                          position: 'relative'
                        }}>
                          <div style={{
                            width: `${answer.percentage}%`,
                            height: '100%',
                            background: isTopAnswer 
                              ? 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)'
                              : 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                            transition: 'width 0.5s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            paddingRight: '10px',
                            color: 'white',
                            fontSize: '0.9em',
                            fontWeight: 600
                          }}>
                            {answer.percentage > 10 && `${answer.percentage}%`}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', marginTop: '30px', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-outline"
            onClick={() => navigate('/')}
            style={{ flex: '1', minWidth: '150px' }}
          >
            ← На главную
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate(`/survey/${surveyId}`)}
            style={{ flex: '1', minWidth: '150px' }}
          >
            📝 Пройти опрос
          </button>
          <button 
            className="btn btn-primary"
            onClick={loadResults}
            style={{ flex: '1', minWidth: '150px' }}
          >
            🔄 Обновить данные
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;

