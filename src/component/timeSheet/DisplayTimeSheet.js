import React, { Component } from 'react'
import TimeSheetService from '../../services/TimeSheetService'

import Moment from 'react-moment'
import Roll from 'react-reveal/Roll';
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import './TimeSheet.css';


export default class DisplayTimeSheet extends Component {
    constructor(props){
        super(props)
        this.state={
            timeSheet:[],
           timeSheetId:0,
            employeeId:0,
            employeeName:"",
            // logHoursOfTask1:0,
            // logHoursOfTask2:0,
            // logHoursOfTask3:0,
            // logHoursOfTask4:0,
           supervisor_id:0,
           supervisorApproved:"",
            accountantApproved:"",
             date:0,
            day:"",
            task:"",
            projectName:"",
            logHours:0,
       //     particularTimeSheetId:[],
        }
        this.displayIdTimeSheet=this.displayIdTimeSheet.bind(this)
        this.HomePage=this.HomePage.bind(this)
    
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }
      HomePage(){
        if(localStorage.getItem("supervisorId") == null && localStorage.getItem("adminId") == null)
        this.props.history.push("/acctimeSheet")
        else if (localStorage.getItem("adminId") != null) {
        this.props.history.push("/admintimeSheet")
    }else
        this.props.history.push("/supertimeSheet")
    }
  

      displayIdTimeSheet(event){
        event.preventDefault()
        console.log("hello")
        TimeSheetService.getTimeSheetById(this.state.timeSheetId)
        .then(
            response=>{
                console.log(response);
                this.setState({timeSheet:response.data})  
            }
        )
    }
    render() {
        return (
            <div>
            

            {/* <table className="table"> */}
            <Roll right>

            < Table striped bordered hover size="sm">
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
                            {/* {this.state.timeSheet.map(
                            t=>
                                <tr>
                                    <td>{t.accountantApproved}</td>
                                    <td>{t.supervisorApproved}</td> 
                                    <td>{t.supervisor_id}</td>
                                    <td>{t.employeeId}</td>  
                                    <td>{t.employeeName}</td>
                                    <td>{t.timeSheetId}</td>
                                    <td>{t.date}</td>
                                    <td>{t.day}</td>
                                    <td>{t.task}</td>
                                    <td>{t.projectName}</td>
                                    <td>{t.logHours}</td>
                                </tr>
                            )
                            } */}
                               <tr>
                                    <td>{this.state.timeSheet.accountantApproved}</td>
                                    <td>{this.state.timeSheet.supervisorApproved}</td> 
                                    <td>{this.state.timeSheet.supervisor_id}</td>
                                    <td>{this.state.timeSheet.employeeId}</td>  
                                    <td>{this.state.timeSheet.employeeName}</td>
                                    <td>{this.state.timeSheet.timeSheetId}</td>
                                    <td><Moment format="YYYY/MM/DD">
                                    {this.state.timeSheet.date}         
                                    </Moment></td>
                                    <td>{this.state.timeSheet.day}</td>
                                    <td>{this.state.timeSheet.task}</td>
                                    <td>{this.state.timeSheet.projectName}</td>
                                    <td>{this.state.timeSheet.logHours}</td>
                                </tr>
                    </tbody>
                {/* </table> */}
                </Table>
                </Roll>

           
             <Roll left>
                <div className="container">
                <Card>
                <Card.Header><h3> Enter the TimeSheet id</h3></Card.Header>

                <Card.Body>  
                <form onSubmit={this.displayIdTimeSheet}>
                <input type="text" name="timeSheetId" onChange={this.myChangeHandler}/>
                <br/>
                 <input class="btn btn-info" type="submit" value="Submit"/>
                </form>
                </Card.Body>
                </Card>
               
             <button className="btn btn-warning" onClick={this.HomePage}>Go to Time Sheet Page or Home Page</button>
             </div>
            </Roll>                
            </div>
        )
    }
}
