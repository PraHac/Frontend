import React, { Component } from "react";
import "./Add.css";
import axios from "axios";
import imageToBase64 from "image-to-base64/browser";
import { Dialog, DialogContent, DialogTitle, Icon } from "@material-ui/core";
import "../TimeSheet.css";
import TimeSheetService from "../../services/TimeSheetService";
import Moment from "react-moment";
import logo from '../logo1.png'
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import { notification,Avatar } from "antd";
import profile from '../undraw_profile.svg'
import { MDBDataTable } from 'mdbreact'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

const logout = (e) => {
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
  localStorage.removeItem("employeeName");
  window.location.replace("/");
};

const styles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: "",
      supervisorId: 0,
      foodexpense: 0,
      travelexpense: 0,
      update: [],
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
      rowNo: [0,1,2,3,4],
      rowNoDays: ["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday"],
      timesheetDetail: [],
      task: "",
      holiday:"casualWork",
      projectName: "",
      logHours: 0,
      apprTimeSheet: [],
      disapprTimeSheet: [],
      week: [],
      weeks: [],
      count: 0,
      startDate: null,
      rows: [],
      update: [],
      pName: "",
      getTimesheetDetails: [],
      getAppTimesheetDetails: [],
      openTimesheetDetails: false,
      columns: [

        {
          label: 'Project Name',
          field: 'projectName',
          sort: 'asc',
          width: 27
        },
        {
          label: 'Date',
          field: 'date',
          sort: 'asc',
          width: 20
        },
        {
          label: 'Supervisor Name',
          field: 'superVisorName',
          sort: 'asc',
          width: 20
        },
        {
          label: 'Supervisor Status',
          field: 'supervisorApproved',
          sort: 'asc',
          width: 20
        },
        {
          label: 'Accountant Status',
          field: 'accountantApproved',
          sort: 'asc',
          width: 20
        },
        {
          label: 'Update',
          field: 'update',
          width: 20

        },
        {
          label: 'View',
          field: 'view',
          width: 20

        },
      ]
    };
    this.tsChange = this.tsChange.bind(this);
    this.savetimeSheet = this.savetimeSheet.bind(this);
    this.dateTaker = this.dateTaker.bind(this);
  }

//*************************/ update timesheet

  update = (e) => {
    // alert("testing");
    axios.get('http://localhost:8081/r1/TimeSheetbyTId/' + e.currentTarget.value)
      .then(res => {

        // this.setState({
        //   update: data
        // });
        // this.setState({ departmentId: data.departmentId })
        // console.log(this.state.departmentId);
        this.setState({ getTimesheetDetails: res.data.detailTimeSheet })
        console.log(res.data.detailTimeSheet)
      });
  }

//*************************/ get timesheet details
  view = (e) => {
    document.getElementById("timesheetDet").style.display = "block"
    axios.get('http://localhost:8081/r1//getTimeSheet' + '/' + e.currentTarget.value)
      .then(res => {
        this.setState({ getTimesheetDetails: res.data.detailTimeSheet })
        this.setState({ pName: res.data.projectName });

      })
    .catch(err => console.log(err))
  }

  //*************************/ get approved timesheet details
  viewAppTimeSheet = (id) => {
    document.getElementById("viewtimesheetDet").style.display = "block"
    axios.get('http://localhost:8081/r1//getTimeSheet' + '/' + id)
      .then(res => {
        console.log(res);
        this.setState({ getAppTimesheetDetails: res.data.detailTimeSheet })
        this.setState({ pName: res.data.projectName });

      })
    .catch(err => console.log(err))
  }

  removeDetails = () => {
    document.getElementById("timesheetDet").style.display = "none"
    document.getElementById("viewtimesheetDet").style.display = "none"
  }

