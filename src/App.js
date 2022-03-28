import { useEffect } from 'react';
import './App.css';
import dbRef, { userName, connectedRef } from './server/firebase';

function App() {
    const participantRef = dbRef.child('participant');
    useEffect(() => {
        connectedRef.on('value', (snap) => {
            if (snap.val()) {
                const defaultPreferences = {
                    audio: true,
                    video: false,
                    screen: false,
                };
                const userRef = participantRef.push({
                    userName,
                    preference: defaultPreferences,
                });
                userRef.onDisconnect().remove();
            }
        });
    });
    return (
        <div className='App'>
            <h3>{userName}</h3>
        </div>
    );
}

export default App;
