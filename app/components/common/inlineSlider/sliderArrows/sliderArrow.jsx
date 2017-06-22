/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {debounce} from 'LIB/tool';

export default class sliderArrow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slider: false,
            arrowShow: false
        };
    }
    componentDidMount() {
        this.autoSize();
        window.addEventListener('resize', debounce(() => (this.autoSize()), 300));
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.autoSize);
    }
    autoSize = () => {
        if (window.innerWidth > 1541){
            // slider dot 纵向排列 大于7
            if (this.props.items && this.props.items.length >= 7){
                this.setState({
                    arrowShow: true
                });
            } else {
                this.setState({
                    arrowShow: false
                });
            }
        } else {
            // slider dot 横向排列 大于8
            if (this.props.items && this.props.items.length >= 8){
                this.setState({
                    arrowShow: true
                });
            } else {
                this.setState({
                    arrowShow: false
                });
            }
        }
    };
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
    handleDotClick(i) {
        let option = i - this.props.nowLocal;
        this.props.turn(option);
    }
    render() {
        let dotNodes = [];
        let { count, nowLocal, items} = this.props;
        for (let i = 0; i < count; i++) {
            dotNodes[i] = (
                <li key={'dot' + i} className={i === nowLocal ? "active" : ""} onClick={this.handleDotClick.bind(this, i)}>
                    <div><img src={items[i].url || items[i].resourceUrl}/><span/></div>
                </li>
            );
        }
        return (
            <div className="proj_preview_litimgbox">
                {
                    this.state.arrowShow ? <a href="javascript:;" className="preview_arrow preview_arrowup" onClick={this.handleArrowClick.bind(this, -1)}/> : null
                }
                {
                    this.state.arrowShow ? <a href="javascript:;" className="preview_arrow preview_arrowdown" onClick={this.handleArrowClick.bind(this, 1)}/> : null
                }
                <ul>{dotNodes}</ul>
            </div>
        );
    }
}

