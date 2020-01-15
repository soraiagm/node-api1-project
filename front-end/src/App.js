import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UsersContext } from './contexts/UsersContext';
import './App.css';

function App() {
  const [ users, setUsers ] = useState([]);
  console.log("users", users);

  useEffect(() => {
    axios
        .get('/api/users')
        .then(response => {
          console.log(response);
        })
        .catch(error => console.log(error));
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
