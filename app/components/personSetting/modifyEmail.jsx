/**
 *  注册成功,Joels
 */
import React from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import {getLocalStorage, cookie, setLocalStorage} from "LIB/tool";

function mapStateToProps(state) {
    return Object.assign({}, state);
}

class ModifyEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: <div style={{
                "position": "fixed",
                "left": 0,
                "top": 0,
                "right": 0,
                "bottom": 0,
                "height": 100 + "%"
            }}>
                <div className="ipx_loading_pop">
                    <img src={require('../../asset/img/ipx-loading.gif')} alt="IPX"/>
                    <FormattedMessage
                        id='loading'
                        tagName="span"
                        defaultMessage='loading ....'
                    />
                </div>
            </div>
        };
    }
    componentDidMount(){
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.CONFIRMEMAIL, key: 'CONFIRMEMAIL'},
                method: 'put',
                params: {
                    token: this.props.location.query.token
                }
            });
            if (!response.errType) {
                //发送邮箱
                let info = getLocalStorage("userInfo") ;
                info.email = response.data.data;
                setLocalStorage("userInfo", info);
                cookie("email", response.data.data, {expires: 30});
                this.setState({
                    info: <div className="ipx_signbox ipx_signbox_succeed">
                        <img className="ipx_sign_logo" src={require('../../asset/img/ipx_lf_logo2.png')}/>
                        <h1 className="ipxblue_txt">
                            <i className="iconfont icon-succeed font_20px"/>
                            &nbsp;<FormattedMessage id='modifySuccess'/>
                        </h1>
                        <h2>
                            <FormattedMessage id='dearUser'/>
                        </h2>
                        <p className="ipx_sign_message">
                            <FormattedMessage id='modifySuccessInfo'/>
                        </p>

                    </div>
                });
                setTimeout(() => {
                    this.props.router.push("personSetting/securitySetting");
                }, 5 * 1000);
            } else {
                this.setState({
                    info: <div className="ipx_signbox ipx_signbox_succeed">
                        <img className="ipx_sign_logo" src={require('../../asset/img/ipx_lf_logo2.png')}/>
                        <h1 className="ipxred_txt">
                            <i className="iconfont icon-cross font_20px"/>
                            &nbsp;<FormattedMessage id='modifyFailure'/>
                        </h1>
                        <h2>
                            <FormattedMessage id='dearUser'/>
                        </h2>
                        <p className="ipx_sign_message">
                            <FormattedMessage id='modifyFailureInfo'/>
                        </p>
                    </div>
                });
                setTimeout(() => {
                    this.props.router.push("/");
                }, 5 * 1000);
            }
        }.bind(this)();
    }

    render() {
        return (
            <div className="ipx_sign_body">
                {this.state.info}
            </div>
        );
    }
}

export default connect(mapStateToProps)(ModifyEmail);