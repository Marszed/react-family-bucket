/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {isEqual, objCopy, arrayCopy} from 'LIB/tool';
import pureRender from "pure-render-decorator";
import {setFormSelectOrder} from 'REDUX/actions/global';

/**
 * data 数据类型
 * title 标题
 * defaultValue 默认选中值  {orderBy: '',orderDirection: ''}
 * childStyle 子组件样式
 * list Array
 *      content 内容
 *      orderBy 排序方式
 *      orderDirection 排序方向
 */
@pureRender
class SelectOrder extends React.Component {
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
            defaultValue: messages.orderStyle,
            list: [
                /*{
                    orderBy: 1,
                    orderDirection: 0,
                    content: messages.commissionPercent
                },
                {
                    orderBy: 2,
                    orderDirection: 0,
                    content: messages.commissionMoney
                },*/
                /*{
                    orderBy: 3,
                    orderDirection: 0,
                    content: messages.updateTime
                },
                {
                    orderBy: 4,
                    orderDirection: 0,
                    content: messages.soldCount
                },
                {
                    orderBy: 5,
                    orderDirection: 0,
                    content: messages.clickCount
                },*/
                {
                    orderBy: 6,
                    orderDirection: 0,
                    content: messages.targetDistance
                }
            ]
        };
    };

    componentWillReceiveProps(nextProps) {
        // formSelectCheck 变化并且 更新的key与组件的name一致
        if (nextProps.global.formSelectOrder && nextProps.global.formSelectOrder.key === this.props.name) {
            const {messages} = this.props.intl;
            const defaultProps = this.getDefaultProps(messages);
            this.setState({
                data: defaultProps
            });
            this.props.dispatch(setFormSelectOrder(''));
        }
    }

    onChange(option, value) {
        let temp = objCopy(this.state.data), defaultValue = {};

        temp.list.map((obj) => {
            if (obj.orderBy === option.orderBy) {
                obj.orderDirection = value;
                defaultValue.orderDirection = value;
                defaultValue.orderBy = option.orderBy;
                return false;
            }
        });
        this.setState({
            data: Object.assign(temp, {defaultValue: defaultValue})
        });
        this.props.onChange({
            orderBy: defaultValue.orderBy,
            orderDirection: defaultValue.orderDirection
        });
    }

    render() {
        const {data} = this.state;

        let placeHolder = objCopy(data.defaultValue), list = arrayCopy(data.list);

        if (data.defaultValue instanceof String) {
            list.map((option) => {
                option.orderDirection = 0;
            });
        } else {
            list.map((option) => {
                if (option.orderBy == placeHolder.orderBy) {
                    placeHolder = option.content + (placeHolder.orderDirection === 1 ? ' ↑' : ' ↓');
                    option.orderDirection = placeHolder.orderDirection;
                    return false;
                }
            });
        }

        return (
            <div className="ipx_select ipx_select_S float_rt">
                <div>
                    <span>{placeHolder}</span>
                    <i className="iconfont icon-downArrow"/>
                </div>
                <ul>
                    {
                        list.map((obj, index) => (
                            <li key={index}>{obj.content} <span className="iconfont icon-rise" onClick={this.onChange.bind(this, obj, 1)}/><span className="iconfont icon-decline" onClick={this.onChange.bind(this, obj, 2)}/></li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default connect((store) => (store))(injectIntl(SelectOrder));