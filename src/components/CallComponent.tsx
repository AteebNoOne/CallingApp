import React from 'react';
import { IonButton } from '@ionic/react';

interface Props {
  phoneNumber: string;
}

const CallComponent: React.FC<Props> = ({ phoneNumber }) => {
  const handleClick = () => {
    const accountSid = '';
    const authToken = '';
    const from = '';
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
        Twiml: 'AP25d0d3575b06c50554479784b88d58d4',
        ApplicationSid: '',
      }).toString(),
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Call SID:', data.sid);
        console.log(data)
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
