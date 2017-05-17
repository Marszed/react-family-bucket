/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {isEqual, objCopy, arrayCopy} from 'LIB/tool';
import pureRender from "pure-render-decorator";
import {setSearchOption} from 'REDUX/actions/project';

/**
 * data 数据类型
 * checked 是否选中
 * description 字段描述
 */
@pureRender
class RadioAuthorize extends React.Component {
    constructor(props) {
        super(props);
        const {messages} = this.props.intl;
        const defaultProps = this.getDefaultProps(messages);
        this.state = {
            data: this.props.data ? Object.assign(defaultProps, this.props.data) : defaultProps
        };
    }

    getDefaultProps = (messages) => {
        return {
            defaultValue: false,
            description: messages.showAuthorizedProject
        };
    };


    onChange() {
        this.setState({
            data: Object.assign(objCopy(this.state.data),{defaultValue: !this.state.data.defaultValue})
        });
        this.props.onChange({
            type: this.state.data.defaultValue === false ? 2 : 1
        });
    }

    render() {
        return (
            <label className={"ipx_checkbox float_rt" + (this.state.data.defaultValue ? " checked" : "")} onClick={this.onChange.bind(this)}>
                <i className={"iconfont" + (this.state.data.defaultValue ? " icon-succeed" : "")}/> <span className="text-elps">{this.state.data.description}</span>
            </label>
        );
    }
}

export default connect((store) => (store))(injectIntl(RadioAuthorize));