import * as React from "react";
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from "@ionic/react";
import { Route, Redirect } from "react-router";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Home from "./Home";
import About from "./About";

interface IAppProps {}

const TabRoot: React.FC<IAppProps> = props => {
  return (
    <IonPage id="main">
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/:tab(tab1)" component={Tab1}  />
          <Route path="/:tab(tab2)" component={Tab2} />
          <Route path="/:Home(Home)" component={Home} />
          <Route path="/:About(About)" component={About} />          

          <Route path="/" render={() => <Redirect to="/tab1" />} /> 
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon name="flash" />
            <IonLabel>Tab One</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon name="apps" />
            <IonLabel>Tab Two</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};

export default TabRoot;