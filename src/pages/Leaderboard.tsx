import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonIcon, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { globe, trophy, medal, star, ribbon } from 'ionicons/icons';
import { useUser } from '../context/UserContext';
import './Leaderboard.css';

const MOCK_USERS = [
  { id: '1', name: 'TravelQueen', xp: 12500, avatar: '/assets/avatar_travelqueen.png' },
  { id: '2', name: 'Marco Polo', xp: 8420, avatar: '/assets/avatar_marcopolo.png' },
  { id: '3', name: 'AtlasX', xp: 7100, avatar: '/assets/avatar.png' }, // Fallback avatar
  { id: '4', name: 'NomadSoul', xp: 4200, avatar: '/assets/avatar.png' },
  { id: '5', name: 'JetSetter99', xp: 3900, avatar: '/assets/avatar.png' }
];

// Spirited Backend Engine: Dynamic Leaderboard Growth
const getDynamicMockUsers = () => {
  // Use a stable epoch day so it increments exactly once per 24 hours
  const dayEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  // Arbitrary base point to ensure we start at the defined XP and grow over time
  const dayOffset = Math.max(0, dayEpoch - 20600); // 20600 is roughly June 2026

  return MOCK_USERS.map(u => ({
    ...u,
    // Add dynamic XP growth based on their starting position so they diverge over time
    xp: u.xp + (parseInt(u.id) * 25 * dayOffset)
  }));
};

const Leaderboard: React.FC = () => {
  const [segment, setSegment] = useState('global');
  const { xp, level, visitedCountries, username, avatar } = useUser();

  // Inject current user and sort
  const dynamicMockUsers = getDynamicMockUsers();
  const allUsers = [...dynamicMockUsers, { id: 'current', name: username || 'You', xp: xp, avatar: avatar || '/assets/avatar.png' }];
  allUsers.sort((a, b) => b.xp - a.xp);

  const top3 = allUsers.slice(0, 3);
  const rest = allUsers.slice(3);

  // Find user rank
  const userRank = allUsers.findIndex(u => u.id === 'current') + 1;

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
        <div className="leaderboard-container">
          
          <div className="segment-wrapper">
            <IonSegment value={segment} onIonChange={e => setSegment(e.detail.value || '')} className="custom-segment">
              <IonSegmentButton value="global">
                <IonLabel>Global</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="friends">
                <IonLabel>Friends</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>

          {segment === 'global' ? (
            <>
              <div className="podium-section">
                
                {/* 2nd Place */}
                {top3[1] && (
                  <div className={`podium-col col-2nd ${top3[1].id === 'current' ? 'podium-current-user' : ''}`}>
                    <div className="podium-avatar-box">
                      <img src={top3[1].avatar} alt={top3[1].name} className="podium-avatar" />
                      <div className="rank-badge rank-silver">2</div>
                    </div>
                    <span className="podium-name">{top3[1].name}</span>
                    <span className="podium-score text-blue">{top3[1].xp} XP</span>
                    <div className="podium-block block-silver">
                      <IonIcon icon={medal} />
                    </div>
                  </div>
                )}

                {/* 1st Place */}
                {top3[0] && (
                  <div className={`podium-col col-1st ${top3[0].id === 'current' ? 'podium-current-user' : ''}`}>
                    <div className="podium-avatar-box">
                      <img src={top3[0].avatar} alt={top3[0].name} className="podium-avatar avatar-large" />
                      <div className="rank-badge rank-gold">
                        <IonIcon icon={star} />
                      </div>
                    </div>
                    <span className="podium-name font-bold">{top3[0].name}</span>
                    <span className="podium-score text-gold">{top3[0].xp} XP</span>
                    <div className="podium-block block-gold">
                      <IonIcon icon={trophy} />
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {top3[2] && (
                  <div className={`podium-col col-3rd ${top3[2].id === 'current' ? 'podium-current-user' : ''}`}>
                    <div className="podium-avatar-box">
                      <img src={top3[2].avatar} alt={top3[2].name} className="podium-avatar" />
                      <div className="rank-badge rank-bronze">3</div>
                    </div>
                    <span className="podium-name">{top3[2].name}</span>
                    <span className="podium-score text-green">{top3[2].xp} XP</span>
                    <div className="podium-block block-bronze">
                      <IonIcon icon={medal} />
                    </div>
                  </div>
                )}

              </div>

              <div className="you-card" style={{ border: userRank <= 3 ? '2px solid #3b82f6' : '2px solid #10B981' }}>
                <div className="you-rank">#{userRank}</div>
                <img src={avatar || '/assets/avatar.png'} alt="You" className="you-avatar" />
                <div className="you-info">
                  <div className="you-name">
                    {username || 'You'} <span className="you-level">LVL {level}</span>
                  </div>
                  <div className="you-stats">{visitedCountries.length} Countries &bull; {xp} XP</div>
                </div>
                <div className="you-percentile">
                  <IonIcon icon={userRank === 1 ? star : trophy} color={userRank === 1 ? "warning" : "primary"} />
                  <span>Rank</span>
                </div>
              </div>

              <div className="ranking-list">
                {rest.map((user, idx) => (
                  <div key={user.id} className={`ranking-item ${user.id === 'current' ? 'current-user-item' : ''}`}>
                    <span className="rank-number">{idx + 4}</span>
                    <div className="rank-avatar">
                      <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    </div>
                    <div className="rank-info">
                      <h4>{user.name}</h4>
                      <p>Level {Math.floor(user.xp / 100) + 1} &bull; {user.xp} XP</p>
                    </div>
                    {user.id === 'current' ? (
                      <IonIcon icon={star} color="warning" className="rank-icon" />
                    ) : (
                      <IonIcon icon={ribbon} className="rank-icon" />
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', marginTop: '50px', color: '#94a3b8' }}>
              <IonIcon icon={globe} style={{ fontSize: '48px', opacity: 0.5, marginBottom: '16px' }} />
              <h3>No Friends Yet</h3>
              <p>Invite your friends to compete on the global leaderboard!</p>
            </div>
          )}

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Leaderboard;
