import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from 'react-icons/gi';
import * as RiIcons from 'react-icons/ri';
import * as GoIcons from 'react-icons/go';
import logo from './images/logo.png';
export const SidebarData = [
    {
        title: '',
        path: '',
        icon: <img className="logo-image" src={logo} />,
        cName: 'nav-text',
    },
    {
        title: '',
        path: '/calendar',
        icon: <GoIcons.GoCalendar />,
        cName: 'nav-text',
    },
    {
        title: '',
        path: '/dash',
        icon: <FaIcons.FaRunning />,
        cName: 'nav-text',
    },
    {
        title: '',
        path: '/student',
        icon: <FaIcons.FaCode />,
        cName: 'nav-text',
    },
    {
        title: '',
        path: '/livecode',
        icon: <GiIcons.GiTeacher />,
        cName: 'nav-text',
    },
    {
        title: '',
        path: '/whiteboard',
        icon: <RiIcons.RiPaintBrushLine />,
        cName: 'nav-text',
    },
];
