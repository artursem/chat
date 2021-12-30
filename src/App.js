import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import ChatRoom from './components/ChatRoom';

firebase.initializeApp({
	apiKey: 'AIzaSyCDTzPHtW5uKEEZy_2-5oCwv4GjI3Ldoj0',
	authDomain: 'chat-eb4fb.firebaseapp.com',
	projectId: 'chat-eb4fb',
	storageBucket: 'chat-eb4fb.appspot.com',
	messagingSenderId: '896893198945',
	appId: '1:896893198945:web:236d002b6e70ed32f04020',
});

const auth = firebase.auth();

function App() {
	const [user] = useAuthState(auth);

	return (
		<div className='App'>
			<header>
				<h1>chat</h1>
				<SignOut />
			</header>
			<section>{user ? <ChatRoom /> : <SignIn />}</section>
		</div>
	);
}

export default App;
