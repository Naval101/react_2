import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {authHeader} from './authHeader';
import { FcFolder } from "react-icons/fc";
function Projects() {
    const [projects, setProjects] = useState();
    useEffect(() => {
     axios.get("https://nodeheroku082021.herokuapp.com/api/project",{headers:authHeader()})
    .then((res) => {
        setProjects(res.data)
    })
    .catch((err)=> console.log(err))
    }, [])
 return (
        <div>
        <h3 style={{"text-align":"center"}}>List of Projects: </h3>
        {
        projects && projects.data.map(project=>
            (
                 <h4 style={{"margin":"10px"}}><FcFolder /><Link to={'/tasks/'+project._id}>{project.name}</Link></h4>
                
            ))
        }
        
    </div> 
)

}

export default Projects