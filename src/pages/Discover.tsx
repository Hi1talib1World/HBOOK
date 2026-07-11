import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage, IonHeader, IonToolbar, IonIcon, IonInput, IonToggle, IonRange, IonButton } from '@ionic/react';
import { globe, search } from 'ionicons/icons';
import { countries } from '../data/countries';
import './Discover.css';

// Fuzzy search algorithm (substring + character matching)
const fuzzyMatch = (str: string, query: string) => {
  if (!query) return true;
  str = str.toLowerCase();
  query = query.toLowerCase();
  if (str.includes(query)) return true;
  
  let qIdx = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === query[qIdx]) qIdx++;
    if (qIdx === query.length) return true;
  }
  return false;
};

// Parse population strings like "214.3 Million" or "1.4 Billion"
const parsePopulation = (popStr: string): number => {
  const match = popStr.match(/([\d.]+)\s*(Million|Billion)/i);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  if (match[2].toLowerCase() === 'billion') return num * 1000000000;
  return num * 1000000;
};

const Discover: React.FC<RouteComponentProps> = ({ history }) => {
  const [searchText, setSearchText] = useState('');
  const [continent, setContinent] = useState('All');
  const [obscureMode, setObscureMode] = useState(false);

  const continents = ['All', 'Africa', 'Asia', 'Europe', 'Americas', 'Oceania'];

  // Filter countries using spirited backend logic
  const filteredCountries = countries.filter(c => {
    if (continent !== 'All' && !c.continent.includes(continent)) return false;
    
    // Fuzzy Search
    if (searchText && !fuzzyMatch(c.name, searchText)) return false;
    
    // Obscure Mode (Filters out popular/massive countries > 50 Million population)
    if (obscureMode) {
      const population = parsePopulation(c.population);
      if (population > 50000000) return false;
    }
    
    return true;
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
              <div className="gs-fire-badge">7 🔥</div>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="page-bg">
        <div className="discover-container">
          
          <div className="discover-header">
            <h1 className="discover-title">Discover Nations</h1>
            <p className="discover-subtitle">Refine your search to find the perfect adventure.</p>
          </div>

          <div className="search-section">
            <label className="section-label">Country Name</label>
            <div className="search-input-wrapper">
              <IonIcon icon={search} className="search-icon" />
              <IonInput 
                value={searchText} 
                placeholder="e.g. Iceland, Japan..." 
                onIonChange={e => setSearchText(e.detail.value || '')}
                className="search-input"
              />
            </div>
          </div>

          <div className="filter-section">
            <label className="section-label">Continent</label>
            <div className="continent-chips" style={{ display: 'flex', overflowX: 'auto', gap: '8px', paddingBottom: '10px' }}>
              {continents.map(c => (
                <button 
                  key={c}
                  className={`continent-chip ${continent === c ? 'active' : ''}`}
                  onClick={() => setContinent(c)}
                  style={{ flexShrink: 0 }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="toggle-section">
            <div className="toggle-text">
              <h3>Obscure Mode</h3>
              <p>Only show less-known territories</p>
            </div>
            <IonToggle checked={obscureMode} onIonChange={e => setObscureMode(e.detail.checked)} color="primary" />
          </div>

          <div className="results-section" style={{ marginTop: '20px' }}>
            <h3 className="section-label" style={{ marginBottom: '15px' }}>Results ({filteredCountries.length})</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {filteredCountries.map(country => (
                <div 
                  key={country.id}
                  onClick={() => history.push(`/country/${country.id}`)}
                  style={{
                    backgroundColor: '#1E293B',
                    borderRadius: '16px',
                    padding: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                >
                  <img src={country.flagImg} alt="flag" style={{ width: '60px', borderRadius: '8px', border: '1px solid #334155' }} />
                  <div>
                    <h3 style={{ margin: 0, fontSize: '18px', color: 'white', fontWeight: 'bold' }}>{country.name}</h3>
                    <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#94A3B8' }}>{country.language} • {country.continent}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredCountries.length === 0 && (
              <div style={{ textAlign: 'center', color: '#94A3B8', marginTop: '30px' }}>
                <IonIcon icon={globe} style={{ fontSize: '48px', opacity: 0.5 }} />
                <p>No countries found matching your criteria.</p>
              </div>
            )}
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Discover;
