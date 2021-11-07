import React, { useState, useEffect } from 'react';
import axios from 'axios';
import checkIcon from './assets/check.svg';
import '../../styles/notifications/_notifications.scss';

const Notifications = ({ toastList, exerciseId, action }) => {
    const [list, setList] = useState([
        {
            id: 1,
            title: 'New Message',
            description: 'your exercise status has changed',
            backgroundColor: '#56b55d',
            icon: checkIcon,
        },
    ]);
    const [isNotification, setisNotification] = useState(true);

    useEffect(() => {
        //         if(exerciseId){
        //  axios
        //      .get(`http://localhost:5000/exercises/${exerciseId}/feedback`)
        //      .then((res) => {
        //          setisNotification(res.data.notification);
        //      });
        //         }
    }, []);

    useEffect(() => {
        setList([...toastList]);

        // eslint-disable-next-line
    }, [toastList]);

    // const deleteToast = (id) => {
    //     const listItemIndex = list.findIndex((e) => e.id === id);
    //     const toastListItem = toastList.findIndex((e) => e.id === id);
    //     list.splice(listItemIndex, 1);
    //     toastList.splice(toastListItem, 1);
    //     setList([...list]);
    //     axios
    //         .put(
    //             'http://localhost:5000/exercises/6170f2bf70331224e57063ce/feedback'
    //         )
    //         .then((res) => {
    //             console.log(res.data);
    //         });
    // };

    return (
        <>
            <div className={`notification-container top-right `}>
                {console.log(isNotification)}
                {list.map((toast, i) => (
                    <div
                        onClick={action}
                        key={i}
                        className={`button--notification notification toast top-right`}
                        style={{ backgroundColor: toast.backgroundColor }}
                    >
                        <div className="notification-image">
                            <img src={toast.icon} alt="" />
                        </div>
                        <div>
                            <p className="notification-title">{toast.title}</p>
                            {/* <p className='notification-message'>{toast.description}</p> */}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Notifications;
