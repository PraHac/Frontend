import React, { Component } from 'react'
import { Anchor, Menu } from 'antd';
import '../EmployeeReimburse/Add.css';
import axios from 'axios';
import M from 'materialize-css'
import '../adminDashboard/style.css'
import {Link} from 'react-router-dom'
import { Button, Dialog, DialogContent, DialogTitle, Icon } from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import logo from '../logo1.png'
import Moment from 'react-moment'

export default class SupervisorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      supervisorId: 0,
      foodexpense:0,
      travelexpense:0,
      otherexpense: 0,
      foodBill: "",
      travelBill: "",
      otherBill: "",
      dateOfReimburse: '',
      viewRe: [],
      supervisorAprR: [],
      supervisorDisR: [],
      actionRequired: [],
      actionRequiredSingle: {},
      supervisorSingleAppR: {},
      supervisorSingleDisR: {},
      supervisor1: false,
      supervisor2: false,
      actionOpen: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("supervisorId") == null) {
      window.location.replace("/");
    }
  }

  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("supervisorId");
    window.location.replace("/");
  }

  superApproved = (e) => {
    e.preventDefault();
    document.getElementById("view").style.display = "block"
    document.getElementById("disview").style.display = "none"
    document.getElementById("action").style.display = "none"

      axios
    .get(
      "http://localhost:8081/r1/supervisorApproved" +
      "/" +
      localStorage.getItem("supervisorId")
    )
    .then((res) => {
      this.setState({ supervisorAprR: res.data });
    })
    .catch((err) => console.log(err));
  }

  removeApr = () => {
    document.getElementById("view").style.display = "none";
    document.getElementById("disview").style.display = "none";
    document.getElementById("action").style.display = "none";
  }
  
  superDisapproved = (e) => {
    e.preventDefault();
    document.getElementById("disview").style.display = "block"
    document.getElementById("view").style.display = "none"
    document.getElementById("action").style.display = "none"

    axios
      .get(
        "http://localhost:8081/r1/supervisorDisApproved" +
        "/" +
        localStorage.getItem("supervisorId")
  )
  .then((res) => {
    this.setState({ supervisorDisR: res.data });
  })
  .catch((err) => console.log(err));
  }

  approvedBySup = (e, r) => {
    e.preventDefault();
    this.setState({ supervisor1: "true" });
    axios
        .get(
          "http://localhost:8081/r1/reimburseById" +
          "/" +
          r.reimburceId
        )
        .then((res) => {
          this.setState({ supervisorSingleAppR: res.data });
        })
        .catch((err) => console.log(err));
  } 
  disapprovedBySup = (e, r) => {
    e.preventDefault();
    this.setState({supervisor2: "true"});
    axios
    .get(
      "http://localhost:8081/r1/reimburseById" +
      "/" +
      r.reimburceId
    )
    .then((res) => {
      this.setState({ supervisorSingleDisR: res.data });
    })
    .catch((err) => console.log(err));
  }
  actionRequiredforR = (e, r) => {
    e.preventDefault();
    this.setState({actionOpen: "true"});
    axios
    .get(
      "http://localhost:8081/r1/reimburseById" +
      "/" +
      r.reimburceId
    )
    .then((res) => {
      this.setState({ actionRequiredSingle: res.data });
    })
    .catch((err) => console.log(err));
  } 

  actionRequired = (e) => {
    e.preventDefault();
    document.getElementById("disview").style.display = "none"
    document.getElementById("view").style.display = "none"
    document.getElementById("action").style.display = "block"

        axios.get("http://localhost:8081/r1/totalReimburse"+"/"+localStorage.getItem("supervisorId"))
          .then(res => {
            this.setState({ actionRequired: res.data });
          })
        .catch(err => console.log(err))
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  approve = (e,r) =>{
   
    axios.put("http://localhost:8081/r1/supervisorStatus",{
        reimburceId:e.reimburceId,
        supervisorStatus:document.getElementById('approve').value
    })
}
disApprove = (e,r) =>{
    axios.put("http://localhost:8081/r1/supervisorStatus",{
        reimburceId:e.reimburceId,
        supervisorStatus:document.getElementById('disapprove').value
    })
}

    render() {
      const but = {
        position:'relative',
        left:'60%',
      };

      const logostyle = {
        height: "48px",
        marginLeft:"12px"
        }

      return (

            <div id="home" style={{ width: "1362px", height: "100%"}}>
{/* *************************Navbar */}
            <nav className="main-header navbar navbar-expand navbar-dark w-100" style={{
              position: "fixed",
              backgroundColor:"#59c5ff",
              display: "flex",
              top: "0",
              padding:"17px",
              width: "90%",
            left: "0%"
            }}
          >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link text-dark" data-widget="pushmenu" href="#"><i className="fas fa-bars" style={{color:"white", fontSize:"20px"}} /></a>
                </li>
              </ul>
              <button type="button" style={but} class="btn btn-danger" onClick={this.logout}>LogOut</button>
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
                          <Link className="link" style={{textDecoration:'none',padding:"10px",color:'#22b1ed'}} to="/supervisorDash">Dashboard</Link>
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
                          <i className="fas fa-calculator" style={{color:"#ffa426",marginLeft:"8px",marginRight:"5px"}}/>
                            <p>View Reimbursement</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link">
                          <i className="fas fa-clock" style={{color:"#ffa426",marginLeft:"8px",marginRight:"5px"}}/>
                            <Link to="/supertimesheet"><p>View TimeSheet</p></Link>
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

{/* *************************View options************ */}
           <div style={{display:"flex", marginTop:"6%", marginLeft:"19%"}}> 
                  <div
                      style={{
                        boxShadow: "10px 10px 30px",
                        width: "280px",
                        margin: "34px",
    
                      }}
                      id="adminRe"
                    >
                      <p style={{ fontWeight: "600", backgroundColor: "white", fontSize: "30px" , padding: "9px", color:"grey" }}>Reimbursement</p>
                      <p style={{ fontWeight: "800", backgroundColor: "white", padding: "9px" }}>Approved by You</p>
                      <div onClick={(e) => this.superApproved(e)} id="Rbutton" className="btn btn-secondary w-100" style={{ padding: "9px"  }}>view</div>
                  </div>
                  <div
                      style={{
                        boxShadow: "10px 10px 30px",
                        width: "280px",
                        margin: "34px",
                      }}
                    >
                      <p style={{ fontWeight: "600", backgroundColor: "white", fontSize: "30px" , padding: "9px", color:"grey" }}>Reimbursement</p>
                      <p style={{ fontWeight: "800", backgroundColor: "white", padding: "9px" }}>Disapproved by You</p>
                      <div onClick={(e) => this.superDisapproved(e)} id="Rbutton" className="btn btn-secondary w-100" style={{ padding: "9px"  }}>view</div>
                  </div>
                  <div
                      style={{
                        boxShadow: "10px 10px 30px",
                        width: "280px",
                        margin: "34px",
                      }}
                    >
                      <p style={{ fontWeight: "600", backgroundColor: "white", fontSize: "30px" , padding: "9px", color:"grey" }}>Reimbursement</p>
                      <p style={{ fontWeight: "800", backgroundColor: "white", padding: "9px" }}>Action required</p>
                      <div onClick={(e) => this.actionRequired(e)} id="Rbutton" className="btn btn-secondary w-100" style={{ padding: "9px"  }}>view</div>
                  </div>
          </div>
          
 {/* *************************View Reimbursements approved by supervisor */}

 <div className=" mt-2" id="view" style={{ display: "none", boxShadow: "0px 0px 10px 10px gray" ,  backgroundColor: "#ededed", marginLeft: "21%", width:"72%"}}>
          <div style={{display:"flex", justifyContent:"space-evenly"}}><h2 style={{ marginTop: "1%", color: "grey" }}>Reimbursements approved by you</h2>
          <Icon><HighlightOffIcon onClick={this.removeApr} style={{fontSize:"50px",cursor:"pointer"}}/></Icon></div><hr />
          <div style={{ display: "flex", marginLeft: "18%",  flexWrap: "wrap" }}>
            {
              this.state.supervisorAprR.map((r, id) => {
                return (
                  <>
                    <div
                      style={{
                        boxShadow: "0px 0px 10px 10px gray",
                        backgroundColor: "black",
                        width: "280px",
                        margin: "34px",
                        borderRadius:"50%"
                      }}
                    >
                       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px" }}><p style={{ fontWeight: "800" }}>Employee Name   </p><p>{r.employeeName}</p></div>
                      <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px", marginTop: "4px" }}><p style={{ fontWeight: "800" }}>Supervisor Status</p><p>{r.supervisorStatus}</p></div>
                      <div onClick={(e) => this.approvedBySup(e, r)} id="Rbutton" style={{ cursor: "pointer", textAlign: "center", borderRadius: "11%", padding: "9px", backgroundColor: "#ffbe2b", marginTop: "4px", border: "none", color: "black" }}>view details</div>
                    </div>
                  </>
                )
              })
            }
          </div>
  </div>
         {/* ************************* Reimbursements disapproved by supervisor */}

         <div id="disview" className=" mt-2" style={{ display: "none", boxShadow: "0px 0px 10px 10px gray",  backgroundColor: "#ededed", marginLeft: "21%", width:"72%" }}>
         <div style={{display:"flex", justifyContent:"space-evenly"}}><h2 style={{ marginTop: "1%", color: "grey" }}>Reimbursements disapproved by you</h2>
         <Icon><HighlightOffIcon onClick={this.removeApr} style={{fontSize:"50px", cursor:"pointer"}}/></Icon></div><hr />
          <div style={{ display: "flex", marginLeft: "18%", flexWrap: "wrap" }}>
            {
              this.state.supervisorDisR.map((r, id) => {
                return (
                  <>
                    <div
                      // className="card2"
                      style={{
                        boxShadow: "0px 0px 10px 10px gray",
                        backgroundColor: "black",
                        width: "280px",
                        margin: "34px",
                        borderRadius:"50%"
                      }}
                    >
                       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px" }}><p style={{ fontWeight: "800" }}>Employee Name   </p><p>{r.employeeName}</p></div>
                      <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px", marginTop: "4px" }}><p style={{ fontWeight: "800" }}>Supervisor Status</p><p>{r.supervisorStatus}</p></div>
                      <div onClick={(e) => this.disapprovedBySup(e, r)} id="Rbutton" style={{ cursor: "pointer", textAlign: "center", borderRadius: "11%", padding: "9px", backgroundColor: "#ffbe2b", marginTop: "4px", border: "none", color: "black" }}>view details</div>
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>

 {/* *************************Reimbursements required action */}

 <div id="action" className=" mt-2" style={{ display: "none", boxShadow: "0px 0px 10px 10px gray",  backgroundColor: "#ededed", marginLeft: "21%", width:"72%" }}>
        <div style={{display:"flex", justifyContent:"space-evenly"}}><h2 style={{ marginTop: "1%", color: "grey" }}>Action Required</h2>
        <Icon><HighlightOffIcon onClick={this.removeApr} style={{fontSize:"50px", cursor:"pointer"}}/></Icon></div><hr />
          <div style={{ display: "flex", marginLeft: "18%", flexWrap: "wrap" }}>
            {
              this.state.actionRequired.map((r, id) => {
                return (
                  <>
                    <div
                      style={{
                        boxShadow: "0px 0px 10px 10px gray",
                        backgroundColor: "black",
                        width: "280px",
                        margin: "34px",
                        borderRadius:"50%"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px" }}><p style={{ fontWeight: "800" }}>Employee Name   </p><p>{r.employeeName}</p></div>
                      <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px", marginTop: "4px" }}><p style={{ fontWeight: "800" }}>Supervisor status:   </p><p>{r.supervisorStatus}</p></div>
                      <div onClick={(e) => this.actionRequiredforR(e, r)} id="Rbutton" style={{ cursor: "pointer", textAlign: "center", borderRadius: "11%", padding: "9px", backgroundColor: "#ffbe2b", marginTop: "4px", border: "none", color: "black" }}>view details</div>
                    </div>
                  </>
                )
              })
            }
          </div>
          </div>
  {/* *****************************view single reim****************     */}
          
           <Dialog
              open={this.state.supervisor1}
              onClose={() => this.setState({supervisor1: !this.state.supervisor1})}
              className="dialog"
            >
              <DialogTitle>
                <div className="">
                  <h3>Reimbursement</h3><hr />
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
                          <p>{this.state.supervisorSingleAppR.empEmail}</p>
                        </div>
                        <div>
                          <p style={{ fontWeight: "800" }} scope="col">
                            Supervisor Name{" "}
                          </p>
                          <p>{this.state.supervisorSingleAppR.supName}</p>
                        </div>
                        <div>
                          <p style={{ fontWeight: "800" }} scope="col">
                            Supervisor Email{" "}
                          </p>
                          <p>{this.state.supervisorSingleAppR.supEmail}</p>
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
                          <p>{this.state.supervisorSingleAppR.otherExpenss}</p>
                        </div>
                        <div>
                          {" "}
                          <p style={{ fontWeight: "800" }} scope="col">
                            Food Expense{" "}
                          </p>
                          <p>{this.state.supervisorSingleAppR.foodExpense}</p>
                        </div>
                        <div>
                          <p style={{ fontWeight: "800" }} scope="col">
                            Travel Expense{" "}
                          </p>
                          <p>{this.state.supervisorSingleAppR.travelExpense}</p>
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
                            src={`data:image/png;base64, ${this.state.supervisorSingleAppR.foodBill}`}
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
                            src={`data:image/png;base64, ${this.state.supervisorSingleAppR.otherBill}`}
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
                            src={`data:image/png;base64, ${this.state.supervisorSingleAppR.travelBill}`}
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
                          <p>{this.state.supervisorSingleAppR.supervisorStatus}</p>
                        </div>
                        <div style={{ marginLeft: "64px" }}>
                          <p style={{ fontWeight: "800" }} scope="col">
                            Accountant status{" "}
                          </p>
                          <p>{this.state.supervisorSingleAppR.accontantStatus}</p>
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
                          <p><Moment format="YYYY-MMM-DD HH:mm:ss">{this.state.supervisorSingleAppR.createdDate}</Moment></p>
                        </div>
                        <div style={{ marginLeft: "95px" }}>
                          <p style={{ fontWeight: "800" }} scope="col">
                            Date of Reimburse{" "}
                          </p>
                          <p><Moment format="YYYY-MMM-DD">{this.state.supervisorSingleAppR.dateOfReimburse}</Moment></p>
                        </div>
                      </div>
                    </div>
                  </div>
              </DialogContent>
        </Dialog>
        <Dialog
              open={this.state.supervisor2}
              onClose={() => this.setState({supervisor2: !this.state.supervisor2})}
              className="dialog"
            >
              <DialogTitle>
                <div className="">
                  <h3>Reimbursement</h3><hr />
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
                          <p>{this.state.supervisorSingleDisR.empEmail}</p>
                        </div>
                        <div>
                          <p style={{ fontWeight: "800" }} scope="col">
                            Supervisor Name{" "}
                          </p>
                          <p>{this.state.supervisorSingleDisR.supName}</p>
                        </div>
                        <div>
                          <p style={{ fontWeight: "800" }} scope="col">
                            Supervisor Email{" "}
                          </p>
                          <p>{this.state.supervisorSingleDisR.supEmail}</p>
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
                          <p>{this.state.supervisorSingleDisR.otherExpenss}</p>
                        </div>
                        <div>
                          {" "}
                          <p style={{ fontWeight: "800" }} scope="col">
                            Food Expense{" "}
                          </p>
                          <p>{this.state.supervisorSingleDisR.foodExpense}</p>
                        </div>
                        <div>
                          <p style={{ fontWeight: "800" }} scope="col">
                            Travel Expense{" "}
                          </p>
                          <p>{this.state.supervisorSingleDisR.travelExpense}</p>
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
                            src={`data:image/png;base64, ${this.state.supervisorSingleDisR.foodBill}`}
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
                            src={`data:image/png;base64, ${this.state.supervisorSingleDisR.otherBill}`}
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
                            src={`data:image/png;base64, ${this.state.supervisorSingleDisR.travelBill}`}
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
                          <p>{this.state.supervisorSingleDisR.supervisorStatus}</p>
                        </div>
                        <div style={{ marginLeft: "64px" }}>
                          <p style={{ fontWeight: "800" }} scope="col">
                            Accountant status{" "}
                          </p>
                          <p>{this.state.supervisorSingleDisR.accontantStatus}</p>
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
                          <p><Moment format="YYYY-MMM-DD HH:mm:ss">{this.state.supervisorSingleDisR.createdDate}</Moment></p>
                        </div>
                        <div style={{ marginLeft: "95px" }}>
                          <p style={{ fontWeight: "800" }} scope="col">
                            Date of Reimburse{" "}
                          </p>
                          <p><Moment format="YYYY-MMM-DD">{this.state.supervisorSingleAppR.dateOfReimburse}</Moment></p>
                        </div>
                      </div>
                    </div>
                  </div>
              </DialogContent>
          </Dialog>
          <Dialog
              open={this.state.actionOpen}
              onClose={() => this.setState({actionOpen: !this.state.actionOpen})}
              className="dialog"
            >
              <DialogTitle>
                <div className="">
                  <h3>Reimbursement</h3><hr />
                </div>
              </DialogTitle>
              <DialogContent>
              <div class="cardu" id="action" className="cardu mb-3 mt-3"
                    
                    style={{
                      boxShadow: "3px 4px 8px 9px gray",
                      backgroundColor: "white",
                      width: "550px",
                    }}>           
                    <div className="card-body" style={{borderBottom:"9px solid gray"}}>
                    <div style={{display:"flex",padding:"6px", border:"1px solid lightgrey"}}><div><p style={{fontWeight:"800"}} scope="col">Employee Email </p><p>{this.state.actionRequiredSingle.empEmail}</p></div>
                    <div style={{ marginLeft:"76px" }}><p style={{fontWeight:"800"}} scope="col">Supervisor Name </p><p>{this.state.actionRequiredSingle.supName}</p></div></div>
                    <div style={{display:"flex", justifyContent:"space-between",padding:"6px", border:"1px solid lightgrey"}}><div> <p style={{fontWeight:"800"}} scope="col">Food Expense  </p><p>{this.state.actionRequiredSingle.foodExpense}</p></div>
                    <div><p style={{fontWeight:"800"}} scope="col">Food Bill  </p><img
                        width="150"
                        height="150"
                        className="img-fluid"
                        src={`data:image/png;base64, ${this.state.actionRequiredSingle.foodBill}`}
                      /></div></div>
                    <div style={{display:"flex", justifyContent:"space-between",padding:"6px", border:"1px solid lightgrey"}}><div> <p style={{ fontWeight:"800"}} scope="col">Other Expense  </p><p>{this.state.actionRequiredSingle.otherExpenss}</p></div>
                    <div><p style={{fontWeight:"800"}} scope="col">Other Bill  </p><img
                        width="150"
                        height="150"
                        className="img-fluid"
                        src={`data:image/png;base64, ${this.state.actionRequiredSingle.otherBill}`}
                      /></div></div>
                    <div style={{display:"flex", justifyContent:"space-between",padding:"6px", border:"1px solid lightgrey"}}><div><p style={{fontWeight:"800"}} scope="col">Travel Expense </p><p>{this.state.actionRequiredSingle.travelExpense}</p></div>
                    <div><p style={{ fontWeight: "800" }} scope="col">Travel Bill </p><img
                        width="150"
                        height="150"
                        className="img-fluid"
                        src={`data:image/png;base64, ${this.state.actionRequiredSingle.travelBill}`}
                      /></div></div>
                    <div style={{display:"flex", justifyContent:"space-between",padding:"6px", border:"1px solid lightgrey"}}><div><p style={{fontWeight:"800"}} scope="col">Supervisor status </p><p>{this.state.actionRequiredSingle.supervisorStatus}</p></div><button value="approved" id="approve" onClick={() => this.approve(this.state.actionRequiredSingle)} type="button" class="btn btn-sm btn-dark">Approved</button>{<button type="button" value="disApproved" id="disapprove" onClick={() => this.disApprove(this.state.actionRequiredSingle)} class="btn btn-sm btn-dark">Disapproved</button>}</div>
                    <div style={{display:"flex",padding:"6px", border:"1px solid lightgrey"}}><div><p style={{fontWeight:"800"}} scope="col">Total Expense:  </p><p>{this.state.actionRequiredSingle.totalExpense}</p></div>
                    <div style={{ marginLeft:"80px" }}><p style={{fontWeight:"800"}} scope="col">Accountant status  </p><p>{this.state.actionRequiredSingle.accontantStatus}</p></div></div>
                    <div style={{display:"flex",padding:"6px", border:"1px solid lightgrey"}}><div><p style={{fontWeight:"800"}} scope="col">Created Date </p><Moment format="YYYY-MMM-DD HH:mm:ss">{this.state.actionRequiredSingle.createdDate}</Moment></div>
                    <div style={{ marginLeft:"95px" }}><p style={{fontWeight:"800"}} scope="col">Date of Reimburse  </p><p>{<Moment format="YYYY-MMM-DD">{this.state.actionRequiredSingle.dateOfReimburse}</Moment>}</p></div></div>
                </div>   
              </div> 
              </DialogContent>
          </Dialog>
          
      </div>
        )
    }
}