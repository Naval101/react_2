import { IoMdAddCircle } from "react-icons/io";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Task from './Task'
import {authHeader}  from './authHeader'
import DefTask from './DefTask'
import AddTask from "./AddTask";

const TasksByLastPro= ()=> {
    const [lastproject, setLastProject] = useState([{}])
    const  [teams,setTeams]= useState([]);
    useEffect(() => {
        axios.get("https://nodeheroku082021.herokuapp.com/api/team",{headers:authHeader()})
        .then((res)=>{
          setTeams(res.data)
        }).catch((err)=> console.log(err))
      },[])
      
  useEffect(() => {
    axios.get("https://nodeheroku082021.herokuapp.com/api/project/latest",{headers:authHeader()})
   .then((res)=>{
   setLastProject(res.data.project)
   }).catch((err)=> console.log(err))
 },[])
    return (
    <div className="container">    
    <h3>{lastproject.name}</h3>
    
        {
          teams.map((team)=>( 
          <div >
           {<h5>{team.name}</h5>}
           <AddTask />
           <DefTask team={team.name} idpro={lastproject._id} /> 
          </div>
         
              ))
        } 
        </div>
    )
}
export default TasksByLastPro