import axios from 'axios';
import Reimservice from '../../services/AccountantReim'
import { Button, Dialog, DialogContent, DialogTitle, Icon } from "@material-ui/core";
import { Link } from 'react-router-dom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

// import { Anchor, Menu } from 'antd';
// import '../EmployeeReimburse/Add.css';
// import { Button, Dialog, DialogContent, DialogTitle, Icon } from "@material-ui/core";
// import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import React, { Component } from 'react'
import PaySalarySidebar from './PaySalarySidebar';

export default class PaySalary extends Component {
  render() {
    return (
    
      <div id="page-top" style={{ width: "100vw", height: "100vh" }}>
          <PaySalarySidebar/>  

         </div>
      
    )
  }
}


// class PaySalary extends React.Component{
// constructor(props){
//     super(props)
//     this.state={
//       accountReimburse: [],
//       supervisorId: "",
//       supervisorId1: "",
//       supervisorIdOpen1: false,
//       supervisorIdOpen2:false,
//       accountantIdOpen: false,
//       supervisorAprR: [],
//       supervisorDisR: [],
//       supervisorSingleAppR: {},
//       supervisorSingleDisR: {},
//       accountantAprR: [],
//       accountantDisR: [],
//       accountantSingleAppR: {},
//       accountantSingleDisR: {},
//       supervisor1: false,
//       supervisor2: false,
//       accountant1: false,
//       accountant2: false,
//       monthReim: [],
//       singleMonthReim: {},
//       monthReimOpen: false,
//       monthReimOpen1: false,
//       monthHandle: "",
//       yearHandle:""
//     }
//   }
  
//   componentDidMount() {
//     if (localStorage.getItem("adminId") == null) {
//       // window.location.replace("/")
//     }
//   }

//   logout = (e) => {
//     e.preventDefault();
//     localStorage.removeItem("adminId");
//     // window.location.replace("/");
//   }

// // componentDidMount(){
// //     Reimservice.getAdminReimburse().then((response)=>{
// //         console.log(response)
// //         this.setState({accountReimburse : response.data})
// //         console.log(this.state.accountReimburse);
// //     });
// //   }
  
// superApproved = (e) => {
//   e.preventDefault();
//   this.setState({supervisorIdOpen1:true})
// }

// superDisapproved = (e) => {
//   e.preventDefault();
//   this.setState({supervisorIdOpen2:true})
// }
  
// accApproved = (e) => {
//   e.preventDefault();
//   document.getElementById("accview").style.display = "block";
//   document.getElementById("accdisview").style.display = "none";
//   document.getElementById("disview").style.display = "none";
//   document.getElementById("view").style.display = "none";
//   document.getElementById("months").style.display = "none";

//   axios
//   .get(
//     "http://localhost:8081/allAccountantApproved"
//   )
//   .then((res) => {
//     console.log(res.data);
//     this.setState({ accountantAprR: res.data });
//   })
//   .catch((err) => console.log(err));
// }

//   accDisapproved = (e) => {
//     e.preventDefault();
//     document.getElementById("accdisview").style.display = "block";
//     document.getElementById("accview").style.display = "none";
//     document.getElementById("disview").style.display = "none";
//     document.getElementById("view").style.display = "none";
//     document.getElementById("months").style.display = "none";
  
//   axios
//   .get(
//     "http://localhost:8081/allAccountantDisApproved"
//   )
//   .then((res) => {
//     console.log(res.data);
//     this.setState({ accountantDisR: res.data });
//   })
//   .catch((err) => console.log(err));
// }
  
// openMonthsReim = (e) => {
//   e.preventDefault();
//   this.setState({ monthReimOpen1: true });
// }

// showMonthR = (e) => {
//   e.preventDefault();
//   document.getElementById("months").style.display = "block";
//   document.getElementById("accdisview").style.display = "none";
//   document.getElementById("accview").style.display = "none";
//   document.getElementById("disview").style.display = "none";
//   document.getElementById("view").style.display = "none";
//   this.setState({ monthReimOpen1: !this.state.monthReimOpen1 });

//   axios
//   .get(
//     "http://localhost:8081/monthlyReimburse"+"/"+this.state.monthHandle+"/"+this.state.yearHandle
//   )
//   .then((res) => {
//     console.log(res.data);
//     this.setState({ monthReim: res.data });
//   })
//   .catch((err) => console.log(err));
// }  

//   supervisorApr = () => {
//     this.setState({ supervisorIdOpen1: !this.state.supervisorIdOpen1 })
//     document.getElementById("view").style.display = "block";
//     document.getElementById("accdisview").style.display = "none";
//     document.getElementById("accview").style.display = "none";
//     document.getElementById("disview").style.display = "none";
//   document.getElementById("months").style.display = "none";
//   axios
//   .get(
//     "http://localhost:8081/supervisorApproved" +
//     "/" +
//     this.state.supervisorId
//   )
//   .then((res) => {
//     console.log(res.data);
//     this.setState({ supervisorAprR: res.data });
//   })
//   .catch((err) => console.log(err));
// }
  
//   supervisorDis = () => {
//     this.setState({ supervisorIdOpen2: !this.state.supervisorIdOpen2 })
//     document.getElementById("disview").style.display = "block";
//     document.getElementById("accdisview").style.display = "none";
//     document.getElementById("accview").style.display = "none";
//     document.getElementById("view").style.display = "none";
//     document.getElementById("months").style.display = "none";

