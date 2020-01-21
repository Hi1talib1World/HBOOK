import { IonContent, IonHeader, IonPage,IonPopover, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/react';
import React , { useState } from 'react';

const Home: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false); 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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
          will be your guide.
        </p>
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

      </IonContent>
     
    </IonPage>
  );
};

export default Home;
