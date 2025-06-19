declare module 'react-speech' {
  import * as React from 'react';

  interface SpeechProps {
    text: string;
    lang?: string;
    voice?: string;
    rate?: string;
    pitch?: string;
    volume?: string;
    textAsButton?: boolean;
    displayText?: string;
    onStart?: () => void;
    onEnd?: () => void;
  }

  const Speech: React.FC<SpeechProps>;

  export default Speech;
}
