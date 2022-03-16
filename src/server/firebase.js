import firebase from 'firebase/app';
import database from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyCxkHgmjVuSgI0Fa52_eDVTQ02joMPZt70',
    databaseURL: 'https://gg-meet-149e6-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

firebase.initializeApp(firebaseConfig);
var dbRef = firebase.database().ref();

export const userName = prompt('What your name?');

const urlparams = new URLSearchParams(window.location.search);
const roomId = urlparams.get('id');

if (roomId) {
    dbRef = dbRef.child(roomId);
} else {
    dbRef = dbRef.push();
    window.history.replaceState(null, 'Meet', '?id=' + dbRef.key);
}

export default dbRef;
