/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {isEqual, objCopy} from 'LIB/tool';
import pureRender from "pure-render-decorator";
import {setFormRadio} from 'REDUX/actions/global';

/**
 * data 数据类型
 * title 标题
 * defaultValue 默认选中值
 * list Array
 *      value 值
 *      content 内容
 *      description 值描述，内容
 */
@pureRender
class Radio extends React.Component {
    constructor(props) {
        super(props);
        const {messages} = this.props.intl;
        const defaultProps = this.getDefaultProps(messages);
        this.state = {
            data: this.props.data ? Object.assign(defaultProps, this.props.data) : defaultProps,
            icon: ['icon-project_S', 'icon-project_M', 'icon-project_L']
        };
    }

    getDefaultProps = (messages) => {
        return {
            title: messages.propertyMinMax,
            defaultValue: 0,
            list: [
                {
                    value: 1,
                    content: '1-50',
                    description: messages.smallScale
                },
                {
                    value: 2,
                    content: '51-200',
                    description: messages.middleScale
                },
                {
                    value: 3,
                    content: '200+',
                    description: messages.largeScale
                }
            ]
        };
    };

    componentWillReceiveProps(nextProps) {
        // formRadio 变化并且 更新的key与组件的name一致
        if (nextProps.global.formRadio && nextProps.global.formRadio.key === this.props.name) {
            const {messages} = this.props.intl;
            const defaultProps = this.getDefaultProps(messages);
            this.setState({
                data: this.props.data ? Object.assign(defaultProps, this.props.data, {defaultValue: nextProps.global.formRadio.value}) : defaultProps
            });
            // 移除组件更新指令
            this.props.dispatch(setFormRadio(''));
            // 更新父组件缓存
            this.props.onChange(this.props.name, -1);
        }
        // 搜索条件变化
        if (nextProps.project.searchOption && !isEqual(nextProps.project.searchOption, this.state.searchOption)) {
            let value = 0;
            if (nextProps.project.searchOption.propertyMin >= 51 && nextProps.project.searchOption.propertyMax <= 200 && nextProps.project.searchOption.propertyMax !== 0){
                value = 2;
            } else if (nextProps.project.searchOption.propertyMin > 200){
                value = 3;
            } else if (nextProps.project.searchOption.propertyMin >= 1 && nextProps.project.searchOption.propertyMax <= 50){
                value = 1;
            }
            this.setState({
                searchOption: nextProps.project.searchOption
            });
            // 避免搜索之后，传递回来的状态覆盖了现有的默认状态
            if (value !== this.state.data.defaultValue){
                this.onChange({
                    value: value
                });
            }
        }
    }

    onChange(option) {
        let value = option.value;
        // 反选操作
        if (value === this.state.data.defaultValue){
            value = 0;
        }
        this.setState({
            data: Object.assign(objCopy(this.state.data), {defaultValue: value})
        });
        this.props.onChange(this.props.name, value);
    }

    render() {
        const {data} = this.state;
        return (
            <div className="proj_screen_cont_td">
                <h3>{data.title}</h3>
                <ul className="proj_scale clearfix">
                    {
                        data.list.map((obj, index) => (
                            <li className={obj.value === data.defaultValue ? "active" : ''}
                                key={index}
                                onClick={this.onChange.bind(this, obj)}>
                                <i className={"iconfont " + this.state.icon[obj.value]}/>
                                <b>{obj.description}</b>
                                <span>{obj.content}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default connect((store) => (store))(injectIntl(Radio));