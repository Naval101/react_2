import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Team from "./Team";
import Tasks from './Tasks';
import Login from './Login'
import NavBar from "./Navbar"
import Projects from "./Projects"
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'


function App() {
  const DefaultContainer = () => (
  localStorage.getItem("token") && localStorage.getItem("username") ?
    <div>
      <NavBar />
      <Route path="/" exact component={Tasks} />
      <Route path="/tasks/:idproject">
      <Tasks />
     </Route>
     <Route path="/tasks" exact component={Tasks} />
      <Route path="/projects" exact component={Projects} />
      <Route path="/team" exact component={Team} />
    </div>
    :
    <Redirect to="login" />
 )
  return (
    
    <div className="app">
    <Router>
    <Switch>
    <Route path="/login" exact component={Login} />
    <Route component={DefaultContainer}/>
    </Switch>

    </Router>
    </div>

  
  );
}

export default App;
