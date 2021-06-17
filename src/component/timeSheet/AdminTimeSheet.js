import React, { Component } from "react";
import TimeSheetService from "../../services/TimeSheetService";
import Moment from "react-moment";
import { Navbar, Nav } from "react-bootstrap";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { AppstoreOutlined } from "@ant-design/icons";
import Table from "react-bootstrap/Table";
import RubberBand from "react-reveal/RubberBand";
import { Button } from "antd";
import axios from 'axios'
import M from "materialize-css";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import logo from '../logo1.png'
import profile from '../undraw_profile.svg'
import { Avatar } from "antd";


export default class AccTimeSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSheetId: 0,
      employeeId: 0,
      supervisor_id: 0,
      supervisorApproved: "",
      accountantApproved: "",
      date: "",
      day: "",
      task: "",
      projectName: "",
      timeSheet: [],
      emptimeSheet: [],
      particularTimeSheetId: [],
      startD: "",
      endD: "",
      employeeId: "",
      tsList: [],
      age: "",
      apprTimeSheet: [],
      disapprTimeSheet: []
    };
    this.displayAllTimeSheet = this.displayAllTimeSheet.bind(this);
    this.seeByDate = this.seeByDate.bind(this);
    this.seeEmpByDate = this.seeEmpByDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.CW = this.CW.bind(this);
    this.CWE = this.CWE.bind(this);
    this.displayParticularTimeSheet = this.displayParticularTimeSheet.bind(
      this
    );
    this.deleteTimeSheet = this.deleteTimeSheet.bind(this);
    this.displayEmployeeTimeSheet = this.displayEmployeeTimeSheet.bind(this);
    this.superidWaiting = this.superidWaiting.bind(this);
    this.findByWeek = this.findByWeek.bind(this);
    this.findByCodingTask = this.findByCodingTask.bind(this);
    this.findByRequirementGathering = this.findByRequirementGathering.bind(
      this
    );
    this.findByTesting = this.findByTesting.bind(this);
    this.findByMeeting = this.findByMeeting.bind(this);
    this.saveSheet = this.saveSheet.bind(this);
    this.superIdApproved = this.superIdApproved.bind(this);
    this.superIdDispproved = this.superIdDispproved.bind(this);
    this.allAccountantApproved = this.allAccountantApproved.bind(this);
    this.allaccountantdisApproved = this.allaccountantdisApproved.bind(this);
    this.updateSupervisorStatus = this.updateSupervisorStatus.bind(this);
    this.updateAccountantStatus = this.updateAccountantStatus.bind(this);
    this.updateTimeSheetPage = this.updateTimeSheetPage.bind(this);
    this.logout=this.logout.bind(this)
  }
   logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("adminId");
    window.location.replace("/");
  };
  
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  saveSheet() {
    this.props.history.push("/saveTimeSheet");
  }
  allaccountantdisApproved() {
    this.props.history.push("/allAccountantDisApprovedTimeSheet");
  }
  findByTesting() {
    this.props.history.push("/findByTesting");
  }
  findByMeeting() {
    this.props.history.push("/findByMeeting");
  }
  findByRequirementGathering() {
    this.props.history.push("/findByRequirementGathering");
  }
  findByCodingTask() {
    // console.log(document.getElementById("coding").value);
    localStorage.setItem("coding", this.state.task)
    console.log(localStorage.getItem("coding"))
    this.props.history.push("/findByCodingTask");
  }
  allAccountantApproved() {
    this.props.history.push("/allAccountantApprovedTimeSheet");
  }
  displayEmployeeTimeSheet() {
    this.props.history.push("/employeeTimeSheet");
  }
  displayParticularTimeSheet() {
    this.props.history.push("/particulartimeSheet");
  }
  updateTimeSheetPage() {
    this.props.history.push("/updateTimeSheet");
  }
  updateAccountantStatus() {
    this.props.history.push("/updateAccountantStatus");
  }
  superIdApproved() {
    this.props.history.push("/superIdApprovedTimeSheet");
  }
  superIdDispproved() {
    this.props.history.push("/superDisapprovedTimeSheet");
  }
  superidWaiting() {
    this.props.history.push("/superidWaitingimeSheet");
  }
  updateSupervisorStatus() {
    this.props.history.push("/updateSuperVisorStatus");
  }
  findByWeek() {
    this.props.history.push("/findByWeek");
  }

  displayAllTimeSheet() {
    document.getElementById("ts").style.display = "block";
    document.getElementById("ets").style.display = "none";
    document.getElementById("opt").style.display = "block";
    document.getElementById("noneempWeek").style.display = "none"
    document.getElementById("empWeek").style.display = "none" 
    TimeSheetService.getAllAdminT()
      .then((response) => {
        console.log(response);
        this.setState({ timeSheet: response.data });
    });
  }

  deleteTimeSheet(id) {
    console.log("this is deleting");
    TimeSheetService.deleteTimeSheetId(id).then((response) => {
      console.log(response);
      this.displayAllTimeSheet();
    });
  }

  componentDidMount() {
    this.displayAllTimeSheet();
  }

  changeOption() {
    document.getElementById("id").style.display = "block";
  }

  handleTask(e) {
    document.getElementById("seeBtn").style.display = "block";
    this.setState({ task: e.target.value })
  }

  dateHandeler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  seeByDate(e) {
    e.preventDefault();
    document.getElementById("ts").style.display = "block";

    // document.getElementById("empWeek").style.display = "block";
    // document.getElementById("noneempWeek").style.display = "none";
    axios.get("http://localhost:8081/r1/adminWeeklyTimesheet"+"/"+this.state.startD+"/"+this.state.endD)
    .then((response) => {
      console.log(response);
      this.setState({ timeSheet: response.data });
    });
  }
 
  seeEmpByDate(e) {
    e.preventDefault();
    document.getElementById("ts").style.display = "none";
    document.getElementById("ets").style.display = "block";
    axios.get("http://localhost:8081/r1/adminWeeklyTimesheetEmployee"+"/"+this.state.startD+"/"+this.state.endD+"/"+"/"+this.state.employeeId)
    .then((response) => {
      console.log(response);
      this.setState({ emptimeSheet: response.data });
    });
  }

   handleChange = (event) => {
    this.setState({age: event.target.value });
    };
 
    CW (e){
      e.preventDefault();
      document.getElementById("noneempWeek").style.display = "block"
      document.getElementById("empWeek").style.display = "none" 
    }
    
    CWE (e) {
      e.preventDefault();
      document.getElementById("empWeek").style.display = "block"
      document.getElementById("noneempWeek").style.display = "none"
    }
 
  render() {
    const but = {
      position: "relative",
      left: "100%",
    };
    const { SubMenu } = Menu;
    
    const inputStyle = {
      padding: "5px",
      border: "none",
      boxShadow: "3px 1px 3px lightgrey",
      fontSize: "13px",
    }
    
      const formControl = {
        margin: "2px",
        minWidth: 220,
      }
      const logostyle = {
        height: "48px",
        marginLeft:"12px"
      }

    return (
      <div style={{ width: "1362px", height: "100%" }}>
        {/* *************************Navbar */}

        <nav
          className="main-header navbar navbar-expand navbar-dark w-100"
          style={{
            position: "fixed",
            backgroundColor: "#59c5ff",
            display: "flex",
            top: "0",
            padding:"17px",
            width: "90%",
            left: "0%",
          }}
        >
          <ul className="navbar-nav">
            <li className="nav-item" style={{marginRight:"460%"}}>
              <a className="nav-link text-dark" data-widget="pushmenu" href="#" >
                <i className="fas fa-bars" style={{color:"white", fontSize:"20px"}} />
              </a>
            </li>
            <div class="dropdown" style={{left:'85%',position:'fixed',color:'white'}}>
                <Avatar className="img-profile rounded-circle"id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" src={profile} style={{maxWidth:'60px'}}/> 
                {localStorage.getItem("adminId")}
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item"><Link style={{textDecoration:'none',color:'black'}} to="/adminDashboard">Dashboard</Link></a>
                  <a class="dropdown-item" onClick={this.logout}>Logout</a>
                </div>
          </div>
         
          </ul>
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
                          <Link className="link" style={{textDecoration:'none',padding:"10px",color:'#22b1ed'}} to="/adminDashboard">Dashboard</Link>
                          <hr className="sidebar-divider" style={{borderTop:"2px solid #2e2e2e"}}/>
                        <div class="sidebar-heading" style={{color:'#b7b9cc',textAlign: 'left',padding:' 0 1rem',
                          fontWeight: '600',
                          fontSize: '.90rem',
                          marginBottom:"20px",
                          letterSpacing: '.13rem'}}>
                          Features
                        </div>
                        <ul className="nav nav-treeview">
                            <li className="nav-item"
                            onClick={this.displayAllTimeSheet}
                          >
                            <a className="nav-link">
                            <i className="far fa-eye" style={{color:"#ffa426",marginLeft:"8px",marginRight:"5px"}}/>
                                <p>View TimeSheet</p>
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
    {/* *************************SideBar */}

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "10%",
            // marginButtom: "1%",
            marginTop: "5%",
            justifyContent: "center",
            alignItems: "center",
          padding: "12px",
        }}>
          
        {/* ***********option to choose timesheet*******   */}
          <div id="opt"> 
            <FormControl style={formControl}>
              <InputLabel id="demo-simple-select-label">Customize timesheet</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.age}
                onChange={this.handleChange}
              >
                <MenuItem onClick={this.displayAllTimeSheet} value={10} >Current week timesheet</MenuItem>
                <MenuItem onClick={this.CW} value={20}>Customize week</MenuItem>
                <MenuItem onClick={this.CWE} value={30}>Customize weekly timesheet of employee</MenuItem>
              </Select>
          </FormControl>
          </div>
          <div style={{ display: "flex", marginBottom: "12px" }}>
              <div id="noneempWeek" style={{ marginLeft:"12%", display:"none" }}>
              <div className=" justify-content-center align-items-center p-1" style={{ boxShadow: "3px 4px 5px 5px gray"}}>
                 <h5 style={{color:"grey",fontWeight:"600"}}>Customize week</h5>
                 <input type="date" style={inputStyle} name="startD" value={this.state.startD} onChange={this.dateHandeler} placeholder="start date" />
                 <input type="date" style={inputStyle} name="endD" value={this.state.endD} onChange={this.dateHandeler} placeholder="End date" />
                 <button className="btn btn-info" onClick={this.seeByDate}>go</button>  
              </div>
              </div>  
              <div id="empWeek" style={{display:"none",marginLeft:"3%",marginRight:"15%"}}>
              <div className=" justify-content-center align-items-center p-1" style={{ boxShadow: "3px 4px 8px 9px gray" }}>
                 <h5 style={{color:"grey",fontWeight:"600"}}>Customize weekly report of employee</h5>
                 <input type="date" style={inputStyle} name="startD" value={this.state.startD} onChange={this.dateHandeler} placeholder="start date" />
                 <input type="date" style={inputStyle} name="endD" value={this.state.endD} onChange={this.dateHandeler} placeholder="End date" />
                 <input type="date" style={inputStyle} name="employeeId" value={this.state.employeeId} onChange={this.dateHandeler} placeholder="Employee Id" />
                 <button className="btn btn-info" onClick={this.seeEmpByDate}>go</button>  
              </div>
              </div>  
          </div>
        {/* *********** /option to choose timesheet*******   */}
        </div>

        <div
          style={{
            marginLeft: "20%",
            marginButtom: "1%",
            // marginTop: "7%",
            justifyContent: "center",
            alignItems: "center",
            padding: "12px",
          }}
        >
          <RubberBand>
            <div id="ts">
      {/* weeekly timesheet*************************** */}
          <div class="row">
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="table-responsive p-3">
                <table id="example" class="table table-striped table-bordered" style={{ width: "100%" }}>
                  <thead>
                      <tr>
                        <th>Accountant Status</th>
                        <th>Supervisor Status</th>
                        <th>Employee Id</th>
                        <th>Employee Name</th>
                        
                        <th>Date</th>
                        <th>Day</th>
                        <th>Task</th>
                        <th>Project Name</th>
                        <th>Log Hours</th>
                        <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                {this.state.timeSheet?.map((t) => (
                  <>
                    <tr>
                        <td>{t.accountantApproved}</td>
                        <td>{t.supervisorApproved}</td>
                        <td>{t.employeeId}</td>
                        <td>{t.employeeName}</td>
                        
                        <td>
                          <Moment format="YYYY-MMM-DD">{t.date}</Moment>
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
                  </>  
                ))}
              </tbody>
              </table>
                </div>
              </div>
            </div>
          </div>
          {/* /weeekly timesheet******************* */}
            </div>
          
          <div id="ets" style={{ display: "none" }}>
          {/* employee weeekly timesheet*************************** */}
          <div class="row">
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="table-responsive p-3">
                <table id="example" class="table table-striped table-bordered" style={{ width: "100%" }}>
                  <thead>
                      <tr>
                      <th>Accountant Status</th>
                      <th>Supervisor Status</th>
                      <th>Employee Id</th>
                      <th>Employee Name</th>
                      
                      <th>Date</th>
                      <th>Day</th>
                      <th>Task</th>
                      <th>Project Name</th>
                      <th>Log Hours</th>
                      <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                {this.state.emptimeSheet?.map((t) => (
                  <>
                    {
                        (t.employeeId != 0 ? (
                          <tr>
                      <td>{t.accountantApproved}</td>
                      <td>{t.supervisorApproved}</td>
                      <td>{t.employeeId}</td>
                      <td>{t.employeeName}</td>
                      
                      <td>
                        <Moment format="YYYY/MMM/DD">{t.date}</Moment>
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
                      ) : (""))
                    }
                  </>  
                ))}
              </tbody>
              </table>
                </div>
              </div>
            </div>
          </div>
          {/* /employee weeekly timesheet******************* */}
            </div>  
          </RubberBand>
    </div>
     
      </div>
    );
  }
}