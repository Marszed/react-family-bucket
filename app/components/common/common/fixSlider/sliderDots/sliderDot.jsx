/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';


export default class sliderDot extends React.Component {
    constructor(props) {
        super(props);
    }
    handleDotClick(i) {
        let option = i - this.props.nowLocal;
        this.props.turn(option);
    }

    render() {
        let dotNodes = [];
        let { count, nowLocal } = this.props;
        for (let i = 0; i < count; i++) {
            dotNodes[i] = (
                <span key={'dot' + i}
                    className={"slider-dot" + (i === nowLocal ? " slider-dot-selected" : "")}
                    onClick={this.handleDotClick.bind(this, i)}>
                </span>
            );
        }
        return <div className="slider-dots-wrap">
            {dotNodes}
        </div>;
    }
}

