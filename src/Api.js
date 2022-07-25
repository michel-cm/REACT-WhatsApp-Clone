import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
// const auth = firebase.auth();

const connectionFB = {
    fbPopup: async () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        let result = await firebaseApp.auth().signInWithPopup(provider);
        return result;
    },
    addUser: async (u) => {
        await db.collection('users').doc(u.id).set({
            name:u.name,
            avatar:u.avatar
        }, {merge:true});
    },
    getContactList: async (userID) => {
        let list = [];

        let results = await db.collection('users').get();
        results.forEach(result => {
            let data = result.data();

            if(result.id !== userID) {
                list.push({
                    id:result.id,
                    name:data.name,
                    avatar: data.avatar
                });
            }
        });

        return list;
    },
    addNewChat:async (user, userChatTalk) => {
        let newChat = await db.collection('chats').add({
            messages:[],
            users:[user.id, userChatTalk.id]
        });

        db.collection('users').doc(user.id).update({
            chats: firebase.firestore.FieldValue.arrayUnion({
                chatId: newChat.id,
                title: userChatTalk.name,
                image: userChatTalk.avatar,
                with: userChatTalk.id
            })
        })
        db.collection('users').doc(userChatTalk.id).update({
            chats: firebase.firestore.FieldValue.arrayUnion({
                chatId: newChat.id,
                title: user.name,
                image: user.avatar,
                with: user.id
            })
        });
    },

    onChatList:(userId, setChatList) => {
        return db.collection('users').doc(userId).onSnapshot((doc)=> {
            if(doc.exists) {
                let data = doc.data();

                if(data.chats) {
                    let chats = [ ...data.chats];

                    chats.sort((a,b)=> {
                        if(a.lastMessageDate === undefined) {
                            return -1;
                        }
                        if(b.lastMessageDate === undefined) {
                            return -1;
                        }
                        if(a.lastMessageDate.seconds < b.lastMessageDate.seconds) {
                            return 1;
                        }else {
                            return -1;
                        }
                    });

                    setChatList(chats);
                }
            }
        });
    },
    onChatContent:(chatId, setList, setUsers) => {
        return db.collection('chats').doc(chatId).onSnapshot((doc)=>{
            let data = doc.data();
            setList(data.messages);
            setUsers(data.users);
        })
    },
      sendMessage: async (chatData, userID, type, body, users) =>  {
        let dateNow = new Date();
        db.collection('chats').doc(chatData.chatId).update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                type,
                author: userID,
                body,
                date: dateNow
            })
        });

        for(let i in users) {
            let u = await db.collection('users').doc(users[i]).get();
            let uData = u.data();
            if(uData.chats) {
                let chats = [ ...uData.chats];

                for(let e in chats) {
                    if(chats[e].chatId == chatData.chatId) {
                        chats[e].lastMessage = body;
                        chats[e].lastMessageDate = dateNow;
                    }
                }

                await db.collection('users').doc(users[i]).update({
                    chats
                })
            }
        }

    }
};

export default connectionFB;