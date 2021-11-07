import './GlobalExercise.css';
import { AttendanceArray } from './Attendance';

const GlobalExercise = ({ attendance, status }) => { 
    return (
        <div className="widgetSm">
            <ul className="widgetSmList">
                {AttendanceArray &&
                    AttendanceArray.map((item) => {
                        const {
                            id,
                            name,
                            avatar,
                            notAttempted,
                            submitted,
                            approved,
                            status,
                        } = item;
                        return (
                            <li key={id} className="widgetSmListItem">
                                <div className="student--details--container">
                                    {' '}
                                    <img
                                        src={avatar}
                                        alt={name}
                                        className="widgetSmImg"
                                    />
                                    <div className="widgetSmUser">
                                        <span className="widgetSmUsername">
                                            {name}
                                        </span>
                                    </div>
                                </div>
                                <div className="stats-student--container">
                                    <span className="widgetSmButton-notattempted">
                                        {notAttempted}
                                    </span>{' '}
                                    <span className="widgetSmButton-submitted">
                                        {submitted}
                                    </span>
                                    <span className="widgetSmButton-approved">
                                        {approved}
                                    </span>
                                </div>
                                <div className="status--container">
                                    {' '}
                                    <button className="widgetSmButton status">
                                        {item.status}
                                    </button>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default GlobalExercise;
