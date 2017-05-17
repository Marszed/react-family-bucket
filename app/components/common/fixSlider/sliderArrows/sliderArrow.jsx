/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';

export default class sliderArrow extends React.Component {
    constructor(props) {
        super(props);
    }
    handleArrowClick(option) {
        this.props.turn(option);
    }
    render() {
        return (
            <div>
                <span className="iconfont icon-lArrow" onClick={this.handleArrowClick.bind(this, -1)}/>
                <span className="iconfont icon-rArrow" onClick={this.handleArrowClick.bind(this, 1)}/>
            </div>
        );
    }
}

