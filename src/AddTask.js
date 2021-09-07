import { IoMdAddCircle } from "react-icons/io";
import {useState} from "react";
import axios from "axios";
import './AddTask.css'
import InputGroup from './InputGroup'
import { authHeader } from "./authHeader";

function Addtask({team,idpro}) {

    const [task, setTask] = useState({
        task: "",
        team: "",
        member: "",
        deadline: "",
        progression: 1,
        status: "Open",
        project:`${idpro}`
    })

    const onChangeInput = (evt)=> {
        setTask({...task,[evt.target.name]:evt.target.value})
    }
    const teamClick = ()=> {
        setTask({...task,team:team})
    }
    const onSubmit = (evt)=> {
        evt.preventDefault();
        axios.post('https://nodeheroku082021.herokuapp.com/api/task',task,{headers:authHeader()})
        .then((res)=> console.log(res.data))
        .catch((err) => console.log(err))
        
        setTask({
            task: "",
            team: "",
            member: "",
            deadline: "",
            progression: 1,
            status: "Open",
            project:`${idpro}`
        })
    }
    return (

        <div className="tasks">
        <button type="button" id= "btn-add" onClick ={teamClick} className="btn btn-link" data-toggle="modal" data-target="#myModal"><IoMdAddCircle /><b> Add Task</b></button>
        <div className="modal fade" id="myModal">
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
    
        <div className="modal-header">
            <h4 className="modal-title">Affect task to a member</h4>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        <div className="modal-body">
    
            <form onSubmit = {onSubmit}>
            
            <div className="form-group">
               <label>Task:</label>
                <input type="text" 
                onChange={onChangeInput}
                value={task.task}
                name="task"
                className="form-control"
                required 
                />
                </div>
                <div className="form-group">
                <label>Member name:</label>
                <input type="text" 
                onChange={onChangeInput}
                value={task.member}
                name="member"
                className="form-control" 
                />
            </div>
                <div className="form-group">
                <label>Deadline:</label>
                <input type="date" 
                onChange={onChangeInput}
                value={task.deadline}
                name="deadline"
                className="form-control" 
                />
            </div>

            <div className="form-group">
                <label>Progression(%):</label>
                <input type="number" 
                value="1"
                className="form-control"
                />
            </div>

            <div className="form-group">
            <label>Status:</label>
                <select 
                value="Open"
                className="form-control">
                <option>Open</option>
                <option>In progress</option>
                <option>Done</option>
                <option>Closed</option>
                
                </select>
             
        </div>
            <div className="modal-footer">
                <input type="submit" value ="Add" id="" className="btn btn-primary"/>
            </div>
        </form>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}

export default Addtask;