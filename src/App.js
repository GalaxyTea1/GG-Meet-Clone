import { useEffect } from 'react';
import './App.css';
import dbRef, { userName, connectedRef } from './server/firebase';
import { connect } from 'react-redux';
import { setUser, addParticipant, removeParticipant } from './store/actioncreator';

function App(props) {
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
                    preferences: defaultPreferences,
                });
                props.setUser({
                    [userRef.key]: {
                        userName,
                        ...defaultPreferences,
                    },
                });
                userRef.onDisconnect().remove();
            }
        });
    }, []);
    useEffect(() => {
        if (props.user) {
            participantRef.on('child_added', (snap) => {
                const { userName, preferences } = snap.val();
                props.addParticipant({
                    [snap.key]: {
                        userName,
                        ...preferences,
                    },
                });
            });
            participantRef.on('child_removed', (snap) => {
                props.removeParticipant(snap.key);
            });
        }
    }, [props.user]);
    return (
        <div className='App'>
            Current User:{JSON.stringify(props.user)} <br />
            Participant User:{JSON.stringify(props.participants)}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.currentUser,
        participants: state.participants,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user)),
        addParticipant: (participant) => dispatch(addParticipant(participant)),
        removeParticipant: (participantKey) => dispatch(removeParticipant(participantKey)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
