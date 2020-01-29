import {
  IonHeader,
  IonToolbar,
  IonTitle,
 
  IonListHeader,
  
  IonContent,IonSegment,IonMenu,IonPopover, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonItem,IonList,IonRouterOutlet, IonSegmentButton, IonLabel, IonFab, IonFabButton, IonIcon, IonFabList,
  IonButton
} from "@ionic/react";
import { withRouter } from "react-router";
import React , { useState } from 'react';


const Tab1: React.SFC<any> = (props) => {
  const [showPopover, setShowPopover] = useState(false); 

  return (
    <>
      <React.Fragment>
      <IonHeader>
        
      </IonHeader>
      <IonContent>
        <IonCard class="welcome-card">
          <img src="/assets/shapes.svg" alt=""/>
          <IonCardHeader>
            <IonCardSubtitle>Get Started</IonCardSubtitle>
            <IonCardTitle>Welcome to Ionic</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Now that your app has been created, you'll want to start building out features and
              components. Check out some of the resources below for next steps.
            </p>
          </IonCardContent>
        </IonCard>

        <IonList lines="none">
          <IonListHeader>
            <IonLabel>Resources</IonLabel>
          </IonListHeader>
          <IonItem href="https://ionicframework.com/docs/" target="_blank">
            <IonIcon slot="start" color="medium"  />
            <IonLabel>Ionic Documentation</IonLabel>
          </IonItem>
          <IonItem href="https://ionicframework.com/docs/building/scaffolding" target="_blank">
            <IonIcon slot="start" color="medium"  />
            <IonLabel>Scaffold Out Your App</IonLabel>
          </IonItem>
          <IonItem href="https://ionicframework.com/docs/layout/structure" target="_blank">
            <IonIcon slot="start" color="medium"  />
            <IonLabel>Change Your App Layout</IonLabel>
          </IonItem>
          <IonItem href="https://ionicframework.com/docs/theming/basics" target="_blank">
            <IonIcon slot="start" color="medium"  />
            <IonLabel>Theme Your App</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </React.Fragment>
    </>
  );
};

export default withRouter(Tab1);