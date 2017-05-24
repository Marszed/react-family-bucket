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
                <span className="iconfont icon-lArrow" onClick={this.handleArrowClick.bind(this, -1)}/>
                <span className="iconfont icon-rArrow" onClick={this.handleArrowClick.bind(this, 1)}/>
            </div>
        );
    }
}

