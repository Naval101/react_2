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
  const [team, setTeam] = useState('');

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
  const teamChange = (evt)=> {
    const teamSelected = evt.target.value;
    setTeam(teamSelected)
 }
  return(
    <div className="container">
    
    <h3>{projById.name}</h3>
    <select onChange={teamChange} value={team}>
    <option value=''>Select a Team</option>
    {
        teams.map((team)=>( 
            <option value={team.name}>{team.name}</option>
        ))  
        }
    </select>
    { team && team !== "" ?
        <div>
        <AddTask team={team} idpro={idproject} />
        <Task team={team} idproject={idproject}/> 
        </div> 
    : null
    }
    </div>
  ) 
     
} 

export default ListTasks;