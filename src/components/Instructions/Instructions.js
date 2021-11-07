import '../../styles/Instructions/_instructions.scss';

const Instructions = () => {
    return (
        <div class="instructions--text">
            <h2 className="instructions--title">Center an Element</h2>
            <br />
            <h5>Position a div centrally using CSS Flexbox.</h5>

            <ul>
                <br />

                <li>Create a div</li>
                <li>Give it a height and width </li>
                <li>Give it a background color</li>
                <li>Center it in the middle of the page</li>
                <hr />
                <li> BONUS! Create a Japanese Flag.</li>
            </ul>
        </div>
    );
};

export default Instructions;
