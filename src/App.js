import React from 'react';
import Page from './Page/Page.js'
import {Switch, Route} from  'react-router-dom';
import Landing from './Landing/Landing.js'
import Default from './Default/Defaut'
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
      <Route path= {"/"} exact component={Landing}/>
      <Route path= {"/:id/:value"} exact component={Page}/>
      <Route component={Default}/>
      </Switch>
    </div>
  );
}

export default App;
