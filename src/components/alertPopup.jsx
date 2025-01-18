import React, { useState, useEffect } from "react";

const AlertPopup = ({ message, duration = 5000, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = 100;
    const step = interval / duration * 100;
    const timer = setInterval(() => {
      setProgress((prev) => Math.min(prev + step, 100));
    }, interval);

    const timeout = setTimeout(() => {
      clearInterval(timer);
      onClose();
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [duration, onClose]);

  return (
    <div className="alert-popup">
      <div className="alert-content">
        <span>{message}</span>
        <i className="close-alert fa-solid fa-times" onClick={onClose}></i>
      </div>
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default AlertPopup;
