import { HealthResponse, SurveyRequest, SurveyResponse } from "types/survey";

const API_BASE_URL = 'http://localhost:8080/api/v1/llm';

class LLMService {
  async generateSurvey(theme: string, questionCount: number, answersPerQuestion: number): Promise<SurveyResponse> {
    const requestData: SurveyRequest = {
      theme,
      questionCount,
      answersPerQuestion
    };

    console.log('🚀 Sending request to:', `${API_BASE_URL}/generate-survey`);
    console.log('📦 Request data:', requestData);

    try {
      const response = await fetch(`${API_BASE_URL}/generate-survey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Response data:', data);
      return data;

    } catch (error) {
      console.error('💥 Fetch error:', error);
      throw error;
    }
  }

  async checkHealth(): Promise<HealthResponse> {
    console.log('🏥 Health check to:', `${API_BASE_URL}/health`);
    
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      console.log('🏥 Health response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('🏥 Health data:', data);
      return data;
    } catch (error) {
      console.error('🏥 Health check error:', error);
      throw error;
    }
  }
}
export default new LLMService();