//*************************/ get timesheets
  
  users = () => {
    fetch('http://localhost:8081/r1//allaccountantDisapproved')
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        for (var i = 0; i < data.length; i++) {

          data[i].projectName = <p>{data[i].projectName}</p>
          data[i].date = <Moment format="YYYY-MMM-DD">{data[i].dateOfTimeSheet}</Moment>
          data[i].superVisorName = <p>{data[i].superVisorName}</p>
          data[i].supervisorApproved = <p>{data[i].supervisorApproved}</p>
          data[i].accountantApproved = <p>{data[i].accountantApproved}</p>
          data[i].update = <button data-toggle="modal" data-target="#exampleModal" className="btn btn-primary" value={data[i].timeSheetId} onClick={this.update} type="button">Update</button>
          data[i].view = <button data-toggle="modal" data-target="#exampleModal" className="btn btn-secondary" value={data[i].timeSheetId} onClick={this.view} type="button">view</button> 
        }
        this.setState({
          rows: data
        });
        console.log(data)
        console.log(this.state.rows.length)

        console.log(this.state.rows);
      });
  }

  dateTaker(date) {
    this.setState({startDate: date})
  }

  componentDidMount() {
    if (localStorage.getItem("employeeId") == null) {
      window.location.replace("/");
    }
    document.querySelector('#timesheet > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) > div > label').style.marginLeft = '82px';
    document.querySelector('.custom-select').classList = '';
    document.querySelector('.dataTables_info').style.marginLeft = '82px';
    document.querySelector('.pagination').style.marginRight = '82px';
    document.querySelector('.mdb-datatable-filter').style.marginRight = '82px'; 
    // document.getElementById('save').classList.add('disabled')   
    this.users();
  }

  

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
                    supervisorId: localStorage.getItem("supervisorId"),
                    foodExpense: this.state.foodexpense,
                    travelExpense: this.state.travelexpense,
                    otherExpenss: this.state.otherexpense,
                    dateOfReimburse: this.state.dateOfReimburse,
                    foodBill: this.state.foodBill,
                    travelBill: this.state.travelBill,
                    otherBill: this.state.otherBill,
                  })
                  .then((res) => {
                    notification['success']({
                      description:
                        'Reimbursement Added',
                        className:"mt-5"  
              
                    })
                  })
                  .catch((err) => {
                    notification['error']({
                      description:
                        'Reimbursement Not added',
                        className:"mt-5"  
              
                    })
                  });
                  document.getElementById('fe').value=""
                  document.getElementById('te').value=""
                  document.getElementById('oe').value=""
                  document.getElementById('date').value=""
                  document.getElementById('fb').value=""
                  document.getElementById('tb').value=""
                  document.getElementById('ob').value=""
            
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
  };

  viewReimburs = (event) => {
    event.preventDefault();
    document.getElementById("add").style.display = "none";
    document.getElementById("attend").style.display = "none";
    document.getElementById("view").style.display = "block";
    document.getElementById("timesheet").style.display = "none";
    document.getElementById("timesheet1").style.display = "none";

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
    document.getElementById("viewtimesheetDet").style.display = "none";
    // document.getElementById("time").style.marginLeft = "5%";
    // document.getElementById("viewT").style.textAlign = "5%";
  };
  timesheet1 = (event) => {
    event.preventDefault();
    document.getElementById("add").style.display = "none";
    document.getElementById("attend").style.display = "none";
    document.getElementById("view").style.display = "none";
    document.getElementById("timesheet").style.display = "none";
    document.getElementById("timesheet1").style.display = "block";
    axios.get("http://localhost:8081/r1/allaccountantapproved").then((res) => {
      console.log(res)
      this.setState({apprTimeSheet: res.data})
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
    // var email_name = document.getElementById("logHours");
    // var logHour_value = document.getElementById("logHours").value;
    // var logHour_length = logHour_value.length;
    // if(this.state.logHours < 0 )
    // {
    // document.getElementById('err').innerHTML = 'Invalid format(digit between 0-9)';
    // email_name.focus();
    // document.getElementById('err').style.color = "red";
    // }
    // else
    // {
    // document.getElementById('err').innerHTML = 'Valid format';
    // document.getElementById('err').style.color = "#00AF33";
    // }
    
  };

  //********************** */ save timesheet

  savetimeSheet(event) {
    event.preventDefault();
    console.log(moment(this.state.startDate).format('YYYY-MM-DD'));

    var d;
    if (this.state.task != "") {
      if (this.state.holiday == "casualWork") {
        d = {
          logHours: this.state.logHours,
          task: this.state.task,
          projectName: this.state.projectName,
          dateOfTimesheet: this.state.week[this.state.count],
          holiday: this.state.holiday
        }
      } else if(this.state.holiday == "leave" || this.state.holiday == "holiday"){
        d = {
          logHours: 0,
          task: "No Work",
          projectName: "Holiday",
          dateOfTimesheet: this.state.week[this.state.count],
          holiday: this.state.holiday
        }
      }
    } else {
      notification['error']({
        description:
          'Please Add Fields',
        className:'mt-5'
     })
    }
    this.state.timesheetDetail.push(d);
    console.log(this.state.timesheetDetail);

    var timesheetParameter = {
      employeeId: localStorage.getItem("employeeId"),
      supervisorId: localStorage.getItem("supervisorId"),
      projectName: this.state.projectName,
      detailTimeSheet: this.state.timesheetDetail
    }

    console.log(timesheetParameter);

    TimeSheetService.saveTimeSheet(timesheetParameter).then((response) => {
      console.log(response);
      this.setState({ timeSheet: response.data });
      notification['success']({
        description:
          'Timesheet Added',
        className:'mt-5'
     })
    }).catch((err) => console.log(err))
  }

  tsChange(e, i) {
    e.preventDefault();
    if (this.state.task != "") {
      var d;
      if (this.state.holiday == "casualWork") {
        d = {
          logHours: this.state.logHours,
          task: this.state.task,
          projectName: this.state.projectName,
          dateOfTimesheet: this.state.week[this.state.count],
          holiday: this.state.holiday
        }
      } else if(this.state.holiday == "holiday" || this.state.holiday == "leave"){
        d = {
          logHours: 0,
          task: "Holiday",
          projectName: "Holiday",
          dateOfTimesheet: this.state.week[this.state.count],
          holiday: this.state.holiday
        }
      }
      this.setState({ holiday: "casualWork" })
      console.log(d);
      this.state.timesheetDetail.push(d);
      this.setState({ count: this.state.count + 1 })
      
    } else {
      if (this.state.startDate != null) {
        let curr = new Date(moment(this.state.startDate).format('YYYY-MM-DD'));
        for (let i = 1; i <= 5; i++){
          let first = curr.getDate() - curr.getDay() + i;
          let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
          this.state.week.push(day);
        }
        console.log(this.state.week); 
      }
      this.setState({ weeks: this.state.week });
      console.log(this.state.weeks);
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
        fontWeight: 600
    }
    const logostyle = {
      height: "48px",
      marginLeft:"12px"
    }
    const {classes} = this.props;

    

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
          <div class="dropdown" style={{left:'85%',position:'fixed',color:'white'}}>
                <Avatar className="img-profile rounded-circle"id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" src={profile} style={{maxWidth:'60px'}}/> 
                {localStorage.getItem("employeeName")}
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" onClick={logout}>Logout</a>
                </div>
          </div>
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
                            <i className="fas fa-calculator nav-icon"  style={{color:"#ffa426",marginLeft:"8px",marginRight:"5px"}} />
                            <p onClick={this.addReimburs}>Add Reimbursement</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link">
                            <i className="fas fa-calculator nav-icon"  style={{color:"#ffa426",marginLeft:"8px",marginRight:"5px"}} />
                            <p onClick={this.viewReimburs}>View Reimbursement</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link">
                            <i className="fas fa-clock nav-icon"  style={{color:"#ffa426",marginLeft:"8px",marginRight:"5px"}} />
                            <p onClick={this.timesheet} > TimeSheet</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link">
                            <i className="fas fa-clock nav-icon"  style={{color:"#ffa426",marginLeft:"8px",marginRight:"5px"}} />
                            <p onClick={this.timesheet1}>Approved TimeSheet</p>
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
          
          <div id="time" style={{  marginLeft: "20%" }}>
          <div style={{display:"flex",justifyContent:"space-evenly", padding: "1%" }} >
            
              <input
                  style={{
                        border: "none",
                        outline: "none",
                        borderBottom: "1px solid lightslategrey",
                        background: "none",
                        fontSize: "17px",
                        fontWeight: "800",
                        fontFamily: "cursive",
                        backgroundColor: "rgb(253, 227, 227)",
                        marginLeft:"4px"
                  }}
                      placeholder="Supervisor Id"
                      type="text"
                      name="supervisor_id"
                      value={"Supervisor Name : " + localStorage.getItem("supervisorName")}
                required
              />
               <select id="project" className="form-control  w-25" onChange={(e) => this.setState({projectName: e.target.value})}>
                      <option selected>Select Project</option>
                      <option value="RC Builder">RC Builder</option>
                      <option value="RC 360">RC 360</option>
                      <option value="Reimbursement">Reimbursement</option>
                      <option value="Video Conferencing">Video Conferencing</option>    
              </select>
              <div id="d" className='ui-datepicker'>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={date => this.dateTaker(date)                }
                  filterDate={date => date.getDay() === 1}
                  placeholderText="Select Date"
                  className="form-control dateInput"
                  dateFormat="yyyy-MM-dd"
                />
            </div>
            </div>
           <div class="row">
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="table-responsive p-3">
                <table id="example" class="table table-striped table-bordered w-100">
                
                      <thead style={{textAlign:"center", fontWeight:"800", fontFamily:"cursive"}}>
                        <td>Days</td>
                        <td>Working Hour</td>
                          { this.state.weeks.length>0?<td>Date</td>:""}
                        <td>Task</td>
                        <td>Leave</td>
                      </thead>
                      {
                      this.state.rowNo.map((i) => (
                        
                        <>
                        <tr>
                          <td>
                            <h6 className="mt-2">{this.state.rowNoDays[i]}</h6>
                          </td>
                            <td >
                            
                            <TextField
                              label="Enter working Hours"
                              type="text"
                              name="logHours"
                              id="logHours"
                              // value={ }
                              // defaultValue={this.state.update.departmentName}
                              onChange={this.timesheetHandeler}
                              onClick={(e, i) => this.tsChange(e, i)}
                              required  
                          /><br />
                            <span id="err"></span>
                          </td>
                          {this.state.weeks.length>0? <td>
                              <input style={inputStyle} value={ this.state.weeks[i] } />
                          </td>  : ""}
                          
                            <td>
                            <select id="task" className="form-control mb-4 mt-2" onChange={(e) => this.setState({ task: e.target.value })}>
                              <option selected>Select Task</option>
                              <option value="Coding">Coding</option>
                              <option value="Requirment gathering">Requirment gathering</option>
                              <option value="R & D">R & D</option>
                            </select>
                          </td>
                            <td>
                            <select id="holiday" className="form-control mb-4 mt-2" onChange={(e) => this.setState({ holiday: e.target.value })}>
                              <option value="casualWork" selected>Casual Work</option>
                                <option value="holiday">Holiday</option>
                              <option value="leave">Leave</option>
                            </select>
                          </td>
                        </tr>
                        </>
                      ))} 
                </table>
                <input style={{margin:"auto"}} placeholder="Action" className="btn btn-sm btn-info" type="submit" value="Submit" onClick={this.savetimeSheet} />
                </div>
                </div>
            </div>
          </div>
          </div>  

        <div id="viewT" style={{ width: '1000px', marginLeft: '22%', marginTop: 40, boxShadow: "2px 2px 10px", padding: "10px" }}>
        <p style={{fontSize: "22px",
                        fontWeight: "800",
                        fontFamily: "cursive",
                        width:"40%",
                        backgroundColor: "rgb(253, 227, 227)", marginBottom:"38px"}}>DisApproved Timesheets</p>    
          <MDBDataTable
            striped
            bordered
            entriesOptions={[5, 10, 20, 50, 100]}
            entries={5}
            data={{ columns: this.state.columns, rows: this.state.rows }}
            pagingTop
            searchTop
            searchBottom={false}
          />
        </div>
{/* *************************view timesheet details**************************************** */}
      <div id="timesheetDet">    
      {this.state.getTimesheetDetails.length>0?( 
      <div style={{marginLeft:"20%",marginTop:"2%", boxShadow:"2px 2px 10px", padding:"10px" }}>
          <div class="row" >
            <div class="col-lg-12">
              <div class="card mb-4">
                    <div style={{ display: "flex", justifyContent:"space-between", alignItems:"center" }}>
                      <p style={{
                        fontSize: "22px",
                        fontWeight: "800",
                        fontFamily: "cursive",
                        width:"40%",
                      backgroundColor: "rgb(253, 227, 227)"
                      }}>Project Name : {this.state.pName}
                      </p>
                      <Icon><HighlightOffIcon onClick={this.removeDetails} style={{ fontSize: "50px", cursor: "pointer" }} /></Icon>
                    </div>       
                <div class="table-responsive p-3">     
                <table id="example" class="table table-striped table-bordered w-100" >
                      <thead style={{textAlign:"center", fontWeight:"800", fontFamily:"cursive"}}>
                        <td>Days</td>
                        <td>Working Hour</td>
                        <td>Date</td>
                        <td>Task</td>
                        <td>Leave</td>
                      </thead>
                      {
                      this.state.getTimesheetDetails.map((i) => (
                        <>
                        <tr >
                          <td style={{textAlign:"center"}}>
                          <input style={inputStyle} value={i.day} />
                          </td>
                            <td style={{textAlign:"center"}}>
                            <input style={inputStyle} value={i.logHours} /><br />
                            {/* <span id="err"></span> */}
                          </td>
                          <td style={{textAlign:"center"}}>
                            <Moment style={inputStyle} format="YYYY-MMM-DD">{i.dateOfTimesheet}</Moment>
                          </td>
                          <td style={{textAlign:"center"}}>
                            <input style={inputStyle} value={i.task} />
                          </td>
                          <td style={{textAlign:"center"}}>
                            <input style={inputStyle} value={i.holiday} />
                          </td>
                        </tr>
                        </>
                      ))} 
                  </table>
                </div>
              </div>
            </div>
            </div>
        </div>    
        ) : ""}
        </div>
      </div>
        
          {/* *************************approved timesheet */}

          <div id="timesheet1" style={{ display: "none", marginLeft:"22%"}}>
          <h5 style={{ color:"grey", padding: "5px", marginLeft:"2%" }} >APPROVED TIME-SHEET</h5>
          <div class="row">
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="table-responsive p-3">
                  {this.state.apprTimeSheet.length > 0 ? (
                    <table id="example" class="table table-striped table-bordered w-100">
                      <thead>
                        <tr>
                          <th>Accountant Status</th>
                          <th>Supervisor Status</th>
                          <th>Supervisor Name</th>
                          <th>Date</th>
                          <th>Project Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.apprTimeSheet?.map((t) => (
                          <tr>
                            <td>{t.accountantApproved}</td>
                            <td>{t.supervisorApproved}</td>
                            <td>{t.supervisorName}</td>
                            <td>
                              <Moment format="YYYY-MM-DD">{t.date}</Moment>
                            </td>
                            <td>{t.projectName}</td>
                            <td style={{display:"flex", justifyContent:"space-between"}}>
                              <button
                                className="btn btn-warning"
                                onClick={() => this.deleteTimeSheet(t.timeSheetId)}
                              >
                                Delete
                              </button>
                              <button
                                className="btn btn-secondary"
                                onClick={() => this.viewAppTimeSheet(t.timeSheetId)}
                              >
                                view
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : "No Approved Timesheet"}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div id="viewtimesheetDet">
        {this.state.getAppTimesheetDetails.length>0?( 
        <div style={{ marginLeft: "20%", marginTop: "2%", boxShadow: "2px 2px 10px", padding: "10px" }}>
          <div class="row" >
            <div class="col-lg-12">
              <div class="card mb-4">
                    <div style={{ display: "flex", justifyContent:"space-between", alignItems:"center" }}>
                      <p style={{
                        fontSize: "22px",
                        fontWeight: "800",
                        fontFamily: "cursive",
                        width:"40%",
                      backgroundColor: "rgb(253, 227, 227)"
                      }}>Project Name : {this.state.pName}
                      </p>
                      <Icon><HighlightOffIcon onClick={this.removeDetails} style={{ fontSize: "50px", cursor: "pointer" }} /></Icon>
                    </div>       
                <div class="table-responsive p-3">     
                <table id="example" class="table table-striped table-bordered w-100" >
                      <thead style={{textAlign:"center", fontWeight:"800", fontFamily:"cursive"}}>
                        <td>Days</td>
                        <td>Working Hour</td>
                        <td>Date</td>
                        <td>Task</td>
                        <td>Leave</td>
                      </thead>
                      {
                      this.state.getAppTimesheetDetails.map((i) => (
                        <>
                        <tr >
                          <td style={{textAlign:"center"}}>
                          <input style={inputStyle} value={i.day} />
                          </td>
                            <td style={{textAlign:"center"}}>
                            <input style={inputStyle} value={i.logHours} /><br />
                            {/* <span id="err"></span> */}
                          </td>
                          <td style={{textAlign:"center"}}>
                            <Moment style={inputStyle} format="YYYY-MMM-DD">{i.dateOfTimesheet}</Moment>
                          </td>
                          <td style={{textAlign:"center"}}>
                            <input style={inputStyle} value={i.task} />
                          </td>
                          <td style={{textAlign:"center"}}>
                            <input style={inputStyle} value={i.holiday} />
                          </td>
                        </tr>
                        </>
                      ))} 
                  </table>
                </div>
              </div>
            </div>
            </div>
          </div>
        ):""}  
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

            <br />

            <input
             id="fe"
              type="text"
              name="foodexpense"
              className="form-control"
              placeholder="Food Expense"
              onChange={this.myChangeHandler}
              required
            />
            <br />

            <input
            id="te"
              type="text"
              name="travelexpense"
              className="form-control"
              placeholder="Travel Expense"
              onChange={this.myChangeHandler}
              required
            />
            <br />

            <input
            id="oe"
              type="text"
              name="otherexpense"
              className="form-control"
              placeholder="Other Expense"
              onChange={this.myChangeHandler}
              required
            />
            <br />

            <div className="form-group">
              <label for="id">Enter Food bill image:<span style={{color:"red"}}>*</span></label>
              <input
                id="fb"
                type="file"
                name="foodBill"
                className="form-control"
                onChange={this.onInputFileChange}
                required
              />
            </div>
            <div className="form-group">
              <label for="id">Enter Travel bill image:<span style={{color:"red"}}>*</span></label>
              <input
              id="tb"
                type="file"
                name="travelBill"
                className="form-control"
                onChange={this.onInputFileChange}
                required
              />
            </div>
            <div className="form-group">
              <label for="id">Enter Other bill image:<span style={{color:"red"}}>*</span></label>
              <input
              id="ob"
                type="file"
                name="otherBill"
                className="form-control"
                onChange={this.onInputFileChange}
                required
              />
            </div>

            <div className="form-group">
              <label for="id">
                Enter Date Of Reimbursement:<span style={{color:"red"}}>*</span>
              </label>
              <input
              id="date"
                placeholder="Date of Reimbursement"
                type="date"
                name="dateOfReimburse"
                className="form-control"
                onChange={this.myChangeHandler}
                required
              />
            </div>

            <input class="btn btn-dark" type="submit" />
          </form>
        </div>

        {/* *************************View Reimbursements */}

        <div id="view" style={{ display: "none" }}>
          <div style={{ marginLeft: "25%", marginTop: "5%" }}>
         
          <div class="row">
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="table-responsive p-3">
                <table id="example" class="table table-striped table-bordered w-100">
                  <thead>
                      <tr>
                        <th>Employee Name</th>
                        <th>Supervisor Status</th>
                        <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                    {this.state.viewRe.map((r, id) => {
                      return (
                        <>
                        <tr>  
                          <td>{r.employeeName}</td>
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
                      Employee Email{" "}
                    </p>
                    <p>{this.state.viewDetailReim.empEmail}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "800" }} scope="col">
                      Supervisor Name{" "}
                    </p>
                    <p>{this.state.viewDetailReim.supName}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "800" }} scope="col">
                      Supervisor Email{" "}
                    </p>
                    <p>{this.state.viewDetailReim.supEmail}</p>
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
           
           <div class="row">
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="table-responsive p-3">
                <table id="example" class="table table-striped table-bordered w-100">
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
        </div>

          {/* <Dialog
                open={this.state.supervisor2}
                onClose={() => this.setState({supervisor2: !this.state.supervisor2})}
                className="dialog"
              >
                <DialogTitle>
                  <div className="">
                    <h3>Update Timesheet</h3><hr />
                  </div>
                </DialogTitle>
                <DialogContent>
                    <div>
                     
                    </div>
                </DialogContent>
            </Dialog>   */}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Header);