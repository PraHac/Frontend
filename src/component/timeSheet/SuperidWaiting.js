import React, { Component } from 'react'
import TimeSheetService from '../../services/TimeSheetService'

import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import './TimeSheet.css';
import Moment from 'react-moment'
import LightSpeed from 'react-reveal/LightSpeed';

export default class SuperidWaiting extends Component {
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
            // date:moment(new Date().format("YYYY/MM/DD")),
            day:"",
            task:"",
            projectName:"",
            logHours:0,
       //     particularTimeSheetId:[],
        }
        this.superidWaiting=this.superidWaiting.bind(this)
        this.HomePage=this.HomePage.bind(this)

    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }
      superidWaiting(event){
        event.preventDefault()
        console.log("this is supervisor id "+this.state.supervisor_id)
        TimeSheetService.superWaiting(this.state.supervisor_id)
        .then(
            response=>{
                console.log(response)
                this.setState({timeSheet:response.data})  
            }
        )
    }
    HomePage(){
        if(localStorage.getItem("supervisorId") == null)
            this.props.history.push("/admintimeSheet")
        else
        this.props.history.push("/supertimeSheet")
    }
    render() {
        return (
            <div>
                     {/* <table className="table"> */}
                     <LightSpeed right>
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
                </Table>
                </LightSpeed>

                <LightSpeed left>
                <div className="container">
                <Card>
                <Card.Header><h3> Enter the Supervisor id</h3></Card.Header>

                <Card.Body>  
                <form onSubmit={this.superidWaiting}>
                 <input type="text" name="supervisor_id" onChange={this.myChangeHandler}/>
                 <br/>
                 <input class="btn btn-info" type="submit" value="Submit"/>
                </form>
                </Card.Body>
                </Card>
               
             <button className="btn btn-warning" onClick={this.HomePage}>Go to Time Sheet Page or Home Page</button>
             </div>
             </LightSpeed>
            </div>
        )
    }
}
