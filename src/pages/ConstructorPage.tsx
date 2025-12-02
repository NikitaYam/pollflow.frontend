import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import { Question } from '../types/survey';
import '../styles/App.css';

const ConstructorPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { question: '', answers: ['', ''] }
  ]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState('');
  const [aiSuccess, setAiSuccess] = useState(false);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answers: ['', ''] }]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length === 1) {
      alert('Должен быть хотя бы один вопрос');
      return;
    }
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, text: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = text;
    setQuestions(newQuestions);
  };

  const addAnswer = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.push('');
    setQuestions(newQuestions);
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].answers.length === 2) {
      alert('Должно быть минимум 2 варианта ответа');
      return;
    }
    newQuestions[questionIndex].answers = newQuestions[questionIndex].answers.filter((_, i) => i !== answerIndex);
    setQuestions(newQuestions);
  };

  const updateAnswer = (questionIndex: number, answerIndex: number, text: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = text;
    setQuestions(newQuestions);
  };

  const handleGenerateWithAI = async () => {
    // Validation: title must be filled
    if (!title.trim()) {
      setError('Введите тему опроса для генерации с помощью AI');
      return;
    }

    if (title.length < 3) {
      setError('Тема должна содержать минимум 3 символа');
      return;
    }

    setAiLoading(true);
    setError('');
    setAiSuccess(false);

    try {
      const response = await apiService.generateSurveyWithAI({
        theme: title,
        questionCount: 3, // Default to 3 questions
        answersPerQuestion: 4 // Default to 4 answers per question
      });

      if (response.errorMessage) {
        throw new Error(response.errorMessage);
      }

      // Auto-fill the questions and answers from AI response
      const aiQuestions: Question[] = response.questions.map(q => ({
        question: q.question,
        answers: q.answers
      }));

      setQuestions(aiQuestions);
      setAiSuccess(true);
      
      // Show success message briefly
      setTimeout(() => setAiSuccess(false), 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при генерации опроса с AI');
      console.error('AI Generation Error:', err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      setError('Введите название опроса');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].question.trim()) {
        setError(`Вопрос ${i + 1} не заполнен`);
        return;
      }
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].trim()) {
          setError(`Вопрос ${i + 1}, вариант ответа ${j + 1} не заполнен`);
          return;
        }
      }
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await apiService.createSurvey({ title, questions }, token);
      alert(`Опрос создан! ID: ${response.survey.id}`);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при создании опроса');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>🛠️ Конструктор опроса</h1>
        <p>Создайте свой опрос</p>
      </header>

      <div className="main-content">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="input-group">
            <label htmlFor="title">Название опроса:</label>
            <input
              id="title"
              type="text"
              className="input-field"
              placeholder="Например: Опрос о качестве обслуживания"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
                setAiSuccess(false);
              }}
              disabled={loading || aiLoading}
            />
          </div>

          {/* AI Generation Button */}
          <div style={{ marginBottom: '30px', marginTop: '15px' }}>
            <button
              className="btn btn-secondary"
              onClick={handleGenerateWithAI}
              disabled={loading || aiLoading || !title.trim()}
              style={{ 
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                position: 'relative'
              }}
            >
              {aiLoading ? (
                <>
                  <div className="spinner" style={{ 
                    width: '20px', 
                    height: '20px', 
                    borderWidth: '3px',
                    margin: 0 
                  }}></div>
                  <span>🤖 AI генерирует опрос...</span>
                </>
              ) : (
                <>
                  <span>🤖 Создать с помощью AI</span>
                </>
              )}
            </button>
            <p style={{ 
              textAlign: 'center', 
              fontSize: '0.85em', 
              color: '#666', 
              marginTop: '8px' 
            }}>
              {title.trim() 
                ? '💡 AI создаст вопросы на основе темы опроса' 
                : '⚠️ Сначала введите тему опроса'}
            </p>
          </div>

          {/* AI Success Message */}
          {aiSuccess && (
            <div className="message message-success" style={{ marginBottom: '20px' }}>
              ✨ Опрос успешно сгенерирован с помощью AI! Можете редактировать вопросы и ответы.
            </div>
          )}

          <div style={{ marginTop: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>Вопросы:</h3>
              <button 
                className="btn btn-primary"
                onClick={addQuestion}
                disabled={loading || aiLoading}
                style={{ padding: '10px 20px', fontSize: '0.9em' }}
              >
                ➕ Добавить вопрос
              </button>
            </div>

            {questions.map((q, qIndex) => (
              <div key={qIndex} className="card" style={{ marginBottom: '20px', background: 'white', border: '2px solid #e9ecef' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                  <h4 style={{ color: '#2c3e50' }}>Вопрос {qIndex + 1}</h4>
                  {questions.length > 1 && (
                    <button
                      className="btn btn-danger"
                      onClick={() => removeQuestion(qIndex)}
                      disabled={loading || aiLoading}
                      style={{ padding: '6px 12px', fontSize: '0.85em' }}
                    >
                      🗑️ Удалить
                    </button>
                  )}
                </div>

                <div className="input-group">
                  <label>Текст вопроса:</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Введите ваш вопрос"
                    value={q.question}
                    onChange={(e) => updateQuestion(qIndex, e.target.value)}
                    disabled={loading || aiLoading}
                  />
                </div>

                <div style={{ marginTop: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ fontWeight: 600, color: '#2c3e50' }}>Варианты ответов:</label>
                    <button
                      onClick={() => addAnswer(qIndex)}
                      disabled={loading || aiLoading}
                      style={{
                        background: '#3498db',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.85em'
                      }}
                    >
                      ➕ Добавить вариант
                    </button>
                  </div>

                  {q.answers.map((answer, aIndex) => (
                    <div key={aIndex} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                      <input
                        type="text"
                        className="input-field"
                        placeholder={`Вариант ${aIndex + 1}`}
                        value={answer}
                        onChange={(e) => updateAnswer(qIndex, aIndex, e.target.value)}
                        disabled={loading || aiLoading}
                        style={{ flex: '1' }}
                      />
                      {q.answers.length > 2 && (
                        <button
                          onClick={() => removeAnswer(qIndex, aIndex)}
                          disabled={loading || aiLoading}
                          style={{
                            background: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            padding: '10px 15px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          ✖
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className="message message-error">
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
            <button 
              className="btn btn-outline"
              onClick={() => navigate('/dashboard')}
              disabled={loading || aiLoading}
              style={{ flex: '1' }}
            >
              ← Отмена
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading || aiLoading}
              style={{ flex: '2' }}
            >
              {loading ? 'Создание...' : '✅ Создать опрос'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructorPage;

