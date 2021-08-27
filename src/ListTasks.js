import { IoMdAddCircle } from "react-icons/io";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Task from './Task'
import {authHeader}  from './authHeader'
import DefTask from './DefTask'
import AddTask from "./AddTask";

function ListTasks({idproject}) {
 
  const  [teams,setTeams]= useState([]);
  const [projById, setProjById] = useState({})
  useEffect(() => {
    axios.get("https://nodeheroku082021.herokuapp.com/api/team",{headers:authHeader()})
    .then((res)=>{
      setTeams(res.data)
    }).catch((err)=> console.log(err))
  },[])

  useEffect(() => {
    axios.get("https://nodeheroku082021.herokuapp.com/api/project/"+idproject,{headers:authHeader()})
    .then((res)=>{
      setProjById(res.data.project)
    }).catch((err)=> console.log(err))

  }, [])
  return(
    <div>
    <h3>{projById.name}</h3>
  {
    teams.map((team)=>( 
    <div>
     {<h5>{team.name}</h5>}
     <AddTask />
     <Task team={team.name} idproject={idproject}/> 
    
    </div>
        ))     

    }
    </div>
  ) 
     
} 

export default ListTasks;