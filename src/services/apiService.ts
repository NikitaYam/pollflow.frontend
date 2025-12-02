import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse,
  Survey,
  CreateSurveyRequest,
  SurveyResponse,
  SurveyAnswerSubmission,
  SurveyResultsResponse,
  HealthResponse,
  AIGenerateSurveyRequest,
  AIGenerateSurveyResponse
} from '../types/survey';
import { DEMO_CREDENTIALS, mockSurveys, mockResults } from './mockData';

const API_BASE_URL = 'http://localhost:8080/api/v1';
const LLM_API_BASE_URL = 'http://localhost:8080/api/v1/llm';

// Enable demo mode (set to true to use mock data without backend)
const DEMO_MODE = false;

class ApiService {
  // Helper to simulate network delay
  private async simulateDelay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Authentication methods
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    // Demo mode
    if (DEMO_MODE) {
      await this.simulateDelay();
      
      const demoUser = Object.values(DEMO_CREDENTIALS).find(
        cred => cred.username === credentials.username && cred.password === credentials.password
      );

      if (demoUser) {
        return {
          user: demoUser.user,
          token: demoUser.user.token!,
          message: 'Login successful (Demo Mode)'
        };
      } else {
        throw new Error('Неверное имя пользователя или пароль. Попробуйте: admin/admin или demo/demo');
      }
    }

