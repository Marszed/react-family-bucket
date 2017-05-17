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
                <span className="agency_img_prev iconfont icon-leftArrow" onClick={this.handleArrowClick.bind(this, -1)}/>
                <span className="agency_img_next iconfont icon-rightArrow" onClick={this.handleArrowClick.bind(this, 1)}/>
            </div>
        );
    }
}

