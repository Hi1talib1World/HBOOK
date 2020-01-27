import { IonSegment, IonSegmentButton, IonLabel,IonContent, IonHeader, IonTabs, IonTabBar, IonTabButton, IonBadge , IonPage,IonPopover, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/react';
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
