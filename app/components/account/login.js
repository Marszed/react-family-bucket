/**
 * Created by marszed on 2017/4/24.
 */
import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {showToast} from 'REDUX/actions/global';
import env from "CONFIG/env";
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import pureRender from "pure-render-decorator";
import {injectIntl} from "react-intl";
import {langPackageInject, cookie, setLocalStorage, isMobile} from 'LIB/tool';
import ValidateTool from 'LIB/validationRules';
import Header from 'COMPONENT/account/header';
import agent_pic from 'ASSET/img/amtn_agency.png';


@pureRender
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            verifyCode: '',
            isVerify: 'none',
            rememberState: false,
            validateInfo: 'empty',
            language: langPackageInject(),
            verifyCodeSrc: '',
            isMobile: isMobile()
        };
    }
    //render后
    componentDidMount() {
        const email = cookie("email");
        if (email) {
            this.setState({
                email: email
            });
            if (email) {
                this.setState({
                    rememberState: true
                });
                // 已有邮箱账号，判断此邮箱账号是否需要显示验证码
                this.showCodeImageVerify(email);
            }
        }
    }
    submit = (event) => {
        event.preventDefault();

        // 移动端登陆提示用户在pc登陆
        if (this.state.isMobile){
            this.props.dispatch(showToast({
                content: this.props.intl.messages.mobileLoginTip,
                state: 2
            }));
            return false;
        }

        //登录验证
        if (!this.validateEmail(this.state.email) || !this.validatePassword(this.state.password) || !this.validateVerifyCode(this.state.verifyCode)) {
            return false;
        }

        let responseHandler = async function (){
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.LOGIN, key: 'LOGIN'},
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                dataSerialize: true,
                data: {
                    account: this.state.email,
                    password: this.state.password,
                    verifyCode: this.state.verifyCode,
                    language: this.state.language
                }
            });
            if (response.errType) {
                // 系统异常, 网络原因等
                if (response.errType === 'broken'){
                    return false;
                }
                // 接口调用返回非0000
                this.setState({
                    verifyCode: ""
                });
                //验证码不正确,定位到验证码
                if (response.data.header && response.data.header.code === "E1200"){
                    this.refs.verifyCode.focus();
                }
                if (response.data.data && response.data.data.showCode) {
                    this.setState({
                        isVerify: "block",
                        verifyCodeSrc: env.config.origin + INTERFACE.CODEIMAGE + this.state.email + "&v=" + (new Date()).getTime()
                    });
                }
            } else {
                // 设置本地登陆成功标识
                setLocalStorage("isLogin", true);
                // 设置语言
                cookie('language', response.data.data.userInfo.agentLanguage, {expires: 360});
                // 设置接口验证TOKEN
                window.localStorage.setItem("token", response.data.data.token);
                // 设置记住账号
                if (this.state.rememberState) {
                    cookie("email", this.state.email, {expires: 30});
                } else {
                    cookie("email", "");
                }
                // 设置经纪公司账户信息
                const responseUserInfo = response.data.data.userInfo;
                const userInfo = {
                    agencyType: responseUserInfo.agencyType,
                    accountId: responseUserInfo.accountId,
                    accountLanguage: responseUserInfo.agentLanguage,
                    agencyId: responseUserInfo.agencyId,
                    gender: responseUserInfo.gender,
                    email: responseUserInfo.email,
                    firstName: responseUserInfo.firstName,
                    isAdmin: responseUserInfo.isAdmin,
                    lastName: responseUserInfo.lastName,
                    lastTime: responseUserInfo.lastTime, // 第一次登陆lastTime为空，作为第一次登陆的标识
                    name: responseUserInfo.firstName + " " + responseUserInfo.lastName,
                    countryName: responseUserInfo.countryName,
                    country: responseUserInfo.country,
                    mobilePhone: responseUserInfo.accountMobile,
                    nick: responseUserInfo.nick,
                    state: responseUserInfo.state,
                    profileImage: responseUserInfo.profileImage,
                    allFlag: responseUserInfo.allFlag // 项目列表是否显示IPX市场
                };
                const companyInfo = {
                    "companyCountryName": responseUserInfo.companyCountryName,
                    "companyEmail": responseUserInfo.companyEmail,
                    "companyPhone": responseUserInfo.companyPhone,
                    "companyMobilePhone": responseUserInfo.companyMobilePhone,
                    "companyName": responseUserInfo.companyName,
                    "companyFileKey": responseUserInfo.companyFileKey,
                    "companyLogo": responseUserInfo.companyLogo,
                    "companyCountry": responseUserInfo.companyCountry,
                    "companyAddr": responseUserInfo.companyAddr,
                    "companyUniqueid": responseUserInfo.companyUniqueid,
                    "siteUrl": responseUserInfo.siteUrl,
                    "companyDescription": responseUserInfo.companyDescription
                };
                setLocalStorage("userInfo", userInfo);
                setLocalStorage("companyInfo", companyInfo);
                // TODO 去除第一次登陆

                // 设置语言
                cookie('allFlag', (responseUserInfo.allFlag ? 1 : 2), {expires: 360});

                this.props.router.push({
                    pathname: '/projectListing/' + (responseUserInfo.allFlag ? 1 : 2) + '/country.000/overview',
                    query: {isFresh: 1}
                });
                /*// 第一次登陆 重定向到第一次登陆页进行密码修改
                if (userInfo && (!userInfo.lastTime || userInfo.lastTime === null) ) {
                    this.props.router.push('firstLogin');
                } else {
                    // 不是第一次登陆 重定向到工作台
                    this.props.router.push({
                        pathname: 'dashboard',
                        query: {isFresh: 1}
                    });
                }*/
            }
        }.bind(this)();
    };

    changeVerifyCodeImg(email) {
        this.setState({
            verifyCodeSrc: env.config.origin + INTERFACE.CODEIMAGE + (email || this.state.email) + "&v=" + (new Date()).getTime(),
            verifyCode: ''
        });
    }

    showCodeImageVerify(email){
        // true 需要验证码 false 不需要验证码
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.SHOWCODEIMAGE, key: 'SHOWCODEIMAGE'},
                method: 'get',
                params: {
                    account: email || this.state.email
                },
                loading: false
            });

            if(!response.errType) {
                if(response.data.data){
                    this.setState({
                        isVerify: "block",
                        verifyCodeSrc: env.config.origin + INTERFACE.CODEIMAGE + (email || this.state.email) + "&v=" + (new Date()).getTime()
                    });
                } else {
                    this.setState({
                        isVerify: "none"
                    });
                }
            }
        }.bind(this)();
    }

    //记住账号
    rememberAccount() {
        let rememberState = !this.state.rememberState;
        this.setState({rememberState: rememberState});
    }


    //邮箱输入
    changeEmail(type, event) {
        let email = String(event.target.value).trim();
        this.setState({email: email, validateInfo: "empty"});
        if (type === 'blur'){
            this.showCodeImageVerify(email);
        }
    }

    validateEmail(value) {
        if (ValidateTool.isEmpty(value)) {
            this.setState({validateInfo: "validateEmail1"});
            return false;
        }
        if (!ValidateTool.isEmail(value)) {
            this.setState({validateInfo: "validateEmail2"});
            return false;
        }
        this.setState({validateInfo: "empty"});
        return true;
    }

    //密码输入
    changePassword(event) {
        this.setState({password: event.target.value, validateInfo: "empty"});
        // this.validatePassword(event.target.value);
    }

    validatePassword(value) {
        if (ValidateTool.isEmpty(value)) {
            this.setState({validateInfo: "validatePassword"});
            return false;
        }
        this.setState({validateInfo: "empty"});
        return true;
    }

    //验证码输入
    changeVerifyCode(event) {
        this.setState({verifyCode: event.target.value, validateInfo: "empty"});
    }

    validateVerifyCode(value) {
        if (this.state.isVerify === 'block' && ValidateTool.isEmpty(value)) {
            this.setState({validateInfo: "validateVerifyCode1"});
            return false;
        }
        this.setState({validateInfo: "empty"});
        return true;
    }

    changeLogin = () => {
        const {origin, protocol}  = window.location;
        if (origin.indexOf('_t') !== -1){
            window.location.href = protocol + '//agency_t.ipx.net:9091';
        } else if (origin.indexOf('_dev') !== -1){
            window.location.href = protocol + '//agency_dev.ipx.net';
        } else {
            window.location.href = protocol + '//agency.ipx.net';
        }
    };

    render() {
        const {messages} = this.props.intl;
        let checkedClass = this.state.rememberState ? "float_lf ipx_checkbox checked" : "float_lf ipx_checkbox";
        let verifyCodeImg = this.state.isVerify === 'block' ? <img className="ipx_sign_logo" src={this.state.verifyCodeSrc}/> : '';
        return (
            <div>
                <form onSubmit={this.submit}>
                    <div className="login_main">
                        <div className="login_mainBox">
                            <Header/>
                            <div className="ipx_loginBox" style={{'paddingTop':'90px','paddingBottom':'50px'}}>
                                <h1 className="ipx_login_tab">
                                    <span onClick={this.changeLogin.bind(this)}>{messages.agencyLogin}</span>
                                    <span className="active">{messages.agentLogin}</span>
                                </h1>
                                <div className="ipx_sign_return">{messages[this.state.validateInfo]}</div>
                                <dl className="ipx_sign_dl">
                                    <dd className="clearfix">
                                        <label className="ipx_sign_label">
                                            <i className="iconfont icon-email"/>
                                        </label>
                                        <input
                                            type='text'
                                            name='email'
                                            className='ipxTxt'
                                            value={this.state.email}
                                            onChange={this.changeEmail.bind(this, 'change')}
                                            onBlur={this.changeEmail.bind(this, 'blur')}
                                            placeholder={messages.email}
                                        />
                                    </dd>
                                    <dd className="clearfix">
                                        <label className="ipx_sign_label">
                                            <i className="iconfont icon-key"/>
                                        </label>
                                        <input
                                            type='password'
                                            name='password'
                                            className='ipxTxt'
                                            value={this.state.password}
                                            onChange={this.changePassword.bind(this)}
                                            onBlur={this.changePassword.bind(this)}
                                            placeholder={messages.password}
                                        />
                                    </dd>
                                    <dd className="clearfix" style={{display: this.state.isVerify}}>
                                        <label className="ipx_sign_label">
                                            <i className="iconfont icon-verificode"/>
                                        </label>
                                        <input type="text"
                                               className="ipxTxt"
                                               name='verifyCode'
                                               ref='verifyCode'
                                               value={this.state.verifyCode}
                                               onChange={this.changeVerifyCode.bind(this)}
                                               onBlur={this.changeVerifyCode.bind(this)}
                                               placeholder={messages.verifyCode}
                                               style={{"width": "150px"}}/>
                                        <div className="verificode_img" onClick={this.changeVerifyCodeImg.bind(this)}>
                                            {verifyCodeImg}
                                        </div>
                                    </dd>
                                </dl>
                                <div className="ipx_signbox_td clearfix">
                                    <label className={checkedClass} onClick={this.rememberAccount.bind(this)}>
                                        <i className="iconfont icon-succeed"/>&nbsp;&nbsp;
                                        <span className="text-elps">
                                        {messages.rememberAccount}
                                    </span>
                                    </label>
                                    {/*<Link to="/forgetPassword" className="float_rt">{messages.forgetPassword}?</Link>*/}
                                </div>
                                <button className="ipx_btn ipx_blue_btn ipx_XL_btn" type="submit" onClick={this.submit}>{messages.loginSpace}</button>
                            </div>
                            <div className="animationbox vendors_animation">
                                <img src={agent_pic}  style={{position:"absolute",top:"95px", left:"-48px"}}/>
                            </div>
                        </div>
                    </div>
                </form>
                {
                    langPackageInject() == 'en_US'?
                        <div className="login_foot">
                            <ul>
                                <li>
                                    <a href="http://index.ipx.net/en/index.html" target="_blank">{messages.IPXHome}</a>
                                </li>
                                <li>
                                    <a href="http://index.ipx.net/en/about.html" target="_blank">{messages.aboutUs}</a>
                                </li>
                                <li className="hide"><a href="#" target="_blank">帮助中心</a></li>
                                <li className="hide"><a href="#" target="_blank">联系我们</a></li>
                                <li className="hide"><a href="#" target="_blank">法律申明</a></li>
                            </ul>
                            <p>Copyright © 2017  <a href="http://index.ipx.net/en/index.html" target="_blank">IPX.net </a>{messages.rightReserved}</p>
                        </div>
                        :
                        <div className="login_foot">
                            <ul>
                                <li>
                                    <a href="http://index.ipx.net/cn/index.html" target="_blank">{messages.IPXHome}</a>
                                </li>
                                <li>
                                    <a href="http://index.ipx.net/cn/about.html" target="_blank">{messages.aboutUs}</a>
                                </li>
                                <li className="hide"><a href="#" target="_blank">帮助中心</a></li>
                                <li className="hide"><a href="#" target="_blank">联系我们</a></li>
                                <li className="hide"><a href="#" target="_blank">法律申明</a></li>
                            </ul>
                            <p>Copyright © 2017  <a href="http://index.ipx.net/cn/index.html" target="_blank">IPX.net </a> {messages.rightReserved}</p>
                        </div>
                }
            </div>
        );
    }
}

export default connect((store) => (store))(injectIntl(Login));
