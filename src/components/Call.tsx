import React, { useState, useEffect } from 'react';
import { IonContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';

interface CallProps {
    accountSid: string;
    authToken: string;
    callSid: string;
    from:string;
}

interface CallData {
    date_updated: string;
    price_unit: string;
    parent_call_sid: null;
    caller_name: string;
    duration: string;
    from: string;
    to: string;
    annotation: null;
    answered_by: null;
    sid: string;
    queue_time: string;
    price: string;
    api_version: string;
    status: string;
    direction: string;
    start_time: string;
    date_created: string;
    from_formatted: string;
    group_sid: null;
    trunk_sid: string;
    forwarded_from: null;
    uri: string;
    account_sid: string;
    end_time: string;
    to_formatted: string;
    phone_number_sid: string;
    subresource_uris: {
        feedback: string;
        user_defined_messages: string;
        notifications: string;
        recordings: string;
        streams: string;
        payments: string;
        user_defined_message_subscriptions: string;
        siprec: string;
        events: string;
        feedback_summaries: string;
    };
}


const Call: React.FC<CallProps> = ({ accountSid, authToken, callSid,from }) => {
    const [callData, setCallData] = useState<CallData | null>(null);
    const [status,setStatus] = useState('');
    const [myStyle, setMyStyle] = useState<{ fontColor?: string; textColor?: string } | undefined>(undefined);

    const handleStatus = () => {
        const Incoming = {
          textColor: 'green',
          color : 'green',
          fontWeight : 'bold',
        };
        const Outgoing = {
          fontColor: 'red',
          color : 'red',
          fontWeight : 'bold',
        };
      
        if (callData && callData.from === from) {
          setStatus('Outgoing');
          setMyStyle(() => Outgoing); // Use a function to set the state
        } else {
          setStatus('Incoming');
          setMyStyle(() => Incoming); // Use a function to set the state
        }
      };
      

    useEffect(() => {
        handleStatus();
    }, [callData, from]);


    useEffect(() => {

        const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls/${callSid}.json`;
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
            },
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                setCallData(data);
            })
            .catch(error => {
                console.error('Error fetching call component:', error);
            });

            
    }
    , [accountSid, authToken, callSid]);


    if (!callData) {
        return <div>Loading...</div>;
    }

    // Render the call component data
    return (
        <IonContent>
            <IonGrid fixed>
                <IonRow>
                    <IonCol>
                    <h1>Call Data </h1>
                    <h2 style={myStyle as React.CSSProperties}>{status}</h2>
                        <p>SID: {callData.sid}</p>
                        <p>
                            From: {callData.from} <span style={{ fontWeight: 'bold' }}>Formatted: </span>
                            {callData.from_formatted}
                        </p>
                        <p>
                            To: {callData.to} <span style={{ fontWeight: 'bold' }}>Formatted: </span>
                            {callData.to_formatted}
                        </p>
                        <p>Date Created: {callData.date_created}</p>
                        <p>Date Updated: {callData.date_updated}</p>
                        <p>Duration: {callData.duration} seconds</p>
                        <p>
                            Stream:{" "}
                            <a href={`https://api.twilio.com${callData.subresource_uris.streams}`} target='blank'>
                                {`https://api.twilio.com${callData.subresource_uris.streams}`}
                            </a>
                        </p>
                        {/* Render other properties of the call component */}
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    );
};

export default Call;
