import "./Login.css";
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginService from "../../services/LoginService";
import {useHistory} from 'react-router-dom'
import '../adminDashboard/style.css'
import M from 'materialize-css'

function Login() {

  const history = useHistory();

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [role, setRole] = useState("v");
  const [detail, setDetail] = useState({});

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
    if(!email_value.match(mailformat) || email_length === 0)
    {
    document.getElementById('email_err').innerHTML = 'This is not a valid email format.';
    email_name.focus();
    document.getElementById('email_err').style.color = "grey";
    }
    else
    {
    document.getElementById('email_err').innerHTML = 'Valid email format';
    document.getElementById('email_err').style.color = "#00AF33";
    }
  }
  const email_validation1 = () => {
    'use strict';
    var mailformat = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/;
    var email_name = document.getElementById("email");
    var email_value = document.getElementById("email").value;
    var email_length = email_value.length;
    if(!email_value.match(mailformat) || email_length === 0)
    {
    document.getElementById('email_err1').innerHTML = 'This is not a valid email format.';
    email_name.focus();
    document.getElementById('email_err1').style.color = "grey";
    }
    else
    {
    document.getElementById('email_err1').innerHTML = 'Valid email format';
    document.getElementById('email_err1').style.color = "red";
    }
    }
  
  const MouseHover = () => {
    document.getElementById("adminform").style.display = "block";
    document.getElementById("adminform").style.transition = "all 2s ease";
    document.getElementById("userform").style.display = "none";
    document.getElementById("user").style.display = "block";
    document.getElementById("admin").style.display = "none";
  }
  const MouseHover1 = () => {
    document.getElementById("adminform").style.display = "none";
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
        // alert("Admin logedIn")
        localStorage.setItem("adminId", res.data.adminId);
        M.toast({ html: "admin logedIn"})
        history.push("/adminDashboard");
      })
      .catch(err => alert(err));
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
        // alert("Accountant logedIn")
        localStorage.setItem("accountantId", res.data.accountantId);
        M.toast({ html: "accountant logedIn"})
        history.push("/accountantDash");
      })
      .catch(err => alert(err));

    } else if (role == "supervisor") {

      LoginService.loginSupervisor(loginDetail)
      .then(res => {
        // alert("Supervisor logedIn")
        localStorage.setItem("supervisorId", res.data.supervisorId);
        M.toast({ html: "supervisor logedIn"})
        history.push("/supervisorDash");
      })
      .catch(err => alert(err));

    } else {

      LoginService.loginEmployee(loginDetail)
        .then(res => {
          localStorage.setItem("employeeId", res.data.employeeId);
          localStorage.setItem("employeeName", res.data.name);
          M.toast({ html: "Employee logedIn"})
        console.log("Employee logedIn", res);
        setDetail(res);
        console.log(detail);
        history.push("/employeeReimburse");
      })
      .catch(err => alert(err));

    }
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
            
          <div id="admin" onMouseOver={MouseHover} >
            <p>Are you an</p>
            <h3 >Employee?</h3>  
          </div>
{/* *************************user form************************  */}
          <div id="user" onMouseOver={MouseHover1} style={{ display: "none" }}>
            <p>Are you an</p>
            <h3 >Admin?</h3>  
          </div> 
          <form className="form" id="adminform" style={{ backgroundColor: "black", display: "none" }}>
              <select className="form-control mb-4 mt-2" onChange={(e) => setRole(e.target.value)}>
							  <option selected>Choose Role</option>
							  <option value="accountant">Accountant</option>
							  <option value="supervisor">Supervisor</option>
							  <option value="employee">Employee</option>
              </select>
            <div className="formcontrol">
              <input
                type="email"
                placeholder="Enter your Email"
                id="email"
                name="employeeEmail"
                // onChange={email_validation1}
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
        </div>
      </div>
    </>
  );
}

export default Login;
