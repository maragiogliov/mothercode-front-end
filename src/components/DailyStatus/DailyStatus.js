import './DailyStatus.css';

const DailyStatus = ({ status }) => {
    return (
        <div className="widgetSm">
            <h3 className="widgetLgTitle">Daily Exercise Status</h3>
            <ul className="widgetSmList">
                {status &&
                    status?.map((item) => {
                        return (
                            <li className="widgetSmListItem">
                                <img
                                    src={item?.student?.avatar}
                                    alt={item?.student?.name}
                                    className="widgetSmImg"
                                />
                                <div className="widgetSmUser">
                                    <span className="widgetSmUsername">
                                        {item?.student?.name}
                                    </span>
                                </div>

                                <button
                                    className={`widgetSmButton ${
                                        item.studentStatus === 'Approved'
                                            ? 'green-status'
                                            : ''
                                    }`}
                                >
                                    {item?.studentStatus}
                                </button>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default DailyStatus;
