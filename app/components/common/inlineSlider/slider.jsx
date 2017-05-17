/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import SliderItem from './sliderItem/sliderItem';
import SliderDot from './sliderDots/sliderDot';
import SliderArrow from './sliderArrows/sliderArrow';

export default class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderDisplay: false,
            nowLocal: 0,
            items: this.props.items
        };
    }

    // 向前向后多少
    turn(n) {
        let _n = this.state.nowLocal + n;
        if (_n < 0) {
            _n = _n + this.state.items.length;
        }
        if (_n >= this.state.items.length) {
            _n = _n - this.state.items.length;
        }
        this.setState({nowLocal: _n});
    }

    // 开始自动轮播
    goPlay() {
        if (this.props.autoplay) {
            this.autoPlayFlag = setInterval(() => {
                this.turn(1);
            }, this.props.delay * 1000);
        }
    }

    // 暂停自动轮播
    pausePlay() {
        clearInterval(this.autoPlayFlag);
    }

    componentDidMount() {
        this.goPlay();
    }

    render() {
        let count = this.state.items.length;

        let itemNodes = this.state.items.map((item, idx) => (
            <SliderItem item={item} count={count} key={'item' + idx} />
        ));

        let arrowsNode = <SliderArrow turn={this.turn.bind(this)}/>;

        let dotsNode = <SliderDot turn={this.turn.bind(this)} count={count} nowLocal={this.state.nowLocal} />;

        return (
            <div
                className={this.props.className || "agency_preview_images"}
                style={this.props.sliderStyle}
                onMouseOver={this.props.pause ? this.pausePlay.bind(this) : null} onMouseOut={this.props.pause ? this.goPlay.bind(this) : null}>
                <ul className="agency_preview_imgbox" style={{
                    left: -100 * this.state.nowLocal + "%",
                    transitionDuration: this.props.speed + "s",
                    width: this.state.items.length * 100 + "%",
                    overflow: "visible",
                    whiteSpace: "nowrap"
                }}>
                    {itemNodes}
                </ul>
                {this.props.arrows && this.state.items.length ? arrowsNode : null}
                {this.props.dots ? dotsNode : null}
                {
                    this.state.items.length && this.props.tips !== false ? <span className="agency_img_index">{this.state.nowLocal + 1} 	&frasl; {this.state.items.length} P</span> : null
                }
            </div>
        );
    }
}

Slider.defaultProps = {
    sliderStyle: {},
    speed: 1,
    delay: 2,
    pause: true,
    autoplay: true,
    dots: true,
    arrows: true,
    items: []
};

Slider.autoPlayFlag = null;