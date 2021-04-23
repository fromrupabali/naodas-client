import React from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './containers/Home';
import AddView from './containers/AddView';
import SignIn from './containers/UserControl/SignIn';
import SignUp from './containers/UserControl/SignUp';
import PublishAd from './containers/PublishAd';
import Profile from './containers/UserControl/UserProfile';
import SearchResult from './containers/searchResult';

import './App.css';

function App() {
  return (
    <Router>
       <div className="App">
          <Route path="/" exact component={Home}/>
          <Route path="/view-ad/:adId" component={ AddView }/>
          <Route path="/signin" exact component={ SignIn }/>
          <Route path="/signup" exact component={ SignUp }/>
          <Route path="/publish-post" exact component={PublishAd}/>
          <Route path="/user-profile" component={Profile}/>
          <Route path="/search/:searchText" component={SearchResult}/>

       </div>
    </Router>
  );
}

export default App;
