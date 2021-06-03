import axios from 'axios'
import { Component } from 'react'

class TimeSheetService {
    saveTimeSheet(timeSheet){
         return axios.post('http://localhost:8081/r1/saveMultipleTimesheet',timeSheet)
     }

    getAll(superId)
    {
        return axios.get("http://localhost:8081/r1/superWeek"+"/"+superId)
    }
    getAllAccT()
    {
        return axios.get("http://localhost:8081/r1/accCurrentWeek")
    }
    getAllAdminT()
    {
        return axios.get("http://localhost:8081/r1/adminCurrentWeek")
    }
    deleteTimeSheetId(id)
    {
        return axios.delete(`http://localhost:8081/r1/deleteTimeSheet/${id}`)
    }
    getTimeSheetById(tid){
        return axios.get(`http://localhost:8081/r1/TimeSheetbyTId/${tid}`)
    }
    getEmployeeById(eid){
        return axios.get(`http://localhost:8081/r1/TimeSheetbyEId/${eid}`)
    }
    updateTimeSheet(timeSheet){
        return axios.put('http://localhost:8081/r1/updateTimeSheet',timeSheet)
    }
     superWaiting(sid)
     {
         return axios.get(`http://localhost:8081/r1/superwaiting/${sid}`)
     }
   
     superApproved(sid){
         return axios.get(`http://localhost:8081/r1/superapproved/${sid}`)
     }
     superDisapproved(sid){
         return axios.get(`http://localhost:8081/r1/superdisapproved/${sid}`)
     }
     allaccountantApproved(){
        return axios.get("http://localhost:8081/r1/allaccountantapproved")
    }
    updateTimeSupervisorStatus(timeSheet){
        return axios.put("http://localhost:8081/r1/upadteTimeSuperApproved",timeSheet)
    }
    updateTimeaccountantStatus(timeSheet){
        return axios.put("http://localhost:8081/r1/upadteTimeAccountantApproved",timeSheet)
    }  

    allaccountantDisApproved(){
        return axios.get("http://localhost:8081/r1/allaccountantDisapproved")
    }
    findWeekly(){
        return axios.get("http://localhost:8081/r1/findbyWeek")
    }
    // findCodding(){
    // return axios.get("http://localhost:8081/findbycoddingTask")
    // }

    
    findCodding(task){
        return axios.get("http://localhost:8081/r1/timeSheetByTask"+"/"+task)
    }
        
    findRequirementGathering(){
        return axios.get("http://localhost:8081/r1/findbyrequirementgatheringTask")
    }
    findTesting(){
    return axios.get("http://localhost:8081/r1/findbytestingTask")
    }
    findMeeting(){
    return axios.get("http://localhost:8081/r1/findbymeetingTask")
    }
}

export default new TimeSheetService()