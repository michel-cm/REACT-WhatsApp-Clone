import React from 'react';
import './ChatWindow.css'

import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function ChatWindow() {
    return(
        <div className='chatWindow'>

            <div className='chatWindow--header'>

                <div className='chatWindow--headerinfor'>
                    <img className='chatWindow--avatar' src='https://www.w3schools.com/w3images/avatar5.png' alt='' />
                    <div className='chatWindow--name'>Michel Corrêa </div>
                </div>

                <div className='chatWindow--headerbuttons'>
                    <div className='chatWindow--btn'>
                        <SearchIcon  style={{color: '#919191'}}/>
                    </div>
                    <div className='chatWindow--btn'>
                        <AttachFileIcon  style={{color: '#919191'}}/>
                    </div>
                    <div className='chatWindow--btn'>
                        <MoreVertIcon  style={{color: '#919191'}}/>
                    </div>
                </div>

            </div>

            <div className='chatWindow--body'>

            </div>

            <div className='chatWindow--footer'>

            </div>

        </div>
    );
}

export default ChatWindow;