import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import '../styles/AdminBuilder/_adminBuilder.scss';

import Button from '../components/Button';
import AddLesson from '../components/Addlesson/AddLesson';

const itemsFromBackend = [
    {
        id: uuid(),
        module: 'html',
        lesson: 'Tags',
    },
    {
        id: uuid(),
        module: 'html',
        lesson: 'Buttons',
    },
    {
        id: uuid(),
        module: 'html',
        lesson: 'Forms',
    },
    {
        id: uuid(),
        module: 'html',
        lesson: 'Tables',
    },
    {
        id: uuid(),
        module: 'css',
        lesson: 'Intro',
    },
    {
        id: uuid(),
        module: 'css',
        lesson: 'Box Model',
    },
    {
        id: uuid(),
        module: 'css',
        lesson: 'Selectors',
    },
    {
        id: uuid(),
        module: 'css',
        lesson: 'UI / UX',
    },
    {
        id: uuid(),
        module: 'css',
        lesson: 'Specificity',
    },
    {
        id: uuid(),
        module: 'css',
        lesson: 'Flexbox 1',
    },
    {
        id: uuid(),
        module: 'css',
        lesson: 'Flexbox 2',
    },
    {
        id: uuid(),
        module: 'css',
        lesson: 'Grid Layout',
    },
    {
        id: uuid(),
        module: 'js',
        lesson: 'Intro',
    },
    {
        id: uuid(),
        module: 'js',
        lesson: 'Data types',
    },
    {
        id: uuid(),
        module: 'js',
        lesson: 'Loops',
    },
    {
        id: uuid(),
        module: 'js',
        lesson: 'Array Methods',
    },
    {
        id: uuid(),
        module: 'js',
        lesson: 'Promises',
    },
    {
        id: uuid(),
        module: 'js',
        lesson: 'Async',
    },
    {
        id: uuid(),
        module: 'js',
        lesson: 'DOM',
    },
    {
        id: uuid(),
        module: 'js',
        lesson: 'Event Listeners',
    },
];

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems,
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems,
            },
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems,
            },
        });
    }
};

