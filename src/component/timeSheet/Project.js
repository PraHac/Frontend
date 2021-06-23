import React, { Component } from "react";
import { setState } from 'react';
import TimeSheetService from "../../services/TimeSheetService";
import Moment from 'react-moment';
import { Navbar, Nav, Dropdown, DropdownButton } from "react-bootstrap";
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
import { Avatar } from 'antd';
import profile from '../undraw_profile.svg'
import { MDBDataTable } from 'mdbreact';
import { notification } from 'antd';

export default class SuperTimeSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      pName: "",
      update: [],
      projectId: null,
      rows: [],
      pdescription:"",

      columns: [
        {
          label: 'Sr. No',
          field: 'sn',
          sort: 'asc',
          width: 27
        },
        {
          label: 'Project Name',
          field: 'projectName',
          sort: 'asc',
          width: 27
        },
        {
          label: 'Description',
          field: 'projectDescrption',
          width: 20

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
    this.addProject = this.addProject.bind(this);
    this.users = this.users.bind(this);
    this.myRef = React.createRef();
    this.myRef1 = React.createRef();
    this.delete = this.delete.bind(this);    

  }
  users() {
    fetch('http://localhost:8081/r1/getAllProjects')
      .then(response => response.json())
      .then((data) => {
        for (var i = 0; i < data.length; i++) {

          data[i].sn = i + 1;
          data[i].delete = <button className="btn btn-danger" value={data[i].projectId} onClick={(e) => this.delete(e)} type="button">Delete</button>
          data[i].update = <button data-toggle="modal" data-target="#exampleModal" className="btn btn-primary" value={data[i].projectId} onClick={this.update} type="button">Update</button>
        }
        this.setState({
          rows: data
        });
        console.log(data)
        console.log(this.state.rows.length)

        console.log(this.state.rows);
      });
  }
  update = (e) => {
    fetch('http://localhost:8081/r1/getProjectsById/' + e.currentTarget.value)
      .then(response => response.json())
      .then((data) => {

        this.setState({
          update: data
        });

        this.setState({ projectName: data.projectId })
        this.setState({ projectDescrption: data.projectId })
        
        this.setState({ projectId: data.projectId })
        console.log(this.state.projectId);
        console.log(this.state.update)
        document.getElementById("prName").value = data.projectName
        document.getElementById("prDescription").value = data.projectDescrption
        

      });
  }
  componentDidMount() {
    console.log(this.state.pdescription);
    //document.querySelector('#page-top > div > section > section > main > div > div > div:nth-child(1) > div:nth-child(1) > div > label').style.marginLeft = '82px';
    document.querySelector('.custom-select').classList = '';
    document.querySelector('.dataTables_info').style.marginRight = '82px';
     document.querySelector('.pagination').style.marginLeft = '160px';
    // document.querySelector('.mdb-datatable-filter').style.marginRight = '82px';
    document.querySelector('#table > div > div:nth-child(1) > div:nth-child(2) > div > input').style.marginRight = '165px'
    document.querySelector('#table > div > div:nth-child(1) > div:nth-child(2) > div > input').style.width = '150px'
    console.log(this.state.projectId)
    this.users();
  }
  // Manage Project function
  manageProject = (e) => {
    e.preventDefault()
    document.getElementById('project').style.display = "block"
    document.getElementById('example').style.display = "none"
    document.getElementById('opt').style.display = "none"
    //document.getElementById('ts').style.display = "none"
    document.getElementById('table').style.display = "block"
    // document.getElementById('task1').style.display = "none"
    document.getElementById("ets").style.display = "none";
    document.getElementById("ts").style.display = "none";


  }
  //************** */ add project
  addProject = (e) => {
    e.preventDefault()

    console.log(this.state.pdescription);

    if (this.myRef.current.value != "" && this.myRef1.current.value!="") {
      if (this.state.projectId === null) {

        const d = {
          projectName: this.state.pName,
          projectDescrption:this.state.pdescription
        }
        axios.post("http://localhost:8081/r1/saveProjects", d)
          .then(res => {
            console.log(res);
            notification['success']({
              message: 'Project Added',
              className: "mt-5"
            })
            document.getElementById("prName").value = ""
            document.getElementById("prDescription").value = ""
            
            this.users();
          })
          .then(data => { console.log(data) })

          .catch(err => {
            notification['error']({
              message: 'Project Not Added',
              className: "mt-5"
            })
          })

      }

      else {
        console.log(this.state.pdescription);
        const d = {
          projectId: this.state.projectId,
          projectName: this.myRef.current.value,
          projectDescrption:this.myRef1.current.value

        }
        console.log(this.state.pName);
        console.log(this.state.pdescription)
        axios.put("http://localhost:8081/r1/updateProjects", d)
          .then(res => {
            console.log(res);
            notification['success']({
              message: 'Project Updation done',
              className: "mt-5"

            })
            document.getElementById("prName").value = ""
            document.getElementById("prDescription").value = ""
            this.users();
          })
          .then(data => { console.log(data) })
        // .catch(err => {
        //   // notification['error']({
        //   //   message: 'project Not Added',
        //   // })
        // })
        this.setState({ projectId: null, update: [] })
      }
     
    }
    else {
      notification['error']({
        message: 'Please Enter Project details',
        className: "mt-5"
      })
    }
  }
  resetProjectName() {
    document.getElementById('prName').value = ""
    document.getElementById('prDescription').value = ""
    

  }
  delete =(e)=> {
     console.log(e);
     console.log(e.target.value);
    axios.get('http://localhost:8081/r1/getProjectsById'+"/"+e.target.value)
    .then((res) => {
    console.log(res.data.taskDetails);
      if(res.data.taskDetails.length>0){
      notification['error']({
      message: 'Cannot delete. This project has tasks. ',
      className: "mt-5"
      })
    }  
    else
    {
        axios.delete('http://localhost:8081/r1/deleteProject/' + e.target.value)
          .then(response => this.users())
          notification['success']({
            message: 'Project Deleted Successfully',
            className: "mt-5"
            })
          
          
        }
        //  .then(data => { console.log(data) })
  }
  )}
  




  render() {
    return (
      <>
        <div id="project" className="card mx-auto" style={{ width: "auto", height: "auto", maxWidth: "500px", 'border-radius': '5px', marginBottom: "50px", marginTop: "50px" }}>
          <div className="header">
            <div className="card-header text-center"><h2 style={{ color: "black" }}>Project Management</h2></div>
          </div>
          <div className="card-body dp">


            <label style={{ color: "#696969" }}>Project Name</label>

            <input id='prName' onChange={(e) => this.setState({ pName: e.target.value })} defaultValue={this.state.update.projectName} ref={this.myRef} placeholder="Project name" className="form-control" type="text" />

          </div>
          <div className="card-body dp">


            <label style={{ color: "#696969" }}>Project Description</label>

            <input id='prDescription' onChange={(e) => this.setState({ pdescription: e.target.value })} defaultValue={this.state.update.projectDescrption} ref={this.myRef1} placeholder="Project description" className="form-control" type="text" />

          </div>
          <div >
            <button type="button" class="btn btn-primary ml-3 mb-4" id="add" onClick={this.addProject} >Add </button>

            <button type="button" className="btn btn-primary ml-3 mb-4" onClick={this.resetProjectName}>Reset</button>

          </div>
        </div>
        <div style={{ width: '1000px', marginLeft: '25%', }}>
          <div id="table">
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

        </div>


      </>
    );
  }

}
