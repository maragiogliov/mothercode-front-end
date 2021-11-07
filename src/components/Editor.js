import { useContext, useEffect, useState } from 'react';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/paraiso-light.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag.js';

import { Controlled as ControlledEditor } from 'react-codemirror2';

import { UserContext } from '../contexts/UserContext';

export default function Editor(props) {
    const [isDark, setIsDark] = useState(true);
    const [user] = useContext(UserContext);
    const { language, value, onChange } = props;
    function handleChange(editor, data, value) {
        onChange(value);
    }

    useEffect(() => {
        console.log(user);
        setIsDark(user.theme === 'material');
    }, []);

    useEffect(() => {
        console.log(user);
        setIsDark(user.theme === 'material');
    }, [user]);
    return (
        <div
            className={`editor-container font-${user.font} ${
                isDark ? 'material' : 'light-theme'
            }`}
            id={language}
        >
            <ControlledEditor
                onBeforeChange={handleChange}
                value={value}
                className="code-mirror-wrapper"
                options={{
                    autoRefresh: true,
                    scrollbarStyle: null,
                    autofocus: true,
                    lineWrappings: true,
                    lint: true,
                    mode: language,
                    theme: props.theme,
                    lineNumbers: true,
                    cursorHeight: 0.85,
                    readOnly: props.bool,
                    autoCloseTags: true,
                }}
            />
        </div>
    );
}
