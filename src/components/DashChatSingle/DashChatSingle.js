import './DashChatSingle.css';

const DashChatSingle = ({
    feedback,
    senderHandler,
    avatarHandler,
    studentName,
}) => {
    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">{studentName && studentName}</span>
            <ul>
                <div className="feedback--container dash">
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
                         
                </div>{' '}
                       
            </ul>
        </div>
    );
};

export default DashChatSingle;
