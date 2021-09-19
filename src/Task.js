import {AiTwotoneDelete} from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Moment from 'moment';
import {authHeader}  from './authHeader'

function Task({team,idproject}) {

    const [tasks,setTasks]= useState();
    const [editedTask, setEditedTask] = useState({})

    useEffect(() => {
        axios.get(`https://nodeheroku082021.herokuapp.com/api/task/${team}/${idproject}`,{headers:authHeader()})
        .then((res)=>{
          setTasks(res.data)
        }).catch((err)=> console.log(err))
       
      },[tasks])
  
   const editTask=(id)=> {
        document.getElementById("form"+id).reset();
        tasks && tasks.data.map(task => (
          task._id===id ? setEditedTask(task) : null
        ))      
      } 
   const changeInput = (e)=> {
        setEditedTask({...editedTask,[e.target.name]:e.target.value});
   }
   const onSubmit= (e)=> {
    e.preventDefault();

    axios.put('https://nodeheroku082021.herokuapp.com/api/task/'+editedTask._id,editedTask,{headers:authHeader()})
    .then((res) => console.log(res.data))
    .catch(err => console.log(err))
    console.log(editedTask);

    }
    const deleteTask = (id)=>{
      axios.delete('https://nodeheroku082021.herokuapp.com/api/task/'+id,{headers:authHeader()})
      .then((res)=> console.log(res.data.message))
      .catch(err=> console.error(err))
    }
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
      <button type="button" className="btn btn-link" onClick={()=>editTask(task._id)} data-toggle="modal" data-target={"#editForm"+task._id}><b><FaRegEdit /></b></button>
      <button type="button" className="btn btn-link" onClick={()=>deleteTask(task._id)} ><b><AiTwotoneDelete /></b></button>			
      </td>
      <div className="modal fade" id={"editForm"+task._id}>
      <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
  
      <div className="modal-header">
          <h4 className="modal-title">Edit Task</h4>
          <button type="button" className="close" data-dismiss="modal">&times;</button>
      </div>
      <div className="modal-body">
  
          <form onSubmit = {onSubmit} id={"form"+task._id}>
          
          <div className="form-group">
             <label>Task:</label>
              <input type="text"
              defaultValue={task.task}
              name="task"
              onChange={changeInput}
              className="form-control"
              />
              </div>
              <div className="form-group">
              <label>Member name:</label>
              <input type="text"
              defaultValue={task.member}
              name="member"
              onChange={changeInput}
              className="form-control" 
              />
          </div>
              <div className="form-group">
              <label>Deadline:</label>
              <input type="date" 
              defaultValue={task.deadline}
              name="deadline"
              onChange={changeInput}
              className="form-control" 
              required
              />
          </div>

          <div className="form-group">
              <label>Progression(%):</label>
              <input type="number" 
              name="progression"
              defaultValue={task.progression}
              onChange={changeInput}
              className="form-control"
              />
          </div>

          <div className="form-group">
          <label>Status:</label>
              <select 
              onChange={changeInput}
              name="status"
              className="form-control">
              <option>Open</option>
              <option>In progress</option>
              <option>Done</option>
              <option>Closed</option>
              
              </select>
           
          </div>
          <div className="modal-footer">
          <input type="submit" value ="Edit" className="btn btn-primary"/>
          </div>
      </form>
      </div>
      </div>
      </div>
      </div>

      </tr>
        
    ))
     }
    
        </tbody>
      </table>
        )
}

export default Task;