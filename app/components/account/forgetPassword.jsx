/**
 *  注册,Joels
 */
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import ValidateTool from "LIB/validationRules";
import env from "CONFIG/env";
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import {showToast} from 'REDUX/actions/global';
import Header from "./header";

function mapStateToProps(state) {
    return Object.assign({}, state);
}

class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailClass: 'clearfix',
            emailInfo: "",
            isDisplay: false,
            verifyImg: '',
            verifyCode: '',
            verifyCodeClass: 'clearfix hide',
            verifyCodeInfo: ""
        };
    }

    submit = () => {
        console.log(this.state.email, this.state.verifyCode);
        //验证
        if (!this.validateEmail(this.state.email) || !this.validateVerifyCode(this.state.verifyCode)) {
            return false;
        }

        let responseHandler = async function (){
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.FORGET, key: 'FORGET'},
                method: 'post',
                contentType: 'application/x-www-form-urlencoded',
                dataSerialize: true,
                data: {
                    account: this.state.email,
                    identifyCode: this.state.verifyCode
                }
            });
            if (!response.errType) {
                this.props.dispatch(showToast({
                    content: this.props.intl.messages.forgetPasswordEmailSuccess,
                    state: 1
                }));
                setTimeout(() => (this.props.router.replace('/')), 50);
            }
        }.bind(this)();
    };

    validateVerifyCode = (value) => {
        if (ValidateTool.isEmpty(value)) {
            this.setState({
                verifyCodeClass: "clearfix warning",
                verifyCodeInfo: this.props.intl.messages.pleaseInput + this.props.intl.messages.verifyCode
            });
            return false;
        } else {
            this.setState({
                verifyCodeClass: "clearfix",
                verifyCodeInfo: ""
            });
            return true;
        }
    };

    validateEmail = (value) => {
        if (ValidateTool.isEmpty(value) || !ValidateTool.isEmail(value)) {
            this.setState({
                emailClass: "clearfix warning",
                emailInfo: this.props.intl.messages.validateEmail2
            });
            return false;
        } else {
            this.setState({
                emailClass: "clearfix",
                emailInfo: ""
            });
            return true;
        }
    };

    changeEmail = (type, event) => {
        const flag = this.validateEmail(event.target.value);
        if ( type === 'blur'){
            if (flag){
                this.setState({
                    verifyCodeClass: "clearfix",
                    verifyCodeInfo: ""
                });
                this.updateVerifyCode();
            }
        }
        this.setState({email: event.target.value});
    };

    changeVerifyCode = (event) => {
        this.setState({verifyCode: event.target.value});
        this.validateVerifyCode(event.target.value);
    };

    updateVerifyCode = () => (
        this.setState({
            verifyImg: env.config.origin + "/agency/sys/codeimage?account=" + this.state.email + "&v=" + (new Date()).getTime(),
            verifyCode: ''
        })
    );

    toHandler = (url) => (
        this.props.router.replace(url)
    );

    render() {
        const {messages} = this.props.intl;
        return (
            <div className="ipx_sign_body">
                <Header hide={true}/>
                <div className="ipx_signbox">
                    <img className="ipx_sign_logo" src={require('../../asset/img/ipx_lf_logo2.png')}/>
                    <h1>{messages.forgetPassword}?</h1>
                    <div className="ipxsign_title">{messages.forgetPasswordTip}</div>
                    <dl className="ipx_sign_dl">
                        <dd className={this.state.emailClass}>
                            <label className="ipx_sign_label">
                                <i className="iconfont icon-email"/>
                            </label>
                            <input type='text'
                                   className="ipxTxt"
                                   name="email"
                                   value={this.state.email}
                                   onChange={this.changeEmail.bind(this, 'change')}
                                   onBlur={this.changeEmail.bind(this, 'blur')}
                                   placeholder={messages.emailDefaultTip}
                            />
                        </dd>
                        <p className="warningTxt">
                            {this.state.emailInfo}
                        </p>
                        <dd className={this.state.verifyCodeClass}>
                            <label className="ipx_sign_label">
                                <i className="iconfont icon-verificode"/>
                            </label>
                            <input type="text"
                                   className="ipxTxt"
                                   value={this.state.verifyCode}
                                   onChange={this.changeVerifyCode}
                                   onBlur={this.changeVerifyCode}
                                   style={{"width": "150px"}}
                                   placeholder={messages.verifyCode}/>
                            <div className="verificode_img" onClick={this.updateVerifyCode}>
                                <img className="ipx_sign_logo" src={this.state.verifyImg}/>
                            </div>
                        </dd>
                        <p className="warningTxt">
                            {this.state.verifyCodeInfo}
                        </p>
                    </dl>
                    <div className="ipx_signbox_td clearfix">
                        <a href="javascript:;" className="ipxblue_txt" onClick={this.toHandler.bind(this, '/')}>{messages.backLogin}</a>
                    </div>
                    <button className='ipx_btn ipx_blue_btn ipx_XL_btn' type="submit" onClick={this.submit}>{messages.ensure}</button>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(injectIntl(ForgetPassword));
