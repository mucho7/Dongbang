import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { TextField, Box, Button } from '@mui/material'
// firestore
import { addDoc, collection, limit, onSnapshot, orderBy, query, serverTimestamp,where } from 'firebase/firestore';
import { db, auth } from 'service/firebase';

function Chat() {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, 'messages');
  
  useEffect(() => {
    const queryMessages = query(messagesRef, orderBy('createdAt'), limit(10));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages : any = [];
      snapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id })
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  },[]);

  const handleChange = (e: any) => {
    setNewMessage(e.target.value)
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (newMessage === '')
    return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
    });
    setNewMessage('');
  }
  return (
    <WrapBox>
      <div>
        {messages.map((message: any) => (
          <div key={message.id}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <MessageInput value={newMessage} onChange={handleChange} fullWidth placeholder='메시지를 입력하세요'/>
        <Button type='submit'>보내기</Button>
      </form>
    </WrapBox>
  )
}

const WrapBox = styled(Box)({
  backgroundColor: '#DEF5E5',
  borderRadius: '1rem',
  marginLeft: '15vw',
  marginTop: "20vh",
  width: "65vw",
  height: '50vh',
});

const MessageInput = styled(TextField) ({
  marginTop: '50vh',

})


export default Chat
