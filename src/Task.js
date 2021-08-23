import {AiTwotoneDelete} from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Moment from 'moment';
import {authHeader}  from './authHeader'

function Task({team,idproject}) {

    const [tasks,setTasks]= useState();
    
    useEffect(() => {
        axios.get('https://nodeheroku082021.herokuapp.com/api/task/'+team+'/'+idproject,{headers:authHeader()})
        .then((res)=>{
          setTasks(res.data)
        }).catch((err)=> console.log(err))
       
      },[])
     
      const switchStatus=(param)=>{
        switch(param) {
          case 'Done':
          return 'badge-success'
          case 'Open':
          return 'badge-warning'
          case 'Closed':
          return 'badge-danger'
          default:
          return 'badge-primary'
    
        }
    }
 
   return(
    <table id = "tabletasks" className="table table-condensed table-hover table-sm">
      <thead>
      <tr>
        <th>Task</th>
        <th>Propri</th>
        <th>Deadline</th>
        <th>Progression</th>
        <th>Status</th>
        <th className="text-right">Actions</th>
      </tr>
    </thead>
    
    <tbody>
     {

     // console.log(tasks)

      tasks && tasks.data.map(task => (
      <tr>       
      <td>
      <span>{task.task}</span>
      </td>
      <td>
      <span>{task.member}</span>
      </td>
      <td>
      <span>{Moment(task.deadline).format('YYYY-MM-DD')}</span>
      </td>
      <td>
      <span >
          <div className="progress" style={{width:'70%'}}>
          <div className="progress-bar" style={{width:task.progression+'%'}}>{task.progression+'%'}</div>
           </div>
          </span>
      </td>
      <td>
      <span class={"badge "+switchStatus(task.status)}>{task.status}</span>
      
      </td>
      <td className="text-right">
      <button type="button" className="btn btn-link" ><b><FaRegEdit /></b></button>
      <button type="button" className="btn btn-link" ><b><AiTwotoneDelete /></b></button>			
      <button type="button" className="btn btn-link d-none"><b>Confirm</b></button>
      <button type="button" className="btn btn-link d-none" ><b>Cancel</b></button>			
      </td>
      </tr>
        
    ))
     }
    
        </tbody>
      </table>

        )
}

export default Task;