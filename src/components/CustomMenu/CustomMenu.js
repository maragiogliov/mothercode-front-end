import { useContext, useState } from 'react';

import { UserContext } from '../../contexts/UserContext';

import '../../styles/Custom/_custom.scss';

const CustomMenu = ({ cls }) => {
    const [user, setUser] = useContext(UserContext);
    const changeHandler = (e) => {
        //e.stopPropagation();
        const font = `${e.target.value}`;
        console.log(font);
        setUser({ ...user, font });
    };
    const themeHandler = (e) => {
        const theme = e.target.value || 2;
        console.log(theme);
        setUser({ ...user, theme });
    };
    return (
        <div className={`custom--menu ${cls}`}>
            <div className="custom--top">
                <label htmlFor="editor-theme"></label>
                <select
                    className="dropdown--students custom"
                    id="editor-theme"
                    onChange={(e) => themeHandler(e)}
                    value={user.theme}
                >
                    <option value="material">Dark</option>
                    <option value="paraiso-light">Light</option>
                </select>
            </div>
            <div className="custom--bottom">
                <label htmlFor="font-size">
                    <input
                        type="range"
                        class="range"
                        min="1"
                        max="5"
                        value={user.font || 2}
                        id="font-size"
                        onChange={changeHandler}
                    />
                    {`Font: ${user.font}`}
                </label>
            </div>
        </div>
    );
};

export default CustomMenu;
