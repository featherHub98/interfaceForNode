import './App.css';
import { useState,useEffect } from 'react';
import { getRealmSecret, isExpired } from './Service';

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
      
    </div>
  );
}

export default App;
