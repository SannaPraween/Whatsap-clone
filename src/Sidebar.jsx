import React, { useState, useEffect } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import db from "./firebase_config";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  const [searchRooms, setSearchRooms] = useState([]);
  const [searchText, setSearchText] = useState("");

  // console.log(user.photoURL);

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapShot) =>
      setRooms(
        snapShot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const searchHandler = (event) => {
    setSearchText(event.target.value);
    // console.log(event.target.value);

    if (searchText.length >= 0) {
      const newChatRooms = rooms.filter((room) => {
        return (
          room.data.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
      });
      setSearchRooms(newChatRooms);
    } else {
      setSearchRooms(rooms);
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user ? user.photoURL : ""} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search or start new chat"
            value={searchText}
            onChange={searchHandler}
          />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {searchText.length < 1
          ? rooms.map((room) => (
              <SidebarChat key={room.id} id={room.id} name={room.data.name} />
            ))
          : searchRooms.map((room) => (
              <SidebarChat key={room.id} id={room.id} name={room.data.name} />
            ))}
      </div>
    </div>
  );
}

export default Sidebar;
