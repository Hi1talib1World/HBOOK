import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,IonSegment,IonMenu,IonPopover, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonItem,IonList,IonRouterOutlet, IonSegmentButton, IonLabel, IonFab, IonFabButton, IonIcon, IonFabList,
  IonButton
} from "@ionic/react";
import { withRouter } from "react-router";
import React , { useState } from 'react';


const Tab1: React.SFC<any> = (props) => {
  const [showPopover, setShowPopover] = useState(false); 

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab One</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
        <IonCardTitle>Card Title</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        Keep close to Nature's heart... and break clear away, once in awhile,
        and climb a mountain or spend a week in the woods. Wash your spirit clean.
      </IonCardContent>
    </IonCard>
        
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
    </>
  );
};

export default withRouter(Tab1);