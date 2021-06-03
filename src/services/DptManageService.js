import axios from 'axios';
import React from 'react'

const URL = "http://localhost:8081/r1/saveDepartment";

const GETALL_DEPARTMENT_URL = "http://localhost:8081/r1/getAllDepart";

const UPDATE_D_URL = "http://localhost:8081/r1/updateDepart";

const DELETE_D_URL = "http://localhost:8081/r1/deleteDepartment";

const VIEW_DPT = "http://localhost:8081/r1/getById";

class DptManageService {
    addDepartment(department) {
       return axios.post(URL, department);   
    }
    
    getAllDepartment() {
        return axios.get(GETALL_DEPARTMENT_URL)
    }

    updateDepartment(dept) {
        return axios.put(UPDATE_D_URL, dept)
    }

    deleteDepartment(dept) {
        return axios.delete(DELETE_D_URL+'/'+dept)
    }

    viewDepartment(deptId) {
        return axios.get(VIEW_DPT+'/'+deptId)
    }
}

export default new DptManageService()
