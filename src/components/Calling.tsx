import React, { useEffect } from 'react';
import twilio from 'twilio';

const Calling: React.FC = () => {
  useEffect(() => {
    const makeCall = async () => {
      const accountSid = 'YOUR_ACCOUNT_SID';
      const authToken = 'YOUR_AUTH_TOKEN';

      const client = twilio(accountSid, authToken);

      try {
        const call = await client.calls.create({
          url: 'http://example.com/your-twiml-endpoint',
          to: '+1234567890',
          from: '+0987654321'
        });

        console.log(call.sid);
      } catch (error) {
        console.error(error);
      }
    };

    makeCall();
  }, []);

  return (
    <div>
      <h1>Calling Component</h1>
    </div>
  );
};

export default Calling;
