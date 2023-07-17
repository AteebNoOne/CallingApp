import React, { useRef, useEffect, useState } from 'react';
import { IonButton } from '@ionic/react';

const AudioStream: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const startStreaming = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
      setIsStreaming(true);
    } catch (error) {
      console.error('Error accessing audio stream:', error);
    }
  };

  const stopStreaming = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setIsStreaming(false);
    }
  };

  useEffect(() => {
    if (audioRef.current && mediaStream) {
      audioRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  return (
    <div>
      <IonButton onClick={isStreaming ? stopStreaming : startStreaming}>
        {isStreaming ? 'Stop Streaming' : 'Start Streaming'}
      </IonButton>

      {isStreaming && (
        <audio ref={audioRef} autoPlay controls style={{ marginTop: '20px' }} />
      )}
    </div>
  );
};

export default AudioStream;
