import React, { useState } from 'react';
import { IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';

interface CallControlsProps {
  isMuted: boolean;
  isSpeakerOn: boolean;
  onMuteToggle: () => void;
  onSpeakerToggle: () => void;
  onHangup: () => void;
}

const CallControls: React.FC<CallControlsProps> = ({
  isMuted,
  isSpeakerOn,
  onMuteToggle,
  onSpeakerToggle,
  onHangup,
}) => {
  const [microphoneStream, setMicrophoneStream] = useState<MediaStream | null>(null);
  const [hidePage, setHidePage] = useState(false);

  const toggleMicrophonePermission = async () => {
    try {
      if (!microphoneStream) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicrophoneStream(stream);
      } else {
        microphoneStream.getAudioTracks().forEach((track) => {
          track.enabled = !isMuted;
        });
      }
      onMuteToggle();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const playAudio = () => {
    if (!isMuted && microphoneStream && isSpeakerOn) {
      const audioContext = new AudioContext();
      const mediaStreamSource = audioContext.createMediaStreamSource(microphoneStream);
      mediaStreamSource.connect(audioContext.destination);
    }
  };

  const handleHangup = () => {
    setHidePage(true);
    onHangup();
  };

  if (hidePage) {
    return null; // Return null to hide the component
  }

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonButton expand="full" onClick={() => {
            toggleMicrophonePermission();
            playAudio();
          }}>
            {isMuted ? 'Mute' : 'Unmute'}
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton expand="full" onClick={onSpeakerToggle}>
            {isSpeakerOn ? 'Speaker Off' : 'Speaker On'}
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton expand="full" onClick={handleHangup}>
            Hangup
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default CallControls;
