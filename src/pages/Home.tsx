import { IonSegment,IonMenu,IonItem,IonList,IonRouterOutlet, IonSegmentButton, IonLabel,IonContent, IonHeader, IonTabs, IonTabBar, IonTabButton, IonBadge , IonPage,IonPopover, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/react';
import React , { useState } from 'react';
import { Route, Redirect } from "react-router";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";

const Home: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false); 
  return (
    <IonPage id="main">

    
      <IonContent className="ion-padding">
            
        

      <IonTabs>
      <IonRouterOutlet>
        </IonRouterOutlet>
    <IonTabBar slot="top">
      <IonTabButton tab="schedule" href="/tab2">
        <IonIcon name="calendar" />
        <IonLabel>Schedule</IonLabel>
        <IonBadge>6</IonBadge>
      </IonTabButton>

      <IonTabButton tab="speakers">
        <IonIcon name="contacts" />
        <IonLabel>Speakers</IonLabel>
      </IonTabButton>

      <IonTabButton tab="map">
        <IonIcon name="map" />
        <IonLabel>Map</IonLabel>
      </IonTabButton>

      <IonTabButton tab="about">
        <IonIcon name="information-circle" />
        <IonLabel>About</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
      </IonContent>
     
    </IonPage>
    
  );
};

export default Home;
