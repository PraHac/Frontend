import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AttendanceSideBar from './AttendanceSideBar'

function Attendance() {
	useEffect(() => {
        if (localStorage.getItem("adminId") == null) {
            window.location.replace("/") 
          }
    }, [])
    
      const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("adminId");
        window.location.replace("/"); 
      }
	const [viewAttend, setViewAttend] = useState([]);

	useEffect(() => {
			axios.get("http://localhost:8081/r1/get")
				.then(res => {
					console.log(res.data);
				  setViewAttend(res.data)
				  console.log(viewAttend);
			  })
			.catch(err => console.log(err))
	}, [])
	

    return (
		<div id="page-top" style={{ width: "100vw", height: "100vh" }}>

        {/* <nav className="navbar-dark navbar-expand bg-dark text-uppercase fixed-top" id="mainNav" style={{display:"flex"}}>
           
                <a className="navbar-brand ml-3">Attendance Management</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarmenu">
					
                    <span className="fa fa-bars" style={{ color: "white" }}></span>
                </button>
				
                <div className="collapse navbar-collapse" id="navbarmenu">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item"><Link style={{ color: "black" }} className="nav-link btn btn-warning mr-2" to="/adminDashboard">Dashboard</Link></li>
                    <li className="nav-item"><button id="logout" className="nav-link btn btn-danger mr-2" onClick={logout}>LogOut</button></li>
                    </ul>
                </div>
           
        </nav> */}
{/* *************************View Attendence */}
			{/* <div>
				<table class="table table-striped w-75" id="attend" style={{ boxShadow: "3px 4px 8px 9px gray",backgroundColor:"white", marginLeft:"11%", marginTop:"10%"}}>
			   <thead>
				 <tr>
				   <th scope="col">Attendence Id</th>
				   <th scope="col">Employee Id</th>
				   <th scope="col">Name</th>
				   <th scope="col">Status</th>
				   <th scope="col">LogHours</th>
				   <th scope="col">Login Time</th>
				   <th scope="col">Logout Time</th>
				 </tr>
			   </thead>
			{viewAttend.map(attend => (
			   <tbody>
				 <tr>
				   <td>{attend.attendenceId}</td>
				   <td>{attend.employeeId}</td>
				   <td>{attend.employeeName}</td>
				   <td>{attend.status}</td>
				   <td>{attend.logHours}</td>
				   <td>{attend.loginTime}</td>
				   <td>{attend.logoutTime}</td>
				 </tr>
			   </tbody>
			))
			}
			 </table>	
          </div> */}
		  <AttendanceSideBar/>
        </div>
    )
}

export default Attendance

