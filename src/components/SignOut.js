import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

function SignOut() {
	const auth = firebase.auth();

	const googleSignOutHandler = () => {
		auth.signOut();
	};

	return (
		auth.currentUser && <button onClick={googleSignOutHandler}>Sign Out</button>
	);
}

export default SignOut;
