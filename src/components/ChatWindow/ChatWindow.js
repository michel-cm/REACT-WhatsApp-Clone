import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import "./ChatWindow.css";

import MessageItem from "../MessageItem/MessageItem";

import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";

function ChatWindow({user}) {

  const body = useRef();

  let recognition = null;
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
  }

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [list, setList] = useState([
    {author: 123, body: 'bla bla bla'},
    {author: 123, body: 'bla bla'},
    {author: 1234, body: 'bla bla bla  bla'},
    {author: 123, body: 'bla bla bla'},
    {author: 123, body: 'bla bla'},
    {author: 1234, body: 'bla bla bla  bla'},
    {author: 123, body: 'bla bla bla'},
    {author: 123, body: 'bla bla'},
    {author: 1234, body: 'bla bla bla  bla'},
    {author: 123, body: 'bla bla bla'},
    {author: 123, body: 'bla bla'},
    {author: 1234, body: 'bla bla bla  bla'},
    {author: 123, body: 'bla bla bla'},
    {author: 123, body: 'bla bla'},
    {author: 1234, body: 'bla bla bla  bla'},
    {author: 123, body: 'bla bla bla'},
    {author: 123, body: 'bla bla'},
    {author: 1234, body: 'bla bla bla  bla'},
    {author: 123, body: 'bla bla bla'},
    {author: 123, body: 'bla bla'},
    {author: 1234, body: 'bla bla bla  bla'},
    {author: 123, body: 'bla bla bla'},
    {author: 123, body: 'bla bla'},
    {author: 1234, body: 'bla bla bla  bla'},
    {author: 123, body: 'bla bla bla'},
    {author: 123, body: 'bla bla'},
    {author: 1234, body: 'bla bla bla  bla'},
    {author: 123, body: 'bla bla bla'},
    {author: 123, body: 'bla bla'},
    {author: 1234, body: 'bla bla bla  bla'},
    {author: 123, body: 'bla bla bla'},
    {author: 123, body: 'bla bla'},
    {author: 1234, body: 'bla bla bla  bla'},
    {author: 123, body: 'bla bla bla'},
    {author: 123, body: 'bla bla'},
    {author: 1234, body: 'bla bla bla  bla'},
    {author: 123, body: 'bla bla bla'},
    {author: 123, body: 'bla bla'},
    {author: 1234, body: 'bla bla bla  bla'},
    {author: 123, body: 'bla bla bla'},
    {author: 123, body: 'bla bla'},
    {author: 1234, body: 'bla bla bla  bla'},
    {author: 123, body: 'bla bla bla'},
    {author: 123, body: 'bla bla'},
    {author: 1234, body: 'bla bla bla  bla'},
    {author: 123, body: 'bla bla bla'},
    {author: 123, body: 'bla bla'},
    {author: 1234, body: 'bla bla bla  bla'},
    {author: 123, body: 'bla bla bla'},
    {author: 123, body: 'bla bla'},
    {author: 1234, body: 'bla bla bla  bla'},
  ]);

  useEffect(()=> {
    if(body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
    }
  }, [list]);

  const handleEmojiclick = (e, emojiObejct) => {
    setText(text + emojiObejct.emoji);
  }

  const handleEmojiOpen = () => {
    setEmojiOpen(true);
  }
  const handleEmojiClose = () => {
    setEmojiOpen(false);
  }

  const handleMicClick = () => {
    if(recognition !== null) {

      recognition.onstart = () => {
        setListening(true);
      }
      recognition.onend = () => {
        setListening(false);
      }
      recognition.onresult = (e) => {
        setText(e.results[0][0].transcript);
      }

      recognition.start();

    }
  }

  const handleSendClick = () => {

  }

  return (
    <div className="chatWindow">
      <div className="chatWindow--header">
        <div className="chatWindow--headerinfor">
          <img
            className="chatWindow--avatar"
            src="https://www.w3schools.com/w3images/avatar5.png"
            alt=""
          />
          <div className="chatWindow--name">Michel Corrêa </div>
        </div>

        <div className="chatWindow--headerbuttons">
          <div className="chatWindow--btn">
            <SearchIcon style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn">
            <AttachFileIcon style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn">
            <MoreVertIcon style={{ color: "#919191" }} />
          </div>
        </div>
      </div>

      <div ref={body} className="chatWindow--body">

        {list.map((item, key) => (
          <MessageItem 
            key={key}
            data={item}
            user={user}
          />
        ))}

      </div>

      <div
        className="chatWindow--emojiarea"
        style={{ height: emojiOpen ? "250px" : "0px" }}
      >
        <EmojiPicker
          onEmojiClick={handleEmojiclick}
          disableSearchBar
          disableSkinTonePicker
        />
      </div>

      <div className="chatWindow--footer">
        <div className="chatWindow--pre">
          <div
            className="chatWindow--btn"
            onClick={handleEmojiClose}
            style={{ width: emojiOpen ? 40 : 0 }}
          >
            <CloseIcon style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn" onClick={handleEmojiOpen}>
            <InsertEmoticonIcon
              style={{ color: emojiOpen ? "#009688" : "#919191" }}
            />
          </div>
        </div>

        <div className="chatWindow--inputarea">
          <input
            className="chatWindow--input"
            type="text"
            placeholder="Digite uma mensagem"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="chatWindow--pos">
          {text === "" && 
            <div className="chatWindow--btn" onClick={handleMicClick}>
              <MicIcon style={{ color: listening ? "#126ECE" : "#919191" }} />
            </div>
          }

          {text !== "" && 
            <div className="chatWindow--btn" onClick={handleSendClick} >
              <SendIcon style={{ color: "#919191" }} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
