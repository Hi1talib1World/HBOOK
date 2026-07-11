import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonIcon, IonButton } from '@ionic/react';
import { share, people, chatbubbles, cash, time, map, addCircle, star, pin, bulb, checkmarkCircle } from 'ionicons/icons';
import { getCountryById } from '../data/countries';
import { useUser } from '../context/UserContext';
import './CountryDetails.css';

interface CountryDetailsProps extends RouteComponentProps<{ id: string }> {}

const CountryDetails: React.FC<CountryDetailsProps> = ({ match }) => {
  const { id } = match.params;
  const country = getCountryById(id);
  const { visitedCountries, markVisited } = useUser();

  if (!country) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/explore" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h2>Country not found</h2>
        </IonContent>
      </IonPage>
    );
  }

  const isVisited = visitedCountries.includes(country.id);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/explore" text="" />
          </IonButtons>
          <div className="details-header-content">
            <span className="details-title">Country Details</span>
            <div className="header-actions">
              <div className="gs-fire-badge">7 🔥</div>
              <IonIcon icon={share} className="share-icon" color="primary" />
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="page-bg">
        <div className="details-hero">
          <img src={country.coverImg} alt={`${country.name} Cover`} className="hero-cover" />
          <div className="hero-overlay">
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              {country.flagImg && <img src={country.flagImg} alt="flag" style={{width: '40px', borderRadius: '4px'}} />}
              <h1 className="hero-country-name">{country.name}</h1>
            </div>
            <p className="hero-region">
              <IonIcon icon={pin} /> {country.continent}
            </p>
            <div className="region-badge">{country.continent.toUpperCase()}</div>
          </div>
        </div>

        <div className="details-content">
          
          <div className="stats-grid-4">
            <div className="stat-box-small">
              <IonIcon icon={people} color="primary" />
              <span className="stat-sm-label">Population</span>
              <span className="stat-sm-value">{country.population}</span>
            </div>
            <div className="stat-box-small">
              <IonIcon icon={chatbubbles} color="primary" />
              <span className="stat-sm-label">Language</span>
              <span className="stat-sm-value">{country.language}</span>
            </div>
            <div className="stat-box-small">
              <IonIcon icon={map} color="primary" />
              <span className="stat-sm-label">Continent</span>
              <span className="stat-sm-value">{country.continent}</span>
            </div>
            <div className="stat-box-small">
              <IonIcon icon={time} color="primary" />
              <span className="stat-sm-label">Timezone</span>
              <span className="stat-sm-value">Local</span>
            </div>
          </div>

          <div className="map-preview">
            <div className="map-placeholder"></div>
            <IonButton 
              className="live-map-btn" 
              color="light" 
              shape="round" 
              size="small"
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(country.name)}`, '_blank')}
            >
              <span className="green-dot"></span> Live Map View
            </IonButton>
          </div>

          <div className="fun-facts-section">
            <h3 className="section-heading">
              <IonIcon icon={star} color="tertiary" /> Fun Facts & Overview
            </h3>
            
            <div className="fact-card">
              <IonIcon icon={bulb} color="tertiary" className="fact-icon" />
              <p>{country.funFact}</p>
            </div>

            <div className="fact-card">
              <IonIcon icon={map} color="tertiary" className="fact-icon" />
              <p>{country.description}</p>
            </div>
          </div>
        </div>

      </IonContent>
      
      <div className="bottom-action-bar">
        <IonButton 
          expand="block" 
          color={isVisited ? "success" : "tertiary"} 
          shape="round" 
          className="add-collection-btn"
          onClick={() => markVisited(country.id)}
          disabled={isVisited}
        >
          <IonIcon slot="start" icon={isVisited ? checkmarkCircle : addCircle} /> 
          {isVisited ? 'Visited' : 'Mark as Visited (+50 XP)'}
        </IonButton>
      </div>
    </IonPage>
  );
};

export default CountryDetails;
