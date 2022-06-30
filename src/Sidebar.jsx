import React, { useState, useEffect } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import db from './firebase_config';
import { useStateValue } from './StateProvider';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

function Sidebar(props) {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  const [searchRooms, setSearchRooms] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // console.log(user.photoURL);

  useEffect(() => {
    const unsubscribe = db
      .collection('rooms')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapShot) =>
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
    if (searchText.length > 0) {
      const newChatRooms = rooms.filter((room) => {
        // rooms --> [{}, {}, {}]
        return (
          room.data.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
      });
      setSearchRooms(newChatRooms);
      console.log(searchText);
    } else {
      setSearchRooms(rooms);
    }
    // console.log(searchText);
  };

  // for logout feature
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
    console.log(event.target.innerText);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar src={user ? user.photoURL : ''} />
        </StyledBadge>
        <Switch
          onChange={props.setTheme}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <div className="sidebar__headerRight">
          <IconButton>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              variant="dot"
            >
              <DonutLargeIcon />
            </StyledBadge>
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            />
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search or start new chat"
            onChange={searchHandler}
            value={searchText}
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
