import React, { useContext, useState } from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import '../../styles/calendar/_calendar.scss';
import { MdDragHandle, MdDeleteForever, MdClose } from 'react-icons/md';
import {
    // IoMdTime,
    // IoMdList,
    // IoMdBookmark,
    IoIosCheckmarkCircle,
} from 'react-icons/io';

const labelsClasses = [
    'indigo',
    'gray',
    'green',
    'blue',
    'red',
    'purple',
    '#ffaa1d',
];

const EventModal = () => {
    const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
        useContext(GlobalContext);

    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : ''
    );
    const [description, setDescription] = useState(
        selectedEvent ? selectedEvent.description : ''
    );
    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent
            ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
            : labelsClasses[0]
    );

    function handleSubmit(e) {
        e.preventDefault();
        const calendarEvent = {
            title,
            description,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),
        };
        if (selectedEvent) {
            dispatchCalEvent({ type: 'update', payload: calendarEvent });
        } else {
            dispatchCalEvent({ type: 'push', payload: calendarEvent });
        }

        setShowEventModal(false);
    }
    return (
        <div className="event__modal ">
            <p className="current-date-note">
                {daySelected.format('dddd, MMMM DD')}
            </p>
            <form className="event__modal--form">
                <header className=" form__header">
                    {/* <span className="dragIcon">
                        <MdDragHandle />
                    </span> */}

                    <div>
                        {selectedEvent && (
                            <span
                                onClick={() => {
                                    dispatchCalEvent({
                                        type: 'delete',
                                        payload: selectedEvent,
                                    });
                                    setShowEventModal(true);
                                }}
                                className="deleteIcon"
                            >
                                <MdDeleteForever />
                            </span>
                        )}
                        <button
                            className="closs"
                            onClick={() => setShowEventModal(true)}
                        >
                            <span className="closeIcon">
                                <MdClose />
                            </span>
                        </button>
                    </div>
                </header>

                <div className=" form__body">
                    <div className="form__body--one">
                        <div> Create a note</div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={title}
                            required
                            className="form__input--title"
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <input
                            type="text"
                            name="description"
                            placeholder="Add a description"
                            value={description}
                            required
                            className="form__input--description"
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <div className="form__body--partTwo">
                            {labelsClasses.map((lblClass, i) => (
                                <span
                                    key={i}
                                    onClick={() => setSelectedLabel(lblClass)}
                                    style={{ backgroundColor: `${lblClass} ` }}
                                    className="form__lbl"
                                >
                                    {selectedLabel === lblClass && (
                                        <span className="checkedIcon">
                                            <IoIosCheckmarkCircle />
                                        </span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <footer className=" footer">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className=" save "
                    >
                        Add to Calendar
                    </button>
                </footer>
            </form>
        </div>
    );
};

export default EventModal;
