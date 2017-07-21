/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {isEqual, objCopy} from 'LIB/tool';

class AgreementLayer extends React.Component {
    constructor(props) {
        super(props);
        // title
        // subTitle
        // content
        // hide 是否隐藏
        this.state = {
            layer: {
                hide: true
            }
        };
    }
    componentWillReceiveProps = (nextProps) => {
        // 项目列表数据变化
        if (nextProps.layer && !isEqual(layer, layer)) {
            this.setState({
                layer: nextProps.layer
            });
        }
    };
    showHandler = (flag) => {
        let layer = objCopy(this.state.layer);
        layer.hide = flag;
        this.setState({layer: layer});
    };
    updateData = (data) => {
        this.setState({layer: data});
    };
    render = () => {
        const {layer} = this.state;
        const {messages} = this.props;
        let bonusTime;
        if(layer.bonus) {
            if (!layer.bonus || layer.bonus === null) {
                bonusTime = '-';
            } else if (layer.bonus.isForever === 1){
                bonusTime = messages.forever;
            } else  {
                bonusTime = messages.periodValidity + '：' + layer.bonus.startTime.replace(/-/g, '/') + ' - ' + layer.bonus.endTime.replace(/-/g, '/');
            }
        }
        return <div className="ipx_pop" style={{
            display: layer.hide ? 'none' : 'block'
        }}>
            <div className={"ipx_pop_box " + layer.boxClass}>
                <div className="ipx_pop_head">
                    {
                        !layer.subTitle ? <h2 className="float_lf">{layer.title}</h2> : <h2 className="float_lf">
                            {layer.title} - <span style={{
                                fontWeight: 'normal',
                                color: '#666',
                                fontSize: '13px'
                            }}>{layer.subTitle}</span>
                        </h2>
                    }
                    <a href="javascript:;" className="iconfont icon-cross float_rt" onClick={this.showHandler.bind(this, true)}/>
                </div>
                <div className="ipx_pop_body" style={layer.bonusStyle}>
                    {
                        layer.bonus ? <p style={{marginBottom: '10px'}}>{bonusTime}</p> : null
                    }
                    <div dangerouslySetInnerHTML={{__html: layer.content}}/>
                </div>
            </div>
            <div className="ipx_pop_bg" onClick={this.showHandler.bind(this, true)}></div>
        </div>
    }
}

export default AgreementLayer;