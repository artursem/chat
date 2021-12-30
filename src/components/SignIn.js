import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const SignIn = () => {
	const auth = firebase.auth();

	const googleSignInHandler = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};
	return <button onClick={googleSignInHandler}>Sign in with Google</button>;
};

export default SignIn;
