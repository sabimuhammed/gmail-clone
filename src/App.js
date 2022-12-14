import React, { useEffect } from 'react';
import Header from './Header'
import './App.css';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EmailList from './EmailList';
import Mail from './Mail';
import SendMail from './SendMail'
import Login from './Login'
import { useDispatch, useSelector } from 'react-redux';
import { selectSendMessageIsOpen } from './features/mailSlice';
import { login, selectUser } from './features/userSlice';
import { auth } from './firebase';


function App() {

  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch()
  useEffect(()=>{
    auth.onAuthStateChanged((user)=> {
      if (user) {
        dispatch(login({
          displayName:user.displayName,
          email:user.email,
          photourl:user.photoURL
        }))
      }
    })
  },[])
  return (
    <Router>
      {!user ? (
        <Login/>
      ):(

      <div className="App">
        <Header />
        <div className="app__body">
          <Sidebar />

          <Switch>
            <Route path="/mail">
              <Mail/>
            </Route>
            <Route path="/">
              <EmailList />
            </Route>
          </Switch>
        </div>
        {sendMessageIsOpen && <SendMail/>}
      </div>
      )}
    </Router>
  );
}

export default App;
