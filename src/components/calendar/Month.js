import React from 'react';
import Day from './Day';
import '../../styles/calendar/_calendar.scss';

const Month = ({ month }) => {
    return (
        <div>

            <div className=" month flex-1 grid grid-cols-7 grid-rows-5">
                {month.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((day, idx) => (
                            <Day idx={day - 1} day={day} key={idx} rowIdx={i} />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Month;
