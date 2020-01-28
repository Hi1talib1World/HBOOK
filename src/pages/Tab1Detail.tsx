import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton
} from "@ionic/react";
import { withRouter } from "react-router";

const Tab1Detail: React.SFC<any> = (props) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text=""
              defaultHref="tab1"
              onClick={ ()=> props.history.replace("/tab1")}
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