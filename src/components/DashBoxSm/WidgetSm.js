import './widgetSm.css';

export default function WidgetSm({ attendance }) {
    return (
        <div className="widgetSm logged">
            <h3 className="widgetLgTitle">Attendance</h3>
            <ul className="widgetSmList logged">
                {attendance &&
                    attendance.map((item) => {
                        const { id, name, avatar } = item;
                        return (
                            <li key={id} className="widgetSmListItem logged">
                                <div className="widgetSmUser">
                                    <img
                                        src={avatar}
                                        alt={name}
                                        className="widgetSmImg"
                                    />
                                    <span className="widgetSmUsername">
                                        {name}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        <img
                                        className="online-dot"
                                            height="25px"
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Location_dot_green.svg/768px-Location_dot_green.svg.png"
                                        />
                                    </span>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}
