import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const ChatMessage = (props) => {
	const auth = firebase.auth();
	const { text, uid, photoURL } = props.message;
	const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';

	return (
		<div className={`message ${messageClass}`}>
			<img src={photoURL} alt={uid} />
			<p>{text}</p>
		</div>
	);
};

export default ChatMessage;
