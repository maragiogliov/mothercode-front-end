import axios from 'axios';

// export const saveCode = (
//     user,
//     html,
//     css,
//     js,
//     exists,
//     setExists,
//     setIsSaved,
//     setExerciseId
// ) => {
//     const studentExercise = {
//         student: user.id,
//         solution: { HTML: html, CSS: css, JS: js },
//     };
//     if (!exists) {
//         console.log('saved!!!!');
//         setExists(true);
//         axios
//             .post('http://localhost:5000/exercises/save', studentExercise)
//             .then((res) => {
//                 if (res.status === 200) setIsSaved(true);
//             })
//             .catch((err) => console.log(err));
//     }

//     if (exists) {
//         console.log('updating!!!!');
//         axios
//             .patch(`http://localhost:5000/exercises/student=${user.id}`, {
//                 solution: { HTML: html, CSS: css, JS: js },
//             })
//             .then((res) => setExerciseId(res.data._id))
//             .then((res) => setIsSaved(true))
//             .catch((err) => console.log(err));
//     }
// };

export const snippetViewer = (isSnippet, setIsSnippet) => {
    axios
        .get(`http://localhost:5000/snippets`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    setIsSnippet(!isSnippet);

    console.log('here are the snippets!!!');
};
export const showToast = (setList, checkIcon) => {
    setList([
        {
            id: 1,
            title: 'New Message',
            description: 'your exercise status has changed',
            backgroundColor: '#5cb85c',
            icon: checkIcon,
        },
    ]);
};
