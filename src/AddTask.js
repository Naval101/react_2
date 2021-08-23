import { IoMdAddCircle } from "react-icons/io";
import {useState} from "react";
import axios from "axios";
import './AddTask.css'

function Addtask() {

    const [task, setTask] = useState({
        task: "",
        team: "teamA",
        member: "",
        deadline: "",
        progression: 1,
        status: "Open"
    })
    const onChangeName= (evt) => {
        const taskname = evt.target.value;
        setTask({...task,task:taskname})
    }
    const onChangeMember = (evt) =>{
        const member= evt.target.value;
        setTask({...task,member:member})
    }
    const onDateChange = (evt)=> {
        const date= evt.target.value;
        setTask({...task,deadline:date})
    }

    const onSubmit = (evt)=> {
        evt.preventDefault();
        axios.post('http://localhost:5000/api/task',task)
        .then((res)=> console.log(res.data))
        .catch((err) => console.log(err))
        
        setTask({
            task: "",
            team: "teamA",
            member: "",
            deadline: "",
            progression: 1,
            status: "Open"
        })
    }
    return (

        <div className="tasks">
        <button type="button" id= "btn-add" className="btn btn-link" data-toggle="modal" data-target="#myModal"><IoMdAddCircle /><b> Add Task</b></button>
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
                onChange={onChangeName}
                value={task.task}
                className="form-control" 
                />
            </div>
            <div className="form-group">
                <label>Member name:</label>
                <input type="text" 
                onChange={onChangeMember}
                value={task.member}
                className="form-control" 
                />
            </div>
            <div className="form-group">
            <label>Deadline:</label>
            <input type="date" 
            onChange={onDateChange}
            value={task.deadline}
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