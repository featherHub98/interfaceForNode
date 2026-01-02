import './App.css';
import { useState,useEffect } from 'react';
import { getRealmSecret, isExpired } from './Service';
import Login from './components/login/Login.tsx';

function App() {
  const [realmSecret,setRealmSecret] = useState('')
  const [currentToken, setCurrentToken] = useState('');

  useEffect(()=>{
    getRealmSecret(1).then(res=>{
      setRealmSecret(res.data.realmSecret)
    })
  },[]);

  return (
    <div className="App">
      <input type="text" onChange={(e) => setCurrentToken(e.target.value)} placeholder="Enter JWT Token" />
      <button onClick={() => isExpired(currentToken)}>Verify Token</button>
      {realmSecret}
      <Login />
    </div>
  );
}

export default App;
