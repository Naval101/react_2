import { IoMdAddCircle } from "react-icons/io";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {authHeader}  from './authHeader'
import DefTask from './DefTask'
import AddTask from "./AddTask";

const TasksByLastPro= ()=> {
    const [lastproject, setLastProject] = useState([{}])
    const  [teams,setTeams]= useState([]);
    const [team, setTeam] = useState('');

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

 const teamChange = (evt)=> {
    const teamSelected = evt.target.value;
    setTeam(teamSelected)
   // window.location.reload();

 }
    return (
    <div className="container">    
    <h3>{lastproject.name}</h3>
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
        <AddTask team={team} idpro={lastproject._id} />
        <DefTask team={team} idpro={lastproject._id} />
        </div> 
    : null
    }
        </div>
    )
}
export default TasksByLastPro