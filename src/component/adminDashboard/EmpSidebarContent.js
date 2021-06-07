import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./userDisplay.css";
import axios from "axios";
import M from "materialize-css";
import Card from "react-bootstrap/Card";
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
        notification.open({
          message: "supervisor Added ",
        });
      })
      .catch((err) => console.log(err));
  };

  const createEmployee = (e) => {
    e.preventDefault();
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
        notification.open({
          message: "Employee Added ",
        });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const createAccountant = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/r1/addAccountant", {
        name: accountantName,
        email: accountantEmail,
        password: accountantPass,
        mobile: accountantContact,
      })
      .then((res) => {
        notification.open({
          message: "Accountant Added",
        });

        console.log(res);
      })
      .catch((err) => console.log(err));
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
          {/* <button class="btn btn-dark" type="button" id="displayall">Display All Supervisor</button><br /><br />
				<button class="btn btn-dark" type="button" id="displayall">Display All Employee</button><br /><br /> */}
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

              {/* <button class="btn btn-dark" type='submit'  style={{marginLeft:"170px"}}  onClick={createSupervisor}>Add</button> */}
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
                />
                <br />
                <input
                  type="text"
                  name="employeeSalary"
                  id="employeeSalary"
                  class="form-control"
                  placeholder="Employee Salary"
                  onChange={(e) => setEmployeeSalary(e.target.value)}
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
                />
                <br />
                <input
                  type="text"
                  name="employeeEmail"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setEmployeeEmail(e.target.value)}
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
                />
                <br />
                <input
                  type="text"
                  name="employeeContact"
                  className="form-control"
                  placeholder="contact"
                  onChange={(e) => setEmployeeContact(e.target.value)}
                />
                <br />
              </div>
              <input
                type="text"
                name="supervisorId"
                className="form-control"
                placeholder="Supervisor ID"
                onChange={(e) => setSupervisorId(e.target.value)}
              />
              <br />
              {/* <button class="btn btn-dark" style={{marginLeft:"170px"}} type='submit' onClick={createEmployee}>Add</button> */}
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
                  onChange={(e) => setAccountantName(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  name="accountantEmail"
                  className="form-control"
                  placeholder="Accountant Email"
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
                  onChange={(e) => setAccountantPass(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  name="accountantContact"
                  className="form-control"
                  placeholder="Accountant contact"
                  onChange={(e) => setAccountantContact(e.target.value)}
                />
                <br />
              </div>

              {/* <button class="btn btn-dark mt-3" style={{marginLeft:"170px"}} type='submit'onClick={createAccountant} >Add</button> */}
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
