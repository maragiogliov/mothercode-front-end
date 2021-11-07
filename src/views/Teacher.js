import { useState, useEffect, useContext } from 'react';
//import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

import { GoSettings } from 'react-icons/go';
import { VscFeedback } from 'react-icons/vsc';
import axios from 'axios';

import Editor from '../components/Editor';
import Output from '../components/Output';
import Button from '../components/Button';
import Feedback from '../components/Feedback/Feedback';
import Instructions from '../components/Instructions/Instructions';

import Comment from '../components/Comment/Comment';

import CustomMenu from '../components/CustomMenu/CustomMenu';
import dragger from '../helpers/draggable';
import { viewHandler } from '../helpers/helpers';

import '../styles/editor/_student.scss';

const Teacher = () => {
    const [setting, setSetting] = useState(false);
    const [comments, setComments] = useState([]);

    const [isMessages, setIsMessages] = useState(false);
    const [isInstructions, setIsInstructions] = useState(false);

    // const history = useHistory();
    const [user, setUser] = useContext(UserContext);
    const [isShown, setIsShown] = useState(false);
    // if (!user.auth) history.push('/');
    const [classExercises, setClassExercises] = useState([]);
    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [isApproved, setIsApproved] = useState(false);

    const initialState = {
        HTML: '',
        CSS: '',
        JS: '',
    };
    const [state, setState] = useState(initialState);
    const [srcDoc, setSrcDoc] = useState('');
    const [editor, setEditor] = useState('xml');
    const [selected, setSelected] = useState('chat');

    const handleClick = (evt) => {
        setSelected(evt.target.value);
    };

    const isSelected = (value) => value === selected;
    const dummyChange = () => {
        console.log("please don't edit this");
    };

    useEffect(() => {
        async function fetchData() {
            await axios
                .get(
                    'http://localhost:5000/exercises?isSubmitted=true&isApproved=false'
                )
                .then((res) => {
                    if (res.status === 200) {
                        setClassExercises(res?.data);
                        const {
                            solution: { HTML, CSS, JS },
                        } = res.data[0];
                        setComments(res?.data[0]?.feedback);
                        setState({ HTML, CSS, JS });
                    }
                })
                .catch((err) => console.log(err));
        }
        fetchData();
    }, [isApproved]);
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
        console.log(evt.target.comment.value);

        fetch(
            `http://localhost:5000/exercises/${
                classExercises[exerciseIndex || 0]?.id
            }`,
            {
                method: 'PUT',
                body: JSON.stringify({
                    comment: { user: user.id, comment },
                    selected,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    //'x-auth-token': {user.jwt}
                },
            }
        )
            .then((res) => res.json())
            .then((data) => setIsApproved(true))
            .catch((err) => console.log(err));
        let botComment;
        let newComments;
        if (selected === 'approved') {
            botComment = 'Exercise Approved';
        }
        if (selected === 'changes') {
            botComment = 'Changes requested.';
        }
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
                        name: 'Albert Aardvark',
                        avatar: 'https://www.w3schools.com/w3images/avatar2.png',
                        id: '615ed6cccf465b99b60dbf37',
                    },
                    comment,
                },
            ];
        } else {
            newComments = [
                ...comments,
                {
                    user: {
                        name: 'Albert Aardvark',
                        avatar: 'https://www.w3schools.com/w3images/avatar2.png',
                        id: '615ed6cccf465b99b60dbf37',
                    },
                    comment,
                },
            ];
        }

        setComments(newComments);
        setIsShown(!isShown);
        setIsMessages(!isMessages);
    };

    useEffect(() => {
        const teacher = JSON.parse(localStorage.getItem('user'));
        if (teacher) setUser({ ...user, teacher });
        console.log(teacher.name);
        async function fetchData() {
            try {
                const code = await axios.get(
                    'http://localhost:5000/exercises?isSubmitted=true&isApproved=false'
                );
                setClassExercises(code.data);
                const {
                    solution: { HTML, CSS, JS },
                } = code?.data[0];
                setComments(code.data[0]?.feedback);
                setState({ HTML, CSS, JS });
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        document.getElementById('xml').classList.add('view-language');
        const editorButtons = document.querySelectorAll(
            '.three-editor-buttons'
        );
        editorButtons.forEach((item) => {
            if (item.name === 'xml') item.classList.add('button-active');
        });
        dragger();
    }, []);
    useEffect(() => {
        async function fetchData() {
            try {
                const code = await axios.get(
                    'http://localhost:5000/exercises?isSubmitted=true&isApproved=false'
                );
                setClassExercises(code.data);

                const {
                    solution: { HTML, CSS, JS },
                } = code.data[exerciseIndex];
                setIsApproved(code.data[exerciseIndex || 0]?.isApproved);
                setComments(code.data[exerciseIndex || 0]?.feedback);
                setState({ HTML, CSS, JS });
                const htmlEditor = document.getElementById('xml');
                htmlEditor && htmlEditor.classList.add('view');
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
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
                            {classExercises.length !== 0 && (
                                <div className="students--container">
                                    <label htmlFor="students"></label>
                                    <select
                                        onChange={(e) =>
                                            setExerciseIndex(e.target.value)
                                        }
                                        className={`student-list`}
                                        id="students"
                                        value={exerciseIndex}
                                        className="dropdown--students"
                                    >
                                        {classExercises &&
                                            classExercises.map((obj, index) => {
                                                const checked = obj.isApproved
                                                    ? ' ✔  '
                                                    : // : ' ❌ ';
                                                      //   ' 🔁 ';
                                                      ' 🔲 ';
                                                return (
                                                    <option
                                                        value={index}
                                                        key={index}
                                                    >
                                                        {obj.student &&
                                                            checked +
                                                                obj.student
                                                                    .name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            )}
                            <VscFeedback
                                className="feedback--icon"
                                onClick={messageToggler}
                            />
                            <div className="position--comment">
                                <Button
                                    text={isApproved ? 'Reviewed' : 'Review'}
                                    type="submit"
                                    cls={`${
                                        isApproved ? 'approved' : 'review'
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
                                            cols="50"
                                            placeholder="Add comment..."
                                            className="textarea--comment"
                                        />
                                        <fieldset
                                            className="radio--container"
                                            name="status"
                                            // value={selected}
                                        >
                                            <label
                                                htmlFor="chat"
                                                className="comment--label"
                                            >
                                                <input
                                                    id="chat"
                                                    type="radio"
                                                    value="chat"
                                                    checked={isSelected('chat')}
                                                    onChange={handleClick}
                                                />
                                                <h3>Comment</h3>
                                            </label>

                                            <label
                                                htmlFor="changes"
                                                className="comment--label"
                                            >
                                                <input
                                                    id="changes"
                                                    type="radio"
                                                    value="changes"
                                                    checked={isSelected(
                                                        'changes'
                                                    )}
                                                    onChange={handleClick}
                                                />
                                                <h3>Redo</h3>
                                            </label>

                                            <label
                                                htmlFor="approved"
                                                className="comment--label"
                                            >
                                                <input
                                                    id="approved"
                                                    type="radio"
                                                    value="approved"
                                                    checked={isSelected(
                                                        'approved'
                                                    )}
                                                    onChange={handleClick}
                                                />
                                                <h3>Approve</h3>
                                            </label>
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
                            onChange={dummyChange}
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

                            <Button
                                text={`Instructions`}
                                type="button"
                                action={() =>
                                    setIsInstructions(!isInstructions)
                                }
                                cls={`instructions ${
                                    isInstructions ? 'instructions-active' : ''
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
                    </section>
                </main>

                {isMessages && comments && user && (
                    <Feedback
                        comments={comments}
                        user={user}
                        id="615ed6cccf465b99b60dbf37"
                    />
                )}
                <footer></footer>
            </div>
        </div>
    );
};

export default Teacher;
