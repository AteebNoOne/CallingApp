import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import DialPad from './components/DialPad';
import PermissionPrompt from './components/PermissionPrompt';
import CallPage from './components/CallPage';
import AudioStream from './components/AudioStream';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <DialPad />
          <PermissionPrompt />
        </Route>
        <Route exact path="/alert">
          <AlertComponent />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/call">
          <CallPage />
        </Route>
        <Route exact path="/audio">
          <AudioStream />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
