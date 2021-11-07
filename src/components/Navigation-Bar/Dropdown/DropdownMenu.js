import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';
import { HiUserGroup, HiLogout } from 'react-icons/hi';
import { FaUser } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';

import { UserContext } from '../../../contexts/UserContext';

const DropdownMenu = (props) => {
    const history = useHistory();
    const [user, setUser] = useContext(UserContext);
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
    }, []);

    const logOutHandler = (e) => {
        setUser({});
        localStorage.removeItem('jwt');
        axios.put(`http://localhost:5000/groups/6173b8281e3416e90891a71a`, {
            user: user.id,
            action: 'logout',
        });
        history.push('/');
    };

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }
    const DropdownItem = (props) => {
        return (
            <a
                href={props.link}
                className="menu-item"
                // onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
                onClick={props.action}
            >
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
            </a>
        );
    };
    return (
        <div
            className="dropdown"
            style={{ height: menuHeight }}
            ref={dropdownRef}
        >
            <CSSTransition
                in={activeMenu === 'main'}
                timeout={500}
                classNames="menu-primary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    {/* <DropdownItem leftIcon={<FaUser />}>
                        Ahmed Elarosi
                    </DropdownItem> */}
                    <DropdownItem leftIcon={<FaUser />}>
                        {user.name}
                    </DropdownItem>
                    <DropdownItem leftIcon={<HiUserGroup />}>
                        FBW46-1
                    </DropdownItem>
                    <DropdownItem
                        action={logOutHandler}
                        leftIcon={<HiLogout />}
                    >
                        Log Out
                    </DropdownItem>
                </div>
            </CSSTransition>
        </div>
    );
};

export default DropdownMenu;
