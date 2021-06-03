import React, { Component } from 'react'
import TimeSheetService from '../../services/TimeSheetService'
import Card from 'react-bootstrap/Card'
import './TimeSheet.css';
import Flip from 'react-reveal/Flip';

export default class UpdateAccountantStatus extends Component {
    constructor(props){
    super(props)
    this.state={
        timeSheetId:0,
         employeeId:0,
        // employeeName:"",
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
        timeSheet:[],
        particularTimeSheetId:[],
    }
    this.updateAccountantStatus=this.updateAccountantStatus.bind(this)
    this.HomePage=this.HomePage.bind(this)

}
myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
updateAccountantStatus(event){
    event.preventDefault()
    console.log("herei am")
    const accountantStatus={
        timeSheetId:this.state.timeSheetId,
        accountantApproved:this.state.accountantApproved,
     
    }
    TimeSheetService.updateTimeaccountantStatus(accountantStatus)
    .then(
        response=>{
        console.log(response)
        this.props.history.push("/acctimeSheet")
        }
    )
}
HomePage(){
    this.props.history.push("/acctimeSheet")
}
    render() {
        return (
            <div>
            <Flip top>
             <div className="container">
                <Card>
                <Card.Header><h3>Update status of the Accountant</h3></Card.Header>

                <Card.Body>  
                <form onSubmit={this.updateAccountantStatus}>
                 <p>Enter the Time Sheet id</p>
                 <input type="text" name="timeSheetId" onChange={this.myChangeHandler}/>
                 <br/>
                 <p>   Enter the Accountant status</p>
                 <input type="text" name="accountantApproved" onChange={this.myChangeHandler}/>
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
