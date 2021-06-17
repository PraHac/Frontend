import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import './admindashByAdy.css'
import { Link,NavLink} from 'react-router-dom'
import view from './view.png'
import attendance from './attendance.jpg'
import department from './department.png'
import Manage from './Manage.png'
import logo1 from './logo1.png'
import logo2 from './logo2.png'
import { Button } from 'antd';
import { Avatar } from 'antd';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import profile from './undraw_profile.svg'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import AttendanceSidebarContent from './AttendanceSidebarContent';
import { Height } from '@material-ui/icons';

const { Header, Sider, Content,Footer } = Layout;

const logout = (e) => {
  e.preventDefault();
  console.log("This is working")
  localStorage.removeItem("adminId");
  window.location.replace("/");
}

const menu = (
  <Menu>
    <Menu.Item key="5">
      <a><Link style={{textDecoration:'none',color:'black'}} to="/adminDashboard">Dashboard</Link></a>
    </Menu.Item>
    <Menu.Item key="0">
      <a onClick={logout}>Logout</a>
    </Menu.Item>
  </Menu>
);
export default class AttendanceSideBar extends Component {
    state = {
        collapsed: false,
      };
    
      toggle = () => {
      //   if(this.state.collapsed==false){
      //   document.getElementById('test').style.width='100%';
      //   document.getElementById('test').style.marginLeft='5.5%';
      //   document.querySelector('#tablecontent').classList.add('mx-auto')
      // }
      // else{
      //   document.getElementById('test').style.width='82%';
      //   document.getElementById('test').style.marginLeft='18.7%';
      //   document.querySelector('#tablecontent').classList.remove('mx-auto')
      // }

        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
      
    
      render() {
        return (
          // <Layout style={{position:'sticky',top:0}}>
          <Layout>
            {/* <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{backgroundColor:"black", position:'fixed', height:'100%'}}width={270}> */}
            <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{backgroundColor:"black"}}width={270}> 
              <div>
              {!this.state.collapsed &&<img className="logo1" src={logo1}/>}
              {this.state.collapsed&&<img className="logo2" src={logo2}/> }              
              </div>
              <hr class="sidebar-divider"style={{borderTop:"2px solid #2e2e2e"}}/>
              {this.state.collapsed&&  <i className="fas fa-fw fa-tachometer-alt" style={{color:"#ffa426",marginLeft:"36%"}}/>}
              {!this.state.collapsed&&  <i className="fas fa-fw fa-tachometer-alt" style={{color:"#ffa426",marginLeft:'20px'}}/>}
              {!this.state.collapsed&&<Link className="link" style={{textDecoration:'none',padding:"10px",color:'#22b1ed'}} to="/adminDashboard">Dashboard</Link>}
          
              
              <hr class="sidebar-divider"style={{borderTop:"2px solid #2e2e2e"}}/>
          { !this.state.collapsed && <div class="sidebar-heading" style={{color:'#b7b9cc',textAlign: 'left',padding:' 0 1rem',
            fontWeight: '800',
            fontSize: '.65rem',
            letterSpacing: '.13rem'}}>
            Features
            </div>}
              <Menu theme="dark" mode="inline" style={{backgroundColor:"black"}}>
          <Menu.ItemGroup>
            <Menu.Item key="2" className="link">
            {this.state.collapsed&&  <i className="fa fa-user" style={{color:"#ffa426",marginLeft:"10px"}}/>}
            {!this.state.collapsed&&  <i className="fa fa-user" style={{color:"#ffa426"}}/>}            
            {!this.state.collapsed &&<Link className="link" style={{textDecoration:'none',padding:"10px"}} to="/empDisplay">Manage Employee</Link>}
            </Menu.Item>
            <Menu.Item key="3" >
            {this.state.collapsed&&  <i className="fas fa-fw fa-chart-area" style={{color:"#ffa426",marginLeft:"10px"}}/>}
            {!this.state.collapsed&&  <i className="fas fa-fw fa-chart-area" style={{color:"#ffa426"}}/>}
            {!this.state.collapsed && <Link className="link" style={{textDecoration:'none',padding:"10px"}} to="/attendance">Manage Attendance</Link>}
            </Menu.Item> 
            <Menu.Item key="4">
            {this.state.collapsed&&  <i className="fas fa-briefcase" style={{color:"#ffa426",marginLeft:"10px"}}/>}
            {!this.state.collapsed&&  <i className="fas fa-briefcase" style={{color:"#ffa426"}}/>}
            {!this.state.collapsed &&<Link className="link" style={{textDecoration:'none',padding:"10px"}} to="/dptManage">Manage Department</Link>}
            </Menu.Item>
            <Menu.Item key="5">
            {this.state.collapsed&&  <i className="fas fa-calculator" style={{color:"#ffa426",marginLeft:"10px"}}/>}
            {!this.state.collapsed&&  <i className="fas fa-calculator" style={{color:"#ffa426"}}/>}
            {!this.state.collapsed &&<Link className="link" style={{textDecoration:'none',padding:"10px"}}  to="/viewRe">View Reimursement</Link>}
            </Menu.Item>
            <Menu.Item key="6">
            {this.state.collapsed&&  <i className="fas fa-clock" style={{color:"#ffa426",marginLeft:"10px"}}/>}
            {!this.state.collapsed&&  <i className="fas fa-clock" style={{color:"#ffa426"}}/>}
            {!this.state.collapsed &&<Link className="link" style={{textDecoration:'none',padding:"10px"}}  to="/admintimesheet">Timesheet</Link>}
            </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
          <hr className="sidebar-divider" style={{borderTop:"2px solid #2e2e2e"}}/>
            </Sider>
            <Layout className="site-layout">
              {/* <Header id="test"className="site-layout-background"style={{backgroundColor:'#22b1ed',padding: 0, width:'82%', marginLeft:'18.7%'}}> */}
              <Header id="test"className="site-layout-background"style={{backgroundColor:'#22b1ed',padding: 0 }}>
              <i className="fa fa-bars"id="trigger" onClick={this.toggle}/>
              <Dropdown  className="avatar" overlay={menu} trigger={['click']}>
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{textDecoration:'none',color:'white'}}>
                          <Avatar className="img-profile rounded-circle" src={profile} style={{maxWidth:'60px',right:'4px'}}/>
                          {localStorage.getItem('adminId')}
                      </a>
              </Dropdown>
              </Header>
            <Content>
             <div style={{textAlign:"center"}}> <span className="Admin" >Attendance</span></div>
              <AttendanceSidebarContent/>
              {/* <Footer style={{ textAlign: 'center',backgroundColor:"white"}}>© 2021 RealCoderZ - developed by <b><a href="#" style={{color:"black"}}>RealCoderZ</a></b></Footer> */}
            </Content>
            </Layout>
          </Layout>
          
        );
        
      }
}