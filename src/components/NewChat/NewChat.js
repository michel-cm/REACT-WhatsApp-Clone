import React, { useState, useEffect } from 'react';
import './NewChat.css';

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Api from '../../Api'

function NewChat({user, chatlist, show, setShow}) {

    const [list, setList] = useState([]);

    useEffect(() => {
       const getList = async () => {
            if(user !== null ) {
                let results = await Api.getContactList(user.id);
                setList(results);
            }
       }
       getList();
    },[user]);

    const addNewChat = async (userChatTalk) => {
        await Api.addNewChat(user, userChatTalk);

        handleClose();
    }

    const handleClose = () => {
        setShow(false);
    }
 

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
                        <div onClick={()=>addNewChat(item)} className='newChat--item' key={key}> 
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