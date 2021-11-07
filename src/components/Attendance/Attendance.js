import '../WidgetSm/widgetSm.css';
import { Chunks } from '../CircularProgress/CircularProgress';

export default function Attendance({ members }) {
    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Attendance</h3>
            <table className="widgetLgTable">
                <Chunks members="3" />
            </table>
        </div>
    );
}
