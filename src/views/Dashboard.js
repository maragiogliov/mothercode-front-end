import { useState, useEffect, useContext } from 'react';
//import { useHistory } from 'react-router-dom';

import axios from 'axios';

//import { useAuth } from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';

import '../styles/dashboard/_dashboard.scss';
import Button from '../components/Button';
import Field from '../components/Field';
import WidgetSm from '../components/DashBoxSm/WidgetSm';
import Heatmap from '../components/HeatMap/Heatmap';
import DailyStatus from '../components/DailyStatus/DailyStatus';
import DashStudentChat from '../components/DashStudentChat/DashStudentChat';
import DashChatSingle from '../components/DashChatSingle/DashChatSingle';
import GlobalExercise from '../components/GlobalExercise/GlobalExercise';
import {
    Concentric,
    Chunks,
    Background,
} from '../components/CircularProgress/CircularProgress';

const Dashboard = () => {
    const [chatStudent, setChatStudent] = useState('');
    //const [chatGroup, setChatGroup] = useState('');
    //const [done, setDone] = useState(0);
    const [percentage, setPercentage] = useState(77);
    const [classExercises, setClassExercises] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [studentIndex, setStudentIndex] = useState(0);
    const [attendance, setAttendance] = useState([]);
    const [status, setStatus] = useState([]);
    const [stats, setStats] = useState({ approved: 0, submitted: 0 });

    const studentChatHandler = ({ target: { value } }) => {
        setChatStudent(value);
    };
    // const groupChatHandler = ({ target: { value } }) => {
    //     setChatGroup(value);
    // };
    const studentChatSubmit = (evt) => {
        // const {
        //     target: { value },
        // } = evt;
        evt.preventDefault();

        axios
            .put(
                `http://localhost:5000/exercises/teacher/${classExercises[studentIndex].id}`,
                { user: '615ed6cccf465b99b60dbf37', comment: chatStudent }
            )
            .then((res) => setChatStudent(''))
            .then(() => {
                async function fetchData() {
                    try {
                        await axios
                            .get('http://localhost:5000/exercises')
                            .then((res) => {
                                setClassExercises(res.data);
                                setFeedback(res.data[studentIndex]?.feedback);
                            })
                            .catch((err) => console.log(err));
                        await axios
                            .get(
                                'http://localhost:5000/groups/6173b8281e3416e90891a71a/attendance'
                            )
                            .then((res) => setAttendance(res.data))
                            .catch((err) => console.log(err));
                        await axios
                            .get(
                                'http://localhost:5000/exercises/6173b8281e3416e90891a71a/status'
                            )
                            .then((res) => {
                                setStatus(res.data.statusArray);
                                setStats(res.data.stats);
                            })
                            .catch((err) => console.log(err));
                    } catch (err) {
                        console.log(err);
                    }
                }
                fetchData();
            })
            .catch((err) => console.log(err));
    };
    // const groupChatSubmit = () => {
    //     console.log(chatGroup);
    // };

    useEffect(() => {
        async function fetchData() {
            try {
                await axios
                    .get('http://localhost:5000/exercises')
                    .then((res) => {
                        setClassExercises(res.data);
                        setFeedback(res.data[0]?.feedback);
                    })
                    .catch((err) => console.log(err));
                axios
                    .get(
                        'http://localhost:5000/groups/6173b8281e3416e90891a71a/attendance'
                    )
                    .then((res) => setAttendance(res.data))
                    .catch((err) => console.log(err));
                await axios
                    .get(
                        'http://localhost:5000/exercises/6173b8281e3416e90891a71a/status'
                    )
                    .then((res) => {
                        setStatus(res.data.statusArray);
                        setStats(res.data.stats);
                    })
                    .catch((err) => console.log(err));
                await axios
                    .get(
                        'http://localhost:5000/percentages/617a4d57c667e953ea55063e'
                    )
                    .then((res) => console.log('HHHHHHHH'))
                    .catch((err) => console.log(err));

                // console.log(feedback);
                // const approved = classExercises.filter(
                //     (item) => item.isApproved
                // );
                // setDone(approved.length);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                setFeedback(classExercises[studentIndex || 0]?.feedback);
                // const approved = classExercises.filter(
                //     (item) => item.isApproved
                // );
                // setDone(approved.length);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [studentIndex]);
    // const history = useHistory();
    const [user] = useContext(UserContext);
    // if (!user.auth) history.push('/');

    useEffect(() => {}, []);
    const senderHandler = (item) => {
        const id = '615ed6cccf465b99b60dbf37';

        let cls;
        if (item.user.id === '616dee79be8fb7930f98c319') cls = 'received';
        else if (id === item.user.id) cls = 'sent';
        else cls = 'received';
        return cls;
    };
    const avatarHandler = (item) => {
        let avatar;
        if (item.user === '616dee79be8fb7930f98c319') avatar = 'bot-comment';
        if (user && item) {
            if (user.id === item.user.id) avatar = item.user.avatar;
            else avatar = item.user.avatar;
        } else {
            avatar = 'https://www.w3schools.com/howto/img_avatar.png';
        }
        return avatar;
    };
    const changeView = () => {
        console.log('class view');
    };
    return (
        <div className="dash">
            <section className="dashboard--header">
                <div className="dashboard--header__box_one">
                    <div className="dashboard--header__box_one">
                        <Chunks members={attendance.length || 0} />
                    </div>
                </div>
                <div className="dashboard--header__box_two">
                    <Background total={percentage} />
                </div>
                <div className="dashboard--header__box_two">
                    <Concentric
                        approved={stats.approved}
                        submitted={stats.submitted}
                        classSize={5}
                    />
                </div>
            </section>

            <section className="dashboard--second">
                <div className="dashboard--second--one">
                    <DailyStatus status={status} />
                </div>
                <div className="dashboard--second--two">
                    {' '}
                    <WidgetSm attendance={attendance} />
                </div>
                <div className="dashboard--second--three">
                    <div className="dash--select">
                        <select
                            onChange={(e) => setStudentIndex(e.target.value)}
                            className={`student-list`}
                            id="students"
                            value={studentIndex}
                        >
                            {classExercises &&
                                classExercises.map((obj, index) => {
                                    return (
                                        <option value={index} key={index}>
                                            {obj.student && obj.student.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>{' '}
                    <aside className={`feedback--container dash-dash`}>
                        <div className="feedback--header">
                            <h2>Feedback Log</h2>
                        </div>

                        {feedback &&
                            feedback?.map((item, index) => (
                                <div
                                    key={index}
                                    class={`card__item message ${senderHandler(
                                        item
                                    )}`}
                                >
                                    {/* <h2 className="day-heading">{index === 0 ? 'bob' : ''}</h2> */}
                                    {item.comment && (
                                        <img
                                            height="25px"
                                            src={avatarHandler(item)}
                                            alt=""
                                        />
                                    )}
                                    <div class="card__item-info">
                                        {item.comment && (
                                            <div className="message--box">
                                                {/* <h3 className="feedback--name">
                                    {item.user.name !== 'Exercise Bot'
                                        ? item.user.name
                                        : ''}
                                </h3> */}
                                                <p className="feedback--comment">
                                                    {item.comment}
                                                </p>
                                            </div>
                                        )}
                                        <div class="card__item-info__meta">
                                            <p className="feedback--time">
                                                {/* {Date(item.timeSent)} */}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </aside>
                </div>
                <div className="chat--input-dash">
                    <form
                        classname="message-dash-form"
                        onSubmit={studentChatSubmit}
                    >
                        {' '}
                        <Field
                            className="dash--input"
                            name={`to ${
                                classExercises[studentIndex || 0]?.student?.name
                            }`}
                            type="text"
                            value={chatStudent}
                            action={studentChatHandler}
                            cls="dash--input"
                            boxClass="dash--chat__box"
                        />
                        <Button cls="submit" type="submit">
                            Send
                        </Button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
