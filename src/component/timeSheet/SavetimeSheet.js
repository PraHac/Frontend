import React, { Component } from 'react'
import TimeSheetService from '../../services/TimeSheetService'
import Card from 'react-bootstrap/Card'
import './TimeSheet.css';
import Slide from 'react-reveal/Slide';

export default class SavetimeSheet extends Component {
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
        this.savetimeSheet=this.savetimeSheet.bind(this)
        this.HomePage=this.HomePage.bind(this)

    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }
      savetimeSheet(event){
        event.preventDefault()
        const save={
            employeeId:this.state.employeeId,
            logHours:this.state.logHours,
            task:this.state.task,
            supervisor_id:this.state.supervisor_id,
            projectName:this.state.projectName,

        }
        TimeSheetService.saveTimeSheet(save)
        .then(
            response=>{
                console.log(response)
                this.setState({timeSheet:response.data})
                this.props.history.push("/timeSheet")
                      

            }
        )

    }
    HomePage(){
        this.props.history.push("/timeSheet")
    }
    render() {
        return (
            <div>
             <Slide top>
             <div className="container">
                <Card>
                <Card.Header><h3>Enter the Details</h3></Card.Header>

                <Card.Body>  
                <form onSubmit={this.savetimeSheet}>
                <p>Enter the Employee Id</p>
                 <input type="text" name="employeeId" onChange={this.myChangeHandler}/>
                 <br/>
                 <p>Enter the Log Hours</p>
                 <input type="text" name="logHours" onChange={this.myChangeHandler}/>
                 <br/>
                 <p> Enter the Supervisor Id </p>
                 <input type="text" name="supervisor_id" onChange={this.myChangeHandler}/>
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
             </Slide>
            </div>
        )
    }
}
