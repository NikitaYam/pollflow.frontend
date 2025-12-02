import { Survey, User } from '../types/survey';

// Mock admin user
export const mockAdminUser: User = {
  id: 'admin-001',
  username: 'admin',
  token: 'mock-admin-token-12345'
};

// Mock demo user
export const mockDemoUser: User = {
  id: 'demo-001',
  username: 'demo',
  token: 'mock-demo-token-67890'
};

// Mock surveys
export const mockSurveys: Survey[] = [
  {
    id: 'SURVEY-001',
    title: 'Опрос об удовлетворенности клиентов',
    createdAt: '2024-11-25T10:00:00Z',
    creatorId: 'admin-001',
    questions: [
      {
        id: 'q1',
        question: 'Насколько вы удовлетворены нашим сервисом?',
        answers: [
          'Очень доволен',
          'Доволен',
          'Нейтрально',
          'Недоволен'
        ]
      },
      {
        id: 'q2',
        question: 'Порекомендуете ли вы нас своим друзьям?',
        answers: [
          'Определенно да',
          'Скорее да',
          'Скорее нет',
          'Определенно нет'
        ]
      },
      {
        id: 'q3',
        question: 'Что вам больше всего понравилось?',
        answers: [
          'Качество продукта',
          'Обслуживание',
          'Цены',
          'Удобство'
        ]
      }
    ]
  },
  {
    id: 'SURVEY-002',
    title: 'Опрос о рабочей среде',
    createdAt: '2024-11-26T14:30:00Z',
    creatorId: 'admin-001',
    questions: [
      {
        id: 'q1',
        question: 'Насколько комфортно вы чувствуете себя на рабочем месте?',
        answers: [
          'Очень комфортно',
          'Комфортно',
          'Не очень комфортно',
          'Некомфортно'
        ]
      },
      {
        id: 'q2',
        question: 'Довольны ли вы балансом работы и личной жизни?',
        answers: [
          'Да, полностью',
          'Скорее да',
          'Скорее нет',
          'Нет, совсем не доволен'
        ]
      }
    ]
  },
  {
    id: 'SURVEY-003',
    title: 'Опрос о новых технологиях',
    createdAt: '2024-11-27T09:15:00Z',
    creatorId: 'admin-001',
    questions: [
      {
        id: 'q1',
        question: 'Какие технологии вы используете чаще всего?',
        answers: [
          'Веб-технологии',
          'Мобильные приложения',
          'Облачные сервисы',
          'Искусственный интеллект'
        ]
      },
      {
        id: 'q2',
        question: 'Как часто вы изучаете новые технологии?',
        answers: [
          'Ежедневно',
          'Еженедельно',
          'Ежемесячно',
          'Редко'
        ]
      },
      {
        id: 'q3',
        question: 'Что вас больше всего интересует в IT?',
        answers: [
          'Программирование',
          'Дизайн',
          'Аналитика данных',
          'Кибербезопасность'
        ]
      },
      {
        id: 'q4',
        question: 'Предпочитаете ли вы работать удаленно?',
        answers: [
          'Да, только удаленно',
          'Гибридный формат',
          'Предпочитаю офис'
        ]
      }
    ]
  },
  {
    id: 'SURVEY-004',
    title: 'Быстрый опрос о предпочтениях',
    createdAt: '2024-11-28T16:45:00Z',
    creatorId: 'admin-001',
    questions: [
      {
        id: 'q1',
        question: 'Ваш любимый цвет?',
        answers: [
          'Синий',
          'Красный',
          'Зеленый',
          'Желтый'
        ]
      },
      {
        id: 'q2',
        question: 'Предпочитаете кофе или чай?',
        answers: [
          'Кофе',
          'Чай'
        ]
      }
    ]
  }
];

