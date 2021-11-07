import { useContext, useState } from 'react';

import { FaBell, FaLeanpub } from 'react-icons/fa';
//import { HiLogin } from 'react-icons/hi';
import '../../styles/navbar/_navbar.scss';
import DropdownMenu from './Dropdown/DropdownMenu';
import NavItem from './NavItem';
import Toggle from './Toggle';
import Avatar from './Avatar';

import { UserContext } from '../../contexts/UserContext';

const Navbar = (props) => {
    const [user] = useContext(UserContext);

    return (
        <nav className="navbar">
            <div className="navbar--logo"></div>
            <Toggle user={user} />
            <div className="navbar--avatar">
                <Avatar user={user}>
                    <DropdownMenu></DropdownMenu>
                </Avatar>
            </div>
        </nav>
    );
};

export default Navbar;
