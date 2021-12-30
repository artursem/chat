import React, { useState, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import SendIcon from './SendIcon';
import ChatMessage from './ChatMessage';

function ChatRoom() {
	const auth = firebase.auth();
	const firestore = firebase.firestore();

	const messagesRef = firestore.collection('messages');
	const query = messagesRef.orderBy('createdAt').limit(25);
	const [messages] = useCollectionData(query, { idField: 'id' });
	const [formValue, setFormValue] = useState('');
	const bottom = useRef();

	const inputChangeHandler = (event) => {
		setFormValue(event.target.value);
	};

	const sendMessage = async (e) => {
		e.preventDefault();
		const { uid, photoURL } = auth.currentUser;
		await messagesRef.add({
			text: formValue,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
			photoURL,
		});
		setFormValue('');
		bottom.current.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<>
			<main>
				<div>
					{messages &&
						messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
				</div>
				<div ref={bottom}></div>
			</main>
			<form onSubmit={sendMessage}>
				<input value={formValue} onChange={inputChangeHandler} />
				<button type='submit'>
					<SendIcon />
				</button>
			</form>
		</>
	);
}

export default ChatRoom;
