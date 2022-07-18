import React, { useState } from 'react';
import './NewChat.css';

import ArrowBackIcon from "@mui/icons-material/ArrowBack";


function NewChat({user, chatlist, show, setShow}) {

    const [list, setList] = useState([
        {id: 123, avatar: 'https://www.w3schools.com/w3images/avatar5.png', name: 'Michel Cprrea'},
        {id: 123, avatar: 'https://www.w3schools.com/w3images/avatar5.png', name: 'Michel Cprrea'},
        {id: 123, avatar: 'https://www.w3schools.com/w3images/avatar5.png', name: 'Michel Cprrea'},
        {id: 123, avatar: 'https://www.w3schools.com/w3images/avatar5.png', name: 'Michel Cprrea'}
    ]);

    const handleClose = () => {
        setShow(false);
    }

    const[showNewChat, setShowNewChat] = useState(false);

    return (
        <div className='newChat' style={{left: show? 0 : -415}} >
            <dvi className='newChat--head'>
                <div onClick={handleClose} className='newChat--backbutton'>
                    <ArrowBackIcon style={{color: '#FFF'}} />
                </div>
                <div className='newChat--headtitle'>Nova Conversa</div>
            </dvi>
            <div className='newChat--list'>
                <div className='newChat--list'>
                    {list.map((item, key) => (
                        <div className='newChat--item' key={key}> 
                            <img className='newChat--itemavatar' src={item.avatar} alt='' />
                            <div className='newChat--itemname'>{item.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NewChat;