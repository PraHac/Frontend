// This is created by Aditya
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import view from './view.png'
import attendance from './attendance.jpg'
import department from './department.png'
import Manage from './Manage.png'
import './admindashByAdy.css'
import Card from 'react-bootstrap/Card'


export default class AdminSidebarContent extends Component {
   
    render() {
        return (
        <div style={{ height: "100vh" }}>
        <div>
            <br/>
        </div>
                <Card className="text-center" style={{marginTop:'10%'}}>    
                <Card.Body>
                <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Manage</h2>
                <div className="cont" style={{ backgroundColor: "white" }}>
                        <div className="row justify-content-center">
                        
                            <div className="col-md-5 col-lg-3 mb-5">
                                <div className="portfolio-item mx-auto">
                                <Link to="/attendance">  <img className="w-50" src={attendance}/></Link>
                                <h2 className="mt-2">View Attendance</h2>
                                </div>
                            </div>

                            <div className="col-md-5 col-lg-3 mb-5">
                                <div className="portfolio-item mx-auto">
                                <Link to="/viewRe"><img className="w-50" style={{marginTop:"0px"}} src={Manage} /></Link>
                                <h2 className="mt-2">View Reimbursement</h2>
                                </div>
                            </div>
                            <div className="col-md-5 col-lg-3 mb-5">
                                <div className="portfolio-item mx-auto">
                                <Link to="/empDisplay"> <img className="w-50" style={{marginTop:"30px"}} src={view} alt="" /></Link>
                                <h2 className="mt-2">Employee</h2>
                                </div>
                            </div>
                            <div className="col-md-5 col-lg-3 mb-5">
                                <div className="portfolio-item mx-auto">
                                <Link to="/dptManage"> <img className="w-50" style={{ height: "150px" }} src={department} alt="" /></Link>
                                <h2 className="mt-2">Department</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            </div>
        )
    }
}
