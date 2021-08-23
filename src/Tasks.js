import './Tasks.css'
import ListTasks from "./ListTasks";
import { useParams } from "react-router";
function Tasks(props) {
    let { idproject } = useParams();
return (
    <div className="container">
    
    <ListTasks idproject={idproject}/>
    
    </div>
    )


}

export default Tasks;