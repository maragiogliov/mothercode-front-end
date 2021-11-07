import { useState } from 'react';
import './AddLesson.scss';

const AddLesson = ({ cls, action }) => {
    const [selected, setSelected] = useState('html');

    const handleClick = (evt) => {
        setSelected(evt.target.value);
    };

    const isSelected = (value) => value === selected;

    return (
        <form
            className={`lesson--form ${cls}`}
            onSubmit={(e) => action(e, selected)}
        >
            <input name="title" placeholder="Add title..." />
            <div className="lower-comment">
                <div
                    name="language"
                    className="radio--container"
                    value={selected}
                >
                    <div className="radio--input__container">
                        <label htmlFor="html" className="comment--label">
                            <input
                                id="html"
                                type="radio"
                                value="html"
                                checked={isSelected('html')}
                                onChange={handleClick}
                            />
                            HTML
                        </label>
                        <label htmlFor="css" className="comment--label">
                            <input
                                id="css"
                                type="radio"
                                value="css"
                                checked={isSelected('css')}
                                onChange={handleClick}
                            />
                            CSS
                        </label>
                    </div>
                    <div className="radio--input__container">
                        {' '}
                        <label htmlFor="js" className="comment--label">
                            <input
                                id="js"
                                type="radio"
                                value="js"
                                checked={isSelected('js')}
                                onChange={handleClick}
                            />
                            JavaScript
                        </label>
                    </div>
                </div>
                <div className="comment--btn">
                    <button className="button-comment">Submit</button>
                </div>
            </div>
        </form>
    );
};

export default AddLesson;
