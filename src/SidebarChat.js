<<<<<<< HEAD
import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import db from './firebase_config';
import { Link } from 'react-router-dom';

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState('');
  const [messages, setMessages] = useState('');

  useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
=======
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import db from "./firebase_config";
import { Link } from "react-router-dom";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
>>>>>>> 08558408c37f613c62464f37c6786049e0d1f510
        .onSnapshot((snapShot) =>
          setMessages(snapShot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
<<<<<<< HEAD
    const roomName = prompt('Please enter name for chat');
    if (roomName) {
      db.collection('rooms').add({
=======
    const roomName = prompt("Please enter name for chat");
    if (roomName) {
      db.collection("rooms").add({
>>>>>>> 08558408c37f613c62464f37c6786049e0d1f510
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
<<<<<<< HEAD
          <p className="sidebarChat__message">{messages[0]?.message}</p>
=======
          <p>{messages[0]?.message}</p>
>>>>>>> 08558408c37f613c62464f37c6786049e0d1f510
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;
