import { parsedEvents } from './calendarData.js';

export const hastSearchCalendar = (str) => {
    const words = str
        .split(' ')
        .map(function (value, index) {
            return '(?=(.)*?\\b(' + value + ')\\b)';
        })
        .join('');
    const pattern = new RegExp(`${words}((.)+)`, 'g');
    /////////////////////////////
    const foundInd = [];
    parsedEvents.forEach((item, index) => {
        if (item.hashtags.join(' ').match(pattern) !== null) {
            foundInd.push(index);
        }
    });
    return foundInd;
};

// const result = hastSearchCalendar('loop index');
// console.log(result);
