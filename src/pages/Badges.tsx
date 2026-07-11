import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonIcon, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { globe, refresh, search, flag, medal, map, trophy, lock } from 'ionicons/icons';
import { useUser } from '../context/UserContext';
import { badgesData } from '../data/badges';
import './Badges.css';

const iconMap: Record<string, string> = {
  refresh,
  search,
  flag,
  globe,
  medal
};

const Badges: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const { badgesUnlocked, level, xp } = useUser();

  const totalBadges = badgesData.length;
  const unlockedCount = badgesUnlocked.length;
  const completionPercent = Math.round((unlockedCount / totalBadges) * 100) || 0;

  const filteredBadges = badgesData.filter(badge => {
    if (filter === 'locked') return !badgesUnlocked.includes(badge.id);
    return true; // 'all'
  });

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
        <div className="badges-container">
          
          <div className="completion-card">
            <div className="completion-header">
              <div className="completion-text">
                <h1 className="completion-title">Overall Completion</h1>
                <p className="completion-subtitle">Your journey to becoming a Global Grandmaster</p>
              </div>
              <div className="completion-percentage">{completionPercent}%</div>
            </div>
            
            <div className="c-bar-bg">
              <div className="c-bar-fill" style={{ width: `${completionPercent}%` }}></div>
            </div>

            <div className="completion-stats">
              <div className="c-stat-col">
                <span className="c-stat-label">UNLOCKED</span>
                <span className="c-stat-value">{unlockedCount}/{totalBadges}</span>
              </div>
              <div className="c-stat-divider"></div>
              <div className="c-stat-col">
                <span className="c-stat-label">LEVEL</span>
                <span className="c-stat-value">{level}</span>
              </div>
              <div className="c-stat-divider"></div>
              <div className="c-stat-col">
                <span className="c-stat-label">RANK</span>
                <span className="c-stat-value">{level > 5 ? 'Senior' : 'Explorer'}</span>
              </div>
            </div>
          </div>

          <div className="gallery-header">
            <h2 className="gallery-title">Badges Gallery</h2>
            <div className="gallery-segment">
              <IonSegment value={filter} onIonChange={e => setFilter(e.detail.value || '')} className="sm-segment">
                <IonSegmentButton value="all"><IonLabel>All</IonLabel></IonSegmentButton>
                <IonSegmentButton value="locked"><IonLabel>Locked</IonLabel></IonSegmentButton>
              </IonSegment>
            </div>
          </div>

          <div className="badges-grid">
            
            {filteredBadges.map(badge => {
              const isUnlocked = badgesUnlocked.includes(badge.id);
              
              return (
                <div className={`badge-item ${isUnlocked ? 'unlocked' : 'locked'}`} key={badge.id}>
                  <div className={`badge-icon-box ${isUnlocked ? badge.colorClass : 'grey-box'}`}>
                    <IonIcon icon={isUnlocked ? iconMap[badge.iconName] : lock} />
                  </div>
                  <h4>{badge.name}</h4>
                  <p>{isUnlocked ? badge.description : 'Locked'}</p>
                </div>
              );
            })}

          </div>

          {unlockedCount < totalBadges && (
            <div className="promo-card blue-promo">
              <h3 className="promo-title">Keep Exploring</h3>
              <p className="promo-desc">Discover more countries and earn XP to unlock the remaining badges!</p>
              <IonIcon icon={trophy} className="promo-bg-icon" />
            </div>
          )}

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Badges;
