const {firebaseConfig} = require('../../config/config.json')

import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'

export default () => {

	const instance = firebase.initializeApp(firebaseConfig)
	let userId = null

	return {
		getUsers(ID) {
			userId = ID
			return instance.firestore().collection('users/' + ID + '/amigos')
		},
		getUser(otherID) {
			return instance.firestore().collection('users/').doc(otherID)
		},
		getChats: (otherID) => {
			return instance.database().ref('chats/' + userId + '/' + otherID)
		},
		sendChat: ({ otherKey, msj }) => {
			console.log(otherKey, msj)
			const push = {
				from: 'me',
				hora: new Date().toLocaleString(),
				text: msj,
				tipo: 'text'	
			}
			instance.database().ref('chats/' + userId + '/' + otherKey).push(push)
			push.from = 'them'
			instance.database().ref('chats/' + otherKey + '/' + userId).push(push)
		},
		Auth() {
			return instance.auth()
		}
	}

}