import {
    BrowserRouter,
    Redirect,
    Route,
    Switch,
    useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

import Login from './views/Login';
import Student from './views/Student';
import Teacher from './views/Teacher';
import Dashboard from './views/Dashboard';
import SignUp from './views/SignUp';
import LiveCode from './views/LiveCode';
import ExerciseCode from './views/ExerciseCode';
//import Notifications from './components/Notifications/Notifications'
import Admin from './views/Admin';
import Container from './components/whiteboard/Container';
import Drag from './views/Drag';
import Comment from './components/Comment/Comment';
import Calendar from './views/Calendar';

import './App.scss';
import Navbar from './components/Navigation-Bar/Navbar';
import ProgressBar from './components/Progress bar/ProgressBar';

//import { useAuth } from './contexts/AuthContext';
import Sidebar from './views/Sidebar';

// function ProtectedRoute(props) {
//     const { currentUser } = useAuth();
//     const { path } = props;
//     const location = useLocation();

//     if (
//         path === '/login' ||
//         path === '/forgot-password' ||
//         path === '/reset-password'
//     ) {
//         return currentUser ? (
//             <Redirect to={location.state?.from ?? '/profile'} />
//         ) : (
//             <Route {...props} />
//         );
//     }
//     return currentUser ? (
//         <Route {...props} />
//     ) : (
//         <Redirect
//             to={{
//                 pathname: '/login',
//                 state: { from: path },
//             }}
//         />
//     );
// }

function App() {
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('jwt'));
        if (token) {
            axios('http://localhost:5000/users/jwt', {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            })
                // .then((data) => console.log(data.data))
                .catch((err) => console.log(err));
        }
    }, []);

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <div className="display--test">
                        <Login />
                    </div>
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/calendar">
                    <Sidebar />
                    <Calendar />
                </Route>
                <Route path="/sidenew">
                    <Sidebar />
                </Route>
                <Route path="/comment">
                    <Comment />
                </Route>
                <Route path="/drag">
                    <Drag />
                </Route>
                <Route path="/admin">
                 
                    <Admin />
                </Route>

                <Route path="/dash">
                    <Sidebar />
                    {/* <ProgressBar done="70" /> */}
                    <Dashboard />
                </Route>
                <Route path="/student">
                    <Sidebar />

                    <Student />
                </Route>
                <Route path="/whiteboard">
                    <Sidebar />
                    <Container />
                </Route>

                <Route path="/teacher">
                    <Sidebar />

                    <Teacher />
                </Route>
                <Route path="/livecode">
                    <Sidebar />

                    <LiveCode index={8} />
                </Route>
                <Route path="/exercises">
                    <Sidebar />

                    <ExerciseCode index={8} />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