//   axios
//   .get(
//     "http://localhost:8081/supervisorDisApproved" +
//     "/" +
//     this.state.supervisorId1
//   )
//   .then((res) => {
//     console.log(res.data);
//     this.setState({ supervisorDisR: res.data });
//   })
//   .catch((err) => console.log(err));
// }

// removeApr = () => {
//   document.getElementById("view").style.display = "none";
//   document.getElementById("accview").style.display = "none";
//   document.getElementById("months").style.display = "none";
//   document.getElementById("disview").style.display = "none";
//   document.getElementById("accdisview").style.display = "none";
//   document.getElementById("months").style.display = "none";
// }
  
// approvedBySup = (e, r) => {
//   e.preventDefault();
//   this.setState({ supervisor1: "true" });
//   axios
//       .get(
//         "http://localhost:8081/reimburseById" +
//         "/" +
//         r.reimburceId
//       )
//       .then((res) => {
//         // console.log(res.data);
//         this.setState({ supervisorSingleAppR: res.data });
//       })
//       .catch((err) => console.log(err));
// } 
// disapprovedBySup = (e, r) => {
//   e.preventDefault();
//   this.setState({supervisor2: "true"});
//   axios
//   .get(
//     "http://localhost:8081/reimburseById" +
//     "/" +
//     r.reimburceId
//   )
//   .then((res) => {
//     // console.log(res.data);
//     this.setState({ supervisorSingleDisR: res.data });
//   })
//   .catch((err) => console.log(err));
// }  
// approvedByAcc = (e, r) => {
//   e.preventDefault();
//   this.setState({accountant1: "true"});
//   axios
//   .get(
//     "http://localhost:8081/reimburseById" +
//     "/" +
//     r.reimburceId
//   )
//   .then((res) => {
//     // console.log(res.data);
//     this.setState({ accountantSingleAppR: res.data });
//   })
//   .catch((err) => console.log(err));
// }
// disapprovedByAcc = (e, r) => {
//   e.preventDefault();
//   this.setState({accountant2: "true"});
//   axios
//   .get(
//     "http://localhost:8081/reimburseById" +
//     "/" +
//     r.reimburceId
//   )
//   .then((res) => {
//     this.setState({ accountantSingleDisR: res.data });
//   })
//   .catch((err) => console.log(err));
//   }

// handleMonths = (e, r) => {
//   e.preventDefault();
//   this.setState({monthReimOpen: "true"});
//   axios
//   .get(
//     "http://localhost:8081/reimburseById" +
//     "/" +
//     r.reimburceId
//   )
//   .then((res) => {
//     this.setState({ singleMonthReim: res.data });
//   })
//   .catch((err) => console.log(err));
// }
  

// render()
// {
//     const but = {
//         position:'relative',
//         left:'60%',
//       };

//   return (
//     <div>
//             <div id="home" style={{ width: "1365px", height: "auto"}}>
      
//       {/* <nav className="navbar-dark navbar-expand text-uppercase fixed-top" id="mainNav" style={{display:"flex", backgroundColor:"#59c5ff"}}>
           
//            <a className="navbar-brand text-dark ml-3">View Reimbursement</a>
//             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarmenu">
     
//                <span className="fa fa-bars" style={{ color: "white" }}></span>
//            </button>
   
//            <div className="collapse navbar-collapse" id="navbarmenu">
//                <ul className="navbar-nav ml-auto">
//                    <li className="nav-item"><Link  className="nav-link btn btn-dark mr-2" to="/adminDashboard">Dashboard</Link></li>
//                <li className="nav-item"><button id="logout" className="nav-link btn btn-danger mr-2" onClick={this.logout}>LogOut</button></li>
//                </ul>
//            </div>
//       </nav> */}

//         {/* *************************View options */}
//               {/* <div className="container" style={{display:"flex", flexWrap:"wrap", marginTop:"2%"}}> 
//                   <div
//                       style={{
//                         boxShadow: "4px 5px 8px 9px grey",
//                         backgroundColor: "black",
//                         width: "295px",
//                         margin: "34px"
//                       }}
//                       id="adminRe"
//                     >
//                       <p style={{ fontWeight: "600", backgroundColor: "white", fontSize: "30px" , padding: "9px", color:"grey" }}>Reimbursement</p>
//                       <p style={{ fontWeight: "800", backgroundColor: "white", padding: "9px" }}>Approved by supervisor</p>
//                       <div onClick={(e) => this.superApproved(e)} id="Rbutton" style={{ cursor: "pointer", textAlign: "center", padding: "9px", backgroundColor: "black", border: "none", color: "white" }}>view</div>
//                   </div>
//                   <div
//                       style={{
//                         boxShadow: "0px 0px 10px 10px gray",
//                         backgroundColor: "black",
//                         width: "295px",
//                         margin: "34px"
//                       }}
//                     >
//                       <p style={{ fontWeight: "600", backgroundColor: "white", fontSize: "30px" , padding: "9px", color:"grey" }}>Reimbursement</p>
//                       <p style={{ fontWeight: "800", backgroundColor: "white", padding: "9px" }}>Disapproved by supervisor</p>
//                       <div onClick={(e) => this.superDisapproved(e)} id="Rbutton" style={{ cursor: "pointer", textAlign: "center", padding: "9px", backgroundColor: "black", border: "none", color: "white" }}>view</div>
//                   </div>
//                   <div
//                       style={{
//                         boxShadow: "0px 0px 10px 10px gray",
//                         backgroundColor: "black",
//                         width: "295px",
//                         margin: "34px"
//                       }}
//                     >
//                       <p style={{ fontWeight: "600", backgroundColor: "white", fontSize: "30px" , padding: "9px", color:"grey" }}>Reimbursement</p>
//                       <p style={{ fontWeight: "800", backgroundColor: "white", padding: "9px" }}>Approved by accountant</p>
//                       <div onClick={(e) => this.accApproved(e)} id="Rbutton" style={{ cursor: "pointer", textAlign: "center", padding: "9px", backgroundColor: "black", border: "none", color: "white" }}>view</div>
//                   </div>
//                   <div
//                       style={{
//                         boxShadow: "4px 5px 8px 9px grey",
//                         backgroundColor: "black",
//                         width: "295px",
//                         margin: "34px",
//                       }}
//                       id="adminRe1"
//                     >
//                       <p style={{ fontWeight: "600", backgroundColor: "white", fontSize: "30px" , padding: "9px", color:"grey" }}>Reimbursement</p>
//                       <p style={{ fontWeight: "800", backgroundColor: "white", padding: "9px" }}>Disapproved by accountant</p>
//                       <div onClick={(e) => this.accDisapproved(e)} id="Rbutton" style={{ cursor: "pointer", textAlign: "center", padding: "9px", backgroundColor: "black", border: "none", color: "white" }}>view</div>
//                   </div>
//                   <div
//                       style={{
//                         boxShadow: "4px 5px 8px 9px grey",
//                         backgroundColor: "black",
//                         width: "295px",
//                         margin: "34px",
                       
