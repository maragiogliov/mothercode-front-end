import { useState, useEffect, useContext } from 'react';

import { UserContext } from '../contexts/UserContext';

import { ExerciseCodeArray } from '../Data/ExerciseCodeData';
import Editor from '../components/Editor';
import Output from '../components/Output';
import Button from '../components/Button';

import CustomMenu from '../components/CustomMenu/CustomMenu';
import dragger from '../helpers/draggable';
import { viewHandler } from '../helpers/helpers';
import { GoSettings } from 'react-icons/go';
import '../styles/editor/_student.scss';

const LiveCode = ({ index }) => {
    const [setting, setSetting] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const [exerciseIndex, setExerciseIndex] = useState(index);

    const [state, setState] = useState([]);
    const [srcDoc, setSrcDoc] = useState('');
    const [editor, setEditor] = useState('xml');

    useEffect(() => {
        document.getElementById('xml').classList.add('view-language');
        const editorButtons = document.querySelectorAll(
            '.three-editor-buttons'
        );
        editorButtons.forEach((item) => {
            if (item.name === 'xml') item.classList.add('button-active');
        });
        dragger();
        const {
            solution: { HTML, CSS, JS },
        } = ExerciseCodeArray[exerciseIndex];

        setState({ HTML, CSS, JS });
    }, []);

    useEffect(() => {
        const {
            solution: { HTML, CSS, JS },
        } = ExerciseCodeArray[exerciseIndex];
        setState({ HTML, CSS, JS });
        const htmlEditor = document.getElementById('xml');
        htmlEditor && htmlEditor.classList.add('view');
    }, [exerciseIndex]);

    useEffect(() => {
        const { HTML, CSS, JS } = state;
        const timeout = setTimeout(() => {
            setSrcDoc(
                `<html><body>${HTML}</body><style>${CSS}</style><script>${JS}</script></html>`
            );
        }, 250);
        return () => clearTimeout(timeout);
    }, [state]);

    return (
        <div className={`student`}>
            <div className="main">
                <header className="top--buttons">
                    <div className="button-container-left">
                        <Button
                            name="xml"
                            action={(e) => viewHandler(e, setEditor)}
                            text="HTML"
                            cls="html three-editor-buttons"
                        />
                        <Button
                            name="css"
                            action={(e) => viewHandler(e, setEditor)}
                            text="CSS"
                            cls="css three-editor-buttons"
                        />
                        <Button
                            name="javascript"
                            action={(e) => viewHandler(e, setEditor)}
                            text="JS"
                            cls="js three-editor-buttons"
                        />
                    </div>
                    <div className="button-container-right">
                        <div className="review--container">
                            {ExerciseCodeArray.length !== 0 && (
                                <div className="students--container">
                                    <select
                                        onChange={(e) =>
                                            setExerciseIndex(e.target.value)
                                        }
                                        id="students"
                                        value={exerciseIndex}
                                        className="dropdown--students"
                                    >
                                        {ExerciseCodeArray.map(
                                            (item, index) => {
                                                return (
                                                    <option
                                                        value={index}
                                                        key={index}
                                                    >
                                                        {item.date}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                </header>
                <main class="resize-container">
                    <section className="container__left">
                        <Editor
                            language={editor}
                            value={
                                editor === 'xml'
                                    ? state.HTML
                                    : editor === 'css'
                                    ? state.CSS
                                    : state.JS
                            }
                            theme={user.theme || 'material'}
                            bool={'nocursor'}
                        />
                    </section>
                    <div class="resizer" id="dragMe"></div>
                    <section className="container__right">
                        <div className="custom--container">
                            <div
                                className="custom--icon"
                                onClick={() => setSetting(!setting)}
                            >
                                <GoSettings />
                            </div>

                            <CustomMenu
                                cls={setting ? 'display--custom' : ''}
                            />
                        </div>

                        <Output srcDoc={srcDoc} />
                    </section>
                </main>

                <footer></footer>
            </div>
        </div>
    );
};

export default LiveCode;
