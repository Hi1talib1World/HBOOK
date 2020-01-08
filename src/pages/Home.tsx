import { IonContent, IonHeader, IonPage,IonToolbar,IonTitle,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,

  IonMenuButton,
  IonSearchbar,
  IonSegment,
  IonFooter, IonTabBar, IonTabButton, IonLabel, IonBadge } from '@ionic/react';
import React from 'react';

const Home: React.FC = () => {
  return (
   
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
            
             

            <IonButton>
              <a>Enter</a>
              <IonIcon slot="end" name="star" />
            </IonButton>

      
       
        
      </IonContent>
            
            
      
      <IonTabBar slot="bottom">
        <IonTabButton tab="schedule">
          <IonIcon name="calendar" />
          <IonLabel>Schedule</IonLabel>
          <IonBadge>6</IonBadge>
        </IonTabButton>

        <IonTabButton tab="speakers">
          <IonIcon name="contacts" />
          <IonLabel>Speakers</IonLabel>
        </IonTabButton>

        <IonTabButton tab="about">
          <IonIcon name="information-circle" />
          <IonLabel>About</IonLabel>
        </IonTabButton>
      </IonTabBar>
    
    </IonPage>
  );
};

export default Home;
