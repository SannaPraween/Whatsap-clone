import {
  AttachFile,
  InsertEmoticon,
  SearchOutlined,
} from '@mui/icons-material';
import MoreVert from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import './Chat.css';
import db from './firebase_config';
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app';
import PeopleIcon from '@mui/icons-material/People';

function Chat() {
  // const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const messagesEndRef = useRef(null);

  // let chat__body = document.querySelector('.chat__body');
  // chat__body.scrollTop = chat__body.scrollHeight;

  // useEffect(() => {
  //   setSeed(Math.floor(Math.random() * 5000));
  // }, [roomId]);

  const inputHandler = (event) => {
    setInput(event.target.value);
    // chat__body.scrollTop = chat__body.scrollHeight;
  };

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = (event) => {
    event.preventDefault(); // stop the default reloading
    // console.log(input);
    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput('');
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chat">
      <div className="chat__header">
        {/* <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} /> */}
        <IconButton>
          <Avatar>
            <PeopleIcon />
          </Avatar>
        </IconButton>

        <div className="chat__headerInfo">
          <h3>{roomName ? roomName : ''}</h3>
          <p>
            {messages.length
              ? `last seen 
            ${new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toLocaleString()}`
              : ''}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message, index) => (
          <p
            key={index}
            className={`chat__massage ${
              message.name === user.displayName && 'chat__receiver'
            }`}
            ref={messagesEndRef}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toLocaleString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type a message"
            onChange={inputHandler}
            value={input}
          />
          {/* <button
            className="chat__footerButton"
            type="submit"
            onClick={sendMessage}
          >
            Send a massage
          </button> */}
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
