/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {isEqual, objCopy, arrayCopy} from 'LIB/tool';
import pureRender from "pure-render-decorator";
import {setFormSelectCheck} from 'REDUX/actions/global';

/**
 * data 数据类型
 * title 标题
 * defaultValue 默认选中值
 * childStyle 子组件样式
 * list Array
 *      value 值
 *      content 内容
 *      state 是否选中
 */
@pureRender
class SelectCheck extends React.Component {
    constructor(props) {
        super(props);
        const {messages} = this.props.intl;
        const defaultProps = this.getDefaultProps(messages);
        this.state = {
            data: this.props.data ? Object.assign(defaultProps, this.props.data) : defaultProps,
            hide: false
        };
    }

    getDefaultProps = (messages) => {
        return {
            title: messages.projectTypes,
            defaultValue: [],
            childStyle: {width: '240px'},
            list: [
                {
                    value: 0,
                    content: messages.arbitrarily
                },
                {
                    value: 1,
                    content: messages.projectType1
                },
                {
                    value: 2,
                    content: messages.projectType2
                },
                {
                    value: 3,
                    content: messages.projectType3
                },
                {
                    value: 4,
                    content: messages.projectType4
                }
            ]
        };
    };

    componentWillReceiveProps(nextProps) {
        // formSelectCheck 变化并且 更新的key与组件的name一致
        if (nextProps.global.formSelectCheck && nextProps.global.formSelectCheck.key === this.props.name) {
            const {messages} = this.props.intl;
            const defaultProps = this.getDefaultProps(messages);
            this.setState({
                data: this.props.data ? Object.assign(defaultProps, this.props.data, {defaultValue: nextProps.global.formSelectCheck.value}) : defaultProps
            });
            this.props.dispatch(setFormSelectCheck(''));
        }
        // 搜索条件变化
        if (nextProps.project.searchOption && !isEqual(nextProps.project.searchOption, this.state.searchOption)) {
            const {projectTypes} = nextProps.project.searchOption;
            this.setState({
                searchOption: nextProps.project.searchOption
            });
            if (projectTypes && projectTypes.length){
                let tempData = objCopy(this.state.data);
                if (projectTypes.length === 4){
                    projectTypes.unshift(0);
                }
                tempData.defaultValue = projectTypes;
                this.setState({
                    data: tempData
                });
            }
        }
    }

    onChange(option) {
        let temp = objCopy(this.state.data), existence = false, array = [], tempArray = [], reverseSelectArray = [];

        if (option.value === 0) { // 勾选所有
            temp.list.map((obj) => {
                obj.state = !option.state;
                if (!option.state) { // 正选
                    array.push(obj.value);
                }
                if (obj.value !== 0) {
                    tempArray.push(obj.value);
                }
            });
            this.setState({
                data: Object.assign(temp, {defaultValue: array})
            });
            this.props.onChange(this.props.name, !option.state ? tempArray : []);
        } else { // 勾选可选项
            if (!option.state) { // 正选
                temp.defaultValue.map((obj) => {
                    if (option.value === obj) {
                        existence = true;
                        return false;
                    }
                });
                if (!existence) {
                    temp.defaultValue.push(option.value);
                }
                reverseSelectArray = arrayCopy(temp.defaultValue);
                if (temp.defaultValue.length === this.state.data.list.length - 1 && temp.defaultValue[0] === 0) {
                    temp.defaultValue.unshift(0);
                }
            } else { // 反选
                temp.defaultValue.map((obj) => {
                    if (option.value !== obj) {
                        array.push(obj)
                    }
                });
                temp.defaultValue = array;
                if (temp.defaultValue.length < this.state.data.list.length && temp.defaultValue[0] === 0) {
                    temp.defaultValue.splice(0, 1);
                }
                reverseSelectArray = arrayCopy(temp.defaultValue);
            }

            this.setState({
                data: temp
            });

            this.props.onChange(this.props.name, reverseSelectArray);
        }
    }

    render() {
        const {data} = this.state;

        let placeHolder = '',
            len = data.defaultValue.length,
            list = arrayCopy(data.list);

        if (len === 0) {
            placeHolder = list[0].content;
            list.map((option) => {
                option.state = false;
            })
        } else {
            data.defaultValue.map((obj, index) => (
                placeHolder += (index === len - 1) ? list[obj].content : list[obj].content + '、'
            ));
            list.map((option) => {
                let stateFlag = false; // 可选项是否在选中值中
                data.defaultValue.map((obj) => {
                    if (obj === option.value) {
                        stateFlag = true;
                        return false;
                    }
                });
                option.state = stateFlag;
            });
        }

        return (
            <div className="proj_screen_cont_td">
                <h3>{data.title}</h3>
                <div className="ipx_select" style={data.childStyle}>
                    <div>
                        <span className="checked">{placeHolder}</span>
                        <i className="iconfont icon-downArrow"/>
                    </div>
                    <ul>
                        {
                            list.map((obj, index) => (
                                <li onClick={this.onChange.bind(this, obj)} key={index}>
                                    <label className={"ipx_checkbox" + (obj.state ? ' checked' : '')}>
                                        <i className="iconfont icon-succeed"/> <span
                                        className="text-elps">{obj.content}</span>
                                    </label>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default connect((store) => (store))(injectIntl(SelectCheck));