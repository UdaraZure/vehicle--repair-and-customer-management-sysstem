import './App.css';
import Navigationbar from './components/Navibar';
import PathBunch from './Pages/PathBunch';

function App() {
  return (
    <>
    <div className="App">
      
      <Navigationbar/>
    </div>
    <div>
      <center>
      <PathBunch/>
      </center>
    </div>
    </>

  );
}

export default App;
