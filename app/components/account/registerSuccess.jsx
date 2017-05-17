/**
 *  注册成功,Joels
 */
import React from "react";
import {FormattedMessage, FormattedHTMLMessage} from "react-intl";
import Header from 'COMPONENT/account/header';
import {Link} from "react-router";
import {decode64} from "LIB/tool";

class RegisterSuccess extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ipx_sign_body">
                <Header hide={true}/>
                <div className="ipx_signbox ipx_signbox_succeed">
                    <img className="ipx_sign_logo" src={require("../../asset/img/ipx_lf_logo2.png")}/>
                    <h1 className="ipxblue_txt">
                        <i className="iconfont icon-succeed font_20px"/>
                        &nbsp;&nbsp;
                        <FormattedMessage id='registerApplication'/>
                    </h1>

                    <h2>
                        <FormattedMessage id='dearUser'/>&nbsp;
                        {this.props.params.userName ? decode64(this.props.params.userName) : ''}&nbsp;:
                    </h2>
                    <p className="ipx_sign_message">
                        <FormattedHTMLMessage id='registerMessage'/>
                    </p>
                    <Link to="/" activeClassName="active">
                        <button className="ipx_btn ipx_blue_btn ipx_XL_btn">
                            <FormattedMessage id='ensure'/>
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default RegisterSuccess;