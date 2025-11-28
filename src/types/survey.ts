export interface SurveyRequest {
  theme: string;
  questionCount: number;
  answersPerQuestion: number;
}

export interface Question {
  question: string;
  answers: string[];
}

export interface SurveyResponse {
  questions: Question[];
  processingTimeMs?: number;
  provider?: string;
  errorMessage?: string;
}

export interface HealthResponse {
  status: string;
  model?: string;
  pythonService?: string;
  timestamp?: number;
}