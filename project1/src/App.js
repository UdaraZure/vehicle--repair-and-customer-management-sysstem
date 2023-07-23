import './App.css';
import PathBunch from './Pages/PathBunch';
import {LoginContext} from './helpers/LoginContext'
import { useState } from 'react';

function App() {
  
  const {LoginState, setLoginState} = useState(false);

  return (
    <>
    
    <div className='App'>
      <center>
      <LoginContext.Provider value={{LoginState, setLoginState}}>
      <PathBunch/>
      </LoginContext.Provider>
      </center>
    </div>
    
    </>

  );
}

export default App;
