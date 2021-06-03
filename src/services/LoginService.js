import React from 'react'
import axios from 'axios'

const URL = "http://localhost:8081/r1/addUser"

const loginAccountantURL = "http://localhost:8081/r1/loginAccountant"

const loginSupervisorURL = "http://localhost:8081/r1/supervisorLogin"

const loginEmployeeURL = "http://localhost:8081/employeeLogin"

class LoginService {
   
    loginAdmin(admin){
       return axios.post(URL, admin);
    }

    loginAccountant(loginDetail){
       return axios.post(loginAccountantURL, loginDetail);
    }

    loginSupervisor(loginDetail){
       return axios.post(loginSupervisorURL, loginDetail);
    }

    loginEmployee(loginDetail){
       return axios.post(loginEmployeeURL, loginDetail);
    }

}

export default new LoginService();
