import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Notification.css';

export const Notification = ({ message, onClose }) => {
  useEffect(() => {
    // Only set the timer IF there is actually a message!
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]); // Depend on `message` so it triggers on new updates

  if (!message) return null;

  return createPortal(
    <div className="simple-toast">
      <span>{message}</span>
    </div>,
    document.body
  );
};