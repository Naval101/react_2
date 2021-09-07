import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Team from "./Team";
import Tasks from './Tasks';
import Login from './Login';
import NavBar from "./Navbar";
import Projects from "./Projects";
import NotFound from './NotFound'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import TasksByLastPro from './TasksByLastPro'

function App() {
  const DefaultContainer = () => (
  localStorage.getItem("token") && localStorage.getItem("username") ?
    <div>
      <NavBar />
      <Switch>
      <Route path="/tasks/:idproject" component={Tasks} />
      <Route path="/tasks" exact component={TasksByLastPro} />
      <Route path="/projects" exact component={Projects} />
      <Route path="/team" exact component={Team} />
      <Route component={NotFound} />
      </Switch>
    </div>
    :
    <Redirect to="/login" />
 )
  return (
    
    <div className="app">
    <Router>
    <Switch>
    <Route path="/" exact component={Login} />
    <Route component={DefaultContainer}/>
    </Switch>

    </Router>
    </div>

  
  );
}

export default App;
