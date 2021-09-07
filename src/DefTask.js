import {AiTwotoneDelete} from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Moment from 'moment';
import {authHeader}  from './authHeader'
import EditTask from "./EditTask";
    
function DefTask({team,idpro}) {

    const [tasks,setTasks]= useState();
    const [task, setTask] = useState({})
   
    
     useEffect(() => {
         axios.get(`https://nodeheroku082021.herokuapp.com/api/task/${team}/${idpro}`,{headers:authHeader()})
         .then((res)=>{
        setTasks(res.data)
        }).catch((err)=> console.log(err))
           
          },[tasks])
         
          const switchStatus=(param)=>{
            switch(param) {
              case 'Done':
              return'badge-success'
              case 'Open':
              return 'badge-warning'
              case 'Closed':
              return 'badge-danger'
              default:
              return 'badge-primary'
        
            }
        }
        const changeValue =(evt)=> {
           setTask({...task,[evt.target.name]:evt.target.value})
           console.log(task)
        }
        const deleteTask = (id)=>{
          axios.delete('https://nodeheroku082021.herokuapp.com/api/task/'+id,{headers:authHeader()})
          .then((res)=> console.log(res.data.message))
        }
       return(
         <div>
        <table id = {"tabletasks"+team} className="table table-condensed table-hover table-sm">
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
          <tr id={"row"+task._id}>       
          <td>
          <span>{task.task}</span>
          <input type="text" id={"inputtask"+task._id} name = "task" defaultValue ={task.task} onChange={changeValue} hidden/>
          </td>
          <td>
          <span>{task.member}</span>
          <input type="text" id={"inputmember"+task._id} name="member" defaultValue ={task.member} onChange={changeValue} hidden/>
          </td>
          <td>
          <span>{Moment(task.deadline).format('YYYY-MM-DD')}</span>
          <input type="date" id={"inputdate"+task._id} name="date" defaultValue ={task.deadline} onChange={changeValue} hidden/>
          </td>
          <td>
          <span >
              <div className="progress" style={{width:'70%'}}>
              <div className="progress-bar" style={{width:task.progression+'%'}}>{task.progression+'%'}</div>
               </div>
              </span>
              <input type="number" id={"inputprogress"+task._id} name="progress" defaultValue ={task.progression} onChange={changeValue} hidden/>
          </td>
          <td>
          <span class={"badge "+switchStatus(task.status)}>{task.status}</span>
          <select 
                id={"idstatus"+task._id}
                defaultValue={task.status}
                name="status"
                onChange={changeValue}
                className="form-control" hidden>
                <option>Open</option>
                <option>In progress</option>
                <option>Done</option>
                <option>Closed</option>
                
                </select>
          </td>
          <td className="text-right">
          <button type="button" className="btn btn-link" id={"editTask"+task._id} data-toggle="modal" data-target="#editForm"><b><FaRegEdit /></b></button>
          <button type="button" className="btn btn-link" onClick={()=>deleteTask(task._id)} id={"deleteTask"+task._id}><b><AiTwotoneDelete /></b></button>			
          </td>
          <EditTask task={task} />
          </tr>
            
        ))
         }
        
            </tbody>
          </table>
          </div>
            )
    
}

export default DefTask;