//                       }}
//                       id="adminRe1"
//                     >
//                       <p style={{ fontWeight: "600", backgroundColor: "white", fontSize: "30px" , padding: "9px", color:"grey" }}>Reimbursement</p>
//                       <p style={{ fontWeight: "800", backgroundColor: "white", padding: "9px" }}>By month</p>
//                       <div onClick={(e) => this.openMonthsReim(e)} id="Rbutton" style={{ cursor: "pointer", textAlign: "center", padding: "9px", backgroundColor: "black", border: "none", color: "white" }}>view</div>
//                   </div>
//         </div> */}


//         <div class="col-lg-12" style={{marginTop:'15%'}}>
//               <div class="card mb-4">
//                 <div class="table-responsive p-3">
// <table id="example" class="table table-striped table-bordered" style={{width:'100%',marginLeft:'10%'}}>
// <thead>
// 					<tr>
// 					<th scope="col"><p style={{ fontWeight: "600", backgroundColor: "white", fontSize: "30px" , padding: "9px", color:"grey" }}>Reimbursement</p></th>
// 					</tr>
// 				</thead>
// 							<tbody>
// 								<tr>
// 								<td><p style={{ fontWeight: "800", padding: "9px" }}>Approved by supervisor</p></td>
// 								<td> <div onClick={(e) => this.superApproved(e)} id="Rbutton" style={{ cursor: "pointer", textAlign: "center", padding: "9px", backgroundColor: "black", border: "none", color: "white" }}>view</div></td>
							
// 								</tr>
// 							</tbody>
//               <tbody>
// 								<tr>
// 								<td><p style={{ fontWeight: "800", padding: "9px" }}>Disapproved by supervisor</p></td>
// 								<td><div onClick={(e) => this.superDisapproved(e)} id="Rbutton" style={{ cursor: "pointer", textAlign: "center", padding: "9px", backgroundColor: "black", border: "none", color: "white" }}>view</div></td>
// 								</tr>
// 							</tbody>
//               <tbody>
// 								<tr>
// 								<td><p style={{ fontWeight: "800", padding: "9px" }}>Approved by accountant</p></td>
// 								<td><div onClick={(e) => this.accApproved(e)} id="Rbutton" style={{ cursor: "pointer", textAlign: "center", padding: "9px", backgroundColor: "black", border: "none", color: "white" }}>view</div></td>
// 								</tr>
// 							</tbody>
//               <tbody>
// 								<tr>
// 								<td><p style={{ fontWeight: "800",  padding: "9px" }}>Disapproved by accountant</p></td>
// 								<td><div onClick={(e) => this.accDisapproved(e)} id="Rbutton" style={{ cursor: "pointer", textAlign: "center", padding: "9px", backgroundColor: "black", border: "none", color: "white" }}>view</div></td>
// 								</tr>
// 							</tbody>
//               <tbody>
// 								<tr>
// 								<td><p style={{ fontWeight: "800", padding: "9px" }}>By month</p></td>
// 								<td><div onClick={(e) => this.openMonthsReim(e)} id="Rbutton" style={{ cursor: "pointer", textAlign: "center", padding: "9px", backgroundColor: "black", border: "none", color: "white" }}>view</div></td>
// 								</tr>
// 							</tbody>
							
// 				</table>			

// 		</div>
// 	</div>
// </div>
        
//   {/* ************************* input form */}