const Admin = () => {
    useEffect(() => {
        axios('http://localhost:5000/lessons')
            .then((data) => setLessonData(data.data))
            .then(() => console.log(lessonData))
            .catch((err) => console.log(err));
    }, []);
    const backlog = 'Backlog';
    const [lessonData, setLessonData] = useState(itemsFromBackend);
    const [columns, setColumns] = useState({
        '0000': {
            name: 'Backlog',
            items: lessonData,
        },
        1111: {
            name: 'Week 1',
            items: [],
        },
        2222: {
            name: 'Week 2',
            items: [],
        },
        3333: {
            name: 'Week 3',
            items: [],
        },
        4444: {
            name: 'Week 4',
            items: [],
        },
    });

    const updateCurriculum = (evt) => {
        console.log(columns);
        // axios
        //     .post('http://localhost:5000/curiculum', columns)
        //     .then((res) => console.log(res))
        //     .catch((err) => console.log(err));
    };

    useEffect(() => {
        console.log(lessonData);
        setColumns({
            '0000': {
                name: 'Backlog',
                items: lessonData,
            },
            1111: {
                name: 'Week 1',
                items: [],
            },
            2222: {
                name: 'Week 2',
                items: [],
            },
            3333: {
                name: 'Week 3',
                items: [],
            },
            4444: {
                name: 'Week 4',
                items: [],
            },
        });
    }, [lessonData]);
    const [isShown, setIsShown] = useState(false);

    const handleSubmit = (evt, selected) => {
        evt.preventDefault();
        //const { name, value } = evt.target;
        const lesson = evt.target.title.value;
        const module = selected;

        //console.log(evt.target.title.value);

        const newItem = {
            module,
            lesson,
        };
        // const obj = columns.find((item) => item.name === backlog);

        axios
            .post('http://localhost:5000/lessons', newItem)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className={`admin`}>
                {/* <button onClick={() => console.log(columns)}>Click</button> */}

                <div className="admin-builder">
                    <nav className="admin-header">
                        <Button
                            cls={'review create-btn'}
                            action={updateCurriculum}
                        >
                            Update Curriculum
                        </Button>
                        <Button
                            cls={'approved create-btn'}
                            action={() => setIsShown(!isShown)}
                        >
                            Add Lesson
                        </Button>
                    </nav>

                    <AddLesson
                        action={handleSubmit}
                        cls={isShown ? 'display--comment' : ''}
                    />

                    <div
                        className="container-weeks"
                        style={{
                            display: 'flex',
                            justifyContent: 'left',
                            height: '100%',
                        }}
                    >
                        <DragDropContext
                            onDragEnd={(result) =>
                                onDragEnd(result, columns, setColumns)
                            }
                        >
                            {Object.entries(columns)
                                .slice(0)
                                .map(([columnId, column], index) => {
                                    return (
                                        <div
                                            style={{
                                                marginTop:
                                                    column.name === backlog
                                                        ? ''
                                                        : '15rem',

                                                position:
                                                    column.name === backlog
                                                        ? ''
                                                        : '',
                                                backgroundColor:
                                                    column.name === backlog
                                                        ? ''
                                                        : '#121c2e',
                                                padding:
                                                    column.name === backlog
                                                        ? '2rem'
                                                        : '1rem',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                left:
                                                    column.name === backlog
                                                        ? '0'
                                                        : '',
                                                overflow:
                                                    column.name === backlog
                                                        ? 'hidden'
                                                        : '',
                                                height:
                                                    column.name === backlog
                                                        ? '100vh'
                                                        : '',
                                                color:
                                                    column.name === backlog
                                                        ? '#121c2e'
                                                        : 'white',
                                            }}
                                            key={columnId}
                                        >
                                            <div
                                                className={
                                                    column.name === backlog
                                                        ? 'backlog--container'
                                                        : 'box-weeks'
                                                }
                                                style={{
                                                    zIndex:
                                                        column.name === backlog
                                                            ? '1'
                                                            : '0',
                                                    marginTop:
                                                        column.name === backlog
                                                            ? ''
                                                            : '0rem',

                                                    position:
                                                        column.name === backlog
                                                            ? 'fixed'
                                                            : '',
                                                    backgroundColor:
                                                        column.name === backlog
                                                            ? 'white'
                                                            : '#121c2e',
                                                    padding:
                                                        column.name === backlog
                                                            ? '0rem'
                                                            : '0rem',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    left: '0rem',
                                                    right:
                                                        column.name === backlog
                                                            ? ''
                                                            : '',
                                                    overflow:
                                                        column.name === backlog
                                                            ? 'scroll'
                                                            : '',
                                                    height:
                                                        column.name === backlog
                                                            ? '100vh'
                                                            : '',
                                                    marginLeft:
                                                        column.name === backlog
                                                            ? '2%'
                                                            : '',

                                                    color:
                                                        column.name === backlog
                                                            ? '#121c2e'
                                                            : 'white',
                                                }}
                                                key={columnId}
                                            >
                                                <h2>{column.name}</h2>
                                                {column.name === backlog ? (
                                                    <> </>
                                                ) : (
                                                    ''
                                                )}

                                                <div style={{ margin: 8 }}>
                                                    <Droppable
                                                        droppableId={columnId}
                                                        key={columnId}
                                                        className={`droppable-container`}
                                                    >
                                                        {(
                                                            provided,
                                                            snapshot
                                                        ) => {
                                                            return (
                                                                <div
                                                                    {...provided.droppableProps}
                                                                    ref={
                                                                        provided.innerRef
                                                                    }
                                                                    style={{
                                                                        background:
                                                                            snapshot.isDraggingOver
                                                                                ? 'lightblue'
                                                                                : column.name ===
                                                                                  backlog
                                                                                ? 'white'
                                                                                : '#384b6e',

                                                                        padding: 4,
                                                                        width: 250,
                                                                        minHeight: 500,
                                                                        borderRadius: 4,
                                                                    }}
                                                                >
                                                                    {column.items.map(
                                                                        (
                                                                            item,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <Draggable
                                                                                    key={
                                                                                        item.id
                                                                                    }
                                                                                    draggableId={
                                                                                        item.id
                                                                                    }
                                                                                    index={
                                                                                        index
                                                                                    }
                                                                                >
                                                                                    {(
                                                                                        provided,
                                                                                        snapshot
                                                                                    ) => {
                                                                                        return (
                                                                                            <div
                                                                                                className={`draggable--card ${item.module}`}
                                                                                                ref={
                                                                                                    provided.innerRef
                                                                                                }
                                                                                                {...provided.draggableProps}
                                                                                                {...provided.dragHandleProps}
                                                                                                style={{
                                                                                                    boxShadow:
                                                                                                        '0 10px 16px 0 rgba(0, 0, 0, 0.2)',
                                                                                                    display:
                                                                                                        'flex',
                                                                                                    justifyContent:
                                                                                                        'center',
                                                                                                    alignItems:
                                                                                                        'center',
                                                                                                    userSelect:
                                                                                                        'none',
                                                                                                    fontSize:
                                                                                                        '1.25rem',
                                                                                                    padding: 16,
                                                                                                    margin: '0 0 8px 0',
                                                                                                    borderRadius: 4,
                                                                                                    minHeight:
                                                                                                        '90px',
                                                                                                    backgroundColor:
                                                                                                        snapshot.isDragging
                                                                                                            ? 'white'
                                                                                                            : `white`,
                                                                                                    color: '#121c2e',
                                                                                                    // zIndex: 10000,

                                                                                                    ...provided
                                                                                                        .draggableProps
                                                                                                        .style,
                                                                                                }}
                                                                                            >
                                                                                                <h2>
                                                                                                    {' '}
                                                                                                    {
                                                                                                        item.lesson
                                                                                                    }
                                                                                                </h2>
                                                                                                {/* <div className="hashtags-cards">
                                                                                                <div class="tag-container">
                                                                                                    {item.hashtags && (
                                                                                                        <p className="tag">
                                                                                                            {
                                                                                                                item
                                                                                                                    .hashtags[0]
                                                                                                            }
                                                                                                        </p>
                                                                                                    )}
                                                                                                </div>
                                                                                            </div> */}
                                                                                            </div>
                                                                                        );
                                                                                    }}
                                                                                </Draggable>
                                                                            );
                                                                        }
                                                                    )}
                                                                    {
                                                                        provided.placeholder
                                                                    }
                                                                </div>
                                                            );
                                                        }}
                                                    </Droppable>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            
                        </DragDropContext>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
