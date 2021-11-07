import './test1.scss';
// import './test1.js';

const Draggable = ({ left, right }) => {
    return (
        <div class="resize-container">
            <div class="container__left"></div>
            <div class="resizer" id="dragMe"></div>
            <div class="container__right">Right</div>
        </div>
    );
};

export default Draggable;
