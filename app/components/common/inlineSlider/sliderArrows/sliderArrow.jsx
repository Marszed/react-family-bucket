/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';

export default class sliderArrow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slider: false
        };
    }
    handleArrowClick(option) {
        if (!this.state.slider){
            this.setState({
                slider: true
            });
            this.props.turn(option);
            setTimeout(() => (
                this.setState({
                    slider: false
                })
            ), (this.props.speed || 1.5) * 1000);
        }
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

