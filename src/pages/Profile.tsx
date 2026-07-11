import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage, IonHeader, IonToolbar, IonIcon, IonToggle, IonModal, IonButton, IonInput } from '@ionic/react';
import { globe, logOut, refresh, trophy, flag, person, notifications, moon, helpCircle, arrowForward, close } from 'ionicons/icons';
import { useUser } from '../context/UserContext';
import './Profile.css';

const avatars = [
  '/assets/avatar.png',
  '/assets/avatar_marcopolo.png',
  '/assets/avatar_travelqueen.png'
];

const Profile: React.FC<RouteComponentProps> = ({ history }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const { xp, level, visitedCountries, username, avatar, logoutUser, loginUser } = useUser();
  const [editName, setEditName] = useState(username || '');
  const [editAvatar, setEditAvatar] = useState(avatar || avatars[0]);

  const nextLevelXp = level * 100;
  const currentLevelProgress = xp % 100;
  const progressPercent = (currentLevelProgress / 100) * 100;
  const xpNeeded = 100 - currentLevelProgress;

  React.useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

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
        <div className="profile-container">
          
          <div className="profile-header-section">
            <div className="avatar-wrapper">
              <img src={avatar || "/assets/avatar.png"} alt="Avatar" className="avatar-img" />
              <div className="level-badge-small">LVL {level}</div>
            </div>
            <h2 className="profile-name">{username || "GlobeTrotter_92"}</h2>
            <p className="profile-title">Explorer Grade: {level > 5 ? 'Senior Voyager' : 'Novice Explorer'}</p>
          </div>

          <div className="stats-grid-profile">
            <div className="profile-stat-box">
              <IonIcon icon={refresh} color="primary" />
              <span className="p-stat-label">TOTAL XP</span>
              <span className="p-stat-value">{xp}</span>
            </div>
            <div className="profile-stat-box">
              <IonIcon icon={trophy} color="success" />
              <span className="p-stat-label">COUNTRIES VISITED</span>
              <span className="p-stat-value">{visitedCountries.length}</span>
            </div>
          </div>

          <div className="profile-stat-box-full" onClick={() => history.push('/badges')} style={{ cursor: 'pointer' }}>
            <IonIcon icon={flag} color="tertiary" />
            <span className="p-stat-label">BADGES COLLECTED</span>
            <span className="p-stat-value">View Gallery</span>
          </div>

          <div className="milestone-card">
            <div className="milestone-header">
              <span className="m-label">Next Milestone</span>
              <span className="m-value text-primary">{xp}/{nextLevelXp} XP</span>
            </div>
            <div className="m-bar-bg">
              <div className="m-bar-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <p className="m-text">{xpNeeded} XP until Level {level + 1}</p>
          </div>

          <h3 className="section-title-small">ACCOUNT & PREFERENCES</h3>

          <div className="preferences-list">
            
            <div className="pref-item" onClick={() => {
              setEditName(username || '');
              setEditAvatar(avatar || avatars[0]);
              setShowModal(true);
            }}>
              <div className="pref-icon-box bg-blue">
                <IonIcon icon={person} />
              </div>
              <span className="pref-label">Edit Profile</span>
              <IonIcon icon={arrowForward} className="pref-chevron" />
            </div>

            <div className="pref-item" onClick={() => setShowComingSoon(true)} style={{ cursor: 'pointer' }}>
              <div className="pref-icon-box bg-green">
                <IonIcon icon={notifications} />
              </div>
              <span className="pref-label">Notification Settings</span>
              <IonIcon icon={arrowForward} className="pref-chevron" />
            </div>

            <div className="pref-item">
              <div className="pref-icon-box bg-orange">
                <IonIcon icon={moon} />
              </div>
              <span className="pref-label">Theme (Light/Dark)</span>
              <IonToggle 
                checked={darkMode} 
                onIonChange={e => setDarkMode(e.detail.checked)} 
                color="tertiary" 
                className="pref-toggle"
              />
            </div>

            <div className="pref-item border-none" onClick={() => setShowComingSoon(true)} style={{ cursor: 'pointer' }}>
              <div className="pref-icon-box bg-purple">
                <IonIcon icon={helpCircle} />
              </div>
              <span className="pref-label">Help & Support</span>
              <IonIcon icon={arrowForward} className="pref-chevron" />
            </div>

          </div>

          <button className="logout-btn" onClick={logoutUser}>
            <IonIcon icon={logOut} /> Log Out
          </button>

        </div>

        {/* Edit Profile Modal */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)} className="edit-profile-modal">
          <IonHeader className="ion-no-border">
            <IonToolbar style={{ '--background': '#1e293b' }}>
              <span style={{ color: 'white', fontWeight: 'bold', marginLeft: '16px', fontSize: '18px' }}>Edit Profile</span>
              <IonButton fill="clear" slot="end" onClick={() => setShowModal(false)}>
                <IonIcon icon={close} style={{ color: '#94a3b8' }} />
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent style={{ '--background': '#0f172a' }} className="ion-padding">
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
                {avatars.map((av, index) => (
                  <div 
                    key={index}
                    onClick={() => setEditAvatar(av)}
                    style={{
                      width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden',
                      border: editAvatar === av ? '3px solid #3b82f6' : '3px solid transparent',
                      opacity: editAvatar === av ? 1 : 0.5, cursor: 'pointer', transition: 'all 0.3s ease'
                    }}
                  >
                    <img src={av} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '30px' }}>
                <span style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontSize: '14px' }}>Explorer Name</span>
                <IonInput 
                  value={editName}
                  onIonChange={e => setEditName(e.detail.value || '')}
                  style={{ 
                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', 
                    color: 'white', textAlign: 'center', fontSize: '18px', fontWeight: 'bold',
                    padding: '10px', background: 'rgba(0,0,0,0.2)'
                  }}
                  maxlength={15}
                />
              </div>

              <IonButton 
                expand="block" 
                shape="round" 
                color="primary"
                disabled={editName.trim().length === 0}
                onClick={() => {
                  loginUser(editName.trim(), editAvatar);
                  setShowModal(false);
                }}
              >
                Save Changes
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        <IonToast
          isOpen={showComingSoon}
          onDidDismiss={() => setShowComingSoon(false)}
          message="This feature is coming in version 2.0!"
          duration={2000}
          position="bottom"
          color="dark"
        />

      </IonContent>
    </IonPage>
  );
};

export default Profile;
