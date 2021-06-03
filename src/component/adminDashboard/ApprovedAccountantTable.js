import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios';

export default class ApprovedAccountantTable extends Component {
  constructor(props){
    super(props)
    this.state={
      accountReimburse: [],
      supervisorId: "",
      supervisorId1: "",
      supervisorIdOpen1: false,
      supervisorIdOpen2:false,
      accountantIdOpen: false,
      supervisorAprR: [],
      supervisorDisR: [],
      supervisorSingleAppR: {},
      supervisorSingleDisR: {},
      accountantAprR: [],
      accountantDisR: [],
      accountantSingleAppR: {},
      accountantSingleDisR: {},
      supervisor1: false,
      supervisor2: false,
      accountant1: false,
      accountant2: false,
      monthReim: [],
      singleMonthReim: {},
      monthReimOpen: false,
      monthReimOpen1: false,
      monthHandle: "",
      yearHandle:"",
      collapsed: false,
    }
    this.accApproved=this.accApproved.bind(this)
  }
  accApproved(){
    // document.getElementById("accview").style.display = "block";
    // document.getElementById("accdisview").style.display = "none";
    // document.getElementById("disview").style.display = "none";
    // document.getElementById("view").style.display = "none";
    // document.getElementById("months").style.display = "none";
  
    axios
    .get(
      "http://localhost:8081/r1/allAccountantApproved"
    )
    .then((res) => {
      console.log(res.data);
      this.setState({ accountantAprR: res.data });
    })
    .catch((err) => console.log(err));
  }
    render() {
        return (
            <div>
            <Table className="attendancetable" striped bordered hover size="sm">
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
				{this.state.accountantAprR.map(accoutant => (
							<tbody>
								<tr>
								<td>{accoutant.attendenceId}</td>
								<td>{accoutant.employeeId}</td>
								<td>{accoutant.employeeName}</td>
								<td>{accoutant.status}</td>
								<td>{accoutant.logHours}</td>
								<td>{accoutant.loginTime}</td>
								<td>{accoutant.logoutTime}</td>
								</tr>
							</tbody>
							))
							}
				</Table>
            </div>
        )
    }
}
