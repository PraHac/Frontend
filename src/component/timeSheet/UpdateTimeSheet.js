import React, { Component } from 'react'
import TimeSheetService from '../../services/TimeSheetService'

import Card from 'react-bootstrap/Card'
import './TimeSheet.css';
import Flip from 'react-reveal/Flip';

export default class UpdateTimeSheet extends Component {
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
        this.updateTS=this.updateTS.bind(this)
        this.HomePage=this.HomePage.bind(this)
       
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }
    updateTS(event){
        event.preventDefault()
        const TS={
            timeSheetId:this.state.timeSheetId,
            task:this.state.task,
            projectName:this.state.projectName,
        }
       TimeSheetService.updateTimeSheet(TS)
        .then(
            response=>{
                console.log(response.data)
                if(localStorage.getItem("supervisorId") == null)
                    this.props.history.push("/acctimeSheet")
                else
                    this.props.history.push("/supertimeSheet")
            }
        )
    }
    HomePage() {
        if(localStorage.getItem("supervisorId") == null)
            this.props.history.push("/acctimeSheet")
        else
            this.props.history.push("/supertimeSheet")
            
    }
    render() {
        return (
            <div>
             <Flip top>
              <div className="container">
                <Card>
                <Card.Header><h3>Update time sheet</h3></Card.Header>

                <Card.Body>  
                <form onSubmit={this.updateTS}>
                <p>  Enter the Time Sheet id</p>
                 <input type="text" name="timeSheetId" onChange={this.myChangeHandler}/>
                 <br/>
                 <p> Enter the Project Name</p>
                 <input type="text" name="projectName" onChange={this.myChangeHandler}/>
                 <br/>
                 <p>  Enter the Task </p>
                 <input type="text" name="task" onChange={this.myChangeHandler}/>
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
