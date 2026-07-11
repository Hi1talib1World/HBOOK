import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonIcon } from '@ionic/react';
import { globe, arrowForward } from 'ionicons/icons';
import { useUser } from '../context/UserContext';
import { RouteComponentProps } from 'react-router-dom';
import './Onboarding.css';

const avatars = [
  '/assets/avatar.png',
  '/assets/avatar_marcopolo.png',
  '/assets/avatar_travelqueen.png'
];

const Onboarding: React.FC<RouteComponentProps> = ({ history }) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const { loginUser } = useUser();

  const handleStart = () => {
    if (name.trim().length > 0) {
      loginUser(name.trim(), selectedAvatar);
      history.push('/explore');
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="onboarding-bg">
        <div className="onboarding-container">
          
          <div className="ob-header">
            <IonIcon icon={globe} className="ob-logo-icon" />
            <h1 className="ob-title">GlobeSpinner</h1>
            <p className="ob-subtitle">Your journey begins here.</p>
          </div>

          <div className="ob-form">
            <h3 className="ob-section-title">Choose your Avatar</h3>
            <div className="ob-avatars-row">
              {avatars.map((av, index) => (
                <div 
                  key={index}
                  className={`ob-avatar-circle ${selectedAvatar === av ? 'selected' : ''}`}
                  onClick={() => setSelectedAvatar(av)}
                >
                  <img src={av} alt={`Avatar ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="ob-input-wrapper">
              <span className="ob-input-label">Explorer Name</span>
              <IonInput 
                value={name}
                placeholder="e.g. NomadSoul"
                onIonChange={e => setName(e.detail.value || '')}
                className="ob-input"
                maxlength={15}
              />
            </div>

            <button 
              className={`ob-start-btn ${name.trim().length === 0 ? 'disabled' : ''}`}
              onClick={handleStart}
              disabled={name.trim().length === 0}
            >
              Start Exploring <IonIcon icon={arrowForward} />
            </button>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;
