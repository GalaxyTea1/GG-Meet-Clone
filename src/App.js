import './App.css';
import dbRef, { userName } from './server/firebase';

function App() {
    return (
        <div className='App'>
            <h3>{userName}</h3>
        </div>
    );
}

export default App;
