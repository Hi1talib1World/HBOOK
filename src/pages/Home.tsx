import { IonSegment,IonMenu,IonItem,IonList,IonRouterOutlet, IonSegmentButton, IonLabel,IonContent, IonHeader, IonTabs, IonTabBar, IonTabButton, IonBadge , IonPage,IonPopover, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/react';
import React , { useState } from 'react';

const Home: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false); 
  return (
    <IonPage>

    
      <IonContent className="ion-padding">
            
        
          <IonPopover
          isOpen={showPopover}
          onDidDismiss={e => setShowPopover(false)}
        >
          <p>This is popover content</p>
        </IonPopover>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton onClick={() => setShowPopover(true)}>
        <IonIcon name="arrow-dropleft" />
      </IonFabButton>
    </IonFab>


    <IonTabs>
    <IonTabBar slot="bottom">
      <IonTabButton tab="schedule">
        <IonIcon name="calendar" />
        <IonLabel>Schedule</IonLabel>
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
    <IonRouterOutlet></IonRouterOutlet>

  </IonTabs>

      </IonContent>
     
    </IonPage>
    
  );
};

export default Home;
