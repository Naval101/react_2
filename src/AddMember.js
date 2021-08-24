import  { useState,useEffect } from 'react';
import axios from 'axios';
function AddMember() {

	const [member,setMember] = useState({
		name:'',
		fonction:''
	});
	const [team, setTeam] =useState ({
		teams:[],
		team:'',
	})
useEffect(() => {
	axios.get('https://nodeheroku082021.herokuapp.com/api/team')
	.then((response) => {
		setTeam({
			teams: response.data.map(team => team.name),
			team:response.data[0].name
		})
	})
	.catch(err => console.log(err))
}, [])
	const onTeamChange = (evt) =>{
		const teamm = evt.target.value
		setTeam({...team,team:teamm});
	}
	const onMemberChange =(evt) => {
	//	const name =;
		setMember({...member,name: evt.target.value})
	}
	const onFonctionChange = (evt) => {
		const fonction = evt.target.value;
		setMember({...member, fonction : fonction});
	}
	
	const onSubmit = (evt) => 
{	
		evt.preventDefault();
		const addedMember = {
			name:member.name,
			fonction: member.fonction,
			team: team.team
		}		
		console.log(addedMember);
		axios.post('https://nodeheroku082021.herokuapp.com/api/member',addedMember)
		.then((response) => console.log(response.data))
		.catch(err => console.log(err));

		setMember({
			name:'',
			fonction:''
		})

	}
return (
	<div className="modal fade" id="myModal">
	<div className="modal-dialog modal-dialog-centered">
	<div className="modal-content">

	<div className="modal-header">
		<h4 className="modal-title">Adding members</h4>
		<button type="button" className="close" data-dismiss="modal">&times;</button>
	</div>
	<div className="modal-body">

		<form onSubmit = {onSubmit}>
		<div className="form-group">
			<label>Select Team:</label>
				<select 
				onChange = {onTeamChange}
				value={team.team}
				className="form-control">
				{team.teams.map(teamm =><option value={teamm} key={teamm}>{teamm}</option>
				)}
				
				</select>
		</div>
			<div className="form-group">
			<label>Member Name:</label>
			<input type="text" 
			onChange = {onMemberChange}
			value={member.name}
			className="form-control" 
			/>
		</div>
		<div className="form-group">
			<label>Fonction:</label>
			<input type="text" 
			onChange = {onFonctionChange}
			value={member.fonction}
			className="form-control" 
			/>
		</div>
	
		<div className="modal-footer">
			<input type="submit" value ="Add" id="addmembr" className="btn btn-primary"/>
		</div>
	 	</form>
	</div>
	</div>
	</div>
	</div>

)
}

export default AddMember;