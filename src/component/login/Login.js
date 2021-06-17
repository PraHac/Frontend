import "./Login.css";
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginService from "../../services/LoginService";
import {useHistory} from 'react-router-dom'
import '../adminDashboard/style.css'
import M from 'materialize-css'
<<<<<<< HEAD
import {  notification} from 'antd';
import { Dialog, DialogContent, DialogTitle, Icon } from "@material-ui/core";

=======
import {notification} from 'antd';
>>>>>>> edcf7c47a86b3674bd4455db3cc8e00185d79b63

function Login() {

  const history = useHistory();

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [employee1Email, setEmployee1Email] = useState("");
  const [employee1Password, setEmployee1Password] = useState("");
  const [role, setRole] = useState("v");
  const [location, setLocation] = useState("");
  const [detail, setDetail] = useState({});
  const [attendenceOption, setAttendenceOption] = useState("");

  const data = () => {
    const d = {
      det: detail
    }
  }

  const email_validation = () => {
    'use strict';
    var mailformat = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/;
    var email_name = document.getElementById("email");
    var email_value = document.getElementById("email").value;
    var email_length = email_value.length;
    if (!email_value.match(mailformat) || email_length === 0) {
      document.getElementById('email_err').innerHTML = 'This is not a valid email format.';
      email_name.focus();
      document.getElementById('email_err').style.color = "grey";
    }
    else {
      document.getElementById('email_err').innerHTML = 'Valid email format';
      document.getElementById('email_err').style.color = "#00AF33";
    }
  }
  
  const MouseHover = () => {
    document.getElementById("adminform").style.display = "block";
    document.getElementById("adminform1").style.display = "none";
    document.getElementById("adminform").style.transition = "all 2s ease";
    document.getElementById("userform").style.display = "none";
    document.getElementById("user").style.display = "block";
    document.getElementById("user1").style.display = "none";
    document.getElementById("admin").style.display = "none";
  }
  const MouseHover1 = () => {
    document.getElementById("adminform").style.display = "none";
    document.getElementById("adminform1").style.display = "block";
    document.getElementById("user1").style.display = "block";
    document.getElementById("userform").style.transition = "all 1s ease";
    document.getElementById("userform").style.display = "none";
    document.getElementById("user").style.display = "none";
    document.getElementById("admin").style.display = "none";
  }
  const MouseHover2 = () => {
    document.getElementById("adminform").style.display = "none";
    document.getElementById("adminform1").style.display = "none";
    document.getElementById("user1").style.display = "none";
    document.getElementById("userform").style.transition = "all 1s ease";
    document.getElementById("userform").style.display = "block";
    document.getElementById("user").style.display = "none";
    document.getElementById("admin").style.display = "block";
  }

  const adminHandle = (e) => {
    e.preventDefault();
    const admin = {
      adminId: adminEmail,
      password: adminPassword
    }
    LoginService.loginAdmin(admin)
      .then(res => {
        console.log(res.data.adminId)
        console.log(res);
        localStorage.setItem("adminId", res.data.adminId);
        M.toast({ html: "admin logedIn" })
        history.push("/adminDashboard");
        notification['success']({
          description:
            'Admin LogedIn',
            className:"mt-5"  
  
        })
      })
      .catch(err =>{
        notification['error']({
          description:
            'Enter Correct Input',
            className:"mt-5"  
  
        })
      });
  }

  const employeeHandle = (e) => {
    e.preventDefault();
    const loginDetail = {
      email: employeeEmail,
      password: employeePassword
    }
    if (role == "accountant") {

      LoginService.loginAccountant(loginDetail)
      .then(res => {
        localStorage.setItem("accountantId", res.data.accountantId);
         notification['success']({
          description:
            'Accountant LogedIn',
            className:"mt-5"  
  
        })
        history.push("/accountantDash");
      })
      .catch(err => {
        notification['error']({
          description:
            'Enter Correct Input',
            className:"mt-5"  
  
        })
      });

    } else if (role == "supervisor") {

      LoginService.loginSupervisor(loginDetail)
      .then(res => {
        localStorage.setItem("supervisorId", res.data.supervisorId);
        history.push("/supervisorDash");
        notification['success']({
          description:
            'Supervisor LogedIn',
          className:"mt-5"  
        })
      })
      .catch(err => {
        notification['error']({
          description:
            'Enter Correct Input',
          className:"mt-5"  
        })
      });

    }
  }

  const ab = (e) => {
    e.preventDefault();

    const loginDetail1 = {
      email: employee1Email,
      password: employee1Password,
      location: location,
      attendOption: attendenceOption,
    }    

    LoginService.loginEmployee(loginDetail1)
      .then(res => {
        localStorage.setItem("employeeId", res.data.employeeId);
        localStorage.setItem("supervisorName", res.data.supervisorName);
        localStorage.setItem("supervisorId", res.data.supervisorId);
        localStorage.setItem("location", "office");
        localStorage.setItem("employeeName", res.data.name);
        // M.toast({ html: "Employee logedIn" })
        console.log("Employee logedIn", res);
        setDetail(res);
        console.log(detail);
        history.push("/employeeReimburse");
        notification['success']({
          description:
            'Employee LogedIn',
          className:"mt-5"  
        })
      })
      .catch(err => {
        notification['error']({
          description:
            'Enter Correct Input',
          className:"mt-5"  
        })

      });
  }

  return (
    <>
      <div className="App">
        <div className="container" style={{ display: "flex" }}>
{/* *************************admin form************************  */}
          <form className="form" id="userform" style={{ backgroundColor: "rgb(255, 217, 0)" }}>
            <h3 style={{color:"white",backgroundColor:"black", padding:"5px", width:"105px", margin:"15px auto"}}>ADMIN</h3>
            <div className="formcontrol">
              <input
                type="email"
                placeholder="Enter your Email"
                id="email"
                name="adminEmail"
                onChange={email_validation}
                onChange={(e) => setAdminEmail(e.target.value)}
                value={adminEmail}
              />
              <span id="email_err"></span>
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="formcontrol">
              <input
                type="password"
                id="password"
                name="adminPassword"
                placeholder="Enter your Password"
                onChange={(e) => setAdminPassword(e.target.value)}
                value={adminPassword}
              />
            </div>
            <button onClick={adminHandle} type="submit" value="login" className="btn btn-outline-dark ml-5" id="adminlogin" >LOGIN</button>
              </form>
            
          <div id="admin" onClick={MouseHover} >
            <p>Are you an</p>
            <h3 >Employee?</h3>  
          </div>
{/* *************************user form************************  */}
          <div id="user" onMouseOver={MouseHover1} style={{ display: "none" }}>
            <p>Are you an</p>
            <h3 >Employee?</h3>  
          </div> 
          <form className="form" id="adminform" style={{ backgroundColor: "black", display: "none" }}>
              <select id="sel" className="form-control mb-4 mt-2" onChange={(e) => setRole(e.target.value)}>
							  <option selected>Choose Role</option>
							  <option value="accountant">Accountant</option>
							  <option value="supervisor">Supervisor</option>
              </select>
            <div className="formcontrol">
              <input
                type="email"
                placeholder="Enter your Email"
                id="email"
                name="employeeEmail"
                onChange={(e) => setEmployeeEmail(e.target.value)}
                value={employeeEmail}
              />
              <span id="email_err1"></span>
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="formcontrol">
              <input
                type="password"
                id="password"
                name="employeePassword"
                placeholder="Enter your Password"
                onChange={(e) => setEmployeePassword(e.target.value)}
                value={employeePassword}
              />
            </div>
            <button onClick={employeeHandle} type="submit" value="login" className="btn btn-outline-light ml-5" id="userlogin" >LOGIN</button>
          </form>

{/* *************************user form 2 ************************  */}

          
          <form className="form" id="adminform1" style={{ backgroundColor: "black", display: "none" }}>
              <select className="form-control mb-4 mt-2" onChange={(e) => setLocation(e.target.value)} required="true">
							  <option selected>Choose Working Location :</option>
							  <option value="office">office</option>
							  <option value="home">home</option>
               </select>
               <select className="form-control mb-4 mt-2" onChange={(e) => setAttendenceOption(e.target.value)} required="true">
							  <option selected>Do you want to mark you attendence?</option>
							  <option value="yes">yes</option>
							  <option value="no">no</option>
              </select>
            <div className="formcontrol">
              <input
                type="email"
                placeholder="Enter your Email"
                id="email"
                name="employee1Email"
                onChange={(e) => setEmployee1Email(e.target.value)}
                value={employee1Email}
                required="true"
              />
              <span id="email_err1"></span>
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="formcontrol">
              <input
                type="password"
                id="password"
                name="employee1Password"
                placeholder="Enter your Password"
                onChange={(e) => setEmployee1Password(e.target.value)}
                value={employee1Password}
                required="true"
              />
            </div>
            <button onClick={ab} type="submit" value="login" className="btn btn-outline-light ml-5" >LOGIN</button>
          </form>
          <div id="user1" onMouseOver={MouseHover2} style={{ display: "none" }}>
            <p>Are you an</p>
            <h3 >Admin?</h3>  
          </div> 
        </div>
      </div>
    </>
  );
}

export default Login;
