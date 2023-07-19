import React from 'react';
import { IonButton } from '@ionic/react';
import { Device } from '@twilio/voice-sdk';

interface Props {
  phoneNumber: string;
}

const CallComponent: React.FC<Props> = ({ phoneNumber }) => {
  const handleClick = () => {
    const accountSid = 'AC6af968cd6d1a3e74ef69922c6c5a267c';
    const authToken = '7c98bb71bcde0e304bb9d3aa6c95af78';
    const from = '';
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`;
    const device = new Device(authToken);

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
        Twiml: 'AP25d0d3575b06c50554479784b88d58d4',
        ApplicationSid: 'AP25d0d3575b06c50554479784b88d58d4',
      }).toString(),
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Call SID:', data.sid);
        console.log(device)
      })
      .catch(error => {
        console.error('Error making the phone call:', error);
      });
  };

  return (
    <IonButton onClick={handleClick}>
      Call {phoneNumber}
    </IonButton>
  );
};

export default CallComponent;
