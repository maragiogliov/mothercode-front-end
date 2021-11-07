import './DashStudentChat.css';

export default function DashStudentChat({
    classExercises,
    setStudentIndex,
    index,
}) {
    return (
        <div className="widgetSm">
            <ul className="widgetSmList">
                {classExercises &&
                    classExercises.map((item, index) => {
                        return (
                            <>
                                {' '}
                                <li
                                    onClick={() => setStudentIndex(index)}
                                    key={index}
                                    className="widgetSmListItem"
                                >
                                    <img
                                        src={item.student.avatar}
                                        alt={item.student.name}
                                        className="widgetSmImg"
                                    />

                                    {/* <span className="widgetSmUsername">
                                    {item.student.name}
                                </span> */}
                                </li>
                            </>
                        );
                    })}
            </ul>
        </div>
    );
}
