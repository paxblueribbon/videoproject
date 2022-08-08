import './App.css';
import { Container, Row } from 'reactstrap';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';
import NavBar from './components/NavBar';
import Video from './components/Video';

firebase.initializeApp({
  apiKey: "AIzaSyBZPVGDnq9inUzvWXU_ZAywnIrQ_FDSy68",
  authDomain: "filmproject-2b6bf.firebaseapp.com",
  projectId: "filmproject-2b6bf",
  storageBucket: "filmproject-2b6bf.appspot.com",
  messagingSenderId: "774717970356",
  appId: "1:774717970356:web:7de7fb678f2892cf9a44e1",
  measurementId: "G-C1TS2WJD5N"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {


const [user] = useAuthState(auth);

  return (
    <>
<header>
<NavBar/>
</header>
  <Container fluid>
    <Row>
    <Video className="col-8" />
<div className='col-4'>
  <section>
    {user ? <ChatRoom /> : <SignIn />}
  </section>
</div>
    </Row>

</Container>
</>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}
function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}

export default App;
