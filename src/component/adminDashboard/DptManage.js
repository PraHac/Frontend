import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DptManageService from "../../services/DptManageService";
// import "./adminDashboard.css";
import M from 'materialize-css';
import DptManageSideBar from './DptManageSideBar.js'
function DptManage() {

	useEffect(() => {
        if (localStorage.getItem("adminId") == null) {
            // window.location.replace("/") change
          }
    }, [])
    
      const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("adminId");
        // window.location.replace("/"); change
      }
// 	const [dptName, setDptName] = useState("");
// 	const [departments, setDepartments] = useState([]);
// 	const [updateDName, setUpdateDName] = useState("");
// 	const [dptId, setDptId] = useState("");
// 	const [dptIdToDlt, setDptIdToDlt] = useState("");

// 	//**************************** */ Add department
// 	const addDepartment = (e) => {
// 		e.preventDefault();
// 		const department = {
// 			departmentName:dptName
// 		}
// 		DptManageService.addDepartment(department)
// 			.then(res => {
// 				console.log(res);
// 			    M.toast({html:"Department Added"})
// 			})
// 			.catch(err => {
// 				console.log(err);
// 		})
// 		console.log(dptName);
// 	}
// //**************************** */ get all department
// 	useEffect(() => {
// 		DptManageService.getAllDepartment()
// 			.then(res => {
// 				console.log(res.data);
// 				setDepartments(res.data);
// 		})
// 			.catch(err => console.log(err))
// 	}, []);

// 	const updateDepartment = (e) => {
// 		e.preventDefault();
// 		console.log(dptId);
// 		console.log(updateDName);
// 		const dept = {
// 			departmentId: dptId,
// 			departmentName: updateDName
// 		}
// 		setDptId("");
// 		setDptName("");
// 		DptManageService.updateDepartment(dept).then(res => console.log("success"))
// 			.catch(err => console.log(err));
// 	}

// //**************************** */ get all department

// 	const deleteDepartment = (e) => {
// 		e.preventDefault();
// 		DptManageService.deleteDepartment(dptIdToDlt).then(res => console.log("success")).catch(err=>console.log(err))
// 	}
	
  return (
    <div id="page-top" style={{ width:"100vw", height:"100vh"}}>

		<DptManageSideBar/>
    </div>
  );
}

export default DptManage;
