export const toggleInstructionsHandler = (
    toggleInstructions,
    setToggleInstructions
) => {
    const toggleBox = toggleInstructions === '' ? 'toggleInstructions' : '';
    setToggleInstructions(toggleBox);
};
export const viewListHandler = (toggleList, setToggleList) => {
    const toggleBox = toggleList === '' ? 'toggleList ' : '';
    setToggleList(toggleBox);
};



export const viewHandler = (e, setEditor) => {
    const name = e.target.name;
    setEditor(name);
    const editorButtons = document.querySelectorAll('.three-editor-buttons');
    editorButtons.forEach((item) => {
        if (item.name === name) {
            item.classList.add('button-active');
        } else {
            item.classList.remove('button-active');
        }
    });

    const editors = document.querySelectorAll('.editor-container');
    editors.forEach((view) => {
        if (view.id === name) {
            view.classList.add('view-language');
        } else {
            view.classList.remove('view-language');
        }
    });
};
