import React from 'react';

// Import react-circular-progressbar module and styles
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Animation
// import { easeQuadInOut } from 'd3-ease';
// import AnimatedProgressProvider from './AnimatedProgressProvider';
import ChangingProgressProvider from './ChangingProgressProvider';

// Radial separators
import RadialSeparators from './RadialSeparators';

// const classSize = 5;
// const submitted = 4;
// const approved = 2;
// const submittedPercentage = (submitted / classSize) * 100;
// const approvedPercentage = (approved / submitted) * 100;
// const percentage = (approved / submitted) * 100;

export const Concentric = ({ submitted, approved, classSize }) => (
    <Example label="Daily Exercises">
        <CircularProgressbarWithChildren
            value={(submitted / classSize) * 100}
            strokeWidth={8}
            text={`${approved}/${submitted}`}
            styles={buildStyles({
                pathColor: '#f00',
                trailColor: 'transparent',
            })}
        >
            <div style={{ width: '84%' }}>
                <CircularProgressbar
                    value={(approved / classSize) * 100}
                    styles={buildStyles({
                        pathColor: '#56b55d',
                        trailColor: 'transparent',
                    })}
                />
            </div>
        </CircularProgressbarWithChildren>
    </Example>
);

function Example(props) {
    return (
        <>
            <hr style={{ border: '2px solid #ddd' }} />
            <div style={{ display: 'flex' }}>
                <div style={{ width: 200, height: 200 }}>{props.children}</div>
                <div style={{ width: '10%' }}>
                    <h3 className="h2">{props.label}</h3>
                    <p>{props.description}</p>
                </div>
            </div>
        </>
    );
}
export const Default = () => (
    <Example label="Daily Exercises">
        <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
            {(percentage) => (
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                />
            )}
        </ChangingProgressProvider>
    </Example>
);
export const Background = ({ total }) => (
    <Example label="Weekly Exercises">
        <CircularProgressbar
            value={total}
            text={total}
            background
            backgroundPadding={6}
            styles={buildStyles({
                backgroundColor: '#3e98c7',
                textColor: '#fff',
                pathColor: '#fff',
                trailColor: 'transparent',
            })}
        />
    </Example>
);

export const Chunks = ({ members }) => {
    return (
        <Example label="Attendance">
            <CircularProgressbarWithChildren
                value={members * 20}
                text={`${members}`}
                strokeWidth={10}
                styles={buildStyles({
                    strokeLinecap: 'butt',
                })}
            >
                <RadialSeparators
                    count={5}
                    style={{
                        background: '#fff',
                        width: '2px',
                        // This needs to be equal to props.strokeWidth
                        height: `${10}%`,
                    }}
                />
            </CircularProgressbarWithChildren>
        </Example>
    );
};