//         <Dialog
//               open={this.state.monthReimOpen1}
//               onClose={() => this.setState({monthReimOpen1: !this.state.monthReimOpen1})}
//               className="dialog text-center"
//             >
//               <DialogTitle>
//                 <div className="">
//                   <h3>Please enter detail:</h3><hr />
//                 </div>
//               </DialogTitle>
//               <DialogContent>
//                   <div
//                     classNamee="cardu"
//                   >
//               <input className="p-1 bg-light" style={{border:"2px solid black"}} value={this.state.monthHandle} onChange={(e) => this.setState({monthHandle: e.target.value})}  placeholder="Enter month (MM)" /><br /><br />
//               <input className="p-1 bg-light" style={{border:"2px solid black"}} value={this.state.yearHandle} onChange={(e) => this.setState({yearHandle: e.target.value})}  placeholder="Enter year (YYYY)" /><br /><br />
//               <button className="btn btn-sm btn-primary" onClick={this.showMonthR}>Submit</button>
//                   </div>
//               </DialogContent>
//         </Dialog> 
//         <Dialog
//               open={this.state.supervisorIdOpen1}
//               onClose={() => this.setState({supervisorIdOpen1: !this.state.supervisorIdOpen1})}
//               className="dialog text-center"
//             >
//               <DialogTitle>
//                 <div className="">
//                   <h3>Please enter detail:</h3><hr />
//                 </div>
//               </DialogTitle>
//               <DialogContent>
//                   <div
//                     classNamee="cardu"
//                   >
//               <input className="p-1 bg-light" style={{border:"2px solid black"}} value={this.state.supervisorId} onChange={(e) => this.setState({supervisorId: e.target.value})}  placeholder="Enter supervisor Id" /><br /><br />
//               <button className="btn btn-sm btn-primary" onClick={this.supervisorApr}>Submit</button>
//                   </div>
//               </DialogContent>
//         </Dialog>
//         <Dialog
//           open={this.state.supervisorIdOpen2}
//               onClose={() => this.setState({supervisorIdOpen2: !this.state.supervisorIdOpen2})}
//               className="dialog text-center"
//             >
//               <DialogTitle>
//                 <div className="">
//                   <h3>Please enter detail:</h3><hr />
//                 </div>
//               </DialogTitle>
//               <DialogContent>
//                   <div
//                     classNamee="cardu"
      
//                   >
//               <input className="p-1 bg-light" style={{border:"2px solid black"}} value={this.state.supervisorId1} onChange={(e) => this.setState({supervisorId1: e.target.value})}  placeholder="Enter supervisor Id" /><br /><br />
//               <button className="btn btn-sm btn-primary" onClick={this.supervisorDis}>Submit</button>
//                   </div>
//               </DialogContent>
//         </Dialog>
        
//         {/* *************************View Reimbursements approved by supervisor */}

//         <div className="card mt-5" id="view" style={{ display: "none", boxShadow: "0px 0px 10px 10px gray" ,  backgroundColor: "#ededed"}}>
//           <div style={{display:"flex", justifyContent:"space-evenly"}}><h2 style={{ marginTop: "1%", color: "grey" }}>Reimbursements approved by supervisor</h2>
//           <Icon><HighlightOffIcon onClick={this.removeApr} style={{fontSize:"50px",cursor:"pointer"}}/></Icon></div><hr />
//           <div style={{ display: "flex", alignItems:"center", justifyContent:"center",  flexWrap: "wrap" }}>
//             {
//               this.state.supervisorAprR.length !=0? (this.state.supervisorAprR.map((r, id) => {
//                 return (
//                   <>
//                     <div
//                       style={{
//                         boxShadow: "0px 0px 10px 10px gray",
//                         backgroundColor: "black",
//                         width: "280px",
//                         margin: "34px",
//                         borderRadius:"50%"
//                       }}
//                     >
//                       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px" }}><p style={{ fontWeight: "800" }}>Reimbursement Id:   </p><p>{r.reimburceId}</p></div>
//                       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px", marginTop: "4px" }}><p style={{ fontWeight: "800" }}>Employee Id:   </p><p>{r.employeeId}</p></div>
//                       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px", marginTop: "4px" }}><p style={{ fontWeight: "800" }}>Supervisor status:   </p><p>{r.supervisorStatus}</p></div>
//                       <div onClick={(e) => this.approvedBySup(e,r)} id="Rbutton" style={{ cursor: "pointer", textAlign: "center", borderRadius: "11%", padding: "9px", backgroundColor: "#ffbe2b", marginTop: "4px", border: "none", color: "black" }}>view details</div>
//                     </div>
//                   </>
//                 )
//               })):(<div style={{ textAlign: "center"}}><h5 style={{textAlign:"center", marginTop: "1%", color: "red" }}>No Reimbursement Found</h5></div>)
//             }
//           </div>
//         </div>
//          {/* *************************View Reimbursements disapproved by supervisor */}

//          <div id="disview" className="card mt-5" style={{ display: "none", boxShadow: "0px 0px 10px 10px gray",  backgroundColor: "#ededed" }}>
//          <div style={{display:"flex", justifyContent:"space-evenly"}}><h2 style={{ marginTop: "1%", color: "grey" }}>Reimbursements disapproved by supervisor</h2>
//          <Icon><HighlightOffIcon onClick={this.removeApr} style={{fontSize:"50px", cursor:"pointer"}}/></Icon></div><hr />
//           <div style={{ display: "flex",alignItems:"center", justifyContent:"center", flexWrap: "wrap" }}>
//             {
//               this.state.supervisorDisR.length!=0? (this.state.supervisorDisR.map((r, id) => {
//                 return (
//                   <>
//                     <div
//                       // className="card2"
//                       style={{
//                         boxShadow: "0px 0px 10px 10px gray",
//                         backgroundColor: "black",
//                         width: "280px",
//                         margin: "34px",
//                         borderRadius:"50%"
//                       }}
//                     >
//                       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px" }}><p style={{ fontWeight: "800" }}>Reimbursement Id:   </p><p>{r.reimburceId}</p></div>
//                       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px", marginTop: "4px" }}><p style={{ fontWeight: "800" }}>Employee Id:   </p><p>{r.employeeId}</p></div>
//                       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px", marginTop: "4px" }}><p style={{ fontWeight: "800" }}>Supervisor status:   </p><p>{r.supervisorStatus}</p></div>
//                       <div onClick={(e) => this.disapprovedBySup(e,r)} id="Rbutton" style={{ cursor: "pointer", textAlign: "center", borderRadius: "11%", padding: "9px", backgroundColor: "#ffbe2b", marginTop: "4px", border: "none", color: "black" }}>view details</div>
//                     </div>
//                   </>
//                 )
//               })):(<div style={{ textAlign: "center"}}><h5 style={{textAlign:"center", marginTop: "1%", color: "red" }}>No Reimbursement Found</h5></div>)
//             }
//           </div>
//         </div>

