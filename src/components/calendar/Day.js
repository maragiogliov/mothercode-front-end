import dayjs from 'dayjs';
import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import '../../styles/calendar/_calendar.scss';

const Day = ({ day, rowIdx, idx }) => {
    const [dayEvents, setDayEvents] = useState([]);
    const {
        setDaySelected,
        setShowEventModal,
        filteredEvents,
        setSelectedEvent,
        searchResult,
    } = useContext(GlobalContext);

    useEffect(() => {
        const events = filteredEvents.filter(
            (evt) =>
                dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY')
        );
        setDayEvents(events);
    }, [filteredEvents, day]);

    const getCurrentDayClass = () => {
        return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? '' : '';
    };

    console.log(searchResult);
    console.log(idx);
    return (
        <div className="day__container">
            <header className="day__container--header ">
                {rowIdx === 0 && (
                    <p className="day__text">
                        {day.format('ddd').toUpperCase()}
                    </p>
                )}
                <p className={`day__num  ${getCurrentDayClass()}`}>
                    {day.format('DD')}
                </p>
            </header>
            <div
                className="day__container--body"
                onClick={() => {
                    setDaySelected(day);
                    setShowEventModal(false);
                }}
            >
                {dayEvents.map((evt, idx) => {
                    return searchResult.includes(
                        Number(day.format('DD')) - 1
                    ) || searchResult.length === 0 ? (
                        <div
                            key={idx}
                            onClick={() => setSelectedEvent(evt)}
                            className={` day__container--event`}
                            style={{ backgroundColor: `${evt.label} ` }}
                        >
                            {evt.title}
                        </div>
                    ) : (
                        ''
                    );
                })}
            </div>
        </div>
    );
};

export default Day;
