import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { compass, map, person, apps } from 'ionicons/icons';
import Explore from './pages/Explore';
import Games from './pages/Games';
import CountryDetails from './pages/CountryDetails';
import Profile from './pages/Profile';
import Passport from './pages/Passport';
import FlagQuiz from './pages/FlagQuiz';
import CapitalQuiz from './pages/CapitalQuiz';
import CurrencyQuiz from './pages/CurrencyQuiz';
import Leaderboard from './pages/Leaderboard';
import DailyMystery from './pages/DailyMystery';
import Discover from './pages/Discover';
import Badges from './pages/Badges';
import Onboarding from './pages/Onboarding';
import { UserProvider, useUser } from './context/UserContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Global Theme */
import './theme.css';

const AppContent: React.FC = () => {
  const { username } = useUser();

  return (
    <IonReactRouter>
      <IonPage id="main">
        {!username ? (
          <IonRouterOutlet>
            <Route path="/onboarding" component={Onboarding} exact={true} />
            <Route render={() => <Redirect to="/onboarding" />} />
          </IonRouterOutlet>
        ) : (
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/explore" component={Explore} exact={true} />
              <Route path="/games" component={Games} exact={true} />
              <Route path="/profile" component={Profile} exact={true} />
              <Route path="/passport" component={Passport} exact={true} />
              <Route path="/quiz" component={FlagQuiz} exact={true} />
              <Route path="/capital-quiz" component={CapitalQuiz} exact={true} />
              <Route path="/currency-quiz" component={CurrencyQuiz} exact={true} />
              
              <Route path="/leaderboard" component={Leaderboard} exact={true} />
              <Route path="/daily-mystery" component={DailyMystery} exact={true} />
              <Route path="/discover" component={Discover} exact={true} />
              <Route path="/badges" component={Badges} exact={true} />
              
              <Route path="/country/:id" component={CountryDetails} />
              
              <Route exact path="/" render={() => <Redirect to="/explore" />} />
            </IonRouterOutlet>
            
            <IonTabBar slot="bottom">
              <IonTabButton tab="explore" href="/explore">
                <IonIcon icon={compass} />
                <IonLabel>Explore</IonLabel>
              </IonTabButton>
              <IonTabButton tab="map" href="/passport">
                <IonIcon icon={map} />
                <IonLabel>Map</IonLabel>
              </IonTabButton>
              <IonTabButton tab="games" href="/games">
                <IonIcon icon={apps} />
                <IonLabel>Games</IonLabel>
              </IonTabButton>
              <IonTabButton tab="profile" href="/profile">
                <IonIcon icon={person} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )}
      </IonPage>
    </IonReactRouter>
  );
};

const App: React.FunctionComponent = () => (
  <UserProvider>
    <IonApp>
      <AppContent />
    </IonApp>
  </UserProvider>
);

export default App;
