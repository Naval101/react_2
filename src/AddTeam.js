import {useState} from 'react';
import axios from 'axios';

function AddTeam() {

  const [team,setTeam]=useState("");

  const onTeamChange = (evt) => {

    const teamName = evt.target.value;
    setTeam(teamName);
  }
  const onAdd = (evt) => {
    console.log(team)
    const teamname = {
      name: team
    }
    axios.post('http://localhost:5000/api/team',teamname)
    .then((res) => console.log(res.data))
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