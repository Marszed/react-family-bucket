/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {isEqual, objCopy} from 'LIB/tool';
import pureRender from "pure-render-decorator";
import {setFormSlider} from 'REDUX/actions/global';
import { Slider } from 'antd';

/**
 * data 数据类型
 * name 组件对应的字段名
 * title 标题
 * defaultValue 默认选中值 默认 [0, 100]
 * marks
 * tipFormatter
 * min 0
 * max 100
 * unit 值 单位
 * childStyle
 * markMin 标记最小值
 * markMax 标记最大值
 * markUnit 标记单位
 * priceFormat false 是否金额格式化
 * switchType []
 */
@pureRender
class _Slider extends React.Component {
    constructor(props) {
        super(props);
        const {messages} = this.props.intl;
        this.state = this.getDefaultProps(messages, this.props.data);
    }

    getDefaultProps = (messages, props) => {
        const marks = {};
        marks[props.markMin || 0] = {
            style: {
                color: '#999'
            },
            label: <span>{props.markUnit ? (props.markMin + ' ' + props.markUnit) : props.markMin}</span>
        };
        marks[props.markMax || 100] = {
            style: {
                color: '#999'
            },
            label: <span>{props.markUnit ? (props.markMax + ' ' + props.markUnit) : props.markMax}</span>
        };
        return {
            value: props.defaultValue || [0, 100],
            commissionType: props.commissionType || 0, // 佣金类型  0-百分比,1-额度
            title: props.title || messages.all,
            defaultValue: props.defaultValue || [0, 100],
            markMin: props.markMin || 0,
            markMax: props.markMax || 100,
            marks: marks,
            min: props.min || 0,
            max: props.max || 100,
            step: props.step || 1,
            alias: props.alias,
            childStyle: props.childStyle || {width: 150 + 'px'},
            style: props.style || {},
            unit: props.unit || '',
            markUnit: props.markUnit || '',
            priceFormat: props.priceFormat || false,
            switchType: props.switchType || undefined
        };
    };

    componentWillReceiveProps(nextProps) {
        // formSlider 变化并且 更新的key与组件的name一致
        if (nextProps.global.formSlider && nextProps.global.formSlider.key === this.props.name) {
            this.setState({
                value: this.state.commissionType === 0 ? this.props.data.defaultValue : this.props.data.moneyValue
            });
            // 移除组件更新指令
            this.props.dispatch(setFormSlider(''));
        }

        // 搜索条件变化
        if (nextProps.project.searchOption && !isEqual(nextProps.project.searchOption, this.state.searchOption)) {
            this.setState({
                searchOption: nextProps.project.searchOption
            });
            const min = (this.props.name).replace('Max', '');
            const max = (this.props.name).replace('Min', '');
            if (nextProps.project.searchOption[min] !== undefined && nextProps.project.searchOption[max] !== undefined){
                if (nextProps.project.searchOption.commissionType !== undefined && this.props.name === 'commissionMinMax'){
                    const type = nextProps.project.searchOption.commissionType === 1 ? '$' : '%';
                    this.recoverHandler(type, [nextProps.project.searchOption[min], nextProps.project.searchOption[max]]);
                } else {
                    this.setState({
                        value: [nextProps.project.searchOption[min], nextProps.project.searchOption[max]]
                    })
                }
            }
        }
    }

    onChange = (option,commissionType) => {
        this.setState({
            value: option
        });
        if (this.state.switchType !== undefined){ // 拥有类型
            // 还需要传一个类型
            this.props.onChange('commissionType', commissionType || this.state.commissionType);
        }
        if(this.state.defaultValue instanceof Array){
            this.props.onChange(this.props.name.replace('Min', ''), option[1], this.props.name.replace('Max', ''), option[0]);
        } else {
            this.props.onChange(this.props.name, option);
        }
    };

    recoverHandler(option, value){
        const {data} = this.props;
        let temp = this.getDefaultProps(this.props.intl.messages, Object.assign(objCopy(data), {
            markUnit: option,
            step: option === '%' ? data.step : data.moneyStep,
            defaultValue: option === '%' ? data.defaultValue : data.moneyValue,
            value: value,
            min: option === '%' ? data.defaultValue[0] : data.moneyValue[0],
            max: option === '%' ? data.defaultValue[1] : data.moneyValue[1],
            markMin: option === '%' ? data.defaultValue[0] : data.moneyValue[0],
            markMax: option === '%' ? data.defaultValue[1] : data.moneyValue[1],
            commissionType: option === '%' ? 0 : 1
        }));
        temp.value = value;
        this.setState(temp);
    }

    switchHandler(option, event){
        event.stopPropagation();
        const {data} = this.props;
        let temp = this.getDefaultProps(this.props.intl.messages, Object.assign(objCopy(data), {
            markUnit: option,
            step: option === '%' ? data.step : data.moneyStep,
            defaultValue: option === '%' ? data.defaultValue : data.moneyValue,
            value: option === '%' ? this.props.defaultValue : this.props.moneyValue,
            min: option === '%' ? data.defaultValue[0] : data.moneyValue[0],
            max: option === '%' ? data.defaultValue[1] : data.moneyValue[1],
            markMin: option === '%' ? data.defaultValue[0] : data.moneyValue[0],
            markMax: option === '%' ? data.defaultValue[1] : data.moneyValue[1],
            commissionType: option === '%' ? 0 : 1
        }));
        this.setState(temp);
        this.onChange([temp.min,temp.max],temp.commissionType);
    }

    render() {
        const range = this.state.defaultValue instanceof Array;
        return (
            <div className="proj_screen_cont_td" style={Object.assign({overflow: 'hidden'},this.state.style || {})}>
                <h3>{this.props.data.title}</h3>
                {
                    this.state.switchType ? <ul className="proj_scale clearfix float_lf">
                            {
                                this.state.switchType.map((obj, index) => (<li key={index} onClick={this.switchHandler.bind(this, obj)} className={this.state.commissionType === index ? "active" : ''}>{obj}</li>))
                            }
                        </ul> : ''
                }
                <div className={"layout-slider" + (this.state.switchType ? " float_lf" : '')} style={this.state.childStyle}>
                    <Slider onChange={this.onChange} range={range} defaultValue={this.state.defaultValue} value={this.state.value} min={this.state.min} max={this.state.max} step={this.state.step} marks={this.state.marks}/>
                </div>
            </div>
        );
    }
}

export default connect((store) => (store))(injectIntl(_Slider));