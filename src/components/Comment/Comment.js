import { useState } from 'react';
import '../../styles/Comment/_comment.scss';

const Comment = ({ action, children, cls }) => {
    const [selected, setSelected] = useState('changes');

    // const handleClick = (evt) => {
    //     setSelected(evt.target.value);
    // };

    const isSelected = (value) => value === selected;

    return (
        <form className={`comment--form ${cls}`} onSubmit={action}>
            {/* <textarea
                name="comment"
                rows="2"
                cols="50"
                placeholder="Add comment..."
            /> */}

            {/* {approve && (
                    <fieldset className="radio--container">
                        <div className="radio--input__container">
                            <label htmlFor="changes" className="comment--label">
                                <input
                                    id="changes"
                                    type="radio"
                                    value="changes"
                                    checked={isSelected('changes')}
                                    onChange={handleClick}
                                />
                                Request Changes
                            </label>
                        </div>
                        <div className="radio--input__container">
                            <label
                                htmlFor="approved"
                                className="comment--label"
                            >
                                <input
                                    id="approved"
                                    type="radio"
                                    value="approved"
                                    checked={isSelected('approved')}
                                    onChange={handleClick}
                                />
                                Approve
                            </label>
                        </div>
                    </fieldset>
                )} */}
            {children}
            <div className="comment--btn">
                <button className="button-comment">Submit</button>
            </div>
        </form>
    );
};

export default Comment;
