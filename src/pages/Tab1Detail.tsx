import React, { useState }  from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton
} from "@ionic/react";
import { arrowRoundBack } from 'ionicons/icons'
import { withRouter } from "react-router";

const Tab1Detail: React.SFC<any> = (props) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
        <IonBackButton
            text=""
            defaultHref="/"
            onClick={() => props.history.replace("/tab1")}
            goBack={() => {}}
        />
          </IonButtons>
          <IonTitle>Tab One Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent />
    </>
  );
};

export default withRouter(Tab1Detail);