
import React, { Component } from 'react'
import { MDBDataTable } from 'mdbreact';
import axios from 'axios'
import Moment from 'react-moment'
import './DptManage.css'
import { notification } from 'antd';
import DptManageService from "../../services/DptManageService";

var i = 1;
export default class DptManageSideBarContent extends Component {
  constructor() {

    super();
    this.myRef = React.createRef();
    this.update = this.update.bind(this);
    this.reset = this.reset.bind(this);
    this.delete=this.delete.bind(this)
    this.saveOrUpdate = this.saveOrUpdate.bind(this);
    this.state = {
      departmentId: null,
      dptName: "",
      update: [],
      rows: [],

      columns: [

        {
          label: 'Department Name',
          field: 'departmentName',
          sort: 'asc',
          width: 27
        },
        {
          label: 'Created Date',

          field: 'createdDate',
          sort: 'asc',
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
  }
  update(e) {
    // console.log(e.currentTarget.value);

    fetch('http://localhost:8081/r1/getById/' + e.currentTarget.value)
      .then(response => response.json())
      .then((data) => {

        this.setState({
          update: data
        });
        this.setState({ departmentId: data.departmentId })
        console.log(this.state.departmentId);
        console.log(data)


      });
  }

  users() {

    fetch('http://localhost:8081/r1/getAllDepart')
      .then(response => response.json())
      .then((data) => {
        for (var i = 0; i < data.length; i++) {

          data[i].createdDate = <Moment format="YYYY-MMM-DD HH:mm:ss">{data[i].createdDate}</Moment>
          data[i].delete = <button className="btn btn-danger" value={data[i].departmentId} onClick={this.delete} type="button">Delete</button>
          data[i].update = <button data-toggle="modal" data-target="#exampleModal" className="btn btn-primary" value={data[i].departmentId} onClick={this.update} type="button">Update</button>
        }
        this.setState({
          rows: data
        });
        console.log(data)
        console.log(this.state.rows.length)

        console.log(this.state.rows);
      });
  }

  componentDidMount() {
    document.querySelector('#page-top > div > section > section > main > div > div > div:nth-child(1) > div:nth-child(1) > div > label').style.marginLeft = '82px';
    document.querySelector('.custom-select').classList = '';
    document.querySelector('.dataTables_info').style.marginLeft = '82px';
    document.querySelector('.pagination').style.marginRight = '82px';
    document.querySelector('.mdb-datatable-filter').style.marginRight = '82px'; 
    document.getElementById('save').classList.add('disabled')   
    this.users();

  }
  activeinactive(){
    if(document.getElementById('reset').value==null||document.getElementById('reset').value==''){
    document.getElementById('save').classList.add('disabled')
    }
    else{
      document.getElementById('save').classList.remove('disabled')
    }
  }
  delete(e) {
  console.log(e);
    axios.delete('http://localhost:8081/r1/deleteDepartment/' + e.currentTarget.value )
      .then(response => {this.users()})
      .then(data => { console.log(data) })

  }
  reset() {
    document.getElementById('reset').value = "";
    this.setState({ departmentId: null })
  }
  saveOrUpdate = () => {
   
   if(this.myRef.current.value!=""){
    if (this.state.departmentId === null) {

      const department = {
        departmentName: this.myRef.current.value
      }
      DptManageService.addDepartment(department)
        .then(res => {
          console.log(res);
          notification['success']({
            message: 'Department Added',

          })
          this.users();
        })

        .catch(err => {
          notification['error']({
            message: 'Department Not Added',
          })
        })

    }
  

    else {
      console.log(this.myRef.current.value);
      fetch('http://localhost:8081/r1/updateDepart/', {
        method: 'PUT',
        body: JSON.stringify({ "departmentId": this.state.update.departmentId, "departmentName": this.myRef.current.value }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => {this.users()})
        .then((data) => console.log(data))

    }
  }
  else{
    notification['error']({
      message:'please enter department'
    })
  }

  }

  render() {

    return (
      <>
        <div>   <div class="w-25 m-auto pb-4 p-5" style={{ boxShadow: "5px 5px 10px" }}>
          <div className="mb-3">
            <label>Department Name</label>
            <input onChange={this.activeinactive} id="reset" placeholder="Department Name" defaultValue={this.state.update.departmentName} ref={this.myRef} className="form-control" type="text" />
          </div>
          <div >
            <button id='save' type="button" class="btn btn-primary" onClick={this.saveOrUpdate} >Save </button>

            <button type="button" className="btn btn-primary ml-3"  onClick={this.reset}>Reset</button>

          </div>
        </div>
        </div>



        <div style={{ width: '1000px', marginLeft: '6%', }}>

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
      </>
    )
  }

}

