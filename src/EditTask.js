import React,{useState, useEffect} from 'react'
import axios from 'axios';
import {authHeader}  from './authHeader';

export default function EditTask(props)  {

    const [editedTask, setEditedTask] = useState({})
     useEffect(() => {

    //     axios.get(`https://nodeheroku082021.herokuapp.com/api/task/${id}`,{headers:authHeader()})
    //     .then((res)=>{
    //         setTaskk(res.data)
    //     })
    //     .catch(err=> console.log(err))

     },[])    
    

    const onSubmit= (e)=> {
        e.preventDefault();

        // axios.put('https://nodeheroku082021.herokuapp.com/api/task/'+task._id,editedTask,{headers:authHeader()})
		// .then((res) => console.log(res.data))
        // .catch(err => console.log(err))
        // console.log(id)
        //setTaskk({})
        console.log(editedTask);
        //document.getElementById("form"+props.task._id).reset();

    }
    const changeInput = (e)=> {
         setEditedTask({...editedTask,[e.target.name]:e.target.value});
    }

    return (
        <div className="modal fade" id={"editForm"+props.task._id}>
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
    
        <div className="modal-header">
            <h4 className="modal-title">Edit Task</h4>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        <div className="modal-body">
    
            <form onSubmit = {onSubmit} id={"form"+props.task._id}>
            
            <div className="form-group">
               <label>Task:</label>
                <input type="text"
                defaultValue={props.task.task}
                name="task"
                onChange={changeInput}
                className="form-control"
                />
                </div>
                <div className="form-group">
                <label>Member name:</label>
                <input type="text"
                defaultValue={props.task.member}
                name="member"
                onChange={changeInput}
                className="form-control" 
                />
            </div>
                <div className="form-group">
                <label>Deadline:</label>
                <input type="date" 
                defaultValue={props.task.deadline}
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
                defaultValue={props.task.progression}
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
    )


}
