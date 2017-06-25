/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {isEqual, objCopy, arrayCopy} from 'LIB/tool';
import pureRender from "pure-render-decorator";
import {setFormRadioType} from 'REDUX/actions/global';

/**
 * data 数据类型
 * title 标题
 * defaultValue 默认选中值
 * list Array
 *      value 值
 *      content 内容
 */
@pureRender
class RadioType extends React.Component {
    constructor(props) {
        super(props);
        const {messages} = this.props.intl;
        const defaultProps = this.getDefaultProps(messages);
        this.state = {
            data: this.props.data ? Object.assign(defaultProps, this.props.data) : defaultProps,
            icon: ['icon-project_S', 'icon-project_M', 'icon-project_L']
        };
    }

    componentWillReceiveProps(nextProps) {
        // 路由变化
        if (nextProps.clearData && nextProps.clearData.clear && !isEqual(nextProps.clearData, this.state.clearData)) {
            this.setState({
                data: Object.assign(objCopy(this.state.data),{defaultValue: 0}),
                clearData: nextProps.clearData
            });
            this.props.dispatch(setFormRadioType({
                key: 'viewType',
                value: 0
            }));
        }
    }

    getDefaultProps = (messages) => {
        return {
            defaultValue: 0,
            list: [
                {
                    value: 1,
                    description: messages.list,
                    icon: 'icon-viewlist',
                    active: false
                },
                {
                    value: 0,
                    description: messages.thumbnail,
                    icon: 'icon-grid',
                    active: false
                }
            ]
        };
    };


    onChange(option) {
        this.setState({
            data: Object.assign(objCopy(this.state.data),{defaultValue: option.value})
        });
        this.props.dispatch(setFormRadioType({
            key: 'viewType',
            value: option.value
        }));
    }

    render() {
        const {data} = this.state;
        let list = arrayCopy(data.list);
        list.map((obj) => (
           obj.active = data.defaultValue === obj.value
        ));

        return (
            <ul className="proj_view_model float_rt clearfix">
                {
                    list.map((obj, index) => (
                        <li className={obj.active ? 'active' : ''} key={index} onClick={this.onChange.bind(this, obj)}>
                            <i className={"iconfont "+obj.icon}/>
                            <span>{obj.description}</span>
                        </li>
                    ))
                }
            </ul>
        );
    }
}

export default connect((store) => (store))(injectIntl(RadioType));