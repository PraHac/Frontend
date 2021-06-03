import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DptManageService from '../../services/DptManageService';
import './adminDashboard.css'

function ViewDpts() {
	const [id, setId] = useState("");
	const [dptId, setDptId] = useState("");
	const [dptName, setDptName] = useState("");

	const viewDepartment = (e) => {
		e.preventDefault();
		DptManageService.viewDepartment(id)
			.then(res => { 
				setDptId(res.data.departmentId)
                setDptName(res.data.departmentName)
			    console.log(dptId, dptName)
			})
			.catch(err => console.log(err))
	}

    return (
        <div id="page-top">

        <nav style={{display:"flex"}} class="navbar-dark navbar-expand bg-dark text-uppercase fixed-top" id="mainNav">
           
                <a class="navbar-brand ml-3">View Department Details</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarmenu">
					
                    <span class="fa fa-bars" style={{ color: "white" }}></span>
                </button>
				
                <div class="collapse navbar-collapse" id="navbarmenu">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item"><Link style={{ color: "black" }} class="nav-link btn btn-warning mr-2" to="/dptManage">Manage Department</Link></li>
                        <li class="nav-item"><Link style={{ color: "black" }} class="nav-link btn btn-warning mr-2" to="/adminDashboard">Dashboard</Link></li>
                   <li class="nav-item"><button id="logout" class="nav-link btn btn-danger mr-2">LogOut</button></li>


  {/* <script>
$(document).delegate('#logout', 'click',function(event){
	
	sessionStorage.clear();
	window.location.replace("/AdminLogin.html");
}
		);
</script> */}
                   
                    </ul>
                </div>
           
        </nav>
		
		<section>
		
	<div class="card mx-auto" style={{width: "18rem", marginTop:"150px" }}>

  <div class="card-body">
    <h5 class="card-title">Display Your Details</h5>
    <p class="card-text">Enter The Department Id To Display All Details</p>
	<form id="employeeform">
	<input value={id} onChange={(e) => setId(e.target.value)} id="inputid" type="text" class="form-control" placeholder="Enter Department Id" />
    <button onClick={viewDepartment} type="button" class="btn btn-warning getdptbtn mt-3">See</button>
	</form>
  </div>
</div>
</section>

    <div id="displaydpt" style={{display:"none"}}>
		<table id="dpttable" style={{width:"700px"}} class=" table-bordered mx-auto mt-5 ">
		<tr>
		<th>Department ID</th>
		<th>Department Name</th>
		<th>Date Created</th>
		</tr>
		{
		  <tr>
				<th>{dptId}</th>
				<th>{dptName}</th>
		  </tr>				
		}			
		</table>
	</div>
	
	<div id="displayemp" style={{display:"none"}}>
		<table id="emptable" style={{width:"650px"}} class=" table-bordered mx-auto mt-5 mb-5 ">
		<tr>
		<th>Employee ID</th>
		<th>Employee Name</th>
		<th>Employee Email</th>
		<th>Employee Mobile</th>
		<th>Employee Salary</th>
		<th>Employee Hired</th>
		</tr>
		</table>
	</div>
	
		
	{/* <script type="text/javascript">
	$(document).delegate('.getdptbtn', 'click', function() { 
		
		var displaycheck = document.getElementById('displaydpt');
		displaycheck.style.display = 'block';
		
				$.getJSON('http://localhost:8081/myapi/v1/getDepartment/'+document.getElementById("inputid").value,
	
						function(json) {					
							$('#dpttable').append('<tr><td>'+json.departmentId+'</td><td>'+json.departmentName+'</td><td>'+json.totalEmployees+'</td><td>'+json.createdDate+'</td><td>    <button type="button" class="btn btn-primary btn-sm empdetailsbtn">Emp Details</button></td></tr>');
							
						});
			});
</script>

	<script type="text/javascript">
	$(document).delegate('.empdetailsbtn', 'click', function() { 
		
		var displaycheck = document.getElementById('displayemp');
		displaycheck.style.display = 'block';
		
				$.getJSON('http://localhost:8081/myapi/v1/getDepartment/'+document.getElementById("inputid").value,
	
						function(emploop) {
					emploop.employee.forEach(element => 
					$('#emptable').append('<tr><td>'+element.employeeId+'</td>'+element.name+'</td><td>'+element.email+'</td><td>'+element.password+'</td><td>'+element.mobile+'</td><td>'+element.salary+'</td><td>'+element.createdDate+'</td></tr>'));
					
			
					
						});
			});
</script> */}

    </div>
    )
}

export default ViewDpts
