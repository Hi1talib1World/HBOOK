import React from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import { globe, lock, add } from 'ionicons/icons';
import { useUser } from '../context/UserContext';
import { countries } from '../data/countries';
import './Passport.css';

const Passport: React.FC = () => {
  const { visitedCountries, xp } = useUser();

  // Group all available countries by continent
  const continents = Array.from(new Set(countries.map(c => c.continent)));

  const totalCollected = visitedCountries.length;
  const totalAvailable = countries.length;
  const progressPercent = Math.round((totalCollected / totalAvailable) * 100) || 0;

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
        <div className="passport-container">
          
          <div className="passport-header">
            <h1 className="passport-title">Digital Passport</h1>
            <p className="passport-subtitle">Your global exploration record</p>
            
            <div className="collection-progress">
              <div className="progress-labels">
                <span className="p-text-blue">Countries Collected: {totalCollected} / {totalAvailable}</span>
              </div>
              <div className="p-bar-bg">
                <div className="p-bar-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
          </div>

          {continents.map(continent => {
            const continentCountries = countries.filter(c => c.continent === continent);
            const collectedInContinent = continentCountries.filter(c => visitedCountries.includes(c.id)).length;

            return (
              <div className="continent-section" key={continent}>
                <div className="continent-header">
                  <h3 className="continent-title">{continent}</h3>
                  <div className="continent-line"></div>
                  <span className="continent-count">{collectedInContinent} Collected</span>
                </div>

                <div className="stamps-grid">
                  {continentCountries.map(country => {
                    const isCollected = visitedCountries.includes(country.id);
                    return (
                      <div className={`stamp-item ${isCollected ? 'collected' : 'locked'}`} key={country.id}>
                        <div className="stamp-circle" style={{ overflow: 'hidden' }}>
                          {isCollected ? (
                            <img src={country.flagImg} alt={`${country.name} Stamp`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <IonIcon icon={lock} />
                          )}
                        </div>
                        <span className="stamp-name">{country.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

        </div>
      </IonContent>

      <IonFab vertical="bottom" horizontal="end" slot="fixed" className="passport-fab">
        <IonFabButton color="tertiary">
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Passport;
