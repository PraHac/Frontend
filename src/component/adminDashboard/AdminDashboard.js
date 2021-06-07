import React, { useEffect } from 'react'
import view from './view.png'
import attendance from './attendance.jpg'
import department from './department.png'
import Manage from './Manage.png'
import { Link } from 'react-router-dom'
import './admindashByAdy.css'
import AdminSidebar from './AdminSidebar.js'


function AdminDashboard() {
   
    useEffect(() => {
        if (localStorage.getItem("adminId") == null) {
            window.location.replace("/") 
          }
    }, [])
    
      const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("adminId");
        window.location.replace("/");
      }

    return (
        <div id="page-top" style={{ width: "100vw", height: "100vh" }}>
          <AdminSidebar/>  

         </div>
    )
}

export default AdminDashboard
