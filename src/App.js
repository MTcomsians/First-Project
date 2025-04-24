import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className='container'>
            <Switch>
              <Route exact path="/" render={(props) => <Home {...props} showAlert={showAlert} />} />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" render={(props) => <Login {...props} showAlert={showAlert} />} />
              <Route exact path="/signup" render={(props) => <Signup {...props} showAlert={showAlert} />} />
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
