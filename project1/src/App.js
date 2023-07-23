import './App.css';
import PathBunch from './Pages/PathBunch';
import {LoginContext} from './helpers/LoginContext'
import { useState } from 'react';

function App() {
  
  const {LoginState, setLoginState} = useState(false);

  return (
    <>
    <LoginContext.Provider value={{LoginState, setLoginState}}>
    <div className="App">
    </div>
    <div>
      <center>
      <PathBunch/>
      </center>
    </div>
    </LoginContext.Provider>
    </>

  );
}

export default App;
