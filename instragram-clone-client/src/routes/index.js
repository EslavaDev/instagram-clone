import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";

import Home from './Home';
import Toolbar  from '../components/toolbar';


const Register = () => [<Toolbar/>,<h1>Register</h1>]


export default () => {

  
  return(  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register}/>
    </Switch>
  </Router>
)
  
}