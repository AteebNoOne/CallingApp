import React, { useState, useEffect, useRef } from 'react';
import { IonButton, IonContent, IonGrid, IonRow, IonCol, IonInput } from '@ionic/react';
import Swal from 'sweetalert2';
import Call from './Call';
import CallPage from './CallPage';

const DialPad: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [mediaStreamSource, setMediaStreamSource] = useState<MediaStreamAudioSourceNode | null>(null);
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const from = ''; //ateebnoone
  const accountSid = ''; //ateebnoone
  const authToken = ''; //ateebnoone
  const twiml = '';
  const [callSid, setCallSid] = useState('');

  const handleNumberClick = (number: string) => {
    setPhoneNumber((prevPhoneNumber) => prevPhoneNumber + number);
  };

  const handleDeleteClick = () => {
    setPhoneNumber((prevPhoneNumber) => prevPhoneNumber.slice(0, -1));
  };

  const handleClick = () => {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
      },
      body: new URLSearchParams({
        To: phoneNumber,
        From: from,
        Url: 'http://demo.twilio.com/docs/voice.xml',
        Twiml: twiml,
        ApplicationSid: '',
      }).toString(),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          icon: 'info',
          title: 'Call App',
          text: `${data.message}`,
          showConfirmButton: true,
          timer: 1500,
        });
        console.log('Call SID:', data.sid);
        console.log(data);
        setCallSid(data.sid);
      })
      .catch((error) => {
        console.error('Error making the phone call:', error);
      });

    const websocketUrl = `wss://482f-2400-adc1-172-2900-b9af-6290-6392-8867.ngrok.io`;
    const ws = new WebSocket(websocketUrl);
    ws.onopen = () => {
      console.log('WebSocket connection opened');
      setWebsocket(ws);
    };

    ws.onmessage = (event) => {
      const audioData = event.data; // assuming the server sends raw audio data
      // Handle the received audio data here

      // Play the audio data using the Web Audio API
      if (audioContext && mediaStreamSource) {
        //const audioBuffer = new Float32Array(audioData);
        const audioBufferSource = audioContext.createBufferSource();
        //const audioBuffer = audioContext.createBuffer(1, audioBuffer.length, audioContext.sampleRate);
        //audioBuffer.copyToChannel(audioBufferSource, 0);
        //audioBufferSource.buffer = audioBuffer;
        audioBufferSource.connect(audioContext.destination);
        audioBufferSource.start();
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
  };

  const handleInputChange = (event: CustomEvent) => {
    const newValue = event.detail.value as string;
    setPhoneNumber(newValue);
  };

  const requestPermission = () => {
    navigator.permissions
      .query({ name: 'microphone' as PermissionName })
      .then(function (permissionStatus) {
        permissionStatus.onchange = function () {
          setPermissionGranted(this.state === 'granted');
          console.log('Permission changed to ' + this.state);
        };
        if (permissionStatus.state === 'granted') {
          setPermissionGranted(true);
        }
      });
  };

  useEffect(() => {
    navigator.permissions
      .query({ name: 'microphone' as PermissionName })
      .then(function (permissionStatus) {
        console.log(permissionStatus.state); // granted, denied, prompt

        permissionStatus.onchange = function () {
          console.log('Permission changed to ' + this.state);
          setPermissionGranted(this.state === 'granted');
        };

        if (permissionStatus.state === 'granted') {
          setPermissionGranted(true);
        }
      });

    const audioContext = new (window.AudioContext)();
    setAudioContext(audioContext);

    // Get user's microphone audio stream
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaStreamSource = audioContext.createMediaStreamSource(stream);
        setMediaStreamSource(mediaStreamSource);
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  }, []);

  if (!permissionGranted) {
    return (
      <IonContent>
        <IonGrid fixed>
          <IonRow>
            <IonCol>
              <p>Error: Microphone permission is required.</p>
              <IonButton onClick={requestPermission}>Grant Permission</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    );
  }

  return (
    <IonContent>
      <IonGrid fixed>
        <IonRow>
          <IonCol>
            <IonInput
              value={phoneNumber}
              onIonChange={handleInputChange}
              placeholder="Enter phone number"
            ></IonInput>
          </IonCol>
        </IonRow>

        {/* Number buttons */}
        <IonRow>
          <IonCol size="4">
            <IonButton expand="full" onClick={() => handleNumberClick('1')}>
              1
            </IonButton>
          </IonCol>
          <IonCol size="4">
            <IonButton expand="full" onClick={() => handleNumberClick('2')}>
              2
            </IonButton>
          </IonCol>
          <IonCol size="4">
            <IonButton expand="full" onClick={() => handleNumberClick('3')}>
              3
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4">
            <IonButton expand="full" onClick={() => handleNumberClick('4')}>
              4
            </IonButton>
          </IonCol>
          <IonCol size="4">
            <IonButton expand="full" onClick={() => handleNumberClick('5')}>
              5
            </IonButton>
          </IonCol>
          <IonCol size="4">
            <IonButton expand="full" onClick={() => handleNumberClick('6')}>
              6
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4">
            <IonButton expand="full" onClick={() => handleNumberClick('7')}>
              7
            </IonButton>
          </IonCol>
          <IonCol size="4">
            <IonButton expand="full" onClick={() => handleNumberClick('8')}>
              8
            </IonButton>
          </IonCol>
          <IonCol size="4">
            <IonButton expand="full" onClick={() => handleNumberClick('9')}>
              9
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4">
            <IonButton expand="full" onClick={() => handleNumberClick('*')}>
              *
            </IonButton>
          </IonCol>
          <IonCol size="4">
            <IonButton expand="full" onClick={() => handleNumberClick('0')}>
              0
            </IonButton>
          </IonCol>
          <IonCol size="4">
            <IonButton expand="full" onClick={() => handleNumberClick('#')}>
              #
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4">
            <IonButton expand="full" onClick={handleDeleteClick}>
              Del
            </IonButton>
          </IonCol>
          <IonCol size="4"></IonCol>
          <IonCol size="4">
            <IonButton expand="full" onClick={handleClick}>
              Call
            </IonButton>
          </IonCol>
        </IonRow>
        <IonCol>
        <CallPage />
        </IonCol>
      </IonGrid>
      <Call accountSid={accountSid} authToken={authToken} callSid={callSid} from={from} />
    </IonContent>
  );
};

export default DialPad;
