import {useState} from 'react';
import axios from 'axios';
import { authHeader } from './authHeader';
import { useHistory,Redirect } from "react-router-dom";
function AddTeam() {

  const [team,setTeam]=useState("");
  const history = useHistory();
  const onTeamChange = (evt) => {

    const teamName = evt.target.value;
    setTeam(teamName);
  }
  const onAdd = (evt) => {
    console.log(team)
    const teamname = {
      name: team
    }
    axios.post('https://nodeheroku082021.herokuapp.com/api/team',teamname,{headers:authHeader()})
    .then((res) => {
      console.log(res.data)
      history.push("/team")
    })
    .catch(err => console.log(err));
  }
    return (
        <div className="addTeam">
        <h5>ADD TEAM</h5>
        <form>
          <div className="row">
            <div className="col">
              <input type="text" 
              onChange= {onTeamChange}
              className="form-control" 
              placeholder="Team name"/>
            </div>
            <div className="col">
            <button type="button" className="btn btn-primary" onClick={onAdd}>Add</button>
            </div>
          </div>
        </form>
        </div>     
    )

}

export default AddTeam;