//   {/* *************************View Reimbursements approved by accountant */}

//           <div className="card mt-5" id="accview" style={{ display: "none", boxShadow: "0px 0px 10px 10px gray" ,  backgroundColor: "#ededed"}}>
//           <div style={{display:"flex", justifyContent:"space-evenly"}}><h2 style={{ marginTop: "1%", color: "grey" }}>Reimbursements approved by accountant</h2>
//           <Icon><HighlightOffIcon onClick={this.removeApr} style={{fontSize:"50px",cursor:"pointer"}}/></Icon></div><hr />
//           <div style={{display: "flex", alignItems:"center", justifyContent:"center", flexWrap: "wrap" }}>
//             {
//               this.state.accountantAprR.length!=0? (this.state.accountantAprR.map((r, id) => {
//                 return (
//                   <>
//                     <div
//                       // className="card2"
//                       style={{
//                         boxShadow: "0px 0px 10px 10px gray",
//                         backgroundColor: "black",
//                         width: "280px",
//                         margin: "34px",
//                         borderRadius:"50%"
//                       }}
//                     >
//                       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px" }}><p style={{ fontWeight: "800" }}>Reimbursement Id:   </p><p>{r.reimburceId}</p></div>
//                       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px", marginTop: "4px" }}><p style={{ fontWeight: "800" }}>Employee Id:   </p><p>{r.employeeId}</p></div>
//                       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px", marginTop: "4px" }}><p style={{ fontWeight: "800" }}>Supervisor status:   </p><p>{r.supervisorStatus}</p></div>
//                       <div onClick={(e) => this.approvedByAcc(e,r)} id="Rbutton" style={{ cursor: "pointer", textAlign: "center", borderRadius: "11%", padding: "9px", backgroundColor: "#ffbe2b", marginTop: "4px", border: "none", color: "black" }}>view details</div>
//                     </div>
//                   </>
//                 )
//               })):(<div style={{ textAlign: "center"}}><h5 style={{textAlign:"center", marginTop: "1%", color: "red" }}>No Reimbursement Found</h5></div>)
//             }
//           </div>
//         </div>

// {/* *************************View Reimbursements disapproved by accountant */}

//          <div id="accdisview" className="card mt-5" style={{ display: "none", boxShadow: "0px 0px 10px 10px gray",  backgroundColor: "#ededed" }}>
//          <div style={{display:"flex", justifyContent:"space-evenly"}}><h2 style={{ marginTop: "1%", color: "grey" }}>Reimbursements disapproved by accountant</h2>
//          <Icon><HighlightOffIcon onClick={this.removeApr} style={{fontSize:"50px", cursor:"pointer"}}/></Icon></div><hr />
//           <div style={{ display: "flex",alignItems:"center", justifyContent:"center", flexWrap: "wrap" }}>
//             {
//               this.state.accountantDisR.length!=0? (this.state.accountantDisR.map((r, id) => {
//                 return (
//                   <>
//                     <div
//                       style={{
//                         boxShadow: "0px 0px 10px 10px gray",
//                         backgroundColor: "black",
//                         width: "280px",
//                         margin: "34px",
//                         borderRadius:"50%"
//                       }}
//                     >
//                       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px" }}><p style={{ fontWeight: "800" }}>Reimbursement Id:   </p><p>{r.reimburceId}</p></div>
//                       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px", marginTop: "4px" }}><p style={{ fontWeight: "800" }}>Employee Id:   </p><p>{r.employeeId}</p></div>
//                       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px", marginTop: "4px" }}><p style={{ fontWeight: "800" }}>Supervisor status:   </p><p>{r.supervisorStatus}</p></div>
//                       <div onClick={(e) => this.disapprovedByAcc(e,r)} id="Rbutton" style={{ cursor: "pointer", textAlign: "center", borderRadius: "11%", padding: "9px", backgroundColor: "#ffbe2b", marginTop: "4px", border: "none", color: "black" }}>view details</div>
//                     </div>
//                   </>
//                 )
//               })) : (<div style={{ textAlign: "center"}}><h5 style={{textAlign:"center", marginTop: "1%", color: "red" }}>No Reimbursement Found</h5></div>)
//             }
//           </div>
//         </div>

//  {/* *************************Reimbursements by months */}

