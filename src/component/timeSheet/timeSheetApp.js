import React, { Component } from 'react'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import AllAccountantApproved from './AllAccountantApproved.js'
import DisplayEmployeeTimeSheet from './DisplayEmployeeTimeSheet.js'
import DisplayTimeSheet from './DisplayTimeSheet.js'
import SuperIdApproved from './SuperIdApproved.js'
import SuperDisapproved from './SuperDisapproved.js'
import SuperidWaiting from './SuperidWaiting.js'
import TimeSheet from './TimeSheet.js'
import UpdateTimeSheet from './UpdateTimeSheet.js'
import UpdateAccountantStatus from './UpdateAccountantStatus.js'
import UpdateSuperVisorStatus from './UpdateSuperVisorStatus.js'
import FindByWeek from './FindByWeek.js'
import FindByCodingTask from './FindByCodingTask.js'
import FindByRequirementGathering from './FindByRequirementGathering'
import FindTesting from './FindTesting.js'
import FindMeeting from './FindMeeting.js'
import AllAccoutantDisApproved from './AllAccoutantDisApproved.js'
import SavetimeSheet from './SavetimeSheet.js'
export default class TimeSheetApp extends Component {
    render() {
        return (
            <div className="timeSheet">
                <Router>
                    <>
                    <Route path="/" exact component={TimeSheet}/> 
                    <Route path="/timeSheet" exact component={TimeSheet}/>
                    <Route path="/saveTimeSheet" exact component={SavetimeSheet}/>
{/*Not Working*/ }  <Route path="/particulartimeSheet" exact component={DisplayTimeSheet}/>
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
                    </>
                </Router>
                {/* <Switch>
                    <Router>
                        <>
                    <Route path="/displayTimeSheet" component={DisplayTimeSheet}/>
                        </>
                    </Router>
                </Switch> */}
                {/*Not Working*/}
                {/* <DisplayTimeSheet/> */}
                {/* Working*/}
                {/* <TimeSheetApp/>
                <DisplayEmployeeTimeSheet/>
                <AllAccountantApproved/>
                <SuperidWaiting/>
                <SuperIdApproved/>
                <SuperDisapproved/>
                <TimeSheetApp/> */}
            </div>
        )
    }
}
