import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage, IonHeader, IonToolbar, IonIcon, IonButton } from '@ionic/react';
import { globe, star, flag, business, map, cash, rocket, planet, lock, search, medal } from 'ionicons/icons';
import { useUser } from '../context/UserContext';
import { badgesData } from '../data/badges';
import './Games.css';

const iconMap: Record<string, string> = {
  refresh: globe,
  search,
  flag,
  globe,
  medal,
  rocket,
  planet
};

const Games: React.FC<RouteComponentProps> = ({ history }) => {
  const { xp, level, badgesUnlocked, quizScores } = useUser();
  const currentLevelProgress = xp % 100;
  const progressPercent = (currentLevelProgress / 100) * 100;

  // Assume max score for a quiz is 500 (5 questions * 100 pts)
  const flagProgress = Math.min(100, Math.round(((quizScores ? quizScores.flag : 0) || 0) / 500 * 100));
  const capitalProgress = Math.min(100, Math.round(((quizScores ? quizScores.capital : 0) || 0) / 500 * 100));
  const currencyProgress = Math.min(100, Math.round(((quizScores ? quizScores.currency : 0) || 0) / 500 * 100));

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <div className="gs-header-content">
            <div className="gs-title">
              <IonIcon icon={globe} /> GlobeSpinner
            </div>
            <div className="gs-header-actions">
              <IonIcon icon="podium-outline" className="header-icon" onClick={() => history.push('/leaderboard')} style={{ cursor: 'pointer' }} />
              <div className="gs-fire-badge">7 🔥</div>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="page-bg">
        <div className="games-container">
          
          <div className="level-card">
            <h2 className="level-title">Level {level}</h2>
            <p className="level-subtitle">{level > 5 ? 'Senior Cartographer' : 'Junior Explorer'}</p>
            <div className="level-progress-bg">
              <div className="level-progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>

          <h3 className="section-title">
            <IonIcon icon={star} className="title-icon" /> Daily Challenge
          </h3>

          <div className="daily-card">
            <div className="daily-content">
              <div className="time-badge">TIME LIMITED</div>
              <h2>Daily Mystery</h2>
              <p>Identify today's hidden nation with only 3 clues.</p>
              
              <div className="daily-footer">
                <span className="xp-text"><IonIcon icon={star} /> +500 XP</span>
                <IonButton shape="round" color="tertiary" size="small" className="start-now-btn" onClick={() => history.push('/discover')}>
                  Start Now &raquo;
                </IonButton>
              </div>
            </div>
            <div className="daily-image-box">
              <span className="question-mark">?</span>
            </div>
          </div>

          <h3 className="section-title">Game Modes</h3>

          <div className="game-modes-list">
            
            <div className="mode-card" onClick={() => history.push('/quiz')} style={{ cursor: 'pointer' }}>
              <div className="mode-icon-box bg-blue">
                <IonIcon icon={flag} />
              </div>
              <div className="mode-info">
                <h4>Flag Quiz</h4>
                <p>195 countries to master</p>
                <div className="mode-progress">
                  <span className="progress-label">Best Score Progress</span>
                  <span className="progress-value text-blue">{flagProgress}%</span>
                </div>
                <div className="mode-bar-bg">
                  <div className="mode-bar-fill bg-blue-solid" style={{width: `${flagProgress}%`}}></div>
                </div>
              </div>
            </div>

            <div className="mode-card" onClick={() => history.push('/capital-quiz')} style={{ cursor: 'pointer' }}>
              <div className="mode-icon-box bg-green">
                <IonIcon icon={business} />
              </div>
              <div className="mode-info">
                <h4>Capital City</h4>
                <p>Test your urban knowledge</p>
                <div className="mode-progress">
                  <span className="progress-label">Best Score Progress</span>
                  <span className="progress-value text-green">{capitalProgress}%</span>
                </div>
                <div className="mode-bar-bg">
                  <div className="mode-bar-fill bg-green-solid" style={{width: `${capitalProgress}%`}}></div>
                </div>
              </div>
            </div>

            <div className="mode-card" onClick={() => history.push('/currency-quiz')} style={{ cursor: 'pointer' }}>
              <div className="mode-icon-box bg-purple">
                <IonIcon icon={cash} />
              </div>
              <div className="mode-info">
                <h4>Currency Pro</h4>
                <p>Global trade knowledge</p>
                <div className="mode-progress">
                  <span className="progress-label">Best Score Progress</span>
                  <span className="progress-value text-purple">{currencyProgress}%</span>
                </div>
                <div className="mode-bar-bg">
                  <div className="mode-bar-fill bg-purple-solid" style={{width: `${currencyProgress}%`}}></div>
                </div>
              </div>
            </div>

          </div>

          <div className="badges-header">
            <h3 className="section-title m-0">Recent Badges</h3>
            <span className="view-all" onClick={() => history.push('/badges')} style={{ cursor: 'pointer' }}>View All</span>
          </div>

          <div className="badges-row">
            {badgesUnlocked.slice(-4).map(badgeId => {
              const b = badgesData.find(x => x.id === badgeId);
              if (!b) return null;
              return (
                <div className="badge-item" key={b.id}>
                  <div className={`badge-circle active-badge ${b.colorClass}`}>
                    <IonIcon icon={iconMap[b.iconName] || medal} />
                  </div>
                  <span className="badge-name">{b.name}</span>
                </div>
              );
            })}
            
            {/* Pad with locked badges if less than 4 */}
            {Array.from({ length: Math.max(0, 4 - badgesUnlocked.length) }).map((_, i) => (
              <div className="badge-item" key={`locked-${i}`}>
                <div className="badge-circle locked-badge">
                  <IonIcon icon={lock} />
                </div>
                <span className="badge-name">Locked</span>
              </div>
            ))}
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Games;
