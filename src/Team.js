import  { useState, useEffect } from 'react';
import axios from 'axios';

import "./Team.css";
import AddTeam from "./AddTeam";
import AddMember from "./AddMember";
import { IoMdAddCircle } from "react-icons/io";
import {AiTwotoneDelete} from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";


function Team() {
	//window.onload = function() {
	//	const teaminput=document.getElementById("inputteam1").value;
	//	}
	const [members,setMembers] = useState([]);
	const [member,setMember] = useState({
		team:'',
		name:'',
		fonction:''
	});
	useEffect(() => {
		axios.get('https://nodeheroku082021.herokuapp.com/api/member')
		.then((response) => {
			setMembers(response.data)	
		})

	},[members])
	useEffect(()=>{
		// const teaminput=document.getElementById("inputteam1").value;
		// const nameinput=document.getElementById("inputname1").value;
		// const fonctinput=document.getElementById("inputfonct1").value;
		// setMember({...member,team : teaminput,name : nameinput,fonction : fonctinput})
					
	  },[])
	  const editMember =(id) => {
		const btnedit= document.getElementById("editrow"+id);
		const btndelete= document.getElementById("deleterow"+id);
		const btnconfirm= document.getElementById("confirmrow"+id);
		const btncancel= document.getElementById("cancelrow"+id);
		btnedit.classList.add("d-none");
		btndelete.classList.add("d-none");
		btnconfirm.classList.remove("d-none");
		btncancel.classList.remove("d-none");
		const teaminput=document.getElementById("inputteam"+id).value;
		const nameinput=document.getElementById("inputname"+id).value;
		const fonctinput=document.getElementById("inputfonct"+id).value;
		
		setMember({...member,team : teaminput,name : nameinput,fonction : fonctinput})

		let  tds=document.getElementById("row"+id).childNodes;
		let cells;
		for (let i=0; i<tds.length-1;i++) {

					cells =tds[i].childNodes;
					cells[0].setAttribute("hidden",true);
					cells[1].removeAttribute("hidden");
		}

	}
	const cancel =(id) => {
		const btnedit= document.getElementById("editrow"+id);
		const btndelete= document.getElementById("deleterow"+id);
		const btnconfirm= document.getElementById("confirmrow"+id);
		const btncancel= document.getElementById("cancelrow"+id);
		btnedit.classList.remove("d-none");
		btndelete.classList.remove("d-none");
		btnconfirm.classList.add("d-none");
		btncancel.classList.add("d-none");
		
		
		let  tds=document.getElementById("row"+id).childNodes;
		let cells;
		for (let i=0; i<tds.length-1;i++) {
						
					cells =tds[i].childNodes;
					cells[0].removeAttribute("hidden");
					cells[1].setAttribute("hidden",true);
					
		}	

	}

	const handleTeam = (evt) => {
		
			let team= evt.target.value;
			setMember({...member,team : team})
			
	}
	const handleMember = (evt) => {
		let memb= evt.target.value;
		setMember({...member,name:memb});
	}
	const handleFonction = (evt) => {
				
		let fonct= evt.target.value;
		setMember({...member,fonction:fonct})
	}
	const confirm = (id) => {

		const editedMember = {
			name:member.name,
			fonction: member.fonction,
			team: member.team
		}
		axios.put('http://localhost:5000/api/member/'+id,editedMember)
		.then((res) => console.log(res.data))
		.catch(err => console.log(err))

		const btnedit= document.getElementById("editrow"+id);
		const btndelete= document.getElementById("deleterow"+id);
		const btnconfirm= document.getElementById("confirmrow"+id);
		const btncancel= document.getElementById("cancelrow"+id);
		btnedit.classList.remove("d-none");
		btndelete.classList.remove("d-none");
		btnconfirm.classList.add("d-none");
		btncancel.classList.add("d-none");

		let  tds=document.getElementById("row"+id).childNodes;
		let cells;
		for (let i=0; i<tds.length-1;i++) {
						
					cells =tds[i].childNodes;
					cells[0].removeAttribute("hidden");
					cells[1].setAttribute("hidden",true);
					
		}
	}
	const deleteMember = (id) =>{

		axios.delete('http://localhost:5000/api/member/'+id)
		.then((res)=> console.log(res.data))
	}
return (
		<div className="container">
		
		<AddTeam />
		<br/>
		<div className="top">
		<h5>TEAM MEMBER</h5>
		<button type="button" id= "btn-add" className="btn btn-link" data-toggle="modal" data-target="#myModal"><IoMdAddCircle /><b> Add member</b></button>
		
		<AddMember />
		
		</div>	
		<table id = "table1" className="table table-condensed table-hover table-sm">
		<thead>
		  <tr>
			<th>TEAM</th>
			<th>MEMBER</th>
			<th>FONCTION</th>
			<th className="text-right">Actions</th>
		  </tr>
		</thead>
		
		<tbody>
		{ members.map(currentmember => (
			<tr id={"row"+currentmember._id}>
			<td>
			<span>{currentmember.team}</span>
			<input type="text" id={"inputteam"+currentmember._id} onChange={handleTeam} defaultValue ={currentmember.team} hidden/>
			</td>
			<td>
			<span>{currentmember.name}</span>
			<input type="text" id={"inputname"+currentmember._id} onChange={handleMember} defaultValue ={currentmember.name} hidden/>
			</td>
			<td>
			<span>{currentmember.fonction}</span>
			<input type="text" id={"inputfonct"+currentmember._id} onChange={handleFonction} defaultValue ={currentmember.fonction} hidden/>
			</td>
			<td className="text-right">
			<button type="button" className="btn btn-link" onClick={()=>editMember(currentmember._id)} id={"editrow"+currentmember._id}><b><FaRegEdit /></b></button>
			<button type="button" className="btn btn-link"  onClick={()=>deleteMember(currentmember._id)} id={"deleterow"+currentmember._id}><b><AiTwotoneDelete /></b></button>			
			<button type="button" className="btn btn-link d-none" id={"confirmrow"+currentmember._id} onClick={()=>confirm(currentmember._id)}><b>Confirm</b></button>
			<button type="button" className="btn btn-link d-none" onClick={()=>cancel(currentmember._id)} id={"cancelrow"+currentmember._id} ><b>Cancel</b></button>			
			</td>
			</tr>
			
	)
	)
}	

		</tbody>
	  </table>
	</div>
    )
}
export default Team;