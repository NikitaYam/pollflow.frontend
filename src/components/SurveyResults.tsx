import React from 'react';

interface Question {
  question: string;
  answers: string[];
}

interface SurveyResultsProps {
  data: {
    questions: Question[];
    processingTimeMs?: number;
    provider?: string;
    errorMessage?: string;
  };
}

const SurveyResults: React.FC<SurveyResultsProps> = ({ data }) => {
  if (!data.questions || data.questions.length === 0) {
    return null;
  }

  const processingTime = data.processingTimeMs ? `${data.processingTimeMs}мс` : 'неизвестно';
  const provider = data.provider || 'Mixtral 8x7B';

  return (
    <div className="results">
      <div className="success-header">
        <h2>✅ Mixtral сгенерировал {data.questions.length} вопросов</h2>
        <div className="meta-info">
          <span>Время: {processingTime}</span>
          <span>Модель: {provider}</span>
          <span>Источник: Serveo туннель</span>
        </div>
      </div>

      {data.questions.map((question, index) => (
        <div key={index} className="question">
          <h3>{index + 1}. {question.question}</h3>
          <div className="answers">
            {question.answers.map((answer, ansIndex) => (
              <div key={ansIndex} className="answer-option">
                <span className="option-letter">
                  {String.fromCharCode(65 + ansIndex)}
                </span>
                {answer}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SurveyResults;