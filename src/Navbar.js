import { IoLogIn } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import {Link, NavLink} from 'react-router-dom';
import './Nav.css';

function Navbar() {
  const username= localStorage.getItem("username");

return (
<nav className="navbar navbar-dark navbar-expand bg-primary">
<a className="navbar-brand h1" href="#">TASKS MANAGEMENT</a>

<div className="collapse navbar-collapse">
<ul className="navbar-nav ">
  <li className="nav-item ">
    <NavLink to="/projects" activeClassName="active" className="nav-link">Projects </NavLink>
  </li>
  <li className="nav-item">
    <NavLink to="/team" activeClassName="active" className="nav-link">Teams and Members </NavLink>
  </li>
  <li className="nav-item ">
  <NavLink to="/tasks" activeClassName="active" className="nav-link">Tasks </NavLink>
</li>
</ul>
</div>

<form className="form-inline justify-content-center">
<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
<button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
</form>
{ username ? 
  <ul class="nav navbar-nav ml-auto">
  <li class="nav-item">
    <a class="nav-link" href="#"><IoMdContact size="1.5em"/> Hi {username}</a>
  </li>
  <li class="nav-item">
  <Link to="/login" className="nav-link"><IoLogIn size="1.5em"/>Logout</Link>
  </li>
  </ul>:
  <ul class="nav navbar-nav ml-auto">
  <li class="nav-item">
    <a class="nav-link" href="#"><IoMdContact size="1.5em"/> Sign Up</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#"><IoLogIn size="1.5em"/>Login</a>
  </li>
  </ul>
  }
  
</nav>
)
}

export default Navbar;