/**
 * Created by marszed on 2017/5/12.
 */
import React from "react";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall, getUploader} from 'HTTP';
import {setUserInfo, showToast} from "REDUX/actions/global";
import {getLocalStorage, setLocalStorage, objCopy, isEqual, langPackageInject} from "LIB/tool";
import ValidateTool from 'LIB/validationRules';

const userInfo = getLocalStorage("userInfo");

function mapStateToProps(state) {
    return Object.assign({}, state);
}

class SecuritySetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordType: 'password',
            initPassword: '',
            initPasswordClass: 'clearfix',
            initPasswordInfo: '',
            newPassword: '',
            newPasswordClass: 'clearfix',
            newPasswordInfo: '',
            confirmPassword: '',
            confirmPasswordClass: 'clearfix',
            confirmPasswordInfo: '',
            isDisplay: false,
            userInfo: getLocalStorage("userInfo") || {}
        };
    }

    submit = (event) => {
        event.preventDefault();
        if (!this.validateInit(this.state.initPassword,'blur') || !this.validateNew(this.state.newPassword,'blur') || !this.validateConfirm(this.state.confirmPassword,'blur')) {
            return;
        }
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.PASSWORDCHANGE, key: 'PASSWORDCHANGE'},
                method: 'post',
                headers: {
                    'Content-Type':	'application/x-www-form-urlencoded'
                },
                dataSerialize: true,
                data: {
                    oldPassword: this.state.initPassword,
                    newPassword: this.state.newPassword,
                    confirmPassword: this.state.confirmPassword
                }
            });
            if (!response.errType) {
                this.props.dispatch(showToast({
                    content: this.props.intl.messages.modifyPsdSuccess,
                    state: 1
                }));
                this.setState({
                    initPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });
            }
        }.bind(this)();
    };

    validateInit = (value,type) => {
        if (ValidateTool.isEmpty(value) && type === 'blur') {
            this.setState({
                initPasswordClass: "clearfix warning",
                initPasswordInfo: this.props.intl.messages.validateInitPassword
            });
            return false;
        } else {
            this.setState({
                initPasswordClass: "clearfix",
                initPasswordInfo: ""
            });
            return true;
        }
    };

    changeNewPassword = (event) => {
        this.setState({newPassword: event.target.value});
        this.validateNew(event.target.value,event.type);
    };

    changeConfirmPassword = (event) => {
        this.setState({confirmPassword: event.target.value});
        this.validateConfirm(event.target.value,event.type);
    };

    changeInitPassword = (event) => {
        this.setState({initPassword: event.target.value});
        this.validateInit(event.target.value,event.type);
    };

    validateNew = (value) => {
        if (ValidateTool.isEmpty(value) && type === 'blur') {
            this.setState({
                newPasswordClass: "clearfix warning",
                newPasswordInfo: this.props.intl.messages.validateNewPassword
            });
            return false;
        } else if ((value.length < 8 || value.length > 16) && type === 'blur') {
            this.setState({
                newPasswordClass: "clearfix warning",
                newPasswordInfo: this.props.intl.messages.validatePassword1
            });
            return false;
        } else if (value === this.state.initPassword && type === 'blur') {
            this.setState({
                newPasswordClass: "clearfix warning",
                newPasswordInfo: this.props.intl.messages.validatePassword2
            });
            return false;
        } else {
            this.setState({
                newPasswordClass: "clearfix",
                newPasswordInfo: ""
            });
            return true;
        }
    };

    validateConfirm = (value) => {
        if (ValidateTool.isEmpty(value) && type === 'blur') {
            this.setState({
                confirmPasswordClass: "clearfix warning",
                confirmPasswordInfo: this.props.intl.messages.validateConfirmPassword
            });
            return false;
        } else if (this.state.newPassword !== value && type === 'blur') {
            this.setState({
                confirmPasswordClass: "clearfix warning",
                confirmPasswordInfo: this.props.intl.messages.validateConfirmPassword1
            });
            return false;
        } else if ((value.length < 8 || value.length > 16) && type === 'blur') {
            this.setState({
                confirmPasswordClass: "clearfix warning",
                confirmPasswordInfo: this.props.intl.messages.validatePassword1
            });
            return false;
        } else {
            this.setState({
                confirmPasswordClass: "clearfix",
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
        let displayClassName = "float_lf ipx_checkbox" + (this.state.isDisplay ? ' checked' : '');
        return (
            <div className="ipx_setting_safety">
                <div className="clearfix">
                    <form onSubmit={this.submit}>
                        <div className="ipx_setting_password">
                            <h1>{messages.modifyPassword}</h1>
                            <dl className="ipx_sign_dl">
                                <dd className={this.state.initPasswordClass}>
                                    <label className="ipx_sign_label">
                                        <i className="iconfont icon-lock"/>
                                    </label>
                                    <input type={this.state.passwordType}
                                           className="ipxTxt"
                                           name="newPassword"
                                           value={this.state.initPassword}
                                           onChange={this.changeInitPassword.bind(this)}
                                           onBlur={this.changeInitPassword.bind(this)}
                                           placeholder={this.props.intl.messages.initPassword}
                                    />
                                </dd>
                                <p className="warningTxt">
                                    {this.state.initPasswordInfo}
                                </p>
                                <dd className={this.state.newPasswordClass}>
                                    <label className="ipx_sign_label">
                                        <i className="iconfont icon-lock"/>
                                    </label>
                                    <input type={this.state.passwordType}
                                           className="ipxTxt"
                                           name="newPassword"
                                           value={this.state.newPassword}
                                           onChange={this.changeNewPassword.bind(this)}
                                           onBlur={this.changeNewPassword.bind(this)}
                                           placeholder={this.props.intl.messages.newPassword}
                                    />
                                </dd>
                                <p className="warningTxt">
                                    {this.state.newPasswordInfo}
                                </p>
                                <dd className={this.state.confirmPasswordClass}>
                                    <label className="ipx_sign_label">
                                        <i className="iconfont"/>
                                    </label>
                                    <input type={this.state.passwordType}
                                           className="ipxTxt"
                                           name="confirmPassword"
                                           value={this.state.confirmPassword}
                                           onChange={this.changeConfirmPassword.bind(this)}
                                           onBlur={this.changeConfirmPassword.bind(this)}
                                           placeholder={this.props.intl.messages.confirmPassword}
                                    />
                                </dd>
                                <p className="warningTxt">
                                    {this.state.confirmPasswordInfo}
                                </p>
                            </dl>
                            <div className="ipx_signbox_td clearfix">
                                <label className={displayClassName}>
                                    <i className="iconfont icon-succeed" onClick={this.displayPassword.bind(this)}/>
                                    &nbsp;&nbsp;
                                    <span className="text-elps">{messages.displayPassword}</span>
                                </label>
                            </div>
                            <button className="ipx_btn ipx_blue_btn ipx_XL_btn" type="submit" onClick={this.submit}>{messages.modifySpace}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(injectIntl(SecuritySetting));