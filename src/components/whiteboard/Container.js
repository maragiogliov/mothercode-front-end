import React from 'react';
import Board from './Board';

import '../../styles/whiteboard/_whiteboard.scss';

class Container extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: '#64007B',
            size: '5',
        };
    }

    changeColor(params) {
        this.setState({
            color: params.target.value,
        });
    }

    changeSize(params) {
        this.setState({
            size: params.target.value,
        });
    }

    render() {
        return (
            <div className="Kontainer">
                <div class="tools-section">
                    <div className="color-picker-Kontainer">
                        {/* Select Color :&nbsp; */}
                        <input
                            type="color"
                            value={this.state.color}
                            onChange={this.changeColor.bind(this)}
                        />
                    </div>

                    <div className="brushsize-Kontainer">
                        Select Size : &nbsp;
                        <select
                            value={this.state.size}
                            onChange={this.changeSize.bind(this)}
                        >
                            <option> 5 </option>
                            <option> 10 </option>
                            <option> 15 </option>
                            <option> 22 </option>
                            <option> 25 </option>
                            <option> 30 </option>
                            <option> 35 </option>
                            <option> 40 </option>
                            <option> 45 </option>
                            <option> 50 </option>
                        </select>
                    </div>
                </div>

                <div class="board-Kontainer">
                    <Board
                        color={this.state.color}
                        size={this.state.size}
                    ></Board>
                </div>
            </div>
        );
    }
}

export default Container;
