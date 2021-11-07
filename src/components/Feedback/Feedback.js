import '../../styles/feedback/_feedback.scss';

const Feedback = ({ comments, user, id, cls }) => {
    const senderHandler = (item) => {
        console.log(item);
        let cls;
        if (item.user.id === '616dee79be8fb7930f98c319') cls = 'received';
        else if (id === item.user.id) cls = 'sent';
        else cls = 'received';
        console.log(cls);
        return cls;
    };
    const avatarHandler = (item) => {
        let avatar;
        if (item.user === '616dee79be8fb7930f98c319')
            avatar =
                'https://images.discordapp.net/avatars/692723897887490138/5d4e9766c52fa9142924df3bb9a1d514.png?size=128';
        if (user && item) {
            if (user.id === item.user.id) avatar = item.user.avatar;
            else avatar = item.user.avatar;
            console.log(avatar);
        } else {
            avatar = 'https://www.w3schools.com/howto/img_avatar.png';
        }
        return avatar;
    };

    return (
        <aside className={`feedback--container ${cls}`}>
            <div className="feedback--header">
                <h2>Feedback Log</h2>
            </div>

            {comments.map((item, index) => (
                <div
                    key={index}
                    class={`card__item message ${senderHandler(item)}`}
                >
                    {/* <h2 className="day-heading">{index === 0 ? 'bob' : ''}</h2> */}
                    {item.comment && (
                        <img height="25px" src={avatarHandler(item)} alt="" />
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
    );
};

export default Feedback;
