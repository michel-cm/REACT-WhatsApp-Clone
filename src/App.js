import React, { useState, useEffect } from "react";
import "./App.css";

import ChatListItem from "./components/ChatListItem/ChatListItem";
import ChatIntro from "./components/ChatIntro/ChatIntro";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import NewChat from "./components/NewChat/NewChat";

import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";

function App() {
  const [chatlist, setChatList] = useState([
    {
      chatId: 1,
      title: "Fulano de tal 1",
      image: "https://www.w3schools.com/w3images/avatar5.png",
    },
    {
      chatId: 2,
      title: "Fulano de tal 2",
      image: "https://www.w3schools.com/w3images/avatar5.png",
    },
    {
      chatId: 3,
      title: "Fulano de tal 3",
      image: "https://www.w3schools.com/w3images/avatar5.png",
    },
    {
      chatId: 4,
      title: "Fulano de tal 4",
      image: "https://www.w3schools.com/w3images/avatar5.png",
    },
  ]);
  const [activeChat, setActiveChat] = useState({});
  const [ user, setUser] = useState({
    id: 1234,
    avatar: 'https://www.w3schools.com/w3images/avatar5.png',
    name: 'Michel Correa'
  });

  const[showNewChat, setShowNewChat] = useState(false);

  const handleNewChat = () => {
    setShowNewChat(true);
  }

  return (
    <div className="app-window">
      <div className="sidebar">

        <NewChat 
          chatList={chatlist}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />

        <header>
          <img
            className="header--avatar"
            src={user.avatar}
            alt="foto-perfil"
          />
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon style={{ color: "#919191" }} />

              <ChatIcon onClick={handleNewChat} style={{ color: "#919191" }} />

              <MoreVertIcon style={{ color: "#919191" }} />
            </div>
          </div>
        </header>

        <div className="search">
          <div className="search--input">
            <SearchIcon fontSize="small" style={{ color: "#919191" }} />
            <input
              type="search"
              placeholder="Procurar ou começar uma conversa"
            />
          </div>
        </div>

        <div className="chatlist">
          {chatlist.map((item, key) => (
            <ChatListItem
              key={key}
              data={item}
              active={activeChat.chatId === chatlist[key].chatId}
              onClick={() => setActiveChat(chatlist[key])}
            />
          ))}
        </div>
      </div>

      <div className="contentarea">
        {activeChat.chatId !== undefined && 
        <ChatWindow 
          user = {user}
        />
        }
        {activeChat.chatId === undefined && <ChatIntro />}
      </div>
    </div>
  );
}

export default App;
