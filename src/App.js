import React, { useState, useEffect } from "react";
import "./App.css";

import Api from './Api' ;

import ChatListItem from "./components/ChatListItem/ChatListItem";
import ChatIntro from "./components/ChatIntro/ChatIntro";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import NewChat from "./components/NewChat/NewChat";

import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import Login from "./components/Login/Login";


function App() {
  const [chatlist, setChatList] = useState([]);

  const [activeChat, setActiveChat] = useState({});
  const [ user, setUser] = useState({
    id:'sMhNjARe2I0bWEbY4oEo',
    name: 'Fulano Teste',
    avatar: 'https://static.vecteezy.com/ti/vetor-gratis/p1/2275847-avatar-masculino-perfil-icone-de-homem-caucasiano-sorridente-vetor.jpg'
  });
  const[showNewChat, setShowNewChat] = useState(false);

  useEffect(() => {
    if(user !== null) {
      let unsub = Api.onChatList(user.id, setChatList);
      return unsub;
    }
  }, [user])

  const handleNewChat = () => {
    setShowNewChat(true);
  }

  const handleLoginData = async (user) => {
    let newUser = {
      id: user.id,
      name: user.displayName,
      avatar: user.photoURL
    };
    await Api.addUser(newUser);
    setUser(newUser);
  }

  if(user == null) {
    return (<Login onReceive={handleLoginData} />);
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
          data={activeChat}
        />
        }
        {activeChat.chatId === undefined && <ChatIntro />}
      </div>
    </div>
  );
}

export default App;
