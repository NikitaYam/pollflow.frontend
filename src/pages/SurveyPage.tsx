import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import { Survey } from '../types/survey';
import '../styles/App.css';

const SurveyPage: React.FC = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (surveyId) {
      loadSurvey();
    }
  }, [surveyId]);

  const loadSurvey = async () => {
    if (!surveyId) return;

    try {
      setLoading(true);
      const data = await apiService.getSurveyById(surveyId);
      setSurvey(data);
    } catch (err) {
      setError('Опрос не найден или недоступен');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const handleSubmit = async () => {
    if (!survey || !surveyId) return;

    // Check if all questions are answered
    for (let i = 0; i < survey.questions.length; i++) {
      if (selectedAnswers[i] === undefined) {
        setError(`Пожалуйста, ответьте на вопрос ${i + 1}`);
        return;
      }
    }

    setSubmitting(true);
    setError('');

    try {
      const answers = survey.questions.map((q, index) => ({
        questionId: q.id || `q${index}`,
        selectedAnswerIndex: selectedAnswers[index]
      }));

      await apiService.submitSurveyAnswers({
        surveyId,
        answers
      });

      setSubmitted(true);
    } catch (err) {
      setError('Не удалось отправить ответы. Попробуйте снова.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Загрузка опроса...</p>
        </div>
      </div>
    );
  }

  if (error && !survey) {
    return (
      <div className="container">
        <header>
          <h1>❌ Ошибка</h1>
        </header>
        <div className="main-content">
          <div className="message message-error">
            {error}
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

  if (submitted) {
    return (
      <div className="container">
        <header>
          <h1>✅ Спасибо!</h1>
          <p>Ваши ответы сохранены</p>
        </header>
        <div className="main-content">
          <div className="message message-success">
            <h3>Опрос успешно пройден!</h3>
            <p style={{ marginTop: '10px' }}>Спасибо за участие в опросе "{survey?.title}"</p>
          </div>
          <div style={{ textAlign: 'center', marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              ← На главную
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(`/results/${surveyId}`)}>
              📊 Посмотреть результаты
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <h1>📝 {survey?.title}</h1>
        <p>Пожалуйста, ответьте на все вопросы</p>
      </header>

      <div className="main-content">
        {survey && (
          <div>
            <div style={{ marginBottom: '20px', padding: '15px', background: '#e3f2fd', borderRadius: '8px' }}>
              <p style={{ color: '#1565c0', margin: 0 }}>
                📋 Вопросов: {survey.questions.length} | 
                Отвечено: {Object.keys(selectedAnswers).length}/{survey.questions.length}
              </p>
            </div>

            {survey.questions.map((question, qIndex) => (
              <div key={qIndex} className="card" style={{ marginBottom: '25px', background: 'white', border: '2px solid #e9ecef' }}>
                <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>
                  {qIndex + 1}. {question.question}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {question.answers.map((answer, aIndex) => (
                    <div
                      key={aIndex}
                      onClick={() => handleAnswerSelect(qIndex, aIndex)}
                      style={{
                        padding: '15px',
                        border: `2px solid ${selectedAnswers[qIndex] === aIndex ? '#3498db' : '#dee2e6'}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: selectedAnswers[qIndex] === aIndex ? '#e3f2fd' : 'white',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: `2px solid ${selectedAnswers[qIndex] === aIndex ? '#3498db' : '#dee2e6'}`,
                        background: selectedAnswers[qIndex] === aIndex ? '#3498db' : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {selectedAnswers[qIndex] === aIndex && (
                          <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: 'white'
                          }} />
                        )}
                      </div>
                      <span style={{ 
                        color: selectedAnswers[qIndex] === aIndex ? '#2c3e50' : '#666',
                        fontWeight: selectedAnswers[qIndex] === aIndex ? 600 : 400
                      }}>
                        {answer}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {error && (
              <div className="message message-error">
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
              <button 
                className="btn btn-outline"
                onClick={() => navigate('/')}
                disabled={submitting}
                style={{ flex: '1' }}
              >
                ← Назад
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={submitting || Object.keys(selectedAnswers).length !== survey.questions.length}
                style={{ flex: '2' }}
              >
                {submitting ? 'Отправка...' : '✅ Отправить ответы'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyPage;

