import React, { useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import CallScreen from './CallScreen'; // Import component cuộc gọi

const CallButton = ({ callerName }) => {
  const [isCalling, setIsCalling] = useState(false);

  return (
    <>
      <button onClick={() => setIsCalling(true)}>
        <FaPhoneAlt size={23} />
      </button>
      {isCalling && (
        <CallScreen callerName={callerName} onEndCall={() => setIsCalling(false)} />
      )}
    </>
  );
};

export default CallButton;
