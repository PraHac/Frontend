import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import './userDisplay.css'
// import './adminDashboard.css'
import axios from 'axios'
// import './style.css'
// import M from 'materialize-css'
import EmpSidebar from './EmpSidebar'
import './admindashByAdy.css'

function EmpDisplay() {

	useEffect(() => {
        if (localStorage.getItem("adminId") == null) {
            // window.location.replace("/") change here
          }
    }, [])
return(
	<div  id="page-top" style={{ width: "100vw", height: "100vh" }}>
		<EmpSidebar/>
	</div>
)
}

export default EmpDisplay
