import {AiTwotoneDelete} from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Moment from 'moment';
import {authHeader}  from './authHeader'
    
function DefTask({team,idpro}) {

    const [tasks,setTasks]= useState();
   
    
     useEffect(() => {
         axios.get(`https://nodeheroku082021.herokuapp.com/api/task/${team}/${idpro}`,{headers:authHeader()})
         .then((res)=>{
        setTasks(res.data)
        }).catch((err)=> console.log(err))
           
          },[idpro,tasks])
         
          const switchStatus=(param)=>{
            switch(param) {
              case 'Done':
              return'badge-success'
              case 'O pen':
              return 'badge-warning'
              case 'Closed':
              return 'badge-danger'
              default:
              return 'badge-primary'
        
            }
        }
        
        const deleteTask = (id)=>{
          axios.delete('https://nodeheroku082021.herokuapp.com/api/task/'+id,{headers:authHeader()})
          .then((res)=> console.log(res.data.message))
        }

        const editTask = (id) => {
          const btnedit= document.getElementById("editTask"+id);
          const btndelete= document.getElementById("deleteTask"+id);
          const btnconfirm= document.getElementById("confirmedit"+id);
          const btncancel= document.getElementById("canceledit"+id);
          btnedit.classList.add("d-none");
          btndelete.classList.add("d-none");
          btnconfirm.classList.remove("d-none");
          btncancel.classList.remove("d-none");
        }
       const cancel =(id) => {
          const btnedit= document.getElementById("editTask"+id);
          const btndelete= document.getElementById("deleteTask"+id);
          const btnconfirm= document.getElementById("confirmedit"+id);
          const btncancel= document.getElementById("canceledit"+id);
          btnedit.classList.remove("d-none");
          btndelete.classList.remove("d-none");
          btnconfirm.classList.add("d-none");
          btncancel.classList.add("d-none");
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
          <button type="button" className="btn btn-link" onClick={()=>editTask(task._id)} id={"editTask"+task._id}><b><FaRegEdit /></b></button>
          <button type="button" className="btn btn-link" onClick={()=>deleteTask(task._id)} id={"deleteTask"+task._id}><b><AiTwotoneDelete /></b></button>			
          <button type="button" className="btn btn-link d-none" id= {"confirmedit"+task._id}><b>Confirm</b></button>
          <button type="button" className="btn btn-link d-none" onClick={()=>cancel(task._id)} id= {"canceledit"+task._id}><b>Cancel</b></button>			
          </td>
          </tr>
            
        ))
         }
        
            </tbody>
          </table>
          
            )
    
}

export default DefTask;