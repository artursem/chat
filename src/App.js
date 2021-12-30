import React, { useState, useRef } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
	apiKey: 'AIzaSyCDTzPHtW5uKEEZy_2-5oCwv4GjI3Ldoj0',
	authDomain: 'chat-eb4fb.firebaseapp.com',
	projectId: 'chat-eb4fb',
	storageBucket: 'chat-eb4fb.appspot.com',
	messagingSenderId: '896893198945',
	appId: '1:896893198945:web:236d002b6e70ed32f04020',
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {
	const [user] = useAuthState(auth);

	return (
		<div className='App'>
			<header>chat</header>
			<section>{user ? <ChatRoom /> : <SignIn />}</section>
		</div>
	);
}

function SignIn() {
	const googleSignInHandler = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};

	return <button onClick={googleSignInHandler}>Sign in with Google</button>;
}

function SignOut() {
	const googleSignOutHandler = () => {
		auth.signOut();
	};

	return (
		auth.currentUser && <button onClick={googleSignOutHandler}>Sign Out</button>
	);
}

function ChatMessage(props) {
	const { text, uid, photoURL } = props.message;
	const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';

	return (
		<div className={`message ${messageClass}`}>
			<img src={photoURL} alt={uid} />
			<p>{text}</p>
		</div>
	);
}

function ChatRoom() {
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
		bottom.current.scrollINtoView({ behavior: 'smooth' });
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
				<button type='submit'>🕊️</button>
			</form>
		</>
	);
}

export default App;
