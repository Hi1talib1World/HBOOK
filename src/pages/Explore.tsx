import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButton, IonIcon, IonModal } from '@ionic/react';
import { globe, planet, book, map, rocket, gift } from 'ionicons/icons';
import { countries } from '../data/countries';
import { useUser } from '../context/UserContext';
import './Explore.css';

const Explore: React.FC<RouteComponentProps> = ({ history }) => {
  const { addXp } = useUser();
  const [showReward, setShowReward] = React.useState(false);
  const [currentStreak, setCurrentStreak] = React.useState(1);

  React.useEffect(() => {
    const today = new Date().toDateString();
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toDateString();

    const lastClaim = localStorage.getItem('gs_last_claim');
    let streak = parseInt(localStorage.getItem('gs_streak') || '1', 10);

    if (lastClaim === yesterday) {
      // Consecutive day
      streak = Math.min(streak + 1, 7); // Max 7x streak multiplier
    } else if (lastClaim !== today) {
      // Missed a day
      streak = 1;
    }

    setCurrentStreak(streak);

    if (lastClaim !== today) {
      setShowReward(true);
    }
  }, []);

  const claimReward = () => {
    const rewardAmount = 50 * currentStreak;
    addXp(rewardAmount);
    localStorage.setItem('gs_last_claim', new Date().toDateString());
    localStorage.setItem('gs_streak', currentStreak.toString());
    setShowReward(false);
  };

  const countryOfTheDay = countries[new Date().getDate() % countries.length];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <div className="gs-header-content">
            <div className="gs-title">
              <IonIcon icon={globe} /> GlobeSpinner
            </div>
            <div className="gs-fire-badge">7 🔥</div>
          </div>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen className="page-bg">
        <div className="explore-container">
          
          <div className="globe-hero">
            <div className="badge-new">NEW! AI-POWERED TRAVEL TRIVIA</div>
            <img src="/assets/globe_illustration.png" alt="3D Globe" className="hero-img" />
          </div>

          <div className="hero-text-section">
            <h1 className="hero-title">Spin the Globe,<br/><span className="text-primary">Discover the World.</span></h1>
            <p className="hero-subtitle">
              Explore random nations, collect rare digital flags, and learn fascinating AI-powered facts about every corner of our planet.
            </p>

            <IonButton expand="block" color="tertiary" className="cta-button" shape="round" onClick={() => history.push(`/country/${countryOfTheDay.id}`)}>
              Visit {countryOfTheDay.name} <IonIcon slot="end" icon={rocket} />
            </IonButton>
            
            <IonButton expand="block" fill="clear" color="medium" className="secondary-button" shape="round" onClick={() => history.push('/discover')}>
              View All {countries.length} Nations
            </IonButton>
          </div>

          <div className="mysteries-section">
            <h2 className="section-title">Uncover Global Mysteries</h2>
            <p className="section-subtitle">The ultimate companion for curious minds and digital travelers.</p>

            <div className="feature-card">
              <div className="icon-box bg-blue">
                <IonIcon icon={planet} color="primary" />
              </div>
              <h3>{countries.length} Countries</h3>
              <p>Every recognized nation is at your fingertips. Discover hidden gems and popular destinations with a single spin.</p>
            </div>

            <div className="feature-card">
              <div className="icon-box bg-green">
                <IonIcon icon={book} color="secondary" />
              </div>
              <h3>AI Fun Facts</h3>
              <p>Our intelligence engine curates unique stories, quirky traditions, and vital statistics for every location you explore.</p>
            </div>

            <div className="feature-card">
              <div className="icon-box bg-orange">
                <IonIcon icon={map} color="tertiary" />
              </div>
              <h3>Interactive Map</h3>
              <p>Visualize your journey on a beautiful vector map. Drop pins as you collect nations and watch your global footprint grow.</p>
            </div>
          </div>

          <div className="stats-section">
            <div className="stat-box">
              <h2>50k+</h2>
              <p>Active Explorers</p>
            </div>
            <div className="stat-box">
              <h2>2.4M</h2>
              <p>Spins Monthly</p>
            </div>
            <div className="stat-box">
              <h2 className="text-primary">{countries.length}</h2>
              <p>Nations Covered</p>
            </div>
            <div className="stat-box">
              <h2 className="text-primary">99%</h2>
              <p>Fun Guaranteed</p>
            </div>
          </div>

          <div className="collection-section">
            <h2 className="section-title">Your Collection Awaits</h2>
            <p className="section-subtitle">Every nation you visit is added to your personal "Digital Passport." Can you collect all {countries.length}? Compete with friends and earn regional master badges.</p>
            
            <ul className="checklist">
              <li><IonIcon icon="checkmark-circle-outline" color="secondary" /> Track regional progress in real-time</li>
              <li><IonIcon icon="checkmark-circle-outline" color="secondary" /> Unlock detailed terrain and political maps</li>
            </ul>

            <div className="passport-preview glass-card" onClick={() => history.push('/passport')} style={{ cursor: 'pointer' }}>
              <IonIcon icon="image-outline" size="large" color="medium" />
            </div>
          </div>

        </div>

        <IonModal isOpen={showReward} className="edit-profile-modal" backdropDismiss={false}>
          <IonContent style={{ '--background': '#0f172a' }} className="ion-padding">
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <div style={{ 
                width: '100px', height: '100px', background: 'rgba(59, 130, 246, 0.2)', 
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px', border: '2px solid #3b82f6'
              }}>
                <IonIcon icon={gift} style={{ fontSize: '50px', color: '#3b82f6' }} />
              </div>
              <h2 style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>Daily Reward!</h2>
              <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '30px', padding: '0 20px' }}>
                Welcome back Explorer! You are on a {currentStreak} day streak! Here is your daily {50 * currentStreak} XP bonus to help you climb the leaderboard.
              </p>
              <IonButton expand="block" shape="round" color="primary" onClick={claimReward} style={{ margin: '0 20px' }}>
                Claim {50 * currentStreak} XP
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

      </IonContent>
    </IonPage>
  );
};

export default Explore;
