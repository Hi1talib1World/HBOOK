import React, { useState, useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage, IonHeader, IonToolbar, IonIcon, IonFab, IonFabButton, IonButton } from '@ionic/react';
import { globe, settings, bulb, arrowForward } from 'ionicons/icons';
import { countries } from '../data/countries';
import { useUser } from '../context/UserContext';
import './FlagQuiz.css';

interface QuizQuestion {
  countryName: string;
  correctAnswer: string;
  options: string[];
}

const CurrencyQuiz: React.FC<RouteComponentProps> = ({ history }) => {
  const { addXp, xp, updateQuizScore } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  // Procedurally generate the quiz
  useEffect(() => {
    // Shuffle all countries and pick 5
    const shuffledCountries = [...countries].sort(() => 0.5 - Math.random());
    const selectedCountries = shuffledCountries.slice(0, 5);

    const generatedQuestions = selectedCountries.map(targetCountry => {
      // Pick 3 random wrong answers (currencies)
      const wrongAnswers = countries
        .filter(c => c.id !== targetCountry.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(c => c.currency);

      // Mix correct answer with wrong ones
      const options = [...wrongAnswers, targetCountry.currency].sort(() => 0.5 - Math.random());

      return {
        countryName: targetCountry.name,
        correctAnswer: targetCountry.currency,
        options
      };
    });

    setQuestions(generatedQuestions);
  }, []);

  if (questions.length === 0) return null; // Loading state

  const currentQuestion = questions[currentIndex];

  const handleSelect = (answer: string) => {
    if (selectedAnswer) return; // Prevent multiple selections
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 100);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      // Finish quiz
      setQuizFinished(true);
      addXp(score);
      updateQuizScore('currency', score);
    }
  };

  if (quizFinished) {
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <div className="gs-header-content">
              <div className="gs-title">
                <IonIcon icon={globe} /> GlobeSpinner
              </div>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="page-bg">
          <div className="quiz-container" style={{ textAlign: 'center', paddingTop: '100px' }}>
            <h2>Quiz Complete!</h2>
            <p style={{ fontSize: '24px', color: '#10B981' }}>+{score} XP Earned</p>
            <IonButton expand="block" shape="round" onClick={() => history.push('/games')} style={{ marginTop: '30px' }}>
              Back to Games
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <div className="gs-header-content">
            <div className="gs-title">
              <IonIcon icon={globe} /> GlobeSpinner
            </div>
            <div className="gs-header-actions">
              <div className="gs-fire-badge">{xp} XP</div>
              <IonIcon icon={settings} className="header-icon-dark" />
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="page-bg">
        <div className="quiz-container">
          
          <div className="quiz-stats-header">
            <div className="stat-col">
              <span className="q-stat-label">PROGRESS</span>
              <span className="q-stat-value text-blue">Question {currentIndex + 1}/{questions.length}</span>
            </div>
            <div className="stat-col align-right">
              <span className="q-stat-label">SCORE</span>
              <span className="q-stat-value text-green">{score} pts</span>
            </div>
          </div>

          <div className="q-bar-bg">
            <div className="q-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>

          <div className="flag-display-card" style={{ padding: '30px', textAlign: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '16px' }}>What is the official currency of</h3>
            <h1 style={{ margin: '10px 0 0', color: 'white', fontSize: '32px', fontWeight: 'bold' }}>{currentQuestion.countryName}?</h1>
          </div>

          <div className="quiz-options">
            {currentQuestion.options.map((option, idx) => {
              const letters = ['A', 'B', 'C', 'D'];
              let btnClass = 'option-btn';
              if (selectedAnswer) {
                if (option === currentQuestion.correctAnswer) {
                  btnClass += ' correct-answer';
                } else if (option === selectedAnswer) {
                  btnClass += ' incorrect-answer';
                }
              }

              return (
                <button 
                  key={option}
                  className={btnClass}
                  onClick={() => handleSelect(option)}
                  style={{ opacity: selectedAnswer && option !== currentQuestion.correctAnswer && option !== selectedAnswer ? 0.4 : 1 }}
                >
                  <div className="option-letter">{letters[idx]}</div>
                  <span className="option-text">{option}</span>
                </button>
              );
            })}
          </div>

          {selectedAnswer && (
            <div style={{ marginTop: '20px' }}>
              <IonButton expand="block" shape="round" color="primary" onClick={nextQuestion}>
                {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'} <IonIcon slot="end" icon={arrowForward} />
              </IonButton>
            </div>
          )}

        </div>
      </IonContent>

      {!selectedAnswer && (
        <IonFab vertical="bottom" horizontal="end" slot="fixed" className="quiz-fab">
          <IonFabButton color="warning">
            <IonIcon icon={bulb} />
          </IonFabButton>
        </IonFab>
      )}
    </IonPage>
  );
};

export default CurrencyQuiz;
