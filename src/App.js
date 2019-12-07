import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import HeaderLinks from './components/Header/HeaderLinks';
import AttendeeForm from './pages/attendform';
import TalkForm from './pages/talkform';
import AssignedTalkForm from './pages/assigntalkform';
import AllTalks from './pages/alltalks';
import AllAttendees from './pages/allattendees';
import AssignedTalks from './pages/assignedtalks';

export default function  App (props) {
    const { ...rest } = props;
    return(
    <Router>
    <div>
    <Header
        absolute
        color="transparent"
        brand="The Handyman"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
    <Route exact path='/' component={AttendeeForm} />
    <Route path='/addtalk' component={TalkForm} />
    <Route path='/talk/assign' component={AssignedTalkForm} />
    <Route path='/talklist' component={AllTalks} />
    <Route path='/attendeelist' component={AllAttendees} />
    <Route path='/assignedtalk' component={AssignedTalks} />
    </div>
    </Router>
    )
}; 
