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
    viewHandle(state){
        if (state === false){
            this.setState({
                sliderDisplay: false,
                nowLocal: 0,
                items: []
            });
        }
        this.setState({
            sliderDisplay: state
        });
    }
    updateSilderHandle(option, index){
        this.setState({
            sliderDisplay: true,
            items: option,
            nowLocal: index
        });
    }
    deleteResultHandle(type){
        // 接收父级通知是否删除成功
        if (type === true){
            let nowLocal = this.state.nowLocal, temp = [];
            for (let i = 0, len = this.state.items.length; i < len; i++){
                if (i !== this.state.nowLocal){
                    temp.push(this.state.items[i]);
                }
            }
            this.setState({
                items: temp,
                sliderDisplay: temp.length !== 0,
                nowLocal: (this.state.items.length - 1 === this.state.nowLocal) ? 0 : nowLocal
            });
        }
    }
    // 删除当前图片
    deleteHandle(){
        let obj;
        for (let i = 0, len = this.state.items.length; i < len; i++){
            if (i === this.state.nowLocal){
                obj = this.state.items[i];
                break;
            }
        }
        this.props.deleteHandle(this.state.nowLocal, obj);
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

        let itemNodes = this.state.items.map((item, idx) => (<SliderItem item={item} count={count} key={'item' + idx} />));

        let arrowsNode = <SliderArrow turn={this.turn.bind(this)}/>;

        let dotsNode = <SliderDot turn={this.turn.bind(this)} count={count} nowLocal={this.state.nowLocal} />;

        return (
            <div className={"ipx_pop" + (this.state.sliderDisplay ? "" : " hide")}>
                <div
                    className="ipx_pop_box pop_record_img"
                    style={this.props.sliderStyle}
                    onMouseOver={this.props.pause ? this.pausePlay.bind(this) : null} onMouseOut={this.props.pause ? this.goPlay.bind(this) : null}>
                    <ul style={{
                        left: -100 * this.state.nowLocal + "%",
                        transitionDuration: this.props.speed + "s",
                        width: this.state.items.length * 100 + "%",
                        overflow: "visible",
                        whiteSpace: "nowrap"
                    }}>
                        {itemNodes}
                    </ul>
                    {this.props.arrows ? arrowsNode : null}
                    {this.props.dots ? dotsNode : null}
                    <span className={"iconfont icon-delete " + (this.props.noDelete ? "hide" : "")}
                          onClick={this.deleteHandle.bind(this)}/>
                    <span className="iconfont icon-close" onClick={this.viewHandle.bind(this, false)}/>
                </div>
                <div className="ipx_pop_bg"></div>
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