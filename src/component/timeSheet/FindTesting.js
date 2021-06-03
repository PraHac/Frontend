import React, { Component } from 'react'
import TimeSheetService from '../../services/TimeSheetService'

import Moment from 'react-moment'
import Table from 'react-bootstrap/Table'
import RubberBand from 'react-reveal/RubberBand';
export default class FindTesting extends Component {
    constructor(props){
        super(props)
        this.state={
            timeSheet:[],

            timeSheetId:0,
             employeeId:0,
             employeeName:"",
           
            supervisor_id:0,
            supervisorApproved:"",
             accountantApproved:"",
  
             day:"",
             task:"",
             projectName:"",
             logHours:0,
        }
      
        this.findByTesting=this.findByTesting.bind(this)
        this.HomePage=this.HomePage.bind(this)
    
    }
    findByTesting(){
        TimeSheetService.findTesting()
        .then(
            response=>{console.log(response)
            this.setState({timeSheet:response.data})
            }
        )
    }
    HomePage(){
        this.props.history.push("/timeSheet")
    }
    componentDidMount(){
        this.findByTesting()
    }
    render() {
        return (
            <div>
            <div className="cont"> 
            <RubberBand>
            <Table striped bordered hover size="sm">
   
              {/* <table className="table"> */}
                    <thead>
                        <tr>
                            <th>Accountant Approved</th>
                            <th>Supervisor Approved</th>
                            <th>Supervisor Id</th>
                            <th>Employee Id</th>
                            <th>Employee Name</th>
                            <th>TimeSheet Id</th>
                            <th>Date</th>
                            <th>Day</th> 
                            <th>Task</th>
                            <th>Project Name</th>
                            <th>Log Hours</th> 
                        </tr>
                    </thead>
                    <tbody>
                            {this.state.timeSheet.map(
                            t=>
                                <tr>
                                    <td>{t.accountantApproved}</td>
                                    <td>{t.supervisorApproved}</td> 
                                    <td>{t.supervisor_id}</td>
                                    <td>{t.employeeId}</td>  
                                    <td>{t.employeeName}</td>
                                    <td>{t.timeSheetId}</td>
                                    <td><Moment format="YYYY/MM/DD">
                                     {t.date}            
                                    </Moment></td>
                                    <td>{t.day}</td>
                                    <td>{t.task}</td>
                                    <td>{t.projectName}</td>
                                    <td>{t.logHours}</td>
                                </tr>
                            )
                            }
                    </tbody>
                {/* </table> */}
                </ Table>
                </RubberBand>
                </div>
                <div className="container">
                <button className="btn btn-warning" onClick={this.HomePage}>Go to Time Sheet Page or Home Page</button> 
                </div>
            </div>
        )
    }
}
