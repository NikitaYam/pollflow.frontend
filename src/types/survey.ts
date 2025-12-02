// Survey question structure
export interface Question {
  id?: string;
  question: string;
  answers: string[];
}

// Survey structure
export interface Survey {
  id: string;
  title: string;
  questions: Question[];
  createdAt?: string;
  creatorId?: string;
}

// User structure
export interface User {
  id: string;
  username: string;
  token?: string;
}

// Authentication requests
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

// Survey requests
export interface CreateSurveyRequest {
  title: string;
  questions: Question[];
}

export interface SurveyResponse {
  survey: Survey;
  message?: string;
}

// Survey answer submission
export interface SurveyAnswerSubmission {
  surveyId: string;
  answers: {
    questionId: string;
    selectedAnswerIndex: number;
  }[];
}

export interface SurveyResultsResponse {
  surveyId: string;
  totalResponses: number;
  questions: {
    questionId: string;
    question: string;
    answers: {
      text: string;
      count: number;
      percentage: number;
    }[];
  }[];
}

// Health check
export interface HealthResponse {
  status: string;
  timestamp?: number;
}

// AI Survey Generation
export interface AIGenerateSurveyRequest {
  theme: string;
  questionCount: number;
  answersPerQuestion: number;
}

export interface AIGenerateSurveyResponse {
  questions: Question[];
  errorMessage?: string;
  provider?: string;
  processingTimeMs?: number;
}

