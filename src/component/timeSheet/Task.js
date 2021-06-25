import React, { Component } from "react";
import TimeSheetService from "../../services/TimeSheetService";
import Moment from "react-moment";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { AppstoreOutlined } from "@ant-design/icons";
import Table from "react-bootstrap/Table";
import RubberBand from "react-reveal/RubberBand";
import { Button } from "antd";
import axios from 'axios'
import M from "materialize-css";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import logo from '../logo1.png'
import { notification } from 'antd';
import { MDBDataTable } from 'mdbreact';
import { LaptopWindows } from "@material-ui/icons";
import { data } from "jquery";
export default class AccTimeSheet extends Component {
    constructor(props) {
        super(props);

        this.reset = this.reset.bind(this);
        this.update = this.update.bind(this)
        this.saveOrupdateTask = this.saveOrupdateTask.bind(this)
        

        this.state = {
            task: "",
             update: { projectName: "",taskName:"",taskDetails:"" },
            projectName: "",
            rows: [],
            projectId: null,
            projectName: "",
            taskName: "",
            taskId: null,
            taskDetails: [],
            listOfProject: [],
            taskDesc: "",
            columns: [
                {
                    label: 'Sr. No',
                    field: 'sn',
                    sort: 'asc',
                    width: 27
                },

                {
                    label: 'Task Name',
                    field: 'taskName',
                    sort: 'asc',
                    width: 27
                },

                {
                    label: 'Task Details',
                    field: 'taskDetails',
                    sort: 'asc',
                    width: 27

                },
                {
                    label: 'Update',
                    field: 'update',
                    width: 20

                },
                {
                    label: 'Delete',
                    field: 'delete',
                    width: 20

                },

            ]
        };
        this.myRef = React.createRef();
        this.myRef1 = React.createRef();
        this.saveOrupdateTask = this.saveOrupdateTask.bind(this)
        this.delete = this.delete.bind(this)
        this.listProjects = this.listProjects.bind(this)

    }
    listProjects(e) {
        console.log(e.target.value)
        this.setState({ projectId: e.target.value })
    }
    users(e) {
        console.log(e);
        fetch('http://localhost:8081/r1/getAllTasks')
            .then(response => response.json())
            .then((data) => {
                for (var i = 0; i < data.length; i++) {
                    data[i].sn = i + 1;
                    data[i].delete = <button className="btn btn-danger" value={data[i].taskId} onClick={this.delete} type="button">Delete</button>
                    data[i].update = <button data-toggle="modal" data-target="#exampleModal" className="btn btn-primary" value={data[i].taskId} onClick={this.update} type="button">Update</button>
                }

                // data.map((i, index) => {
                //   if(i.taskDetails.length>0){
                //       data[index].taskName=data[index].taskDetails[0].taskName;
                //       data[index].sn = index + 1;
                //       data[index].delete1 = <button className="btn btn-danger" value={data[index].projectId} onClick={this.delete1} type="button">Delete</button>
                //       data[index].update1 = <button data-toggle="modal" data-target="#exampleModal" className="btn btn-primary" value={data[index].projectId} onClick={this.update1} type="button">Update</button>
                //   }
                //   else{
                //       data[index].taskName="<Need to add task>";
                //       data[index].sn = index + 1;
                //       data[index].delete1 = <button className="btn btn-danger" value={data[index].projectId} onClick={this.delete1} type="button">Delete</button>
                //       data[index].update1 = <button data-toggle="modal" data-target="#exampleModal" className="btn btn-primary"  value={data[index].projectId} onClick={this.update1} type="button">Update</button>
                //   }
                // })

                //value={data[i].taskDetails[0].taskName}
                this.setState({
                    rows: data
                });
                console.log(data)
                console.log(this.state.rows.length)
                console.log(this.state.rows);
            });

    }
    update(e) {

        fetch('http://localhost:8081/r1/gettaskById/' + e.currentTarget.value)
            .then(response => response.json())
            .then((data) => {

                this.setState({
                    update: data
                });
                this.setState({ taskId: data.taskId })
                this.setState({ taskName: data.taskId })
                this.setState({ taskDetails: data.taskId})
                console.log(this.state.update);
                console.log(this.state.taskId);
                console.log(data)
                 document.getElementById("t").value=data.taskName
                 document.getElementById("t1").value=data.taskDetails
                 document.getElementById("t0").style.display = "none"

                // document.getElementById("t0").defaultValue=this.state.update.projectName
            });
    }
    delete(e) {
        console.log(e);
        axios.delete("http://localhost:8081/r1/deleteTask/" + e.currentTarget.value)
            .then(response => { this.users() })
            .then(data => { console.log(data) })
        notification['success']({
            message: 'Task Deleted',
            className: "mt-5"
        })
    }
    componentDidMount() {
        //this.displayAllTimeSheet();
        document.querySelector('.custom-select').classList = '';
        document.querySelector('.dataTables_info').style.marginLeft = '82px';
        document.querySelector('.pagination').style.marginRight = '82px';
        document.querySelector('.mdb-datatable-filter').style.marginRight = '82px';
        axios.get("http://localhost:8081/r1/getAllProjects")
            .then(res => {

                console.log(res.data)
                this.setState({ listOfProject: res.data })

            })
            .catch(err => console.log(err))
        this.users();


    }
    saveOrupdateTask(e) {
        if (this.myRef.current.value != "" && this.myRef1.current.value != "" ) {
            if (this.state.update.taskId == null) {
                e.preventDefault();
                const detail = {
                    projectId: this.state.projectId,
                    taskDetails: [
                        {
                            taskName: this.state.taskName,
                            taskDetails: this.state.taskDesc
                        }
                    ]
                }
                axios.put("http://localhost:8081/r1/savetasks", detail)
                    .then(res => this.users())
                    .catch(err => console.log(err))
                notification['success']({
                    message: 'Task Added',
                    className: "mt-5"
                })
                document.getElementById('t').value = ""
                document.getElementById('t1').value = ""
                document.getElementById("t0").value = ""
  

            }

            else {


        console.log(this.state.pdescription);
        const d = {
          taskId: this.state.taskId,
          taskName: this.myRef.current.value,
          taskDetails:this.myRef1.current.value

        }
        console.log(this.state.taskName);
        console.log(this.state.taskDesc)
        axios.put("http://localhost:8081/r1/updateTasks", d)
          .then(res => {
            console.log(res);
            notification['success']({
              message: 'Project Updation done',
              className: "mt-5"

            })
            document.getElementById("t").value = ""
            document.getElementById("t1").value = ""
            document.getElementById("t0").value = ""

            this.users();
          })
          .then(data => { console.log(data) })
        // .catch(err => {
        //   // notification['error']({
        //   //   message: 'project Not Added',
        //   // })
        // })
        this.setState({ taskId: null, update: [] })
      }
     
        
    }
        else {
            notification['error']({
                message: 'please enter all detaials',
                className: "mt-5"
            })
        }

    }


