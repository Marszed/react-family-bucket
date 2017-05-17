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
                    content: '50-200',
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
    }

    onChange(option) {
        this.setState({
            data: Object.assign(objCopy(this.state.data), {defaultValue: option.value})
        });
        this.props.onChange(this.props.name, option.value);
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