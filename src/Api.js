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

    onChatList:(userID, setChatList) => {
        return db.collection('users').doc(userID).onSnapshot((doc)=> {
            if(doc.exists) {
                let data = doc.data();

                if(data.chats) {
                    setChatList(data.chats);
                }
            }
        });
    }
};

export default connectionFB;