import { IoMdAddCircle } from "react-icons/io";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Task from './Task'
import {authHeader}  from './authHeader'
import DefaultTask from './DefaultTask'
import AddTask from "./AddTask";

function ListTasks({idproject}) {
 
  const  [teams,setTeams]= useState([]);
  const [lastproject, setLastProject] = useState([{}])
  const [projById, setProjById] = useState({})
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

  useEffect(() => {
    axios.get("https://nodeheroku082021.herokuapp.com/api/project/"+idproject,{headers:authHeader()})
    .then((res)=>{
      setProjById(res.data.project)
    }).catch((err)=> console.log(err))

  }, [])
return(
  <div>
  {idproject ? <h3>{projById.name}</h3>:<h3>{lastproject.name}</h3> }
{
  teams.map((team)=>( 
  <div>
   {<h5>{team.name}</h5>}
   <AddTask />
    {idproject ? <Task team={team.name} idproject={idproject}/>:<DefaultTask team={team.name} idproject={lastproject._id}/> 
    } 
  </div>
      ))
  }
  </div>
)      
} 

export default ListTasks;