    reset() {
if(this.state.update.taskId == null){
    document.getElementById('t').value = ""
    document.getElementById('t1').value = ""
        
}
else{
    window.location.reload();

}   

        
    }


    render() {
        return (
            <>

                <div >
                    <div className="card mx-auto"  style={{ width: "auto", height: "auto", maxWidth: "500px", 'border-radius': '5px', marginBottom: "50px", marginTop: "10px" }}>
                        <div className="header">
                            <div className="card-header text-center"><h2 style={{ color: "black" }}>Task Management</h2></div>
                        </div>
                        <div id="t0">
                        <label style={{ color: "#696969" ,marginLeft:"26px"}}>Project Names</label>
                            {/* {drop down for project} */}
                            <select onChange={this.listProjects}  class="form-control " style={{ width: "50%" ,marginLeft:"23px"}} >
                            <option selected>---Select Project---</option>
                                {
                                    this.state.update.projectName == "" ? (this.state.listOfProject.map(i => (
                                        <option  value={i.projectId}>{i.projectName}</option>
                                    ))) : <option >{this.state.update.projectName}</option>
                                }
                            </select>

                        </div>
                        <div className="card-body dp">
                            <label style={{ color: "#696969" }}>Task Name</label>

                            <input id="t" placeholder="Task Name" defaultValue={this.state.update.taskName} ref={this.myRef} onChange={e => this.setState({ taskName: e.target.value })} className="form-control" type="text" />
                        </div>
                        <div className="card-body dp">
                            <label style={{ color: "#696969" }}>Task Description</label>

                            <input onChange={e => this.setState({ taskDesc: e.target.value })} defaultValue={this.state.update.taskDetails} ref={this.myRef1} id="t1" placeholder="Task description"  className="form-control" type="text" />
                        </div>
                        <div >
                            <button type="button" class="btn btn-primary ml-3 mb-4" id="save" onClick={this.saveOrupdateTask} >Save </button>

                            <button type="button" className="btn btn-primary ml-3 mb-4" onClick={this.reset}>Reset</button>

                        </div>
                    </div>
                </div>

                {/* {Grid table } */}
                <div id="taskTable" style={{ width: '1000px', marginLeft: '20%', marginTop: 60 }}>
                    <MDBDataTable
                        striped
                        bordered
                        entriesOptions={[5, 10, 20, 50, 100]}
                        entries={5}
                        data={{ columns: this.state.columns, rows: this.state.rows }}
                        pagingTop
                        searchTop
                        searchBottom={false}
                    />

                </div>
                );

            </>
        )
    }

}
