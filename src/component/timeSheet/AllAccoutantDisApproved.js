import React, { Component } from 'react'
import TimeSheetService from '../../services/TimeSheetService'

import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import './TimeSheet.css';
import Moment from 'react-moment'
import Jello from 'react-reveal/Jello';

export default class AllAccoutantDisApproved extends Component {
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
   
        this.allAccountantdisApproved=this.allAccountantdisApproved.bind(this)
        this.HomePage=this.HomePage.bind(this)
      
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }
      allAccountantdisApproved(event){
        event.preventDefault()
        console.log("this is working")
        TimeSheetService.allaccountantDisApproved()
        .then(
            response=>{
                console.log(response)
                this.setState({timeSheet:response.data})
            }
        )
      }
      HomePage(){
        if(localStorage.getItem("accountantId") == null)
        this.props.history.push("/admintimeSheet")
    else
    this.props.history.push("/acctimeSheet")
    }
    render() {
        return (
            <div>
             {/* <table className="table"> */}
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
                <Jello>
                <div className="container">
                <Card>
                <Card.Header><h3>Accoutant Disapproved</h3></Card.Header>

                <Card.Body>  
                <form onSubmit={this.allAccountantdisApproved}>
        
                 <input class="btn btn-info" type="submit" value="Submit"/>
                </form>
                </Card.Body>
                </Card>
                <button className="btn btn-warning" onClick={this.HomePage}>Go to Time Sheet Page or Home Page</button>
             </div>
             </Jello>

            </div>
        )
    }
}
