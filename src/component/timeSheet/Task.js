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
        this.update1 = this.update1.bind(this)
        this.saveOrupdateTask = this.saveOrupdateTask.bind(this)

        this.delete1 = this.delete1.bind(this)
        this.state = {
            task: "",
            update: { projectName: "" },
            projectName: "",
            update1: [],
            rows1: [],
            projectId: null,
            projectName: "",
            taskName: "",
            taskId: null,
            taskDetails: [],
            listOfProject: [],
            taskDesc: "",
            columns1: [
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
                    field: 'update1',
                    width: 20

                },
                {
                    label: 'Delete',
                    field: 'delete1',
                    width: 20

                },

            ]
        };
        this.myRef = React.createRef();
        this.myRef1 = React.createRef();
        this.saveOrupdateTask = this.saveOrupdateTask.bind(this)
        this.delete1 = this.delete1.bind(this)
    }
    listProjects(e) {
        console.log(e.target.value)
        this.setState({ projectId: e.target.value })
    }
    users1(e) {
        console.log(e);
        fetch('http://localhost:8081/r1/getAllTasks')
            .then(response => response.json())
            .then((data) => {
                for (var i = 0; i < data.length; i++) {
                    data[i].sn = i + 1;
                    data[i].delete1 = <button className="btn btn-danger" value={data[i].taskId} onClick={this.delete1} type="button">Delete</button>
                    data[i].update1 = <button data-toggle="modal" data-target="#exampleModal" className="btn btn-primary" value={data[i].taskId} onClick={this.update1} type="button">Update</button>
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
                    rows1: data
                });
                console.log(data)
                console.log(this.state.rows1.length)
                console.log(this.state.rows1);
            });

    }
    update1(e) {

        fetch('http://localhost:8081/r1/gettaskById/' + e.currentTarget.value)
            .then(response => response.json())
            .then((data) => {

                this.setState({
                    update: data
                });
                this.setState({ taskId: data.taskId })
                console.log(this.state.taskId);
                console.log(data)
                // document.getElementById("t").defaultValue=this.state.update.taskName
                // document.getElementById("t1").defaultValue=this.state.update.taskDetails
                // document.getElementById("t0").defaultValue=this.state.update.projectName
            });
    }
    delete1(e) {
        console.log(e);
        axios.delete("http://localhost:8081/r1/deleteTask/" + e.currentTarget.value)
            .then(response => { this.users1() })
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
        this.users1();


    }
    saveOrupdateTask(e) {
        if (this.myRef.current.value != "" && this.myRef1.current.value != "") {
            if (this.state.taskId === null) {
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
                    .then(res => this.users1())
                    .catch(err => console.log(err))
                notification['success']({
                    message: 'Task Added',
                    className: "mt-5"
                })
                document.getElementById('t').value = ""
                document.getElementById('t1').value = ""

            }

            else {
                const detail = {
                    taskId: this.state.taskId,

                    taskName: this.myRef.current.value,
                    taskDetails: this.myRef1.current.value


                }
                axios.put("http://localhost:8081/r1/updateTasks", detail)
                    .then(res => this.users1())
                    .catch(err => console.log(err))
                document.getElementById('t').value = ""
                document.getElementById('t1').value = ""


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
        window.location.reload();
    }


    render() {
        return (
            <>

                <div>
                    <div className="card mx-auto" id="task" style={{ width: "auto", height: "auto", maxWidth: "500px", 'border-radius': '5px', marginBottom: "50px", marginTop: "10px" }}>
                        <div className="header">
                            <div className="card-header text-center"><h2 style={{ color: "black" }}>Task Management</h2></div>
                        </div>
                        <div>
                        <label style={{ color: "#696969" ,marginLeft:"26px"}}>Project Names</label>
                            {/* {drop down for project} */}
                            <select onChange={this.listProjects} id="t0" class="form-control " style={{ width: "50%" ,marginLeft:"23px"}} >
                            <option selected>---Select Project---</option>
                                {
                                    this.state.update.projectName == "" ? (this.state.listOfProject.map(i => (
                                        <option value={i.projectId}>{i.projectName}</option>
                                    ))) : <option>{this.state.update.projectName}</option>
                                }
                            </select>

                        </div>
                        <div className="card-body dp">
                            <label style={{ color: "#696969" }}>Task Name</label>

                            <input id="t" placeholder="Task Name" defaultValue={this.state.update.taskName} ref={this.myRef} onChange={e => this.setState({ taskName: e.target.value })} className="form-control" type="text" />
                        </div>
                        <div className="card-body dp">
                            <label style={{ color: "#696969" }}>Task Description</label>

                            <input onChange={e => this.setState({ taskDesc: e.target.value })} defaultValue={this.state.update.taskDetails} id="t1" placeholder="Task description" ref={this.myRef1} className="form-control" type="text" />
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
                        data={{ columns: this.state.columns1, rows: this.state.rows1 }}
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
