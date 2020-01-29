import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent ,IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonLabel} from '@ionic/react';

const Tab2: React.SFC = () => {
  return (
    <>
      <React.Fragment>
      <IonHeader>
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
      </IonHeader>
      <IonContent />
    </React.Fragment>
    </>
  );
};

export default Tab2;