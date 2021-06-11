import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DptManageService from "../../services/DptManageService";
import Table from 'react-bootstrap/Table'
import M from 'materialize-css';
import './admindashByAdy.css'
import { Button,notification } from 'antd';

   

export default function DptManageSideBarContent() {
    const [dptName, setDptName] = useState("");
	const [departments, setDepartments] = useState([]);
	const [updateDName, setUpdateDName] = useState("");
	const [dptId, setDptId] = useState("");
	const [dptIdToDlt, setDptIdToDlt] = useState("");

	//**************************** */ Add department
	const addDepartment = (e) => {
		e.preventDefault();
		const department = {
			departmentName:dptName
		}
		DptManageService.addDepartment(department)
			.then(res => {
				console.log(res);
				notification['success']({
					message: 'Department Added',
				})		  
			})
			.catch(err => {				
				notification['error']({
				message: 'Department Not Added',
			})		  
		})
		console.log(dptName);
	}
//**************************** */ get all department
	useEffect(() => {
		DptManageService.getAllDepartment()
			.then(res => {
				console.log(res.data);
				setDepartments(res.data);
				
		})
			.catch(err => console.log(err))
	}, []);

	const updateDepartment = (e) => {
		e.preventDefault();
		console.log(dptId);
		console.log(updateDName);
		const dept = {
			departmentId: dptId,
			departmentName: updateDName
		}
		setDptId("");
		setDptName("");
		DptManageService.updateDepartment(dept).then(res => {
			console.log("success")
			notification['success']({
				message: 'Department Updated',
			})		  
		}
		)
			.catch(err => 	
				notification['error']({
				message: 'Department Not Updated',
			}));
	}

//**************************** */ get all department

	const deleteDepartment = (e) => {
		e.preventDefault();
		DptManageService.deleteDepartment(dptIdToDlt)
		.then(res =>{ 
			console.log("success")
			notification['success']({
				message: 'Department Deleted Successfully',
			})		  
		}).catch(err=>{console.log(err)
		notification['error']({
			message: 'Department Not Deleted Successfully',
		})})
	}
	
    return (
        <div style={{height:"60vh",marginTop:"15%",marginLeft:"15%"}}>
              
<Table striped bordered>
  <tbody>
    <tr>
      <td>Enter New Department</td>
      <td></td>
      <td> <input
			type="text"
			name="dptname"
			id="dptname"
			placeholder="Enter Department Name"
			className="form-control mb-3"
			value={dptName}
			onChange={(e) => setDptName(e.target.value)}
			/></td>
      <td>
		<Button type="primary" style={{backgroundColor:"#22b1ed"}} id="addnew"name="adddptbtn" className="button"onClick={addDepartment}>   Add New Department</Button>
	 </td>
    </tr>
    <tr>
      <td>Edit Department</td>
      <td> <select className="form-control mb-3" id="dptlist" onChange={(e) => setDptId(e.target.value)}>
							  <option selected>Choose Id</option>
							  {departments.map((d, id) => <option key={id} value={d.departmentId}>{d.departmentId}</option>)}
                          </select></td>
      <td> <input  type="text"
					placeholder="Enter New Department Name"
					className="form-control mb-3"
					id="editdptname"
					value={updateDName}
					onChange={(e) => setUpdateDName(e.target.value)}
					/></td>
		<td><Button type="primary" style={{backgroundColor:"#22b1ed"}}  id="deletedptbtn" className="button"onClick={updateDepartment}>Edit Department</Button></td>
    </tr>
    <tr>
      <td>Delete Department</td>
      <td><select className="form-control mb-3" id="dptlist1" onChange={(e) => setDptIdToDlt(e.target.value)}>
			<option selected>Choose Id</option>
			{departments.map((d, id) => <option key={id} value={d.departmentId}>{d.departmentId}</option>)}
			</select></td>
	<td></td>
      <td><Button type="primary" style={{backgroundColor:"#22b1ed"}}  id="deletedptbtn" className="button"onClick={deleteDepartment}>Delete Department</Button>
			</td>
    </tr>
  </tbody>
</Table>

      {/* <script type="text/javascript">

$(document).delegate('#addnew', 'click', function(event) {
	event.preventDefault();

	var dptname = $('#dptname').val();
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		url: "http://localhost:8081/myapi/v1/saveDepartment",
		data: JSON.stringify({'departmentName': dptname}),
		cache: false,
		success: function(result) {
			$("#msg").html( "<span style='color: green'>Department added successfully</span>" );
			window.setTimeout(function(){location.reload()},1000)
		},
		error: function(err) {
			$("#msg").html( "<span style='color: red'>Department Not Added</span>" );
		}
	});
});
</script> */}

{/* 
<script type="text/javascript">
$(document).ready(function() {
	$.getJSON('http://localhost:8081/myapi/v1/allDepartment', function(json) {
		json.forEach(element=>
		$('#dptlist').append('<option>'+element.departmentId+'</option>'));
	});
		
	});
</script>

<script type="text/javascript">
$(document).ready(function() {
	$.getJSON('http://localhost:8081/myapi/v1/allDepartment', function(json) {
		json.forEach(element=>
		$('#dptlist1').append('<option>'+element.departmentId+'</option>'));
	});
		
	});
</script> */}


{/* <script>
$(document).delegate('#deletedptbtn', 'click', function() { 

	var list= document.getElementById('dptlist');
	var dptdeletevalue = list.options[list.selectedIndex].text;

	
		$.ajax({
			type: "DELETE",
			url: "http://localhost:8081/myapi/v1/deleteDepartment/"+dptdeletevalue,
			cache: false,
			success: function(result) {
				$("#delmsg").html( "<span style='color: green'>Company added successfully</span>" );
				window.setTimeout(function(){location.reload()},1000)
			},
			error: function(err) {
				$("#delmsg").html( "<span style='color: red'>Name is required</span>" );
			}
		}); 
	});

</script> */}

{/* <script>


$(document).delegate('#editdptbtn', 'click', function() { 

	var list= document.getElementById('dptlist');
	var dptIdEdit = list.options[list.selectedIndex].text;
	
	var editdptname = document.getElementById("editdptname").value
console.log(dptIdEdit);
	console.log(editdptname);
	
		$.ajax({
			type: "PUT",
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8081/myapi/v1/updateDepartment",
			data: JSON.stringify({'departmentId':dptIdEdit,'departmentName':editdptname}),
			cache: false,
			success: function(result) {
				$("#editmsg").html( "<span style='color: green'>Department Updated successfully</span>" );
				window.setTimeout(function(){location.reload()},1000)
			},
			error: function(err) {
				$("#editmsg").html( "<span style='color: red'>Department Not Updated</span>" );
			}
		}); 
	});

</script>		 */}
        </div>
    )
}

