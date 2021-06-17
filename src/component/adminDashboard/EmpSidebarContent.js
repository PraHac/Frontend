import React, { useEffect, useState } from "react";
import "./userDisplay.css";
import axios from "axios";
import "./admindashByAdy.css";
import { Button, notification } from "antd";
export default function EmpSidebarContent() {
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("adminId");
    window.location.replace("/");
  };

  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorSalary, setSupervisorSalary] = useState(0);
  const [noOfEmployee, setNoOfEmployee] = useState(0);
  const [departmentId, setdepartmentId] = useState(0);
  const [supervisorEmail, setSupervisorEmail] = useState("");
  const [supervisorPass, setSupervisorPass] = useState("");
  const [supervisorContact, setSupervisorContact] = useState("");

  const [employeeName, setEmployeeName] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState(0);
  const [employeeDepartmentId, setEmployeedepartmentId] = useState(0);
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePass, setEmployeePass] = useState("");
  const [employeeContact, setEmployeeContact] = useState("");
  const [supervisorId, setSupervisorId] = useState("");
  const [employees, setEmployees] = useState([]);

  const [accountantName, setAccountantName] = useState("");
  const [accountantEmail, setAccountantEmail] = useState("");
  const [accountantPass, setAccountantPass] = useState("");
  const [accountantContact, setAccountantContact] = useState("");

  const createSupervisor = (e) => {
    e.preventDefault();
    console.log(
      supervisorName,
      supervisorSalary,
      departmentId,
      supervisorEmail,
      supervisorPass,
      supervisorContact
    );
    axios
      .post("http://localhost:8081/r1/addSupervisor", {
        supervisorName: supervisorName,
        supervisorSalary: supervisorSalary,
        departmentId: departmentId,
        email: supervisorEmail,
        password: supervisorPass,
        mobile: supervisorContact,
      })
      .then((res) => {
        console.log(res);
        notification['success']({
          description: "supervisor Added ",
          className:"mt-5"  
        });
      })
      .catch((err) => { notification['error']({
        description: "Supervisor Not Added ",
        className:"mt-5"  
      })})
  };

  const createEmployee = (e) => {
    e.preventDefault();
    if(employeeName!=""&&employeeEmail!=""&&employeePass!=""&&supervisorId!=0){
    axios
      .put("http://localhost:8081/r1/addEmployeesToSupervisor", {
        supervisorId: supervisorId,
        employees: [
          {
            name: employeeName,
            email: employeeEmail,
            password: employeePass,
            mobile: employeeContact,
            salary: employeeSalary,
            departmentId: employeeDepartmentId,
          },
        ],
      })
      .then((res) => {
        console.log(res)
     })
      .catch((err) =>  {
        console.log(err) 
      })
        notification['success']
        ({
          description: "Employee has added  ",
          className:"mt-5"  
        })
      
    }
    else{
      notification['error']
      ({
        description: "Please Add Fields ",
        className:"mt-5"  
      })
    }
  };

  const createAccountant = (e) => {
    e.preventDefault();
    if(accountantName != "" && accountantEmail != "" && accountantPass != ""){
      axios
      .post("http://localhost:8081/r1/addAccountant", {
        name: accountantName,
        email: accountantEmail,
        password: accountantPass,
        mobile: accountantContact,
      })
      .then((res) => {
        console.log(res)
        notification['success']({
          description: "Accountant Added ",
          className:"mt-5"  
        });
      })
      .catch((err) =>{ 
        console.log(err)
    });
    }else{
      notification['error']
      ({
        description: "Please Add Fields ",
        className:"mt-5"  
      })
    }
  };

  const addAccountant = (e) => {
    e.preventDefault();
    document.getElementById("addAccountant").style.display = "block";
    document.getElementById("addSupervisor").style.display = "none";
    document.getElementById("addEmployee").style.display = "none";
  };

  const addSupervisor = (e) => {
    e.preventDefault();
    document.getElementById("addSupervisor").style.display = "block";
    document.getElementById("addAccountant").style.display = "none";
    document.getElementById("addEmployee").style.display = "none";
  };

  const addEmployee = (e) => {
    e.preventDefault();
    document.getElementById("addEmployee").style.display = "block";
    document.getElementById("addSupervisor").style.display = "none";
    document.getElementById("addAccountant").style.display = "none";
  };

  return (
    <div style={{ height: "100vh" }}>
      <div
        className="d-flex"
        style={{
          borderStyle: "groove",
          backgroundColor: "white",
          marginLeft: "24%",
          marginTop: "180px",
          padding: "12px",
          width: "49%",
        }}
      >
        <div className="" style={{ marginTop: "50px" }}>
          <Button type="primary" className="button" onClick={addAccountant}>
            Add Accountant
          </Button>
          <br />
          <Button type="primary" className="button" onClick={addSupervisor}>
            Add Supervisor
          </Button>
          <br />
          <Button type="primary" className="button" onClick={addEmployee}>
            Add Employee
          </Button>
          <br />
        </div>
        <div className="" style={{ marginTop: "50px" }}>
          <div className="card ml-5" id="addSupervisor">
            <form>
              <h3 className="text-center">Add Supervisor</h3>
              <div className="d-flex">
                <input
                  type="text"
                  name="supervisorName"
                  class="form-control"
                  placeholder="Supervisor Name"
                  onChange={(e) => setSupervisorName(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  name="supervisorSalary"
                  class="form-control"
                  placeholder="Supervisor Salary"
                  onChange={(e) => setSupervisorSalary(e.target.value)}
                />
                <br />
              </div>
              <div className="d-flex">
                <input
                  type="text"
                  name="supervisorContact"
                  className="form-control"
                  placeholder="contact"
                  onChange={(e) => setSupervisorContact(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  name="departmentId"
                  className="form-control"
                  placeholder="Department Id"
                  onChange={(e) => setdepartmentId(e.target.value)}
                />
                <br />
              </div>
              <div className="d-flex">
                <input
                  type="text"
                  name="supervisorEmail"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setSupervisorEmail(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  name="supervisorPass"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setSupervisorPass(e.target.value)}
                  
                />
                <br />
              </div>

              <Button
                type="primary"
                className="button"
                onClick={createSupervisor}
              >
                Create
              </Button>
            </form>
          </div>
          <div
            className="card ml-5"
            id="addEmployee"
            style={{ display: "none" }}
          >
            <form>
              <h3 className="text-center">Add Employee</h3>

              <div className="d-flex">
                <input
                  type="text"
                  name="employeeName"
                  id="employeeName"
                  class="form-control"
                  placeholder="Employee Name"
                  onChange={(e) => setEmployeeName(e.target.value)}
                  required="true"
                />
                <br />
                <input
                  type="text"
                  name="employeeSalary"
                  id="employeeSalary"
                  class="form-control"
                  placeholder="Employee Salary"
                  onChange={(e) => setEmployeeSalary(e.target.value)}
                  required="true"
                />
                <br />
              </div>
              <div className="d-flex">
                <input
                  type="text"
                  name="departmentId"
                  className="form-control"
                  placeholder="Department Id"
                  onChange={(e) => setEmployeedepartmentId(e.target.value)}
                  required="true"
                />
                <br />
                <input
                  type="text"
                  name="employeeEmail"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setEmployeeEmail(e.target.value)}
                  required="true"
                />
                <br />
              </div>
              <div className="d-flex">
                <input
                  type="text"
                  name="employeePass"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setEmployeePass(e.target.value)}
                  required="true"
                />
                <br />
                <input
                  type="text"
                  name="employeeContact"
                  className="form-control"
                  placeholder="contact"
                  onChange={(e) => setEmployeeContact(e.target.value)}
                  required="true"
                />
                <br />
              </div>
              <input
                type="text"
                name="supervisorId"
                className="form-control"
                placeholder="Supervisor ID"
                onChange={(e) => setSupervisorId(e.target.value)}
                required="true"
              />
              <br />
              <Button
                type="primary"
                className="button"
                onClick={createEmployee}
              >
                Create
              </Button>
            </form>
          </div>
          <div
            className="card ml-5"
            id="addAccountant"
            style={{ display: "none" }}
          >
            <form>
              <h3 className="text-center">Add Accountant</h3>
              <div className="d-flex">
                <input
                  type="text"
                  name="accountantName"
                  class="form-control"
                  placeholder="Accountant Name"
                  required="true"
                  onChange={(e) => setAccountantName(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  name="accountantEmail"
                  className="form-control"
                  placeholder="Accountant Email"
                  required="true"
                  onChange={(e) => setAccountantEmail(e.target.value)}
                />
                <br />
              </div>
              <div className="d-flex">
                <input
                  type="text"
                  name="accountantPass"
                  className="form-control"
                  placeholder="Accountant Password"
                  required="true"
                  onChange={(e) => setAccountantPass(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  name="accountantContact"
                  className="form-control"
                  placeholder="Accountant contact"
                  required="true"
                  onChange={(e) => setAccountantContact(e.target.value)}
                />
                <br />
              </div>
              <Button
                type="primary"
                className="button"
                onClick={createAccountant}
              >
                Create
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