//     <div id="months" className="card mt-2" style={{ display: "none", boxShadow: "0px 0px 10px 10px gray",  backgroundColor: "#ededed" }}>
//         <div style={{display:"flex", justifyContent:"space-evenly"}}><h2 style={{ marginTop: "1%", color: "grey" }}>Reimbursement By Months</h2>
//         <Icon><HighlightOffIcon onClick={this.removeApr} style={{fontSize:"50px", cursor:"pointer"}}/></Icon></div><hr />
//           <div style={{ display: "flex",alignItems:"center", justifyContent:"center", flexWrap: "wrap" }}>
//             {
//               this.state.monthReim.length !=0 ?(this.state.monthReim.map((r, id) => {
//                 return (
//                   r.reimburceId != 0
//                     ? (<>
//                       <div
//                         style={{
//                           boxShadow: "0px 0px 10px 10px gray",
//                           backgroundColor: "black",
//                           width: "280px",
//                           margin: "34px",
//                           borderRadius:"50%"
//                         }}
//                       >
//                         <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px" }}><p style={{ fontWeight: "800" }}>Reimbursement Id:   </p><p>{r.reimburceId}</p></div>
//                         <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px", marginTop: "4px" }}><p style={{ fontWeight: "800" }}>Employee Id:   </p><p>{r.employeeId}</p></div>
//                         <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", borderRadius: "11%", padding: "9px", marginTop: "4px" }}><p style={{ fontWeight: "800" }}>Supervisor status:   </p><p>{r.supervisorStatus}</p></div>
//                         <div onClick={(e) => this.handleMonths(e, r)} id="Rbutton" style={{ cursor: "pointer", textAlign: "center", borderRadius: "11%", padding: "9px", backgroundColor: "#ffbe2b", marginTop: "4px", border: "none", color: "black" }}>view details</div>
//                       </div>
//                     </>)
//                     : (<div
//                       style={{
//                         boxShadow: "0px 0px 10px 10px gray",
//                         backgroundColor: "black",
//                         width: "280px",
//                         margin: "34px"
//                       }}
//                     >
//                       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "tomato",color:"white", padding: "9px" }}><p style={{ fontWeight: "800" }}>Total expenses--</p></div>
//                       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", padding: "9px" }}><p style={{ fontWeight: "800" }}>Total food expenses:   </p><p>{r.totalFoodExpenses}</p></div>
//                       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", padding: "9px", marginTop: "4px" }}><p style={{ fontWeight: "800" }}>Total travel expenses:   </p><p>{r.totalTravelExpenses}</p></div>
//                       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", padding: "9px", marginTop: "4px" }}><p style={{ fontWeight: "800" }}>Total other expenses:   </p><p>{r.totalOtherExpenses}</p></div>
//                     </div>)
                  
//                 )
//               })):(<div style={{ textAlign: "center"}}><h5 style={{textAlign:"center", marginTop: "1%", color: "red" }}>No Reimbursement Found</h5></div>)
//             }
//           </div>
//       </div>

// {/* *************************View Single Reimbursement */}

