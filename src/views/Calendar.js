import React, { useState, useEffect, useContext } from 'react';
import { getMonth } from '../util';
import CalendarHeader from '../components/calendar/CalendarHeader';
import Month from '../components/calendar/Month';
import GlobalContext from '../contexts/GlobalContext';
import EventModal from '../components/calendar/EventModal';


import '../styles/calendar/_calendar.scss';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);
    console.log(currentMonth);
    return (
        <>
            <div className="container-calendar">
                {showEventModal && <EventModal />}
                <div className="calendar">
                    <div className="calendar__form">
                        <CalendarHeader />
                        <div className="calendar__form--item">
                            <Month month={currentMonth} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calendar;
