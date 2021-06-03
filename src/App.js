import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AccountantDash from './component/accountantDash/AccountantDash';
import AdminDashboard from './component/adminDashboard/AdminDashboard';
import Attendance from './component/adminDashboard/Attendance';
import DptManage from './component/adminDashboard/DptManage';
import EmpDisplay from './component/adminDashboard/EmpDisplay';
import PaySalary from './component/adminDashboard/PaySalary';
import ViewDpts from './component/adminDashboard/ViewDpts';
import EmployeeReimburse from './component/EmployeeReimburse/EmployeeReimburse';
import Login from './component/login/Login';
import SupervisorDashboard from './component/supervisorDashboard/SupervisorDashboard';
import SuperTimeSheet from './component/timeSheet/SuperTimeSheet'
import AccTimeSheet from './component/timeSheet/AccTimeSheet'
import AdminTimeSheet from './component/timeSheet/AdminTimeSheet'
import SavetimeSheet from './component/timeSheet/SavetimeSheet'
import DisplayEmployeeTimeSheet from './component/timeSheet/DisplayEmployeeTimeSheet'
import SuperIdApproved from './component/timeSheet/SuperIdApproved'
import SuperDisapproved from './component/timeSheet/SuperDisapproved'
import SuperidWaiting from './component/timeSheet/SuperidWaiting'
import AllAccountantApproved from './component/timeSheet/AllAccountantApproved'
import AllAccoutantDisApproved from './component/timeSheet/AllAccoutantDisApproved'
import UpdateTimeSheet from './component/timeSheet/UpdateTimeSheet'
import UpdateAccountantStatus from './component/timeSheet/UpdateAccountantStatus'
import UpdateSuperVisorStatus from './component/timeSheet/UpdateSuperVisorStatus'
import FindByWeek from './component/timeSheet/FindByWeek'
import FindByCodingTask from './component/timeSheet/FindByCodingTask'
import FindByRequirementGathering from './component/timeSheet/FindByRequirementGathering'
import FindTesting from './component/timeSheet/FindTesting'
import FindMeeting from './component/timeSheet/FindMeeting'
import DisplayTimeSheet from './component/timeSheet/DisplayTimeSheet'


function App() {
    return (
        <div>
            {/* <Login /> */}
            <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Login} />        
              <Route exact path="/adminDashboard" component={PaySalary} />
              <Route exact path="/dptManage" component={DptManage} />
              <Route exact path="/attendance" component={Attendance} />
              <Route exact path="/empDisplay" component={EmpDisplay} />
              <Route exact path="/viewRe" component={PaySalary} />
              <Route exact path="/viewDpts" component={ViewDpts} />     
              <Route exact path="/employeeReimburse" component={EmployeeReimburse} />
              <Route exact path="/supervisorDash" component={SupervisorDashboard} />
              <Route exact path="/accountantDash" component={AccountantDash} />
                    <Route path="/supertimesheet" exact component={SuperTimeSheet} />
                    <Route path="/acctimesheet" exact component={AccTimeSheet}/> 
                    <Route path="/admintimesheet" exact component={AdminTimeSheet}/>       
                    <Route path="/saveTimeSheet" exact component={SavetimeSheet}/>
                    <Route path="/particulartimeSheet" exact component={DisplayTimeSheet}/>
                    <Route path="/employeeTimeSheet" exact component={DisplayEmployeeTimeSheet}/>
                    <Route path="/superIdApprovedTimeSheet" exact component={SuperIdApproved}/>
                    <Route path="/superDisapprovedTimeSheet" exact component={SuperDisapproved}/>
                    <Route path="/superidWaitingimeSheet" exact component={SuperidWaiting}/>
                    <Route path="/allAccountantApprovedTimeSheet" exact component={AllAccountantApproved}/>
                    <Route path="/allAccountantDisApprovedTimeSheet" exact component={AllAccoutantDisApproved}/>
                    <Route path="/updateTimeSheet" exact component={UpdateTimeSheet}/>
                    <Route path="/updateAccountantStatus" exact component={UpdateAccountantStatus}/>
                    <Route path="/updateSuperVisorStatus" exact component={UpdateSuperVisorStatus}/>
                    <Route path="/findByWeek" exact component={FindByWeek}/>
                    <Route path="/findByCodingTask" exact component={FindByCodingTask}/>
                    <Route path="/findByRequirementGathering" exact component={FindByRequirementGathering}/>
                    <Route path="/findByTesting" exact component={FindTesting}/>
                    <Route path="/findByMeeting" exact component={FindMeeting}/>      
            </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