//             <Dialog
//               open={this.state.supervisor1}
//               onClose={() => this.setState({supervisor1: !this.state.supervisor1})}
//               className="dialog"
//             >
//               <DialogTitle>
//                 <div className="">
//                   <h3>Reimbursement</h3><hr />
//                 </div>
//               </DialogTitle>
//               <DialogContent>
//                   <div
//                     classNamee="cardu mb-3 mt-3"
//                     id="view"
//                     style={{
//                       boxShadow: "3px 4px 8px 9px gray",
//                       backgroundColor: "white",
//                       width: "550px",
//                     }}
//                   >
//                     <div
//                       className="card-body"
//                       style={{ borderBottom: "9px solid gray" }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Reimburse_Id{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleAppR.reimburceId}</p>
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Employee Id{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleAppR.employeeId}</p>
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Supervisor Id{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleAppR.supervisorId}</p>
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Other Expense{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleAppR.otherExpenss}</p>
//                         </div>
//                         <div>
//                           {" "}
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Food Expense{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleAppR.foodExpense}</p>
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Travel Expense{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleAppR.travelExpense}</p>
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Food Bill
//                                 </p>
//                           <img
//                             width="150"
//                             height="150"
//                             className="img-fluid"
//                             src={`data:image/png;base64, ${this.state.supervisorSingleAppR.foodBill}`}
//                           />
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Other Bill{" "}
//                           </p>
//                           <img
//                             width="150"
//                             height="150"
//                             className="img-fluid"
//                             src={`data:image/png;base64, ${this.state.supervisorSingleAppR.otherBill}`}
//                           />
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Travel Bill{" "}
//                           </p>
//                           <img
//                             width="150"
//                             height="150"
//                             className="img-fluid"
//                             src={`data:image/png;base64, ${this.state.supervisorSingleAppR.travelBill}`}
//                           />
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Supervisor status{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleAppR.supervisorStatus}</p>
//                         </div>
//                         <div style={{ marginLeft: "64px" }}>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Accountant status{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleAppR.accontantStatus}</p>
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Created Date{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleAppR.createdDate}</p>
//                         </div>
//                         <div style={{ marginLeft: "95px" }}>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Date of Reimburse{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleAppR.dateOfReimburse}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//               </DialogContent>
//         </Dialog>
//         <Dialog
//               open={this.state.supervisor2}
//               onClose={() => this.setState({supervisor2: !this.state.supervisor2})}
//               className="dialog"
//             >
//               <DialogTitle>
//                 <div className="">
//                   <h3>Reimbursement</h3><hr />
//                 </div>
//               </DialogTitle>
//               <DialogContent>
//                   <div
//                     classNamee="cardu mb-3 mt-3"
//                     id="view"
//                     style={{
//                       boxShadow: "3px 4px 8px 9px gray",
//                       backgroundColor: "white",
//                       width: "550px",
//                     }}
//                   >
//                     <div
//                       className="card-body"
//                       style={{ borderBottom: "9px solid gray" }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Reimburse_Id{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleDisR.reimburceId}</p>
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Employee Id{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleDisR.employeeId}</p>
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Supervisor Id{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleDisR.supervisorId}</p>
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Other Expense{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleDisR.otherExpenss}</p>
//                         </div>
//                         <div>
//                           {" "}
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Food Expense{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleDisR.foodExpense}</p>
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Travel Expense{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleDisR.travelExpense}</p>
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Food Bill
//                                 </p>
//                           <img
//                             width="150"
//                             height="150"
//                             className="img-fluid"
//                             src={`data:image/png;base64, ${this.state.supervisorSingleDisR.foodBill}`}
//                           />
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Other Bill{" "}
//                           </p>
//                           <img
//                             width="150"
//                             height="150"
//                             className="img-fluid"
//                             src={`data:image/png;base64, ${this.state.supervisorSingleDisR.otherBill}`}
//                           />
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Travel Bill{" "}
//                           </p>
//                           <img
//                             width="150"
//                             height="150"
//                             className="img-fluid"
//                             src={`data:image/png;base64, ${this.state.supervisorSingleDisR.travelBill}`}
//                           />
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Supervisor status{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleDisR.supervisorStatus}</p>
//                         </div>
//                         <div style={{ marginLeft: "64px" }}>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Accountant status{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleDisR.accontantStatus}</p>
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Created Date{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleDisR.createdDate}</p>
//                         </div>
//                         <div style={{ marginLeft: "95px" }}>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Date of Reimburse{" "}
//                           </p>
//                           <p>{this.state.supervisorSingleDisR.dateOfReimburse}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//               </DialogContent>
//           </Dialog>
//           <Dialog
//               open={this.state.accountant1}
//               onClose={() => this.setState({accountant1: !this.state.accountant1})}
//               className="dialog"
//             >
//               <DialogTitle>
//                 <div className="">
//                   <h3>Reimbursement</h3><hr />
//                 </div>
//               </DialogTitle>
//               <DialogContent>
//                   <div
//                     classNamee="cardu mb-3 mt-3"
//                     id="view"
//                     style={{
//                       boxShadow: "3px 4px 8px 9px gray",
//                       backgroundColor: "white",
//                       width: "550px",
//                     }}
//                   >
//                     <div
//                       className="card-body"
//                       style={{ borderBottom: "9px solid gray" }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Reimburse_Id{" "}
//                           </p>
//                           <p>{this.state.accountantSingleAppR.reimburceId}</p>
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Employee Id{" "}
//                           </p>
//                           <p>{this.state.accountantSingleAppR.employeeId}</p>
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Supervisor Id{" "}
//                           </p>
//                           <p>{this.state.accountantSingleAppR.supervisorId}</p>
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Other Expense{" "}
//                           </p>
//                           <p>{this.state.accountantSingleAppR.otherExpenss}</p>
//                         </div>
//                         <div>
//                           {" "}
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Food Expense{" "}
//                           </p>
//                           <p>{this.state.accountantSingleAppR.foodExpense}</p>
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Travel Expense{" "}
//                           </p>
//                           <p>{this.state.accountantSingleAppR.travelExpense}</p>
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Food Bill
//                                 </p>
//                           <img
//                             width="150"
//                             height="150"
//                             className="img-fluid"
//                             src={`data:image/png;base64, ${this.state.accountantSingleAppR.foodBill}`}
//                           />
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Other Bill{" "}
//                           </p>
//                           <img
//                             width="150"
//                             height="150"
//                             className="img-fluid"
//                             src={`data:image/png;base64, ${this.state.accountantSingleAppR.otherBill}`}
//                           />
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Travel Bill{" "}
//                           </p>
//                           <img
//                             width="150"
//                             height="150"
//                             className="img-fluid"
//                             src={`data:image/png;base64, ${this.state.accountantSingleAppR.travelBill}`}
//                           />
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Supervisor status{" "}
//                           </p>
//                           <p>{this.state.accountantSingleAppR.supervisorStatus}</p>
//                         </div>
//                         <div style={{ marginLeft: "64px" }}>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Accountant status{" "}
//                           </p>
//                           <p>{this.state.accountantSingleAppR.accontantStatus}</p>
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Created Date{" "}
//                           </p>
//                           <p>{this.state.accountantSingleAppR.createdDate}</p>
//                         </div>
//                         <div style={{ marginLeft: "95px" }}>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Date of Reimburse{" "}
//                           </p>
//                           <p>{this.state.accountantSingleAppR.dateOfReimburse}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//               </DialogContent>
//         </Dialog>
//         <Dialog
//               open={this.state.accountant2}
//               onClose={() => this.setState({accountant2: !this.state.accountant2})}
//               className="dialog"
//             >
//               <DialogTitle>
//                 <div className="">
//                   <h3>Reimbursement</h3><hr />
//                 </div>
//               </DialogTitle>
//               <DialogContent>
//                   <div
//                     classNamee="cardu mb-3 mt-3"
//                     id="view"
//                     style={{
//                       boxShadow: "3px 4px 8px 9px gray",
//                       backgroundColor: "white",
//                       width: "550px",
//                     }}
//                   >
//                     <div
//                       className="card-body"
//                       style={{ borderBottom: "9px solid gray" }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Reimburse_Id{" "}
//                           </p>
//                           <p>{this.state.accountantSingleDisR.reimburceId}</p>
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Employee Id{" "}
//                           </p>
//                           <p>{this.state.accountantSingleDisR.employeeId}</p>
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Supervisor Id{" "}
//                           </p>
//                           <p>{this.state.accountantSingleDisR.supervisorId}</p>
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Other Expense{" "}
//                           </p>
//                           <p>{this.state.accountantSingleDisR.otherExpenss}</p>
//                         </div>
//                         <div>
//                           {" "}
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Food Expense{" "}
//                           </p>
//                           <p>{this.state.accountantSingleDisR.foodExpense}</p>
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Travel Expense{" "}
//                           </p>
//                           <p>{this.state.accountantSingleDisR.travelExpense}</p>
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Food Bill
//                                 </p>
//                           <img
//                             width="150"
//                             height="150"
//                             className="img-fluid"
//                             src={`data:image/png;base64, ${this.state.accountantSingleDisR.foodBill}`}
//                           />
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Other Bill{" "}
//                           </p>
//                           <img
//                             width="150"
//                             height="150"
//                             className="img-fluid"
//                             src={`data:image/png;base64, ${this.state.accountantSingleDisR.otherBill}`}
//                           />
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Travel Bill{" "}
//                           </p>
//                           <img
//                             width="150"
//                             height="150"
//                             className="img-fluid"
//                             src={`data:image/png;base64, ${this.state.accountantSingleDisR.travelBill}`}
//                           />
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Supervisor status{" "}
//                           </p>
//                           <p>{this.state.accountantSingleDisR.supervisorStatus}</p>
//                         </div>
//                         <div style={{ marginLeft: "64px" }}>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Accountant status{" "}
//                           </p>
//                           <p>{this.state.accountantSingleDisR.accontantStatus}</p>
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Created Date{" "}
//                           </p>
//                           <p>{this.state.accountantSingleDisR.createdDate}</p>
//                         </div>
//                         <div style={{ marginLeft: "95px" }}>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Date of Reimburse{" "}
//                           </p>
//                           <p>{this.state.accountantSingleDisR.dateOfReimburse}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//               </DialogContent>
//         </Dialog>
//         <Dialog
//               open={this.state.monthReimOpen}
//               onClose={() => this.setState({monthReimOpen: !this.state.monthReimOpen})}
//               className="dialog"
//             >
//               <DialogTitle>
//                 <div className="">
//                   <h3>Reimbursement</h3><hr />
//                 </div>
//               </DialogTitle>
//               <DialogContent>
//                   <div
//                     classNamee="cardu mb-3 mt-3"
//                     id="view"
//                     style={{
//                       boxShadow: "3px 4px 8px 9px gray",
//                       backgroundColor: "white",
//                       width: "550px",
//                     }}
//                   >
//                     <div
//                       className="card-body"
//                       style={{ borderBottom: "9px solid gray" }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Reimburse_Id{" "}
//                           </p>
//                           <p>{this.state.singleMonthReim.reimburceId}</p>
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Employee Id{" "}
//                           </p>
//                           <p>{this.state.singleMonthReim.employeeId}</p>
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Supervisor Id{" "}
//                           </p>
//                           <p>{this.state.singleMonthReim.supervisorId}</p>
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Other Expense{" "}
//                           </p>
//                           <p>{this.state.singleMonthReim.otherExpenss}</p>
//                         </div>
//                         <div>
//                           {" "}
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Food Expense{" "}
//                           </p>
//                           <p>{this.state.singleMonthReim.foodExpense}</p>
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Travel Expense{" "}
//                           </p>
//                           <p>{this.state.singleMonthReim.travelExpense}</p>
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Food Bill
//                                 </p>
//                           <img
//                             width="150"
//                             height="150"
//                             className="img-fluid"
//                             src={`data:image/png;base64, ${this.state.singleMonthReim.foodBill}`}
//                           />
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Other Bill{" "}
//                           </p>
//                           <img
//                             width="150"
//                             height="150"
//                             className="img-fluid"
//                             src={`data:image/png;base64, ${this.state.singleMonthReim.otherBill}`}
//                           />
//                         </div>
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Travel Bill{" "}
//                           </p>
//                           <img
//                             width="150"
//                             height="150"
//                             className="img-fluid"
//                             src={`data:image/png;base64, ${this.state.singleMonthReim.travelBill}`}
//                           />
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Supervisor status{" "}
//                           </p>
//                           <p>{this.state.singleMonthReim.supervisorStatus}</p>
//                         </div>
//                         <div style={{ marginLeft: "64px" }}>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Accountant status{" "}
//                           </p>
//                           <p>{this.state.singleMonthReim.accontantStatus}</p>
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           padding: "6px",
//                           border: "1px solid lightgrey",
//                         }}
//                       >
//                         <div>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Created Date{" "}
//                           </p>
//                           <p>{this.state.singleMonthReim.createdDate}</p>
//                         </div>
//                         <div style={{ marginLeft: "95px" }}>
//                           <p style={{ fontWeight: "800" }} scope="col">
//                             Date of Reimburse{" "}
//                           </p>
//                           <p>{this.state.singleMonthReim.dateOfReimburse}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//               </DialogContent>
//         </Dialog>  
//         </div>
//       </div>
//     );
// }
// }
// export default PaySalary;