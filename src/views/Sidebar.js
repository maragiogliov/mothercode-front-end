import React, { useContext } from 'react';
import '../styles/sidebar/_sidebar.scss';
import Navbar from '../components/Sidebar/Sidebar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
} from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
// import Home from '../pages/Home';
// import Student from './Student';
// import Container from '../components/whiteboard/Container';
// import Calendar from './Calendar';
// import Teacher from './Teacher';

const Sidebar = () => {
    return (
        <>
            {/* <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/student" component={Student} />
                    <Route path="/calendar" component={Calendar} />
                    <Route path="/whiteboard" component={Container} />
                    <Route path="/teacher" component={Teacher} />
                </Switch>
            </Router> */}

            <div>
                <Navbar />
                <div>
                    <NavLink to="/student" />
                    <NavLink to="/calendar" />
                    <NavLink to="/whiteboard" />
                    <NavLink to="/teacher" />
                </div>
            </div>
        </>
    );
};

export default Sidebar;
