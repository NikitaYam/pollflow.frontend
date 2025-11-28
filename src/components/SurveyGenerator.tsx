import React, { useState, useEffect } from 'react';
import llmService from '../services/llmService';
import LoadingSpinner from './LoadingSpinner';
import SurveyResults from './SurveyResults';

interface SurveyData {
  questions: Array<{
    question: string;
    answers: string[];
  }>;
  processingTimeMs?: number;
  provider?: string;
  errorMessage?: string;
}

const SurveyGenerator: React.FC = () => {
  const [theme, setTheme] = useState('');
  const [questionCount, setQuestionCount] = useState(3);
  const [answersCount, setAnswersCount] = useState(2);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SurveyData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'checking' | 'healthy' | 'unhealthy'>('checking');

  useEffect(() => {
    checkServerStatus();
    const interval = setInterval(checkServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkServerStatus = async () => {
    try {
      const health = await llmService.checkHealth();
      setServerStatus(health.status === 'HEALTHY' ? 'healthy' : 'unhealthy');
    } catch (err) {
      setServerStatus('unhealthy');
    }
  };

  const handleGenerate = async () => {
    if (!theme.trim()) {
      setError('Пожалуйста, введите тему для опроса');
      return;
    }

    if (theme.length < 3) {
      setError('Тема должна содержать至少 3 символа');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await llmService.generateSurvey(theme, questionCount, answersCount);
      
      if (response.errorMessage) {
        throw new Error(response.errorMessage);
      }

      setResults(response);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return 'Mixtral долго генерирует ответ. Попробуйте более простую тему.';
      }
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        return 'Не удалось подключиться к серверу. Проверьте что Serveo туннель активен.';
      }
      
      return error.message;
    }
    
    return 'Произошла неизвестная ошибка';
  };

   const getApiBaseUrl = (): string => {
//   if (import.meta.env.PROD) {
//     return 'https://08bb7e855662692352b2bdf84ba20f45.serveo.net/api/v1/llm';
//   }
  return 'http://localhost:8080/api/v1/llm'; // для разработки
};

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <div className="main-content">
      <div className="input-section">
        <div className="input-group">
          <label htmlFor="themeInput">Тема опроса:</label>
          <input
            id="themeInput"
            type="text"
            className="theme-input"
            placeholder="Например: цифровая трансформация, корпоративная этика, инновации..."
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        
        <div className="settings">
          <div className="setting-group">
            <label htmlFor="questionCount">Количество вопросов:</label>
            <select
              id="questionCount"
              className="select-input"
              value={questionCount}
              onChange={(e) => setQuestionCount(parseInt(e.target.value))}
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          
          <div className="setting-group">
            <label htmlFor="answersCount">Ответов на вопрос:</label>
            <select
              id="answersCount"
              className="select-input"
              value={answersCount}
              onChange={(e) => setAnswersCount(parseInt(e.target.value))}
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
        
        <button 
          className="generate-button"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? '⏳ Mixtral генерирует...' : '🚀 Сгенерировать опрос (Mixtral)'}
        </button>
      </div>

      {loading && <LoadingSpinner />}

      {error && (
        <div className="error">
          <h3>❌ Ошибка</h3>
          <p dangerouslySetInnerHTML={{ __html: error }} />
          <div className="error-details">
            <strong>Решение:</strong> Убедитесь что команда <code>ssh -R pollflow:80:localhost:8080 serveo.net</code> запущена
          </div>
        </div>
      )}

      {results && <SurveyResults data={results} />}

      <footer>
        <div className="server-status">
          <span>
            {serverStatus === 'healthy' && 'Mixtral 8x7B доступен'}
            {serverStatus === 'unhealthy' && 'Mixtral недоступен'}
            {serverStatus === 'checking' && 'Проверка соединения...'}
          </span>
          <div className={`status-indicator ${serverStatus}`}></div>
        </div>
        <div className="tech-info">
          Powered by Mixtral 8x7B • Spring Boot • FastAPI • Serveo
        </div>
      </footer>
    </div>
  );
};

export default SurveyGenerator;