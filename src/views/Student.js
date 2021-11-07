import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { UserContext } from '../contexts/UserContext';
import { GoSettings } from 'react-icons/go';
import { VscFeedback } from 'react-icons/vsc';
//import { BiCodeAlt } from 'react-icons/bi';
import { BiSave } from 'react-icons/bi';
//import { BiBadgeCheck } from 'react-icons/bi';
import checkIcon from '../components/Notifications/assets/check.svg';
import '../components/DraggableDivs/test1.js';

import Editor from '../components/Editor';
import Output from '../components/Output';
import Button from '../components/Button';
import Feedback from '../components/Feedback/Feedback';

//import Sidebar from '../components/Sidebar/Sidebar';
import Comment from '../components/Comment/Comment';
import Instructions from '../components/Instructions/Instructions';
import Notifications from '../components/Notifications/Notifications';

import CustomMenu from '../components/CustomMenu/CustomMenu';
import dragger from '../helpers/draggable';
import { snippetViewer, showToast } from '../helpers/editorHelpers';
import { viewHandler } from '../helpers/helpers';

import '../styles/editor/_student.scss';
//import CopySnippet from './CopySnippet';

const Student = () => {
    const [exists, setExists] = useState(false);
    const [setting, setSetting] = useState(false);
    const [list, setList] = useState([]);
    const [isShown, setIsShown] = useState(false);
    const [comments, setComments] = useState([]);
    const [isMessages, setIsMessages] = useState(false);
    const [isInstructions, setIsInstructions] = useState(true);
    const [isConsole, setIsConsole] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

    // const history = useHistory();
    const [user] = useContext(UserContext);
    // if (!user.auth) history.push('/');
    const [exerciseId, setExerciseId] = useState('');
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [js, setJs] = useState('');
    const [srcDoc, setSrcDoc] = useState('');
    const [editor, setEditor] = useState('xml');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selected, setSelected] = useState('chat');
    const [isNotification, setIsNotification] = useState(true);
    //const [isSnippet, setIsSnippet] = useState(true);
    //const [isSubmitted, setIsSubmitted] = useState(false);
    useEffect(() => {
        setIsSaved(false);
    }, [html, css, js]);
    const handleConsole = () => {
        const newJ = js;
        setJs(newJ);
        setIsConsole(!isConsole);
    };
    const saveCode = () => {
        const studentExercise = {
            student: user.id,
            solution: { HTML: html, CSS: css, JS: js },
        };
        console.log('OUTSIDE');
        if (!exists) {
            console.log('MIDDLE!!!!');
            setExists(true);
            axios
                .post('http://localhost:5000/exercises/save', studentExercise)
                .then((res) => {
                    if (res.status === 200) setIsSaved(true);
                })
                .then(() => console.log('AFTER!!!'))
                .catch((err) => console.log(err));
        }

        if (exists) {
            console.log('updating!!!!');
            setIsSaved(true);
            axios
                .patch(`http://localhost:5000/exercises?student=${user.id}`, {
                    solution: { HTML: html, CSS: css, JS: js },
                })
                .then((res) => setExerciseId(res.data._id))
                .catch((err) => console.log(err));
        }
    };
    useEffect(() => {
        axios
            .get(`http://localhost:5000/exercises/${exerciseId}/feedback`)
            .then((res) => {
                if (res.data.notification === true) {
                    showToast(setList, checkIcon, 'success');
                }
            })
            .catch((err) => console.log(err));
    }, [exerciseId]);
    const deleteToast = () => {
        axios
            .put(`http://localhost:5000/exercises/${exerciseId}/feedback`)
            .then((res) => {
                console.log(res.data);
            });
        setIsNotification(false);
        setIsMessages(!isMessages);
    };

    const handleClick = (evt) => {
        setSelected(evt.target.value);
    };
    const isSelected = (value) => value === selected;
    useEffect(() => {
        axios
            .get(`http://localhost:5000/exercises/student/${user.id}`)
            .then((res) => {
                console.log(res.data);
                const { HTML, CSS, JS } = res.data.solution;
                setHtml(HTML);
                setCss(CSS);
                setJs(JS);
                if (res.status === 200) setExists(true);

                setComments(res.data.feedback);
                setExerciseId(res.data.id);
            })
            .catch((err) => console.log(err));

        const editorButtons = document.querySelectorAll(
            '.three-editor-buttons'
        );
        editorButtons.forEach((item) => {
            if (item.name === 'xml') item.classList.add('button-active');
        });
        dragger();
    }, []);

    const messageToggler = () => {
        setIsMessages(!isMessages);
        if (isShown) setIsShown(!isShown);
    };
    const reviewHandler = () => {
        setIsShown(!isShown);
        if (isMessages) setIsMessages(!isMessages);
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const comment = evt.target.comment.value;
        const studentExercise = {
            student: user.id,
            solution: { HTML: html, CSS: css, JS: js },
            comment: { user: user.id, comment },
            selected,
        };
        if (!exists) {
            console.log(`does it exist: ${exists}`);
            fetch('http://localhost:5000/exercises', {
                method: 'POST',
                body: JSON.stringify(studentExercise),
                headers: {
                    'Content-Type': 'application/json',
                    //'x-auth-token': {user.jwt}
                },
            })
                .then((res) => {
                    if (res.status === 200) setIsSubmitted(true);
                    return res.json();
                })
                .then((data) => setExists(true))
                .then(() => setIsSubmitted(true))
                .catch((err) => console.log(err));
        }
        if (exists) {
            console.log(`does it exist: ${exists}`);
            fetch(`http://localhost:5000/exercises/student/${user.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    comment: { user: user.id, comment },
                    solution: { HTML: html, CSS: css, JS: js },
                    selected,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    //'x-auth-token': {user.jwt}
                },
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .then(() => setIsSubmitted(true))
                .catch((err) => console.log(err));
        }
        const botComment = selected === 'submitted' ? 'Exercise Submitted' : '';
        let newComments;
        if (botComment) {
            newComments = [
                ...comments,
                {
                    user: {
                        name: 'Exercise Bot',
                        avatar: 'https://images.discordapp.net/avatars/692723897887490138/5d4e9766c52fa9142924df3bb9a1d514.png?size=128',
                        id: '616dee79be8fb7930f98c319',
                    },
                    comment: botComment,
                },
                {
                    user: {
                        name: user.name,
                        avatar: user.avatar,
                        id: user.id,
                    },
                    comment,
                },
            ];
        } else {
            newComments = [
                ...comments,
                {
                    user: {
                        name: user.name,
                        avatar: user.avatar,
                        id: user.id,
                    },
                    comment,
                },
            ];
        }
        setComments(newComments);
        setIsShown(!isShown);
        //setIsMessages(!isMessages);
    };

    const conLog = `function log(str){
    const div = document.createElement('div');
    div.style.zIndex = '999';
    div.style.width = '96%';
    div.style.margin = 'auto';
    div.style.position ='absolute';
    div.style.bottom ='0';
    div.style.left ='0';
    div.style.backgroundColor = 'rgb(18, 28, 46)';
    div.style.color = 'white';
    div.style.padding = '1rem';
    div.style.border= '1px solid white';
    const p = document.createElement('p');
    p.style.marginLeft= '2rem';
    p.style.fontSize = '2rem';
    p.textContent = str;
    div.appendChild(p);
    document.body.appendChild(div);
    }`;

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(
                `<html><body>${html}</body><style>${css}</style><script>${
                    conLog + js
                }</script></html>`
            );
        }, 250);
        console.log(html);
        return () => clearTimeout(timeout);
    }, [html, css, js]);

    return (
        <>
            <div className="student">
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
                            {isNotification && (
                                <Notifications
                                    toastList={list}
                                    action={deleteToast}
                                />
                            )}
                            <div className="review--container">
                                <VscFeedback
                                    className="feedback--icon--student"
                                    onClick={messageToggler}
                                />
                                {isNotification && (
                                    <div className={`notification-badge`}></div>
                                )}
                                <div className="position--comment">
                                    <Button
                                        text={isSubmitted ? 'Sent' : 'Send'}
                                        type="submit"
                                        cls={`${
                                            isSubmitted ? 'sent' : 'submit'
                                        } ${isShown ? 'greyed-out' : ''}`}
                                        action={reviewHandler}
                                    />{' '}
                                    {isShown && (
                                        <form
                                            className={`comment--form student-view`}
                                            onSubmit={handleSubmit}
                                        >
                                            <textarea
                                                name="comment"
                                                rows="2"
                                                cols="20"
                                                placeholder="Add comment..."
                                                className="textarea--comment"
                                            />
                                            <fieldset
                                                className="radio--container"
                                                name="status"
                                                // value={selected}
                                            >
                                                <div className="radio--input__container">
                                                    <label
                                                        htmlFor="chat"
                                                        className="comment--label"
                                                    >
                                                        <input
                                                            id="chat"
                                                            type="radio"
                                                            value="chat"
                                                            checked={isSelected(
                                                                'chat'
                                                            )}
                                                            onChange={
                                                                handleClick
                                                            }
                                                        />
                                                        <h3>Comment</h3>
                                                    </label>
                                                </div>
                                                <div className="radio--input__container">
                                                    <label
                                                        htmlFor="submitted"
                                                        className="comment--label"
                                                    >
                                                        <input
                                                            id="submitted"
                                                            type="radio"
                                                            value="submitted"
                                                            checked={isSelected(
                                                                'submitted'
                                                            )}
                                                            onChange={
                                                                handleClick
                                                            }
                                                        />
                                                        <h3>Submit</h3>
                                                    </label>
                                                </div>
                                            </fieldset>
                                            <div className="comment--btn">
                                                <button className="button-comment">
                                                    Confirm
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>
                    <main class="resize-container">
                        <section class="container__left">
                            <Editor
                                language={editor}
                                value={
                                    editor === 'xml'
                                        ? html
                                        : editor === 'css'
                                        ? css
                                        : js
                                }
                                onChange={
                                    editor === 'xml'
                                        ? setHtml
                                        : editor === 'css'
                                        ? setCss
                                        : setJs
                                }
                                theme={user.theme || 'material'}
                                bool={false}
                            />
                        </section>
                        <div class="resizer" id="dragMe"></div>
                        <section className="container__right student-view">
                            <div className="custom--container">
                                <div
                                    className="custom--icon"
                                    onClick={() => setSetting(!setting)}
                                >
                                    <GoSettings />
                                </div>

                                <Button
                                    text={`Instructions`}
                                    type="button"
                                    action={() =>
                                        setIsInstructions(!isInstructions)
                                    }
                                    cls={`instructions ${
                                        isInstructions
                                            ? 'instructions-active'
                                            : 'instructions-inactive'
                                    }`}
                                />
                                <CustomMenu
                                    cls={setting ? 'display--custom' : ''}
                                />
                            </div>
                            {isInstructions && (
                                <div className={`instructions--container`}>
                                    <Instructions />
                                </div>
                            )}
                            <Output srcDoc={srcDoc} />
                            {/* {isConsole && (
                                <div
                                    className={`instructions--container console test123`}
                                ></div>
                            )} */}
                            <div className="custom--container console">
                                <div className="custom--icon">
                                    {!isSaved && (
                                        <BiSave
                                            onClick={() =>
                                                saveCode(
                                                    user,
                                                    html,
                                                    css,
                                                    js,
                                                    exists,
                                                    setExists,
                                                    setIsSaved,
                                                    setExerciseId
                                                )
                                            }
                                        />
                                    )}
                                    {isSaved && (
                                        <BiSave className="isSaved--icon" />
                                    )}
                                </div>
                                <Button
                                    text={`Console`}
                                    type="button"
                                    action={handleConsole}
                                    cls={`console ${
                                        isConsole
                                            ? 'console-inactive'
                                            : 'console-active'
                                    }`}
                                />
                            </div>
                        </section>
                    </main>{' '}
                    {isMessages && comments && user && (
                        <Feedback
                            comments={comments}
                            user={user}
                            id={user.id}
                        />
                    )}
                    <footer className="editor--footer">
                        {/* <div className="snippet--list">
                            <div className="snippet--container">
                                <CopySnippet code="1" />
                            </div>
                            <div className="snippet--container">
                                <CopySnippet code="2" />
                            </div>
                            <div className="snippet--container">
                                <CopySnippet code="3" />
                            </div>
                            <div className="snippet--container">
                                <CopySnippet code="4" />
                            </div>
                            <div className="snippet--container">
                                <CopySnippet code="5" />
                            </div>
                            <div className="snippet--container">
                                <CopySnippet code="6" />
                            </div>
                        </div> */}
                        {/* {isNotification && (
                            <Notifications
                                toastList={list}
                                action={deleteToast}
                            />
                        )} */}
                        {/* Please leave this button here!!! */}
                        <Button
                            text={`Instructions`}
                            type="button"
                            action={() => setIsInstructions(!isInstructions)}
                            cls={`instructions ${
                                isInstructions
                                    ? 'instructions-active'
                                    : 'instructions-inactive'
                            }`}
                        />
                    </footer>
                </div>
            </div>
        </>
    );
};

export default Student;
