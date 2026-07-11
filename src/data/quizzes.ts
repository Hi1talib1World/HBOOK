export interface QuizQuestion {
  id: string;
  flagUrl: string;
  options: string[];
  correctAnswer: string;
}

export const flagQuizzes: QuizQuestion[] = [
  {
    id: 'q1',
    flagUrl: 'https://flagcdn.com/w320/br.png',
    options: ['Argentina', 'Brazil', 'Colombia', 'Chile'],
    correctAnswer: 'Brazil'
  },
  {
    id: 'q2',
    flagUrl: 'https://flagcdn.com/w320/jp.png',
    options: ['China', 'South Korea', 'Japan', 'Vietnam'],
    correctAnswer: 'Japan'
  },
  {
    id: 'q3',
    flagUrl: 'https://flagcdn.com/w320/ca.png',
    options: ['USA', 'Canada', 'Australia', 'New Zealand'],
    correctAnswer: 'Canada'
  },
  {
    id: 'q4',
    flagUrl: 'https://flagcdn.com/w320/eg.png',
    options: ['Egypt', 'Morocco', 'Saudi Arabia', 'Iran'],
    correctAnswer: 'Egypt'
  },
  {
    id: 'q5',
    flagUrl: 'https://flagcdn.com/w320/fr.png',
    options: ['Italy', 'Germany', 'France', 'Netherlands'],
    correctAnswer: 'France'
  }
];
