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
import profile from './undraw_profile.svg'
import { DownOutlined } from '@ant-design/icons';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import DptManageSideBarContent from './DptManageSideBarContent'

const { Header, Sider, Content,Footer } = Layout;

const logout = (e) => {
  e.preventDefault();
  console.log("This is working")
  localStorage.removeItem("adminId");
  window.location.replace("/");
}


const menu = (
    <Menu>
      <Menu.Item key="1">
        <a><Link  style={{textDecoration:'none',color:'black'}} to="/empDisplay">Manage Employee</Link></a>
      </Menu.Item>
      <Menu.Item key="2">
        <a><Link style={{textDecoration:'none',color:'black'}} to="/attendance">Manage Attendance</Link></a>
      </Menu.Item>
      <Menu.Item key="3">
        <a><Link  style={{textDecoration:'none',color:'black'}} to="/dptManage">Manage Department</Link></a>
      </Menu.Item>
      <Menu.Item key="4">
        <a><Link style={{textDecoration:'none',color:'black'}}  to="/viewRe">View Reimursement</Link></a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5">
        <a><Link style={{textDecoration:'none',color:'black'}} to="/adminDashboard">Dashboard</Link></a>
      </Menu.Item>
      <Menu.Item key="0">
        <a onClick={logout}>Logout</a>
      </Menu.Item>
    </Menu>
  );




export default class DptManageSideBar extends Component {
    state = {
        collapsed: false,
      };
    
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
    
    
    
    render() {
        return (
            <div>
            <Layout>
            <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{backgroundColor:"black"}} width={270}>
              <div>
              {!this.state.collapsed &&<img className="logo1" src={logo1}/>}
              {this.state.collapsed&&<img className="logo2" src={logo2}/> }         
              </div>
              <hr class="sidebar-divider"style={{borderTop:"2px solid #2e2e2e"}}/>
              {this.state.collapsed&&  <i className="fas fa-fw fa-tachometer-alt" style={{color:"#ffa426",marginLeft:"36%"}}/>}
              {!this.state.collapsed&&  <i className="fas fa-fw fa-tachometer-alt" style={{color:"#ffa426",marginLeft:'20px'}}/>}
              {/* <i class="fas fa-fw fa-tachometer-alt"/><span></span> */}
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
            {/* <NavLink  to="/portoflio" activeClassName="your-active-class" className="link">Portoflio</NavLink> */}
            </Menu.Item>
            {/* <Menu.Item key="3" icon={<UserOutlined style={{color:"#ffa426"}} />}>
            <Link className="link" style={{textDecoration:'none'}} to="/attendance">Manage Attendance</Link>            
            </Menu.Item> */}
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
            {/* <SubMenu key="sub1"icon={<UserOutlined />}  title="Reimbursement">
                  <SubMenu key="sub2" icon={<UserOutlined />}  title="Accountant">
                    <Menu.Item icon={<TeamOutlined />} onClick={ this.accApproved} key="5">AccountantTable</Menu.Item>
                    <Menu.Item icon={<TeamOutlined />}key="6">Disapproved</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub3" icon={<UserOutlined />}  title="Supervisor">
                    <Menu.Item icon={<TeamOutlined />}key="7">Approved</Menu.Item>
                    <Menu.Item icon={<TeamOutlined />}key="8">Disapproved</Menu.Item>
                  </SubMenu>
              <Menu.Item icon={<TeamOutlined />}key="12">By Month</Menu.Item>
            </SubMenu> */}
            </Menu.ItemGroup>
            
          </Menu>
          <hr class="sidebar-divider"style={{borderTop:"2px solid #2e2e2e"}}/>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background"style={{backgroundColor:'#22b1ed',padding: 0}}>
                {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: this.toggle,
                  style:{color:'#fff'}
                })} */}
              <i className="fa fa-bars"id="trigger" onClick={this.toggle}/>
              <Dropdown  className="avatar" overlay={menu} trigger={['click']}>
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                          {/* <Avatar icon={<UserOutlined />}/> */}
                          <Avatar className="img-profile rounded-circle" src={profile} style={{maxWidth:'60px'}}/> 
                          <DownOutlined />
                      </a>
              </Dropdown>
              </Header>
            <Content>
              <span className="Admin">Department</span>
              <DptManageSideBarContent/>
              <Footer style={{ textAlign: 'center',backgroundColor:"white"}}>© 2021 RealCoderZ - developed by <b><a href="#" style={{color:"black"}}>RealCoderZ</a></b></Footer>
            </Content>
            </Layout>
          </Layout>    
            </div>
        )
    }
}
