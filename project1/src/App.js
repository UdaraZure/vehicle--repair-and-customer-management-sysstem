import './App.css';
import PathBunch from './Pages/PathBunch';
import Navbar from './components/NavBar'
import { LoginContext } from './helpers/LoginContext';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [loginState, setLoginState] = useState(false);

 
  useEffect(()=> {
    axios.get('http://localhost:3001/Employees/login', {
      headers: {
        accessToken: localStorage.getItem('accessToken'),
      },
    })
      .then((response)=>{
      if(response.data.error){
        setLoginState(false);
      } else{
        setLoginState(true);
      }
  });
  },[]);

  return (
    <LoginContext.Provider value={{loginState, setLoginState}}>
   
    <div className="App">
    {!localStorage.getItem('accessToken') && (
          <Navbar/>
          )} 
    
    </div>
    <div>
      <center>
      <PathBunch/>
      </center>
    </div>
    
    </LoginContext.Provider>

  );
}

export default App;
