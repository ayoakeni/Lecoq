import React, { useState, useEffect, useRef } from 'react';
import profile from "../assets/images/lecoq.jpg";

const WhatsappChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const [message, setMessage] = useState('');
  const [sentTime, setSentTime] = useState('');

  const textRef = useRef(null);
  const whatsappRef = useRef(null);

  useEffect(() => {
    if (isOpen && !hasTyped) {
      typeText('Typically replies within an hour');
      setHasTyped(true);

      setMessage(
        `<div class='whatsapp-loading-animation'>
           <div class='whatsapp-loading-circle'></div>
           <div class='whatsapp-loading-circle'></div>
           <div class='whatsapp-loading-circle'></div>
         </div>`
      );

      setTimeout(() => {
        const timeSent = getCurrentTime();
        setMessage(
          `<span class='whatsapp-message-title'>Le Coq French School</span>
           <span class='whatsapp-content-message'>Hi there 👋<br><br> How can I help you?</span>
           <span class='whatsapp-time'>${timeSent}</span>`
        );
      }, 2500);
    }
  }, [isOpen, hasTyped]);

  const typeText = (text) => {
    let index = 0;
    const typeNextCharacter = () => {
      if (index < text.length) {
        textRef.current.textContent += text[index];
        index++;
        setTimeout(typeNextCharacter, 50);
      }
    };
    typeNextCharacter();
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleDragStart = (e) => {
    const touch = e.touches?.[0] || e;
    const offsetX = touch.clientX - whatsappRef.current.getBoundingClientRect().left;
    const offsetY = touch.clientY - whatsappRef.current.getBoundingClientRect().top;

    const onMouseMove = (moveEvent) => {
      const moveTouch = moveEvent.touches?.[0] || moveEvent;
      const newX = Math.min(
        window.innerWidth - whatsappRef.current.offsetWidth,
        Math.max(0, moveTouch.clientX - offsetX)
      );
      const newY = Math.min(
        window.innerHeight - whatsappRef.current.offsetHeight,
        Math.max(0, moveTouch.clientY - offsetY)
      );
      whatsappRef.current.style.left = `${newX}px`;
      whatsappRef.current.style.top = `${newY}px`;
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchend', stopDrag);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onMouseMove);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
  };

  return (
    <div className="whatsapp-chat-box">
      <div className={`whatsapp-box ${isOpen ? 'active' : ''}`}>
        <div className="whatsapp-header">
          <div className="whatsapp-profile">
            <img className="whatsapp-img" src={profile} alt="Profile" />
            <span className="whatsapp-online-status"></span>
          </div>
          <div className="whatsapp-title">
            <span className="whatsapp-name">Le Coq French School</span>
            <span className="whatsapp-suggestion" ref={textRef}></span>
          </div>
          <span
            className="whatsapp-close"
            onClick={() => setIsOpen(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
        </div>
        <div className="whatsapp-message-box">
          <div
            className="whatsapp-box-message"
            dangerouslySetInnerHTML={{ __html: message }}
          ></div>
        </div>
        <a
          className="whatsapp-send-field"
          role="button"
          href="https://api.whatsapp.com/send?phone=12896984183&text=Hi%20I%20would%20like%20to%3A"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-whatsapp"></i>
          <span className="whatsapp-start-chat">Start Chat</span>
        </a>
      </div>
      <button
        className="whatsapp-toggle"
        id="whatsapp-btn"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onClick={() => setIsOpen(!isOpen)}
        ref={whatsappRef}
      >
        <i className="fa-brands fa-whatsapp"></i>
        <span className="whatsapp-red-dot"></span>
      </button>
    </div>
  );
};

export default WhatsappChatBox;