// Mock survey results
export const mockResults: { [surveyId: string]: any } = {
  'SURVEY-001': {
    surveyId: 'SURVEY-001',
    totalResponses: 247,
    questions: [
      {
        questionId: 'q1',
        question: 'Насколько вы удовлетворены нашим сервисом?',
        answers: [
          { text: 'Очень доволен', count: 120, percentage: 48.6 },
          { text: 'Доволен', count: 85, percentage: 34.4 },
          { text: 'Нейтрально', count: 30, percentage: 12.1 },
          { text: 'Недоволен', count: 12, percentage: 4.9 }
        ]
      },
      {
        questionId: 'q2',
        question: 'Порекомендуете ли вы нас своим друзьям?',
        answers: [
          { text: 'Определенно да', count: 140, percentage: 56.7 },
          { text: 'Скорее да', count: 75, percentage: 30.4 },
          { text: 'Скорее нет', count: 22, percentage: 8.9 },
          { text: 'Определенно нет', count: 10, percentage: 4.0 }
        ]
      },
      {
        questionId: 'q3',
        question: 'Что вам больше всего понравилось?',
        answers: [
          { text: 'Качество продукта', count: 95, percentage: 38.5 },
          { text: 'Обслуживание', count: 88, percentage: 35.6 },
          { text: 'Цены', count: 40, percentage: 16.2 },
          { text: 'Удобство', count: 24, percentage: 9.7 }
        ]
      }
    ]
  },
  'SURVEY-002': {
    surveyId: 'SURVEY-002',
    totalResponses: 156,
    questions: [
      {
        questionId: 'q1',
        question: 'Насколько комфортно вы чувствуете себя на рабочем месте?',
        answers: [
          { text: 'Очень комфортно', count: 65, percentage: 41.7 },
          { text: 'Комфортно', count: 70, percentage: 44.9 },
          { text: 'Не очень комфортно', count: 15, percentage: 9.6 },
          { text: 'Некомфортно', count: 6, percentage: 3.8 }
        ]
      },
      {
        questionId: 'q2',
        question: 'Довольны ли вы балансом работы и личной жизни?',
        answers: [
          { text: 'Да, полностью', count: 50, percentage: 32.1 },
          { text: 'Скорее да', count: 75, percentage: 48.1 },
          { text: 'Скорее нет', count: 25, percentage: 16.0 },
          { text: 'Нет, совсем не доволен', count: 6, percentage: 3.8 }
        ]
      }
    ]
  },
  'SURVEY-003': {
    surveyId: 'SURVEY-003',
    totalResponses: 89,
    questions: [
      {
        questionId: 'q1',
        question: 'Какие технологии вы используете чаще всего?',
        answers: [
          { text: 'Веб-технологии', count: 40, percentage: 44.9 },
          { text: 'Мобильные приложения', count: 25, percentage: 28.1 },
          { text: 'Облачные сервисы', count: 15, percentage: 16.9 },
          { text: 'Искусственный интеллект', count: 9, percentage: 10.1 }
        ]
      },
      {
        questionId: 'q2',
        question: 'Как часто вы изучаете новые технологии?',
        answers: [
          { text: 'Ежедневно', count: 35, percentage: 39.3 },
          { text: 'Еженедельно', count: 40, percentage: 44.9 },
          { text: 'Ежемесячно', count: 10, percentage: 11.2 },
          { text: 'Редко', count: 4, percentage: 4.5 }
        ]
      },
      {
        questionId: 'q3',
        question: 'Что вас больше всего интересует в IT?',
        answers: [
          { text: 'Программирование', count: 45, percentage: 50.6 },
          { text: 'Дизайн', count: 18, percentage: 20.2 },
          { text: 'Аналитика данных', count: 20, percentage: 22.5 },
          { text: 'Кибербезопасность', count: 6, percentage: 6.7 }
        ]
      },
      {
        questionId: 'q4',
        question: 'Предпочитаете ли вы работать удаленно?',
        answers: [
          { text: 'Да, только удаленно', count: 35, percentage: 39.3 },
          { text: 'Гибридный формат', count: 50, percentage: 56.2 },
          { text: 'Предпочитаю офис', count: 4, percentage: 4.5 }
        ]
      }
    ]
  },
  'SURVEY-004': {
    surveyId: 'SURVEY-004',
    totalResponses: 0,
    questions: [
      {
        questionId: 'q1',
        question: 'Ваш любимый цвет?',
        answers: [
          { text: 'Синий', count: 0, percentage: 0 },
          { text: 'Красный', count: 0, percentage: 0 },
          { text: 'Зеленый', count: 0, percentage: 0 },
          { text: 'Желтый', count: 0, percentage: 0 }
        ]
      },
      {
        questionId: 'q2',
        question: 'Предпочитаете кофе или чай?',
        answers: [
          { text: 'Кофе', count: 0, percentage: 0 },
          { text: 'Чай', count: 0, percentage: 0 }
        ]
      }
    ]
  }
};

// Demo credentials
export const DEMO_CREDENTIALS = {
  admin: {
    username: 'admin',
    password: 'admin',
    user: mockAdminUser
  },
  demo: {
    username: 'demo',
    password: 'demo',
    user: mockDemoUser
  }
};

