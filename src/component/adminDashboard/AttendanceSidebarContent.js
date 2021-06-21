import React, { Component } from 'react'
import { MDBDataTable } from 'mdbreact';
import './DptManage.css'
import { Layout } from 'antd';
const {Footer } = Layout;
var i = 1;
export default class AttendanceSidebarContent extends Component {	
  constructor() {

    super();
    this.myRef = React.createRef()
	// this.users=this.users.bind(this)

    this.state = {
      rows: [],


      columns: [
        {
          label: 'Sr. No',
          field: 'sn',
          sort: 'asc',
          width: 27
        },
        {
          label: 'Employee Name',
          field: 'employeeName',
          sort: 'asc',
          width: 27
        },
		{
			label: 'Employee Email',
			field: 'email',
			width: 27
		 },
        {
          label: 'Status',
          field: 'status',
          width: 20
        },
        {
          label: 'Log Hours',
          field: 'logHours',
          width: 20

        },
        {
          label: 'Login Time',
          field: 'loginTime',
          width: 20

        },
		{
			label: 'Logout Time',
			field: 'logoutTime',
			width: 20
		},
      ]
    };
    fetch('http://localhost:8081/r1/get')
    .then(response => response.json())
    .then((data) => {
      for (var i = 0; i < data.length; i++) {

        data[i].sn=i+1;
        data[i].status = <p>{data[i].status}</p>
        data[i].logHours = <p>{data[i].logHours}</p>
        data[i].loginTime = <p>{data[i].loginTime}</p>
        data[i].logoutTime = <p>{data[i].logoutTime}</p>
  }
      this.setState({
        rows: data
      });

    });
  }
  
  // users() {

   
  // }
// componentDidMount(){
//   	this.users()
// }


  render(){
    return (
      <>
        <div style={{ width: '1000px', marginLeft: '6%',marginTop:'5%',marginBottom:'10%' }}>

          <MDBDataTable
            striped
            bordered
            entriesOptions={[5, 10, 20, 50, 100]}
            entries={5}
            data={{ columns: this.state.columns, rows: this.state.rows }}
            searchTop
            searchBottom={false}
            pagingTop
          />
        </div>	
		<Footer style={{ textAlign: 'center',backgroundColor:"white"}}>© 2021 RealCoderZ - developed by <b><a href="#" style={{color:"black"}}>RealCoderZ</a></b></Footer>
      </>
    )
  }
}