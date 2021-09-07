import React,{useState} from 'react'
import axios from 'axios';
import {authHeader}  from './authHeader';

export default function EditTask({task})  {

    const [tache, setTache] = useState({})

    const onSubmit= (e)=> {
        e.preventDefault();
        axios.put('https://nodeheroku082021.herokuapp.com/api/task/'+task._id,tache,{headers:authHeader()})
		.then((res) => console.log(res.data))
        .catch(err => console.log(err))
        
        setTache({})
    }
    const changeInput = (e)=> {
        setTache({...tache,[e.target.name]:e.target.value});
        console.log(tache)
    }

    return (
        <div className="modal fade" id="editForm">
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
    
        <div className="modal-header">
            <h4 className="modal-title">Edit Task</h4>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        <div className="modal-body">
    
            <form onSubmit = {onSubmit} id={task._id}>
            
            <div className="form-group">
               <label>Task:</label>
                <input type="text"
                autoComplete="off"
                onChange={changeInput}
                name="task"
                className="form-control"
                required 
                />
                </div>
                <div className="form-group">
                <label>Member name:</label>
                <input type="text"
                onChange={changeInput}
                name="member"
                className="form-control" 
                />
            </div>
                <div className="form-group">
                <label>Deadline:</label>
                <input type="date" 
                onChange={changeInput}
                name="deadline"
                className="form-control" 
                />
            </div>

            <div className="form-group">
                <label>Progression(%):</label>
                <input type="number" 
                onChange={changeInput}
                name="progression"
                className="form-control"
                />
            </div>

            <div className="form-group">
            <label>Status:</label>
                <select 
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
