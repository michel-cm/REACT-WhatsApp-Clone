import React, {useState} from "react";
import EmojiPicker from "emoji-picker-react";
import "./ChatWindow.css";

import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";

function ChatWindow() {

  const [emojiOpen, setEmojiOpen] = useState(false);

  function handleEmojiclick() {
     
  }
  function handleEmojiOpen() {
      setEmojiOpen(true);
  }
  function handleEmojiClose() {
      setEmojiOpen(false);
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

      <div className="chatWindow--body"></div>

      <div className="chatWindow--emojiarea"
      style={{height: emojiOpen ? '250px' : '0px'}}>
        <EmojiPicker
          onEmojiClick={handleEmojiclick}
          disableSearchBar
          disableSkinTonePicker
        />
      </div>

      <div className="chatWindow--footer">
        <div className="chatWindow--pre">
          <div className="chatWindow--btn"
           onClick={handleEmojiClose}
           style={{width: emojiOpen? 40:0}}
           >
            <CloseIcon style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn"
          onClick={handleEmojiOpen}
          >
            <InsertEmoticonIcon style={{color: emojiOpen ? "#009688" : "#919191"}} />
          </div>
        </div>

        <div className="chatWindow--inputarea">
          <input
            className="chatWindow--input"
            type="text"
            placeholder="Digite uma mensagem"
          />
        </div>
        <div className="chatWindow--pos">
          <div className="chatWindow--btn">
            <SendIcon style={{ color: "#919191" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
