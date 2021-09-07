import './Login.css';
import {useState} from 'react';
import { useHistory, Redirect } from "react-router-dom";
import axios from 'axios';
import { IoMdContact } from "react-icons/io";

function Login() {

    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const history = useHistory();

    const submitForm= (evt) => {
        evt.preventDefault();
        if (email === "" || password === "") {
            console.log("Fields are required");
            alert("Fields are required")
            return;
          }
          //API POST
          const user= {
              email: email,
              password: password
          }
        
          axios.post("https://nodeheroku082021.herokuapp.com/api/login",user)
          .then((res)=> {
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("username",res.data.name)
            history.push("/tasks");
             // return <Redirect to="/" /> 
          })
          .catch((err)=> {
              console.log(err);
              history.push("/login");
              alert("an error it's occured please try again!");
            })
        
    }
    
    return (
        
        <div className="container loginForm">
        <div className="row justify-content-center ">
        <div class="col-md-7">
        <form onSubmit={submitForm} className="signinForm text-center">
        <h3>MANAGEMENT TASKS</h3>
        <IoMdContact size="10em"/>
            <h3>Sign in </h3>
            <div className="form-group">
                <input type="email" className="form-control form-control-lg" placeholder="Email adress" onChange={e=>setEmail(e.target.value)} value={email} />
            
                <input type="password" className="form-control form-control-lg" placeholder="Password" onChange={e=>setPassword(e.target.value)} value={password} />
            </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg" onClick={submitForm}>Submit</button>
          
        </form>
        </div>
        </div>
        </div>
    )
}

export default Login;