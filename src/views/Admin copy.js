import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import '../styles/AdminBuilder/_adminBuilder.scss';
import Sidebar from '../components/Sidebar/Sidebar';
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

const columnsFromBackend = {
    'bec0ba03-3858-4302-b642-96a9c13939d1': {
        name: 'Backlog',
        items: itemsFromBackend,
    },
    [uuid()]: {
        name: 'Week 1',
        items: [],
    },
    [uuid()]: {
        name: 'Week 2',
        items: [],
    },
    [uuid()]: {
        name: 'Week 3',
        items: [],
    },
    [uuid()]: {
        name: 'Week 4',
        items: [],
    },
};

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
    const backlog = 'Backlog';
    const [columns, setColumns] = useState(columnsFromBackend);
    const [isShown, setIsShown] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        //console.log(evt.target.title.value);

        const newItem = {
            id: uuid(),
            module: 'js',
            lesson: 'Test',
        };
        // const obj = columns.find((item) => item.name === backlog);

        columns['bec0ba03-3858-4302-b642-96a9c13939d1'].items.push(newItem);
    };

    return (
        <>
            <div className={`admin`}>
                {/* <button onClick={() => console.log(columns)}>Click</button> */}
                <Sidebar />
                <div className="admin-builder">
                    <nav className="admin-header">
                        <button
                            className="button-review admin-button"
                            onClick={() => console.log(columns)}
                        >
                            Create Curriculum
                        </button>
                        <Button
                            className="button-login admin-button"
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
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            height: '100%',
                        }}
                    >
                        <DragDropContext
                            onDragEnd={(result) =>
                                onDragEnd(result, columns, setColumns)
                            }
                            ClassName="admin-grid"
                        >
                            {Object.entries(columns).map(
                                ([columnId, column], index) => {
                                    return (
                                        <div
                                            style={{
                                                zIndex:
                                                    column.name === backlog
                                                        ? '2'
                                                        : '1',
                                                marginTop:
                                                    column.name === backlog
                                                        ? ''
                                                        : '15rem',

                                                position:
                                                    column.name === backlog
                                                        ? 'absolute'
                                                        : '',
                                                backgroundColor:
                                                    column.name === backlog
                                                        ? 'white'
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
                                                        ? 'scroll'
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
                                            <h2 className="week-title">
                                                {column.name}
                                            </h2>
                                            {column.name === backlog ? (
                                                <>
                                                    {' '}
                                                    <h2>Create Curriculum:</h2>
                                                    <h3>Lesson backlog</h3>
                                                </>
                                            ) : (
                                                ''
                                            )}
                                            <div style={{ margin: 8 }}>
                                                <Droppable
                                                    droppableId={columnId}
                                                    key={columnId}
                                                    className={`droppable-container`}
                                                >
                                                    {(provided, snapshot) => {
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
                                                                                                zIndex: 10000,

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
                                    );
                                }
                            )}
                        </DragDropContext>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
