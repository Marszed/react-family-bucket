/**
 *  注册成功,Joels
 */
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import ValidateTool from "LIB/validationRules";
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import {showToast} from 'REDUX/actions/global';
import Header from "./header";

function mapStateToProps(state) {
    return Object.assign({}, state.createProject)
}

class FirstLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordType: 'password',
            newPassword: '',
            newPasswordInfo: '',
            confirmPassword: '',
            confirmPassInfo: '',
            isDisplay: false
        };
    }

    submit = () => {
        console.log("newPassword:" + this.state.newPassword);
        console.log("confirmPassword:" + this.state.confirmPassword);
        //验证
        if (!this.validateNewPassword(this.state.newPassword) || !this.validateConfirmPassword(this.state.confirmPassword)) {
            return false;
        }
        let responseHandler = async function (){
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.FIRST, key: 'FIRST'},
                method: 'post',
                contentType: 'application/x-www-form-urlencoded',
                dataSerialize: true,
                data: {
                    password: this.state.newPassword,
                    passwordConfirm: this.state.confirmPassword
                }
            });
            if (!response.errType) {
                this.props.router.push('dashboard');
            } else {
                this.props.dispatch(showToast({
                    content: this.props.intl.messages.passwordChangeFailure,
                    state: 2
                }));
            }
        }.bind(this)();
    };

    changeNewPassword = (event) => {
        this.setState({newPassword: event.target.value});
        this.validateNewPassword(event.target.value);
    };

    changeConfirmPassword = (event) => {
        this.setState({confirmPassword: event.target.value});
        this.validateConfirmPassword(event.target.value);
    };

    validateNewPassword = (value) => {
        if (ValidateTool.isEmpty(value)) {
            this.setState({
                newPasswordInfo: this.props.intl.messages.validateNewPassword
            });
            return false;
        } else if (value.length < 8 || value.length > 16) {
            this.setState({
                newPasswordInfo: this.props.intl.messages.validatePassword1
            });
            return false;
        } else {
            this.setState({
                newPasswordInfo: ""
            });
            return true;
        }
    };

    validateConfirmPassword = (value) => {
        if (ValidateTool.isEmpty(value)) {
            this.setState({
                confirmPasswordInfo: this.props.intl.messages.validateConfirmPassword
            });
            return false;
        } else if (value.length < 8 || value.length > 16) {
            this.setState({
                confirmPasswordInfo: this.props.intl.messages.validatePassword1
            });
            return false;
        } else if (this.state.newPassword !== value) {
            this.setState({
                confirmPasswordInfo: this.props.intl.messages.validateConfirmPassword1
            });
            return false;
        } else {
            this.setState({
                confirmPasswordInfo: ""
            });
            return true;
        }
    };

    displayPassword = () => (
        this.setState({
            isDisplay: !this.state.isDisplay,
            passwordType: !this.state.isDisplay ? "text" : "password"
        })
    );

    render() {
        const {messages} = this.props.intl;
        const displayClassName = "float_lf ipx_checkbox" + (this.state.isDisplay ? ' checked' : '');
        return (
            <div className="ipx_sign_body">
                <Header hide={true}/>
                <div className="ipx_signbox">
                    <img className="ipx_sign_logo" src={require("../../asset/img/ipx_lf_logo2.png")}/>
                    <h1>{messages.firstLogin}</h1>
                    <dl className="ipx_sign_dl">
                        <dd className={"clearfix " + (this.state.newPasswordInfo ? "warning" : "")}>
                            <label className="ipx_sign_label">
                                <i className="iconfont icon-lock"/>
                            </label>
                            <input type={this.state.passwordType}
                                   className="ipxTxt"
                                   name="newPassword"
                                   value={this.state.newPassword}
                                   onChange={this.changeNewPassword}
                                   onBlur={this.changeNewPassword}
                                   placeholder={this.props.intl.messages.newPassword}
                            />
                        </dd>
                        <p className="warningTxt">
                            {this.state.newPasswordInfo}
                        </p>
                        <dd className={"clearfix " + (this.state.confirmPasswordInfo ? "warning" : "")}>
                            <label className="ipx_sign_label">
                                <i className="iconfont"/>
                            </label>
                            <input type={this.state.passwordType}
                                   className="ipxTxt"
                                   name="confirmPassword"
                                   value={this.state.confirmPassword}
                                   onChange={this.changeConfirmPassword}
                                   onBlur={this.changeConfirmPassword}
                                   placeholder={this.props.intl.messages.confirmPassword}
                            />
                        </dd>
                        <p className="warningTxt">
                            {this.state.confirmPasswordInfo}
                        </p>
                    </dl>
                    <div className="ipx_signbox_td clearfix">
                        <label className={displayClassName} onClick={this.displayPassword}>
                            <i className="iconfont icon-succeed"/>&nbsp;&nbsp;
                            <span className="text-elps">{messages.displayPassword} </span>
                        </label>
                    </div>
                    <button className='ipx_btn ipx_blue_btn ipx_XL_btn' type="submit" onClick={this.submit}>{messages.login}</button>
                </div>
            </div>
        );
    }
}

FirstLogin.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(injectIntl(FirstLogin));