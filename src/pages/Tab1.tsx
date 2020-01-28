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
        <IonButton
          expand="full"
          style={{ margin: "14" }}
          onClick={e => {
            e.preventDefault();
            props.history.push("/tab1-detail");
          }}
        >
          NEXT PAGE
        </IonButton>
      </IonContent>
    </>
  );
};

export default withRouter(Tab1);