/**
 *  注册,Joels
 */
import React from "react";
import {Link} from "react-router";
import {injectIntl} from "react-intl";
import Header from 'COMPONENT/account/header';
import Select from 'COMPONENT/common/form/selectBox';
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import {getLocalStorage, langPackageInject, setLocalStorage, encode64} from "LIB/tool";
import ValidateTool from 'LIB/validationRules';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areaCode: '',
            countryList: [],
            firstName: '',
            lastName: '',
            telephone: '',
            email: '',
            companyName: '',
            country: '',
            companyAddr: '',
            companyWeb: '',

            nameClass: 'clearfix',
            telephoneClass: 'clearfix',
            emailClass: 'clearfix',
            companyNameClass: 'clearfix',
            companyAddrClass: 'clearfix',
            companyWebClass: 'clearfix',
            countryClass: 'clearfix',
            nameInfo: '',
            telephoneInfo: '',
            emailInfo: '',
            companyNameInfo: '',
            companyAddrInfo: '',
            countryInfo: '',
            companyWebInfo: '',
            oneLevel: [],
            placeHolder: ""
        };
    }

    componentDidMount() {
        const countryList = getLocalStorage('countryList');
        // 获取国家信息
        if (!countryList || countryList === null){
            this.getCountry();
        } else {
            this.setState({
                oneLevel: countryList,
                countryList: countryList
            });
        }
    }
    // 获取国家
    getCountry = () => {
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.COUNTRY, key: 'COUNTRY'},
                method: 'get',
                params: {
                    language: langPackageInject()
                }
            });
            if (!response.errType && response.data.data) {
                this.setState({
                    oneLevel: response.data.data,
                    countryList: response.data.data
                });
                setLocalStorage('countryList', response.data.data);
            }
        }.bind(this)();
    };

    submit = (event) => {
        event.preventDefault();
        //验证
        if (!this.validateFirstName(this.state.firstName) || !this.validateLastName(this.state.lastName) || !this.validateCountry(this.state.country) || !this.validateTelephone(this.state.telephone) || !this.validateEmail(this.state.email) || !this.validateCompanyName(this.state.companyName) || !this.validateCompanyAddr(this.state.companyAddr) || !this.validateCompanyWeb(this.state.companyWeb)) {
            return false;
        }
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.REGISTER, key: 'REGISTER'},
                method: 'post',
                data: {
                    contactPhone: this.state.areaCode + ' ' + this.state.telephone,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    companyEmail: this.state.email,
                    companyName: this.state.companyName,
                    companyAddr: this.state.companyAddr,
                    country: this.state.country,
                    companyUrl: this.state.companyWeb
                }
            });
            if (!response.errType && response.data.data) {
                //跳转到注册成功页面
                this.props.router.push('registerSuccess/' + encode64(this.state.firstName + " " + this.state.lastName));
            }
        }.bind(this)();
    };

    chooseHandler = (options) => {
        this.setState({
            country: options.dicCode,
            placeHolder: options.dicValue,
            areaCode: options.telephoneCode
        });
        this.validateCountry(options.dicCode);
    };

    validateCountry = (country) => {
        if (country === null || country === undefined || country === '') {
            this.setState({
                countryClass: "clearfix warning",
                countryInfo: this.props.intl.messages.validateCountry
            });
            return false;
        } else {
            this.setState({
                countryClass: "clearfix",
                countryInfo: ""
            });
            return true;
        }
    };

    changeFirstName = (event) => {
        this.setState({firstName: event.target.value});
        this.validateFirstName(event.target.value);
    };

    changeLastName = (event) => {
        this.setState({lastName: event.target.value});
        this.validateLastName(event.target.value);
        this.validateFirstName(this.state.firstName);
    };

    changeCompanyWeb = (event) => {
        this.setState({companyWeb: event.target.value});
        this.validateCompanyWeb(event.target.value);
    };

    changeCompanyAddr = (event) => {
        this.setState({companyAddr: event.target.value});
        this.validateCompanyAddr(event.target.value);
    };

    changeCompanyName = (event) => {
        this.setState({companyName: event.target.value});
        this.validateCompanyName(event.target.value);
    };

    validateCompanyWeb = (value) => {
        if (!ValidateTool.isWeb(value)) {
            this.setState({
                companyWebClass: "clearfix warning",
                companyWebInfo: this.props.intl.messages.validateCompanyWeb
            });
            return false;
        } else {
            this.setState({
                companyWebClass: "clearfix",
                companyWebInfo: ""
            });
            return true;
        }
    };

    validateFirstName = (value) => {
        if (ValidateTool.isEmpty(value)) {
            this.setState({
                nameClass: "clearfix warning",
                nameInfo: this.props.intl.messages.validateRegister1
            });
            return false;
        } else {
            this.setState({
                nameClass: "clearfix",
                nameInfo: ""
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

    validateCompanyName = (value) => {
        if (ValidateTool.isEmpty(value)) {
            this.setState({
                companyNameClass: "clearfix warning",
                companyNameInfo: this.props.intl.messages.validateCompanyName
            });
            return false;
        } else {
            this.setState({
                companyNameClass: "clearfix",
                companyNameInfo: ""
            });
            return true;
        }
    };

    validateTelephone = (value) => {
        if (ValidateTool.isEmpty(value)) {
            this.setState({
                telephoneClass: "clearfix warning",
                telephoneInfo: this.props.intl.messages.validateTelephone
            });
            return false;
        } else {
            this.setState({
                telephoneClass: "clearfix",
                telephoneInfo: ""
            });
            return true;
        }
    };

    validateCompanyAddr = (value) => {
        if (ValidateTool.isEmpty(value)) {
            this.setState({
                companyAddrClass: "clearfix warning",
                companyAddrInfo: this.props.intl.messages.validateCompanyAddr
            });
            return false;
        } else {
            this.setState({
                companyAddrClass: "clearfix",
                companyAddrInfo: ""
            });
            return true;
        }
    };

    validateLastName = (value) => {
        if (ValidateTool.isEmpty(value)) {
            this.setState({
                nameClass: "clearfix warning",
                nameInfo: this.props.intl.messages.validateRegister2
            });
            return false;
        } else {
            this.setState({
                nameClass: "clearfix",
                nameInfo: ""
            });
            return true;
        }
    };

    //邮箱输入
    changeEmail = (event) => {
        this.setState({email: event.target.value});
        this.validateEmail(event.target.value);
    };

    changeTelephone = (event) => {
        this.setState({telephone: event.target.value});
        this.validateTelephone(event.target.value);
    };
    render() {
        const {messages} = this.props.intl;
        return (
            <div className="ipx_sign_body">
                <Header hide={true}/>
                <form onSubmit={this.submit}>
                    <div className="ipx_signbox">
                        <img className="ipx_sign_logo" src={require('../../asset/img/ipx_lf_logo2.png')}/>
                        <h1>{messages.agentRegister}</h1>
                        <dl className="ipx_sign_dl">
                            <dd className={this.state.nameClass}>
                                <label className="ipx_sign_label">
                                    <i className="iconfont icon-person"/>
                                </label>
                                <input type="text"
                                       className="ipxTxt"
                                       name="firstName"
                                       value={this.state.firstName}
                                       onChange={this.changeFirstName.bind(this)}
                                       onBlur={this.changeFirstName.bind(this)}
                                       maxLength="50"
                                       style={{"width": "145px", "margin-right": "10px"}}
                                       placeholder={messages.firstName}
                                />
                                <input type="text"
                                       className="ipxTxt"
                                       name="lastName"
                                       value={this.state.lastName}
                                       onChange={this.changeLastName.bind(this)}
                                       onBlur={this.changeLastName.bind(this)}
                                       style={{"width": "145px"}}
                                       maxLength="50"
                                       placeholder={messages.lastName}
                                />
                            </dd>
                            <p className="warningTxt">
                                {this.state.nameInfo}
                            </p>
                            <dd className={this.state.countryClass}>
                                <label className="ipx_sign_label">
                                    <i className="iconfont icon-earth"/>
                                </label>
                                <Select items={this.state.oneLevel}
                                        ref="country"
                                        leave="one"
                                        className="ipx_select float_lf"
                                        placeholder={this.state.placeHolder || messages.country}
                                        chooseHandler={this.chooseHandler.bind(this)}
                                        required/>
                            </dd>
                            <p className="warningTxt">
                                {this.state.countryInfo}
                            </p>
                            <dd className={this.state.telephoneClass}>
                                <label className="ipx_sign_label">
                                    <i className="iconfont icon-telephone"/>
                                </label>
                                <input type="text"
                                       className="ipxTxt ipx_sign_Areacode"
                                       placeholder={messages.areaCode}
                                       value={this.state.areaCode}
                                       readOnly="readonly"
                                       maxLength="8"/>
                                <input type='text'
                                       className="ipxTxt ipx_sign_CotryNum"
                                       name="telephone"
                                       value={this.state.telephone}
                                       onChange={this.changeTelephone.bind(this)}
                                       onBlur={this.changeTelephone.bind(this)}
                                       placeholder={messages.telephone}
                                />
                            </dd>
                            <p className="warningTxt">
                                {this.state.telephoneInfo}
                            </p>
                            <dd className={this.state.emailClass}>
                                <label className="ipx_sign_label">
                                    <i className="iconfont icon-email"/>
                                </label>
                                <input type='text'
                                       className="ipxTxt"
                                       name="email"
                                       value={this.state.email}
                                       onChange={this.changeEmail.bind(this)}
                                       onBlur={this.changeEmail.bind(this)}
                                       placeholder={messages.emailDefaultTip}
                                />
                            </dd>
                            <p className="warningTxt">
                                {this.state.emailInfo}
                            </p>
                            <dd className={this.state.companyNameClass}>
                                <label className="ipx_sign_label">
                                    <i className="iconfont icon-card"/>
                                </label>
                                <input type='text'
                                       className="ipxTxt"
                                       name="companyName"
                                       value={this.state.companyName}
                                       onChange={this.changeCompanyName.bind(this)}
                                       onBlur={this.changeCompanyName.bind(this)}
                                       placeholder={messages.companyName}
                                />
                            </dd>
                            <p className="warningTxt">
                                {this.state.companyNameInfo}
                            </p>
                            <dd className={this.state.companyAddrClass}>
                                <label className="ipx_sign_label">
                                    <i className="iconfont icon-map"/>
                                </label>
                                <input type='text'
                                       className="ipxTxt"
                                       name="companyAddr"
                                       value={this.state.companyAddr}
                                       onChange={this.changeCompanyAddr.bind(this)}
                                       onBlur={this.changeCompanyAddr.bind(this)}
                                       placeholder={messages.companyAddr}
                                />
                            </dd>
                            <p className="warningTxt">
                                {this.state.companyAddrInfo}
                            </p>
                            <dd className={this.state.companyWebClass}>
                                <label className="ipx_sign_label">
                                    <i className="iconfont icon-computer"/>
                                </label>
                                <input type='text'
                                       className="ipxTxt"
                                       name="companyWeb"
                                       value={this.state.companyWeb}
                                       onChange={this.changeCompanyWeb.bind(this)}
                                       onBlur={this.changeCompanyWeb.bind(this)}
                                       placeholder={messages.companyWeb}
                                />
                            </dd>
                            <p className="warningTxt">{this.state.companyWebInfo}</p>
                        </dl>
                        <button className="ipx_btn ipx_blue_btn ipx_XL_btn" type="submit" onClick={this.submit}>{messages.registerSpace}</button>
                        <p className="ipx_sign_tips">
                            <Link to="/" activeClassName="active">
                                <a href="javascript:;">{messages.loginNow}</a>
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}

export default injectIntl(Register);
