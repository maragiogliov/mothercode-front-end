import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import '../../styles/heatmap/_heatmap.scss';

const colors = [
    'rgb(211, 92, 92)',
    'rgb(243, 243, 130)',
    'rgb(131, 250, 131)',
    'rgb(248, 248, 251)',
];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function renderDay(day) {
    const date = day.getDate();
    const color = colors[getRandomInt(2)];

    return (
        <div className="day" style={{ backgroundColor: color }}>
            {date}
        </div>
    );
}

export default function Heatmap() {
    return <DayPicker renderDay={renderDay} numberOfMonths={1} />;
}
