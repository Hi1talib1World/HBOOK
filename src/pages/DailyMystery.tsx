import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonIcon, IonInput, IonButton, IonToast } from '@ionic/react';
import { globe, eye, planet, restaurant, business, search, send, trendingUp, medal, lock } from 'ionicons/icons';
import { useUser } from '../context/UserContext';
import './DailyMystery.css';

const mysteryData = {
  answer: 'France',
  image: '/assets/uncharted_lands.png',
  clues: [
    { id: 0, label: 'Region', text: 'Located in Europe', icon: planet, cost: 20 },
    { id: 1, label: 'Local Tastes', text: 'National dish is Coq au Vin', icon: restaurant, cost: 30 },
    { id: 2, label: 'Administrative', text: 'Capital starts with P', icon: business, cost: 40 }
  ]
};

const DailyMystery: React.FC = () => {
  const { xp, deductXp, addXp } = useUser();
  const [guess, setGuess] = useState('');
  const [blurLevel, setBlurLevel] = useState(20);
  const [unlockedClues, setUnlockedClues] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('success');
  const [showToast, setShowToast] = useState(false);

  const displayToast = (message: string, color: string) => {
    setToastMessage(message);
    setToastColor(color);
    setShowToast(true);
  };

  const handleSharpen = () => {
    if (blurLevel <= 0) return;
    if (deductXp(10)) {
      setBlurLevel(prev => Math.max(0, prev - 5));
    } else {
      displayToast('Not enough XP to sharpen!', 'danger');
    }
  };

  const handleUnlockClue = (clueId: number, cost: number) => {
    if (unlockedClues.includes(clueId)) return;
    if (deductXp(cost)) {
      setUnlockedClues(prev => [...prev, clueId]);
    } else {
      displayToast(`Not enough XP! Need ${cost} XP.`, 'danger');
    }
  };

  const handleSubmit = () => {
    if (resolved) return;
    if (guess.toLowerCase().trim() === mysteryData.answer.toLowerCase()) {
      setResolved(true);
      setBlurLevel(0);
      addXp(200); // Big reward for solving
      displayToast('Correct! +200 XP', 'success');
    } else {
      displayToast('Incorrect, keep trying!', 'warning');
    }
  };

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
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="page-bg">
        <div className="mystery-container">
          
          <div className="mystery-header">
            <div className="mystery-title-col">
              <h1 className="mystery-title">Daily Mystery</h1>
              <span className="mystery-round">Round #142</span>
            </div>
            <div className="mystery-timer">
              <span className="timer-label">STATUS</span>
              <span className="timer-value" style={{ color: resolved ? '#10B981' : '#F59E0B' }}>
                {resolved ? 'SOLVED' : 'ACTIVE'}
              </span>
            </div>
          </div>

          <div className="mystery-image-card">
            <div 
              className="mystery-image-bg" 
              style={{ 
                backgroundImage: `url('${mysteryData.image}')`,
                filter: `blur(${blurLevel}px) brightness(0.7)`,
                transition: 'filter 0.5s ease'
              }}
            ></div>
            
            {!resolved && blurLevel > 0 && (
              <button className="sharpen-btn" onClick={handleSharpen}>
                <IonIcon icon={eye} />
                <span>Sharpen (10 XP)</span>
              </button>
            )}
            
            <div className="mystery-image-label">
              <div className="search-icon-box">
                <IonIcon icon={search} />
              </div>
              <span>Current Mystery: Landmark</span>
            </div>
          </div>

          <div className="clues-section">
            {mysteryData.clues.map((clue) => {
              const isUnlocked = unlockedClues.includes(clue.id) || resolved;
              return (
                <div className="clue-card" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }} key={clue.id}>
                  <div className="clue-header">
                    <IonIcon icon={clue.icon} />
                    <span>{clue.label}</span>
                  </div>
                  {isUnlocked ? (
                    <h3 className="clue-text" style={{ color: '#fff' }}>{clue.text}</h3>
                  ) : (
                    <div 
                      onClick={() => handleUnlockClue(clue.id, clue.cost)}
                      style={{ 
                        marginTop: '10px', 
                        padding: '10px', 
                        backgroundColor: 'rgba(255,255,255,0.1)', 
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <IonIcon icon={lock} />
                      <span>Unlock Clue ({clue.cost} XP)</span>
                    </div>
                  )}
                  <IonIcon icon={clue.icon} className="clue-bg-icon" />
                </div>
              );
            })}
          </div>

          {!resolved ? (
            <div className="guess-section">
              <p className="guess-label">Submit your guess</p>
              <div className="guess-input-wrapper">
                <IonIcon icon={search} className="guess-icon" />
                <IonInput 
                  value={guess} 
                  placeholder="Enter country or landmark" 
                  onIonChange={e => setGuess(e.detail.value || '')}
                  className="guess-input"
                />
              </div>
              
              <button className="submit-guess-btn" onClick={handleSubmit}>
                <IonIcon icon={send} />
                <span>Submit Final Guess</span>
              </button>

              <div className="suggestions-header">POPULAR SUGGESTIONS</div>
              <div className="suggestions-chips">
                <span className="suggestion-chip" onClick={() => setGuess('France')}>France</span>
                <span className="suggestion-chip" onClick={() => setGuess('Italy')}>Italy</span>
                <span className="suggestion-chip" onClick={() => setGuess('Germany')}>Germany</span>
                <span className="suggestion-chip" onClick={() => setGuess('Spain')}>Spain</span>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '30px', backgroundColor: '#10B981', borderRadius: '16px', marginTop: '20px' }}>
              <h2 style={{ margin: 0, color: 'white', fontWeight: 'bold' }}>Mystery Solved!</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)' }}>It was {mysteryData.answer}. Come back tomorrow for a new mystery!</p>
            </div>
          )}

        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          color={toastColor}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default DailyMystery;
