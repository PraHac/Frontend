import React, { Component } from "react";
import "./Add.css";
import axios from "axios";
import imageToBase64 from "image-to-base64/browser";
import M from "materialize-css";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import Slide from "react-reveal/Slide";
import Card from "react-bootstrap/Card";
import "../TimeSheet.css";
import TimeSheetService from "../../services/TimeSheetService";
import Moment from "react-moment";
import Table from "react-bootstrap/Table";
import RubberBand from "react-reveal/RubberBand";
import logo from '../logo1.png'
import { Link } from "react-router-dom";
 

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: "",
      supervisorId: 0,
      foodexpense: 0,
      travelexpense: 0,
      otherexpense: 0,
      foodBill: "",
      travelBill: "",
      otherBill: "",
      dateOfReimburse: "",
      viewRe: [],
      viewDetailReim: {},
      viewAttend: [],
      openDialog: false,
      timeSheet: [],
      timeSheetId: 0,
      employeeId: 0,
      employeeName: "",
      supervisor_id: 0,
      supervisorApproved: "",
      accountantApproved: "",
      day: "",
      date: "",
      rowNo: ["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday"],
      timesheetDetail: [],
      task: "",
      projectName: "",
      logHours: 0,
      apprTimeSheet: [],
      disapprTimeSheet: [],
      week: [],
      count: 0
    };
    this.tsChange = this.tsChange.bind(this);
    this.savetimeSheet = this.savetimeSheet.bind(this);
    this.dateTaker = this.dateTaker.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("employeeId") == null) {
      window.location.replace("/");
    }
  }

  logout = (e) => {
    e.preventDefault();
    if (localStorage.getItem("location") == "office") {
      axios
      .put(
        "http://localhost:8081/r1/LogoutEmployee/" +
          "/" +
          localStorage.getItem("employeeId")
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err)); 
    }
    
    localStorage.removeItem("employeeId");
    window.location.replace("/");
  };

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  mySubmitHandler = (event) => {
    event.preventDefault();
    imageToBase64(this.state.foodBill) // Path to the image
      .then((response) => {
        this.setState({ foodBill: response });
        imageToBase64(this.state.travelBill) // Path to the image
          .then((response) => {
            this.setState({ travelBill: response });
            imageToBase64(this.state.otherBill) // Path to the image
              .then((response) => {
                this.setState({ otherBill: response });
                axios
                  .post("http://localhost:8081/r1/requestReimburse", {
                    employeeId: localStorage.getItem("employeeId"),
                    supervisorId: this.state.supervisorId,
                    foodExpense: this.state.foodexpense,
                    travelExpense: this.state.travelexpense,
                    otherExpenss: this.state.otherexpense,
                    dateOfReimburse: this.state.dateOfReimburse,
                    foodBill: this.state.foodBill,
                    travelBill: this.state.travelBill,
                    otherBill: this.state.otherBill,
                  })
                  .then((res) => {
                    console.log("Added");
                  })
                  .catch((err) => console.log(err));
              });
          });
      });
  };

  viewR = (e, r) => {
    e.preventDefault();
    this.setState({ openDialog: true });
    console.log(e);
    console.log(r);
    axios
      .get("http://localhost:8081/r1/reimburseById" + "/" + r.reimburceId)
      .then((res) => {
        console.log(res.data);
        this.setState({ viewDetailReim: res.data });
      })
      .catch((err) => console.log(err));
  };

  addReimburs = (event) => {
    event.preventDefault();
    document.getElementById("add").style.display = "block";
    document.getElementById("view").style.display = "none";
    document.getElementById("attend").style.display = "none";
    document.getElementById("timesheet").style.display = "none";
    document.getElementById("timesheet1").style.display = "none";
    document.getElementById("timesheet2").style.display = "none";
  };

  viewReimburs = (event) => {
    event.preventDefault();
    document.getElementById("add").style.display = "none";
    document.getElementById("attend").style.display = "none";
    document.getElementById("view").style.display = "block";
    document.getElementById("timesheet").style.display = "none";
    document.getElementById("timesheet1").style.display = "none";
    document.getElementById("timesheet2").style.display = "none";

    axios
      .get(
        "http://localhost:8081/r1/employeeReimburse" +
          "/" +
          localStorage.getItem("employeeId")
      )
      .then((res) => {
        console.log(res.data);

        this.setState({ viewRe: res.data });
      })
      .catch((err) => console.log(err));
  };
  timesheet = (event) => {
    event.preventDefault();
    document.getElementById("add").style.display = "none";
    document.getElementById("attend").style.display = "none";
    document.getElementById("view").style.display = "none";
    document.getElementById("timesheet").style.display = "block";
    document.getElementById("timesheet1").style.display = "none";
    document.getElementById("timesheet2").style.display = "none";
  };
  timesheet1 = (event) => {
    event.preventDefault();
    document.getElementById("add").style.display = "none";
    document.getElementById("attend").style.display = "none";
    document.getElementById("view").style.display = "none";
    document.getElementById("timesheet").style.display = "none";
    document.getElementById("timesheet1").style.display = "block";
    document.getElementById("timesheet2").style.display = "none";
    axios.get("http://localhost:8081/r1/allaccountantapproved").then((res) => {
      console.log(res)
      this.setState({apprTimeSheet: res.data})
    })
  };
  timesheet2 = (event) => {
    event.preventDefault();
    document.getElementById("add").style.display = "none";
    document.getElementById("attend").style.display = "none";
    document.getElementById("view").style.display = "none";
    document.getElementById("timesheet").style.display = "none";
    document.getElementById("timesheet1").style.display = "none";
    document.getElementById("timesheet2").style.display = "block";
    axios.get("http://localhost:8081/r1/allaccountantDisapproved").then((res) => {
      console.log(res)
      this.setState({disapprTimeSheet: res.data})
    })
  };

  viewAttend = (event) => {
    event.preventDefault();
    document.getElementById("attend").style.display = "block";
    document.getElementById("add").style.display = "none";
    document.getElementById("view").style.display = "none";
    document.getElementById("timesheet").style.display = "none";
    axios
      .get(
        "http://localhost:8081/r1/getEmployeeAttendance" +
          "/" +
          localStorage.getItem("employeeId")
      )
      .then((res) => {
        console.log(res);
        this.setState({ viewAttend: res.data });
        console.log(this.state.viewAttend);
      })
      .catch((err) => console.log(err));
  };

  onInputFileChange = (event) => {
    let nam = event.target.name;

    console.log(event.target.files);
    const maxFileSize = "524288";
    const selectedFiles = event.target.files;
    if (selectedFiles[0]) {
      if (selectedFiles[0].size >= maxFileSize) {
        alert(`File is too big. ${selectedFiles[0].size} Bytes`);
      } else {
        const fr = new FileReader();

        fr.readAsDataURL(selectedFiles[0]);

        fr.addEventListener("load", () => {
          console.log(fr.result);
          this.setState({ [nam]: fr.result });
        });
      }
    }
  };

  timesheetHandeler = (event) => {
   
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
    // var format = /[0-9]{1}/;
    var email_name = document.getElementById("logHours");
    var logHour_value = document.getElementById("logHours").value;
    // var logHour_length = logHour_value.length;
    if(this.state.logHours < 0 )
    {
    document.getElementById('err').innerHTML = 'Invalid format(digit between 0-9)';
    email_name.focus();
    document.getElementById('err').style.color = "red";
    }
    else
    {
    document.getElementById('err').innerHTML = 'Valid format';
    document.getElementById('err').style.color = "#00AF33";
    }
    
  };

  savetimeSheet(event) {
    event.preventDefault();
    // console.log(this.state.timesheetDetail);
    var d = 
      {
        employeeId: localStorage.getItem("employeeId"),
        logHours: this.state.logHours,
        task: this.state.task,
        supervisor_id: 2,
        projectName: this.state.projectName,
        date: this.state.week[this.state.count]
      }
    console.log(d);  
    // console.log(this.state.week + " ");
    this.state.timesheetDetail.push(d);  
    TimeSheetService.saveTimeSheet(this.state.timesheetDetail).then((response) => {
      console.log(response);
      this.setState({ timeSheet: response.data });
      M.toast({ html: "Added" });
    }).catch((err) => console.log(err))
  }

  dateTaker() {
    let curr = new Date();
    for (let i = 1; i <= 5; i++){
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
      this.state.week.push(day);
    }
    document.getElementById("dateTaker").innerHTML = this.state.week[0]
  }

  tsChange(e, i) {
    e.preventDefault();
    // if (this.state.count == 0) {
    //   var t = 0;
    // } else {
    //   var t = 1;
    // }
    
    // this.setState({count: this.state.count + t})
    if (this.state.task != "") {
      const d = {
        employeeId: localStorage.getItem("employeeId"),
        logHours: this.state.logHours,
        task: this.state.task,
        supervisor_id: 2,
        projectName: this.state.projectName,
        date: this.state.week[this.state.count]
      }
    console.log(d);
      this.state.timesheetDetail.push(d);
       this.setState({count: this.state.count + 1}) 
    }
  }

  render() {

    const but = {
      position: "relative",
      left: "60%",
    };

    const inputStyle = {
        padding: "10px",
        border: "none",
        boxShadow: "3px 1px 3px lightgrey",
        fontSize: "13px",
    }
    const logostyle = {
      height: "48px",
      marginLeft:"12px"
      }

    return (
      <div id="home" style={{ width: "1349px" }}>
        {/* *************************Navbar */}

        <nav
          className="main-header navbar navbar-expand navbar-dark w-100"
          style={{
            position: "fixed",
            display: "flex",
            top: "0",
            width: "90%",
            left: "0%",
            padding:"17px",
            backgroundColor: "#59c5ff",
          }}
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link text-dark" data-widget="pushmenu" href="#">
                <i className="fas fa-bars" style={{color:"white", fontSize:"20px"}} />
              </a>
            </li>
          </ul>
          <button
            type="button"
            style={but}
            class="btn btn-danger"
            onClick={this.logout}
          >
            LogOut
          </button>
        </nav>

        {/* *************************SideBar */}

        <div>
          <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{backgroundColor:"black"}}>
              <a className="brand-link">
                  <img src={logo} style={logostyle} />
              </a>
              <div className="sidebar">

                <nav className="mt-2">
                  <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                
                    <li className="nav-item has-treeview menu-open">
                          <i className="mt-3 mb-2 nav-icon fas fa-tachometer-alt" style={{ color: "#ffa426", marginLeft:"18px" }} />
                          <Link className="link" style={{textDecoration:'none',padding:"10px",color:'#22b1ed'}} to="/employeeReimburse">Dashboard</Link>
                          <hr className="sidebar-divider" style={{borderTop:"2px solid #2e2e2e"}}/>
                        <div class="sidebar-heading" style={{color:'#b7b9cc',textAlign: 'left',padding:' 0 1rem',
                          fontWeight: '600',
                          fontSize: '.90rem',
                          marginBottom:"20px",
                          letterSpacing: '.13rem'}}>
                          Features
                        </div>
                        <ul className="nav nav-treeview">
                        <li className="nav-item">
                          <a className="nav-link">
                            <i className="far fa-circle nav-icon"  style={{color:"#ffa426",marginLeft:"8px",marginRight:"5px"}} />
                            <p onClick={this.addReimburs}>Add Reimbursement</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link">
                            <i className="far fa-circle nav-icon"  style={{color:"#ffa426",marginLeft:"8px",marginRight:"5px"}} />
                            <p onClick={this.viewReimburs}>View Reimbursement</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link">
                            <i className="far fa-circle nav-icon"  style={{color:"#ffa426",marginLeft:"8px",marginRight:"5px"}} />
                            <p onClick={this.timesheet}>Add TimeSheet</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link">
                            <i className="far fa-circle nav-icon"  style={{color:"#ffa426",marginLeft:"8px",marginRight:"5px"}} />
                            <p onClick={this.timesheet1}>Approved TimeSheet</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link">
                            <i className="far fa-circle nav-icon"  style={{color:"#ffa426",marginLeft:"8px",marginRight:"5px"}} />
                            <p onClick={this.timesheet2}>Disapproved TimeSheet</p>
                          </a>
                        </li>
                      </ul>
                    </li>   
                    </ul>
                 <hr class="sidebar-divider"style={{borderTop:"2px solid #2e2e2e"}}/>
                  </nav>
               </div>
              </aside>
        </div>

        {/* *************************Add timesheet */}

        <div id="timesheet" style={{ display: "none", marginTop:"6%"}}>
            <RubberBand>
            <div style={{display:"flex",justifyContent:"space-evenly", padding: "1%", marginLeft: "10%"  }} >
                {/* <h6 style={{color:"gray"}}>SUBMIT WEEKLY TIME-SHEET</h6>  */}
              {/* <div>   */}
              <input
                  style={{
                    border: "none",
                        outline: "none",
                        borderBottom: "1px solid lightslategrey",
                        background: "none",
                        fontSize: "17px",
                      }}
                      placeholder="Supervisor Id"
                      type="text"
                      name="supervisor_id"
                      value={"Supervisor Id : " + localStorage.getItem("supervisorId")}
                required
              />
               <select className="form-control  w-25" onChange={(e) => this.setState({projectName: e.target.value})}>
                      <option selected>Select Project</option>
                      <option value="RC Builder">RC Builder</option>
                      <option value="RC 360">RC 360</option>
                      <option value="Reimbursement">Reimbursement</option>
                      <option value="Video Conferencing">Video Conferencing</option>    
               </select>
              <button id="dateTaker" onClick={this.dateTaker} className="btn btn-dark">Date</button>
                {/* </div>  */}
              </div>
              <div style={{  marginLeft: "20%" }}>
           
           <div class="row">
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="table-responsive p-3">
                <table id="example" class="table table-striped table-bordered" style={{ width: "100%" }}>
                
              {this.state.rowNo.map((i) => (
                <>
                 
                 <tr>
                  <td>
                     <h6 className="mt-2">{i}</h6>
                  </td>
                  <td >
                    <input
                      style={inputStyle}
                      placeholder="Enter working Hours"
                      type="text"
                      name="logHours"
                      id="logHours"
                      onChange={this.timesheetHandeler}
                      onClick={(e, i) => this.tsChange(e, i)}
                      required  
                  /><br />
                  <span id="err"></span>      
                 </td>
                 {/* {
                    i == "Monday" ?
                    <td>
                    <select className="form-control mb-4 mt-2" onChange={(e) => this.setState({projectName: e.target.value})}>
                      <option selected>Select Project</option>
                      <option value="RC Builder">RC Builder</option>
                      <option value="RC 360">RC 360</option>
                      <option value="Reimbursement">Reimbursement</option>
                      <option value="Video Conferencing">Video Conferencing</option>    
                    </select>       
                  </td>
                      :
                  <td>
                          <input style={inputStyle} placeholder="project name" value={this.state.projectName} />
                  </td>
                  } */}
                 <td>
                    <select className="form-control mb-4 mt-2" onChange={(e) => this.setState({ task: e.target.value })}>
                      <option selected>Select Task</option>
                      <option value="Coding">Coding</option>
                      <option value="Requirment gathering">Requirment gathering</option>
                      <option value="R & D">R & D</option>
                    </select>
                 </td>
                 {/* <td>
                 <input
                   style={inputStyle}
                     placeholder="Enter Date(YYYY-MM-DD)"
                     type="date"
                     name="date"
                     onChange={this.timesheetHandeler}
                    value={this.state.week[0]}    
                     required
                   />
                  </td> */}
                </tr>
                </>
               ))} 
                </table>
                <input style={{margin:"auto"}} placeholder="Action" class="btn btn-sm btn-info" type="submit" value="Submit" onClick={this.savetimeSheet} />
                </div>
                </div>
            </div>
          </div>
          </div>  
          </RubberBand>
        </div>
        
          {/* *************************approved timesheet */}

          <div id="timesheet1" style={{ display: "none", marginLeft:"22%"}}>
          <h5 style={{ color:"grey", padding: "5px", marginLeft:"2%" }} >APPROVED TIME-SHEET</h5>
          <div class="row">
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="table-responsive p-3">
                <table id="example" class="table table-striped table-bordered" style={{ width: "100%" }}>
                  <thead>
                      <tr>
                      <th>Accountant Status</th>
                      <th>Supervisor Status</th>
                      
                      <th>Employee Name</th>
                      <th>TimeSheet Id</th>
                      <th>Date</th>
                      <th>Day</th>
                      <th>Task</th>
                      <th>Project Name</th>
                      <th>Log Hours</th>
                      <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                    {this.state.apprTimeSheet?.map((t) => (
                        <tr>
                          <td>{t.accountantApproved}</td>
                          <td>{t.supervisorApproved}</td>
                          
                          <td>{t.employeeName}</td>
                          <td>{t.timeSheetId}</td>
                          <td>
                            <Moment format="YYYY/MM/DD">{t.date}</Moment>
                          </td>
                          <td>{t.day}</td>
                          <td>{t.task}</td>
                          <td>{t.projectName}</td>
                          <td>{t.logHours}</td>
                          <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => this.deleteTimeSheet(t.timeSheetId)}
                        >
                          Delete
                        </button>
                      </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
         </div>

        {/* *************************disapproved timesheet */}

        <div id="timesheet2" style={{ display: "none", marginLeft: "22%"}}>
        <h5 style={{ color:"grey", padding: "5px", marginLeft:"2%" }} >DISAPPROVED TIME-SHEET</h5>
        <div class="row">
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="table-responsive p-3">
                <table id="example" class="table table-striped table-bordered" style={{ width: "100%" }}>
                  <thead>
                      <tr>
                      <th>Accountant Status</th>
                      <th>Supervisor Status</th>
                     
                      <th>Employee Name</th>
                      <th>TimeSheet Id</th>
                      <th>Date</th>
                      <th>Day</th>
                      <th>Task</th>
                      <th>Project Name</th>
                      <th>Log Hours</th> 
                      <th>Action</th>

                      </tr>
                  </thead>
                  <tbody>
                    {this.state.disapprTimeSheet?.map((t) => (
                        <tr>
                          <td>{t.accountantApproved}</td>
                          <td>{t.supervisorApproved}</td>
                          
                          <td>{t.employeeName}</td>
                          <td>{t.timeSheetId}</td>
                          <td>
                            <Moment format="YYYY/MM/DD">{t.date}</Moment>
                          </td>
                          <td>{t.day}</td>
                          <td>{t.task}</td>
                          <td>{t.projectName}</td>
                          <td>{t.logHours}</td>
                          <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => this.deleteTimeSheet(t.timeSheetId)}
                        >
                          Delete
                        </button>
                      </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* *************************Add Reimbursement */}

        <div
          className="cardu"
          id="add"
          style={{
            width: "33%",
            marginLeft: "35%",
            marginButtom: "1%",
            marginTop: "7%",
            backgroundColor: "white",
            boxShadow: "3px 4px 8px 9px gray",
            padding: "20px",
          }}
        >
          <form onSubmit={this.mySubmitHandler}>
            <h3 className="text-center">Add Reimbursement</h3>

            <input
              type="text"
              name="supervisorId"
              id="supervisorId"
              class="form-control"
              placeholder="Supervisor id"
              onChange={this.myChangeHandler}
            />
            <br />

            <input
              type="text"
              name="foodexpense"
              className="form-control"
              placeholder="Food Expense"
              onChange={this.myChangeHandler}
            />
            <br />

            <input
              type="text"
              name="travelexpense"
              className="form-control"
              placeholder="Travel Expense"
              onChange={this.myChangeHandler}
            />
            <br />

            <input
              type="text"
              name="otherexpense"
              className="form-control"
              placeholder="Other Expense"
              onChange={this.myChangeHandler}
            />
            <br />

            <div className="form-group">
              <label for="id">Enter Food bill image:</label>
              <input
                type="file"
                name="foodBill"
                className="form-control"
                onChange={this.onInputFileChange}
              />
            </div>
            <div className="form-group">
              <label for="id">Enter Travel bill image:</label>
              <input
                type="file"
                name="travelBill"
                className="form-control"
                onChange={this.onInputFileChange}
              />
            </div>
            <div className="form-group">
              <label for="id">Enter Other bill image:</label>
              <input
                type="file"
                name="otherBill"
                className="form-control"
                onChange={this.onInputFileChange}
              />
            </div>

            <div className="form-group">
              <label for="id">
                Enter your Date Of Reimburse:(Format YYYY-MM-DD)
              </label>
              <input
                placeholder="Date of Reimbursement"
                type="text"
                name="dateOfReimburse"
                className="form-control"
                onChange={this.myChangeHandler}
              />
            </div>

            <input class="btn btn-dark" type="submit" />
          </form>
        </div>

        {/* *************************View Reimbursements */}

        <div id="view" style={{ display: "none" }}>
          <div style={{ marginLeft: "25%", marginTop: "5%" }}>
            <RubberBand>
         
          <div class="row">
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="table-responsive p-3">
                <table id="example" class="table table-striped table-bordered" style={{ width: "100%" }}>
                  <thead>
                      <tr>
                        <th>Reimbursement ID</th>
                        <th>Employee ID</th>
                        <th>Supervisor Status</th>
                        <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                    {this.state.viewRe.map((r, id) => {
                      return (
                        <>
                        <tr>  
                          <td>{r.reimburceId}</td>
                          <td>{r.employeeId}</td>
                          <td>{r.supervisorStatus}</td>
                          <td>
                            <div
                              onClick={(e) => this.viewR(e, r)}
                              id="Rbutton"
                              style={{
                                cursor: "pointer",
                                textAlign: "center",
                                borderRadius: "11%",
                                padding: "9px",
                                backgroundColor: "#ffbe2b",
                                marginTop: "4px",
                                border: "none",
                                color: "black",
                              }}
                            >
                              view details
                            </div>
                          </td>
                        </tr>
                        </>
                      );
                    })}
                </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
         
            </RubberBand>
          </div>
        </div>

        {/* *************************View Single Reimbursement */}

        <Dialog
          open={this.state.openDialog}
          onClose={() => this.setState({ openDialog: !this.state.openDialog })}
          className="dialog"
        >
          <DialogTitle>
            <div className="">
              <h3>Reimbursement</h3>
              <hr />
            </div>
          </DialogTitle>
          <DialogContent>
            <div
              classNamee="cardu mb-3 mt-3"
              id="view"
              style={{
                boxShadow: "3px 4px 8px 9px gray",
                backgroundColor: "white",
                width: "550px",
              }}
            >
              <div
                className="card-body"
                style={{ borderBottom: "9px solid gray" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px",
                    border: "1px solid lightgrey",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: "800" }} scope="col">
                      Reimburse_Id{" "}
                    </p>
                    <p>{this.state.viewDetailReim.reimburceId}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "800" }} scope="col">
                      Employee Id{" "}
                    </p>
                    <p>{this.state.viewDetailReim.employeeId}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "800" }} scope="col">
                      Supervisor Id{" "}
                    </p>
                    <p>{this.state.viewDetailReim.supervisorId}</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px",
                    border: "1px solid lightgrey",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: "800" }} scope="col">
                      Other Expense{" "}
                    </p>
                    <p>{this.state.viewDetailReim.otherExpenss}</p>
                  </div>
                  <div>
                    {" "}
                    <p style={{ fontWeight: "800" }} scope="col">
                      Food Expense{" "}
                    </p>
                    <p>{this.state.viewDetailReim.foodExpense}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "800" }} scope="col">
                      Travel Expense{" "}
                    </p>
                    <p>{this.state.viewDetailReim.travelExpense}</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px",
                    border: "1px solid lightgrey",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: "800" }} scope="col">
                      Food Bill
                    </p>
                    <img
                      width="150"
                      height="150"
                      className="img-fluid"
                      src={`data:image/png;base64, ${this.state.viewDetailReim.foodBill}`}
                    />
                  </div>
                  <div>
                    <p style={{ fontWeight: "800" }} scope="col">
                      Other Bill{" "}
                    </p>
                    <img
                      width="150"
                      height="150"
                      className="img-fluid"
                      src={`data:image/png;base64, ${this.state.viewDetailReim.otherBill}`}
                    />
                  </div>
                  <div>
                    <p style={{ fontWeight: "800" }} scope="col">
                      Travel Bill{" "}
                    </p>
                    <img
                      width="150"
                      height="150"
                      className="img-fluid"
                      src={`data:image/png;base64, ${this.state.viewDetailReim.travelBill}`}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "6px",
                    border: "1px solid lightgrey",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: "800" }} scope="col">
                      Supervisor status{" "}
                    </p>
                    <p>{this.state.viewDetailReim.supervisorStatus}</p>
                  </div>
                  <div style={{ marginLeft: "64px" }}>
                    <p style={{ fontWeight: "800" }} scope="col">
                      Accountant status{" "}
                    </p>
                    <p>{this.state.viewDetailReim.accontantStatus}</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "6px",
                    border: "1px solid lightgrey",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: "800" }} scope="col">
                      Created Date{" "}
                    </p>
                    <p>{this.state.viewDetailReim.createdDate}</p>
                  </div>
                  <div style={{ marginLeft: "95px" }}>
                    <p style={{ fontWeight: "800" }} scope="col">
                      Date of Reimburse{" "}
                    </p>
                    <p>{this.state.viewDetailReim.dateOfReimburse}</p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* *************************View Attendence */}

        <div
          id="attend"
          style={{
            display: "none",
            marginTop: "5%",
            marginLeft:"23%",
          }}
        >
           {/* disapproved timesheet*************************** */}
           <div class="row">
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="table-responsive p-3">
                <table id="example" class="table table-striped table-bordered" style={{ width: "100%" }}>
                  <thead>
                      <tr>
                      <th scope="col">Attendence Id</th>
                      <th scope="col">Employee Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Status</th>
                      </tr>
                  </thead>
                  {this.state.viewAttend.map((a, id) => {
                      return (
                        <tbody>
                          <tr>
                            <td>{a.attendenceId}</td>
                            <td>{a.employeeId}</td>
                            <td>{a.employeeName}</td>
                            <td>{a.status}</td>
                          </tr>
                        </tbody>
                        );
                  })}
                </table>
                </div>
              </div>
            </div>
          </div>
          {/* /disapproved timesheet******************* */}
        </div>
      </div>
    );
  }
}
