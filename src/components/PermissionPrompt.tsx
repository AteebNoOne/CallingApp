import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

const PermissionPrompt: React.FC = () => {
  const [microphonePermission, setMicrophonePermission] = useState(false);
  const [speakerPermission, setSpeakerPermission] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

const checkPermissions = async () => {
  const microphonePermissionGranted = await checkMicrophonePermission();
  setMicrophonePermission(microphonePermissionGranted);

  const speakerPermissionGranted = checkSpeakerPermission();
  setSpeakerPermission(speakerPermissionGranted);
};

  const checkMicrophonePermission = async (): Promise<boolean> => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('getUserMedia API is not supported in this browser');
      }
  
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      return false;
    }
  };
  
  

  const checkSpeakerPermission = (): boolean => {
    
    try {
      const audioContext = new AudioContext();
      audioContext.close();
      console.log("Speaker permission granted")
      return true;
    } catch (error) {
      console.error('Speaker permission denied:', error);
      return false;
    }
  };
  
  const handleGrantPermissions = () => {
    // Implement your logic to request microphone and speaker permissions
    requestMicrophonePermission();
    requestSpeakerPermission();
  };

  const requestMicrophonePermission = () => {
    // Implement your logic to request microphone permission
    // You can use platform-specific APIs or libraries to request permissions
    // Example: requestMicrophonePermission();
    setMicrophonePermission(true); // Placeholder value, replace with actual permission request
  };

  const requestSpeakerPermission = () => {
    // Implement your logic to request speaker permission
    // You can use platform-specific APIs or libraries to request permissions
    // Example: requestSpeakerPermission();
    setSpeakerPermission(true); // Placeholder value, replace with actual permission request
  };

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Permission Prompt</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!microphonePermission && (
          <div>
            <p>Please allow microphone permission to continue.</p>
            <IonButton expand="block" onClick={handleGrantPermissions}>
              Grant Microphone Permission
            </IonButton>
          </div>
        )}
        {!speakerPermission && (
          <div>
            <p>Please allow speaker permission to continue.</p>
            <IonButton expand="block" onClick={handleGrantPermissions}>
              Grant Speaker Permission
            </IonButton>
          </div>
        )}
        {microphonePermission && speakerPermission && (
          <div>
            <p>Microphone and speaker permissions granted!</p>
            {/* Render your main component or perform further actions */}
          </div>
        )}
      </IonContent>
    </IonContent>
  );
};

export default PermissionPrompt;