    // Real API call
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return await response.json();
  }

  async register(credentials: RegisterRequest): Promise<AuthResponse> {
    // Demo mode
    if (DEMO_MODE) {
      await this.simulateDelay();
      
      // Check if username already exists
      if (Object.values(DEMO_CREDENTIALS).some(cred => cred.username === credentials.username)) {
        throw new Error('Пользователь уже существует');
      }

      // Create new demo user
      const newUser = {
        id: `user-${Date.now()}`,
        username: credentials.username,
        token: `mock-token-${Date.now()}`
      };

      return {
        user: newUser,
        token: newUser.token,
        message: 'Registration successful (Demo Mode)'
      };
    }

    // Real API call
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return await response.json();
  }

  // Survey Creator methods
  async getMySurveys(token: string): Promise<Survey[]> {
    // Demo mode
    if (DEMO_MODE) {
      await this.simulateDelay(300);
      return [...mockSurveys];
    }

    // Real API call
    const response = await fetch(`${API_BASE_URL}/surveys/my`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch surveys');
    }

    return await response.json();
  }

  async createSurvey(surveyData: CreateSurveyRequest, token: string): Promise<SurveyResponse> {
    // Demo mode
    if (DEMO_MODE) {
      await this.simulateDelay(800);
      
      const newSurvey: Survey = {
        id: `SURVEY-${String(mockSurveys.length + 1).padStart(3, '0')}`,
        title: surveyData.title,
        questions: surveyData.questions.map((q, idx) => ({
          id: `q${idx + 1}`,
          question: q.question,
          answers: q.answers
        })),
        createdAt: new Date().toISOString(),
        creatorId: 'admin-001'
      };

      mockSurveys.push(newSurvey);

      return {
        survey: newSurvey,
        message: 'Survey created successfully (Demo Mode)'
      };
    }

    // Real API call
    const response = await fetch(`${API_BASE_URL}/surveys/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(surveyData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create survey');
    }

    return await response.json();
  }

  async deleteSurvey(surveyId: string, token: string): Promise<void> {
    // Demo mode
    if (DEMO_MODE) {
      await this.simulateDelay(300);
      const index = mockSurveys.findIndex(s => s.id === surveyId);
      if (index > -1) {
        mockSurveys.splice(index, 1);
      }
      return;
    }

    // Real API call
    const response = await fetch(`${API_BASE_URL}/surveys/${surveyId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete survey');
    }
  }

  // Public survey methods
  async getSurveyById(surveyId: string): Promise<Survey> {
    // Demo mode
    if (DEMO_MODE) {
      await this.simulateDelay(400);
      const survey = mockSurveys.find(s => s.id === surveyId);
      if (!survey) {
        throw new Error('Survey not found');
      }
      return { ...survey };
    }

    // Real API call
    const response = await fetch(`${API_BASE_URL}/surveys/${surveyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Survey not found');
    }

    return await response.json();
  }

  async submitSurveyAnswers(submission: SurveyAnswerSubmission): Promise<void> {
    // Demo mode
    if (DEMO_MODE) {
      await this.simulateDelay(600);
      console.log('Survey answers submitted (Demo Mode):', submission);
      
      // Update mock results
      if (mockResults[submission.surveyId]) {
        mockResults[submission.surveyId].totalResponses += 1;
        submission.answers.forEach((answer, qIndex) => {
          const question = mockResults[submission.surveyId].questions[qIndex];
          if (question) {
            question.answers[answer.selectedAnswerIndex].count += 1;
            // Recalculate percentages
            const total = mockResults[submission.surveyId].totalResponses;
            question.answers.forEach((ans: any) => {
              ans.percentage = parseFloat(((ans.count / total) * 100).toFixed(1));
            });
          }
        });
      }
      return;
    }

    // Real API call
    const response = await fetch(`${API_BASE_URL}/surveys/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission)
    });

    if (!response.ok) {
      throw new Error('Failed to submit answers');
    }
  }

  async getSurveyResults(surveyId: string): Promise<SurveyResultsResponse> {
    // Demo mode
    if (DEMO_MODE) {
      await this.simulateDelay(400);
      const results = mockResults[surveyId];
      if (!results) {
        // Return empty results if no data yet
        const survey = mockSurveys.find(s => s.id === surveyId);
        if (survey) {
          return {
            surveyId,
            totalResponses: 0,
            questions: survey.questions.map(q => ({
              questionId: q.id || '',
              question: q.question,
              answers: q.answers.map(a => ({
                text: a,
                count: 0,
                percentage: 0
              }))
            }))
          };
        }
        throw new Error('Survey not found');
      }
      return { ...results };
    }

    // Real API call
    const response = await fetch(`${API_BASE_URL}/surveys/${surveyId}/results`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch results');
    }

    return await response.json();
  }

  // Health check
  async checkHealth(): Promise<HealthResponse> {
    // Demo mode
    if (DEMO_MODE) {
      await this.simulateDelay(200);
      return {
        status: 'HEALTHY (Demo Mode)',
        timestamp: Date.now()
      };
    }

    // Real API call
    const response = await fetch(`${API_BASE_URL}/health`);
    
    if (!response.ok) {
      throw new Error('Health check failed');
    }
    
    return await response.json();
  }

  // AI Survey Generation
  async generateSurveyWithAI(request: AIGenerateSurveyRequest): Promise<AIGenerateSurveyResponse> {
    // Demo mode
    if (DEMO_MODE) {
      await this.simulateDelay(2000); // Simulate longer AI processing time
      
      // Mock AI-generated survey based on theme
      const mockQuestions = this.generateMockAIQuestions(request.theme, request.questionCount, request.answersPerQuestion);
      
      return {
        questions: mockQuestions,
        provider: 'Mixtral 8x7B (Demo)',
        processingTimeMs: 2000
      };
    }

    // Real API call to LLM service (via backend)
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${LLM_API_BASE_URL}/generate-survey`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errorMessage || 'Failed to generate survey with AI');
    }

    return await response.json();
  }

  // Helper method to generate mock AI questions for demo mode
  private generateMockAIQuestions(theme: string, questionCount: number, answersPerQuestion: number): any[] {
    const questions = [];
    
    // Generate questions based on theme
    for (let i = 0; i < questionCount; i++) {
      const questionNumber = i + 1;
      const question = {
        question: `${theme} - Вопрос ${questionNumber}: Как вы оцениваете это направление?`,
        answers: [] as string[]
      };
      
      // Generate answers
      for (let j = 0; j < answersPerQuestion; j++) {
        const answerOptions = [
          'Отлично',
          'Хорошо', 
          'Удовлетворительно',
          'Плохо',
          'Очень плохо',
          'Определенно да',
          'Скорее да',
          'Скорее нет',
          'Определенно нет',
          'Полностью согласен',
          'Согласен',
          'Нейтрально',
          'Не согласен',
          'Совершенно не согласен'
        ];
        question.answers.push(answerOptions[j % answerOptions.length]);
      }
      
      questions.push(question);
    }
    
    return questions;
  }
}

export default new ApiService();

