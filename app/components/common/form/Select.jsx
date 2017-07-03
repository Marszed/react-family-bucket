/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {isEqual, objCopy} from 'LIB/tool';
import pureRender from "pure-render-decorator";
import {setFormSelect} from 'REDUX/actions/global';

/**
 * data 数据类型
 * title 标题
 * defaultValue 默认选中值
 * childStyle 子组件样式
 * list Array
 *      value 值
 *      content 内容
 */
@pureRender
class Select extends React.Component {
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
            title: messages.abroadFlag,
            defaultValue: 0,
            childStyle: {width: '120px'},
            list: [
                {
                    value: 0,
                    content: messages.arbitrarily
                },
                {
                    value: 1,
                    content: '1+'
                },
                {
                    value: 2,
                    content: '2+'
                },
                {
                    value: 3,
                    content: '3+'
                },
                {
                    value: 4,
                    content: '4+'
                }
            ]
        };
    };

    componentWillReceiveProps(nextProps) {
        // 收到组件更新指令 formSelect 变化并且 更新的key与组件的name一致
        if (nextProps.global.formSelect && nextProps.global.formSelect.key === this.props.name) {
            const {messages} = this.props.intl;
            const defaultProps = this.getDefaultProps(messages);
            this.setState({
                data: this.props.data ? Object.assign(defaultProps, this.props.data) : defaultProps
            });
            // 移除组件更新指令
            this.props.dispatch(setFormSelect(''));
        }
        // 搜索条件变化
        if (nextProps.project.searchOption && !isEqual(nextProps.project.searchOption, this.state.searchOption)) {
            this.setState({
                searchOption: nextProps.project.searchOption
            });
            // 同步子组件状态
            if (nextProps.project.searchOption[this.props.name] !== undefined){
                let value = nextProps.project.searchOption[this.props.name];
                if (this.props.name === 'abroadFlag'){
                    value = value === 0 ? 1 : (value === 1 ? 2 : 0)
                }
                this.onChange({value: value})
            }
        }
    }

    onChange(option) {
        this.setState({
            hide: true,
            data: Object.assign(objCopy(this.state.data), {defaultValue: option.value})
        });
        this.props.onChange(this.props.name, option.value);
    }

    render() {
        const {data} = this.state;

        return (
            <div className="proj_screen_cont_td" onMouseEnter={() => (this.setState({hide: false}))}>
                <h3>{data.title}</h3>
                <div className="ipx_select" style={data.childStyle}>
                    <div>
                        <span className="checked">{data.list[data.defaultValue].content}</span>
                        <i className="iconfont icon-downArrow"/>
                    </div>
                    <ul className={this.state.hide ? 'hide' : ''}>
                        {
                            data.list.map((obj, index) => (
                                <li onClick={this.onChange.bind(this, obj)} key={index}>{obj.content}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default connect((store) => (store))(injectIntl(Select));