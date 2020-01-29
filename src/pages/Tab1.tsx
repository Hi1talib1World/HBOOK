import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
} from "@ionic/react";
import { withRouter } from "react-router";

const Tab1: React.SFC<any> = (props) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab One</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        
      </IonContent>
    </>
  );
};

export default withRouter(Tab1);