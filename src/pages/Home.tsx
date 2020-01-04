import { IonContent, IonHeader, IonPage,IonToolbar,IonTitle,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonMenuButton,
  IonSearchbar,
  IonSegment,
  IonFooter,
  IonSegmentButton, } from '@ionic/react';
import React from 'react';

const Home: React.FC = () => {
  return (
   
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons >
        <IonButton>
          <IonIcon slot="icon-only" name="star" />
        </IonButton>
      </IonButtons>
          <IonTitle>Ionic Blank</IonTitle>
        </IonToolbar>
        
      </IonHeader>
      <IonContent className="ion-padding">
        
        The world is your oyster.
        <p>
          If you get lost, the{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/">
            docs
          </a>{' '}
        </p>
        
      </IonContent>

      <IonFooter>
      <IonToolbar>
        <IonTitle>Footer</IonTitle>
      </IonToolbar>
    </IonFooter>

    </IonPage>
  );
};

export default Home;
