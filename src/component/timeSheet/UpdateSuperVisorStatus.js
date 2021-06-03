import React, { Component } from 'react'
import TimeSheetService from '../../services/TimeSheetService'

import Card from 'react-bootstrap/Card'
import './TimeSheet.css';
import Flip from 'react-reveal/Flip';

export default class UpdateSuperVisorStatus extends Component {
    constructor(props){
        super(props)
        this.state={
            timeSheetId:0,
             employeeId:0,
          
            supervisor_id:0,
            supervisorApproved:"",
             accountantApproved:"",
             day:"",
             task:"",
             projectName:"",
            timeSheet:[],
            particularTimeSheetId:[],
        }
       
        this.updateSupervisorStatus=this.updateSupervisorStatus.bind(this)
        this.HomePage=this.HomePage.bind(this)
     
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }
    updateSupervisorStatus(event){
        event.preventDefault()
        const superStatus={
          supervisorApproved:this.state.supervisorApproved,
          timeSheetId:this.state.timeSheetId
        }
        TimeSheetService.updateTimeSupervisorStatus(superStatus)
        .then(
            response=>{
                console.log(response)
                this.props.history.push("/supertimeSheet")
                }
        )
    }
    HomePage(){
        this.props.history.push("/supertimeSheet")
    }
    render() {
        return (
            <div>
            <Flip top>
             <div className="container">
                <Card>
                <Card.Header><h3>Update status of the Super Visor</h3></Card.Header>

                <Card.Body>  
                <form onSubmit={this.updateSupervisorStatus}>
                <p>Enter the Time Sheet id</p>
                 <input type="text" name="timeSheetId" onChange={this.myChangeHandler}/>
                 <br/>
                 <p>Enter the Supervisor status</p>
                 <input type="text" name="supervisorApproved" onChange={this.myChangeHandler}/>
                 <br/>
                 <input class="btn btn-info" type="submit" value="Submit"/>
                </form>
                </Card.Body>
                </Card>
               
             <button className="btn btn-warning" onClick={this.HomePage}>Go to Time Sheet Page or Home Page</button>
             </div>
            </Flip>
            </div>
        )
    }
}
