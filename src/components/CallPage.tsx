import React, { useState } from 'react';
import CallControls from './CallControls';

const CallPage: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  const handleMuteToggle = () => {
    setIsMuted((prevMuted) => !prevMuted);
    // Logic to stop sending voice over the web socket or resume sending voice
  };

  const handleSpeakerToggle = () => {
    setIsSpeakerOn((prevSpeakerOn) => !prevSpeakerOn);
    // Logic to toggle the speaker on/off
  };

  const handleHangup = () => {
    // Logic to end the call using Twilio API
  };

  return (
    <div>
      {/* Your call UI */}
      <CallControls
        isMuted={isMuted}
        isSpeakerOn={isSpeakerOn}
        onMuteToggle={handleMuteToggle}
        onSpeakerToggle={handleSpeakerToggle}
        onHangup={handleHangup}
      />
    </div>
  );
};

export default CallPage;
