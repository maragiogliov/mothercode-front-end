import React, { useContext, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../../styles/sidebar/_sidebar.scss';
import { IconContext } from 'react-icons';
import Avatar from './Avatar';
import { UserContext } from '../../contexts/UserContext';
import DropdownMenu from '../Navigation-Bar/Dropdown/DropdownMenu';

const Navbar = () => {
    const [user] = useContext(UserContext);

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar-1">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>

                    <div className="navbar--avatar">
                        <Avatar user={user}>
                            <DropdownMenu></DropdownMenu>
                        </Avatar>
                    </div>
                </div>

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link
                                        to={
                                            user.userType === 'teacher' &&
                                            index === 3
                                                ? '/teacher'
                                                : item.path
                                        }
                                    >
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
};

export default Navbar;
