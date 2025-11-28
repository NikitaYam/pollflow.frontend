import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Mixtral 8x7B обрабатывает запрос. Это может занять 30-60 секунд...</p>
      <div className="model-info-small">
        <span>Модель: Mixtral 8x7B</span>
        <span>Контекст: 32K токенов</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;