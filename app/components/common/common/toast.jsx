/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import { connect } from 'react-redux';
import {FormattedMessage} from "react-intl";
import {toast} from 'REDUX/actions/global';

function mapStateToProps(state) {
    return Object.assign({}, state.global);
}

class Toast extends React.Component {
    constructor(props) {
        super(props);
    }
    closeHandler(){
        this.props.dispatch(toast({
            content: "",
            state: this.props.toast ? this.props.toast.state : ""
        }));
    }
    render() {
        // state = 1 成功 state = 2 失败
        let {toast} = this.props;

        return <div className={"zIndex_2 ipx_pop_tips" + (toast && toast.state === 2 ? " ipx_pop_tips_error" : "") + (toast && toast.content ? " ipx_pop_tips_show" : "")}>
            <i className={"iconfont" + (toast && toast.state === 2 ? " icon-cross" : " icon-succeed")}/>
            <span>{toast ? toast.content : ""}</span>
            <a className="ipx_pop_tips_close" onClick={this.closeHandler.bind(this)}>
                <FormattedMessage
                    id='close'
                    tagName='b'
                    defaultMessage='close'
                />
            </a>
        </div>;
    }
}

export default connect(mapStateToProps)(Toast);