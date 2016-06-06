import React from 'react';

const ChatMessage = ({ authorId, text, t }) => (
  <li className='message'>
    <img height='50px' width='50px' src={`http://api.adorable.io/avatars/50/${authorId}.png`} />
    <span className='text'>{text}</span>
    <span className="datetime">{t.toLocaleString()}</span>
  </li>
);

export default ChatMessage;
