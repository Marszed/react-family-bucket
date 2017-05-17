/**
 * Created by marszed on 2017/5/12.
 */
import React from "react";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall, getUploader} from 'HTTP';
import {setCompanyInfo, showToast} from "REDUX/actions/global";
import {getLocalStorage, setLocalStorage, objCopy, isEqual} from "LIB/tool";
import ValidateTool from 'LIB/validationRules';
import Loading from "ASSET/img/ipx-loading.gif";
import { Upload } from 'antd';



function mapStateToProps(state) {
    return Object.assign({}, state);
}

class CompanySetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyInfo: objCopy(this.props.global.companyInfo) || getLocalStorage("companyInfo") || {},
            companyEmailInfo: "",
            companyPhoneInfo: "",
            companyMobilePhone: "",
            companyWebInfo: "",
            companyInfoLogo: "",
            uploadFileConfig: getUploader({
                "numberLimit": 1,
                "action": '/agency/sys/agency/pic',
                "fileSize": 8,
                "accept": "image/jpeg,image/png"
            })
        };
    }

    changeCompanyEmail = (event) => {
        let info = this.state.companyInfo;
        info.companyEmail = event.target.value;
        this.setState({companyInfo: info});
        this.validateEmail(event.target.value);
    };

    validateEmail = (value) => {
        if (!ValidateTool.isEmail(value)) {
            this.setState({
                companyEmailInfo: this.props.intl.messages.validateEmail2
            });
            return false;
        } else {
            this.setState({
                companyEmailInfo: ""
            });
            return true;
        }
    };

    changeCompanyPhone = (event) => {
        let info = this.state.companyInfo;
        info.companyPhone = event.target.value;
        this.setState({companyInfo: info});
    };

    changeMobilePhone = (event) => {
        let info = this.state.companyInfo;
        info.companyMobilePhone = event.target.value;
        this.setState({companyInfo: info});
    };

    changeCompanyAddr = (event) => {
        let info = this.state.companyInfo;
        info.companyAddr = event.target.value;
        this.setState({companyInfo: info});
    };

    changeCompanyUniqueId = (event) => {
        let info = this.state.companyInfo;
        info.companyUniqueid = event.target.value;
        this.setState({companyInfo: info});
    };

    changeCompanyDesc = (event) => {
        let info = this.state.companyInfo;
        info.companyDescription = event.target.value;
        this.setState({companyInfo: info});
    };

    changeCompanyWeb =(event) => {
        let info = this.state.companyInfo;
        info.siteUrl = event.target.value;
        this.setState({companyInfo: info});
        this.validateCompanyWeb(event.target.value);
    };

    validateCompanyWeb = (value) => {
        if (!ValidateTool.isWeb(value)) {
            this.setState({
                companyWebInfo: this.props.intl.messages.validateCompanyWeb
            });
            return false;
        } else {
            this.setState({
                companyWebInfo: ""
            });
            return true;
        }
    };

    saveCompanyInfo = () => {
        if (!this.state.companyInfo.companyAddr || !this.validateEmail(this.state.companyInfo.companyEmail) || !this.validateCompanyWeb(this.state.companyInfo.siteUrl)){
            return false;
        }
        let reqData = {
            companyAddr: this.state.companyInfo.companyAddr,
            companyEmail: this.state.companyInfo.companyEmail,
            companyPhone: this.state.companyInfo.companyPhone,
            companyUniqueid: this.state.companyInfo.companyUniqueid,
            siteUrl: this.state.companyInfo.siteUrl,
            mobilePhone: this.state.companyInfo.companyMobilePhone,
            companyDescription: this.state.companyInfo.companyDescription
        };

        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.COMPANY, key: 'COMPANY'},
                headers: {
                    'Content-Type':	'application/x-www-form-urlencoded'
                },
                dataSerialize: true,
                method: 'post',
                data: reqData
            });
            if (!response.errType) {
                //提示更新成功
                this.props.dispatch(showToast({
                    content: this.props.intl.messages.updateCompanyInfo,
                    state: 1
                }));
                //维护redux中的公司信息
                setLocalStorage('companyInfo', this.state.companyInfo);
                this.props.dispatch(setCompanyInfo(this.state.companyInfo));
            }
        }.bind(this)();
    };

    //==============文件上传(图片)=========
    beforeUpload = (file) => {
        const fileTypeArray = this.state.uploadFileConfig.accept.split(',');
        let isFile = false;
        fileTypeArray.map((fileType) => {
            if (fileType === file.type){
                isFile = true;
                return false;
            }
        });
        if (!isFile) {
            // 提示用户,文件格式不合法
            this.props.dispatch(showToast({
                content: this.props.intl.messages.uploadIllegal,
                state: 2
            }));
            return false;
        }
        const fileSize = file.size / 1024 / 1024 < this.state.uploadFileConfig.fileSize;
        if (!fileSize) {
            // 提示用户,文件超出单张文件大小限制
            this.props.dispatch(showToast({
                content: this.props.intl.messages.pleaseUpload + this.state.uploadFileConfig.fileSize + this.props.intl.messages.fileLimitTip,
                state: 2
            }));
            return false;
        }
        return isFile && fileSize;
    };

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            // 添加上传loading
            this.setState({
                companyInfo: Object.assign(objCopy(this.state.companyInfo), {companyLogo: Loading})
            });
        } else if (info.file.status === 'done') {
            /*
            // 直接读取图片文件的base64数据
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                companyInfo: Object.assign(objCopy(this.state.companyInfo), {companyLogo: info.file.reponse.data.url})
            }));
            */
            if (info.file.response.header && info.file.response.header.code === '0000'){
                const temp = Object.assign(objCopy(this.state.companyInfo), {companyLogo: objCopy(info.file.response).data});
                // 从接口返回中取出url替换loading
                this.setState({
                    companyInfo: temp
                });
                //维护redux中的公司信息
                setLocalStorage('companyInfo', temp);
                this.props.dispatch(setCompanyInfo(temp));
                // 提示用户,上传成功
                this.props.dispatch(showToast({
                    content: this.props.intl.messages.uploadSuccess,
                    state: 1
                }));
            } else {
                // 上传报错移除loading
                this.setState({
                    companyInfo: Object.assign(objCopy(this.state.companyInfo), {companyLogo: this.state.companyInfo.companyInfoLogo})
                });
                // 提示用户,上传失败
                this.props.dispatch(showToast({
                    content: this.props.intl.messages.uploadFail,
                    state: 2
                }));
            }
        } else if (info.file.status === 'error') {
            // 上传报错移除loading
            this.setState({
                companyInfo: Object.assign(objCopy(this.state.companyInfo), {companyLogo: this.state.companyInfo.companyInfoLogo})
            });
            // 提示用户,上传失败
            this.props.dispatch(showToast({
                content: this.props.intl.messages.uploadFail,
                state: 2
            }));
        }
    };
    /*
    // 获取图片base64数据
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    */
    //==============文件上传============

    render() {
        const {messages} = this.props.intl;
        return (
            <div className="ipx_setting_box ipx_setting_companybox">
                <div className="clearfix">
                    <div className="ipx_setting_logo">
                        <div className="ipx_setting_tr clearfix">
                            <h4>{messages.companyLogo}</h4>
                            <div className="ipx_setting_logobox ipx_ant_company_upload">
                                <Upload
                                    name="companyLogo"
                                    headers={this.state.uploadFileConfig.headers}
                                    showUploadList={this.state.uploadFileConfig.showUploadList}
                                    action={this.state.uploadFileConfig.action}
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {
                                        this.state.companyInfo.companyLogo ? <img src={this.state.companyInfo.companyLogo} /> : null
                                    }
                                    <i className="iconfont icon-add"/>
                                </Upload>
                            </div>
                            <p dangerouslySetInnerHTML={{__html: messages.uploadCompanyLogo}}/>
                        </div>
                    </div>
                    <div className="ipx_setting_form">
                        <div className="ipx_setting_tr">
                            <h4>{messages.companyName}</h4>
                            <input type="text" className="ipxTxt width66per disabled"
                                   disabled="disabled" value={this.state.companyInfo.companyName}/>
                        </div>
                        <div className="ipx_setting_tr clearfix">
                            <div className={"ipx_setting_td width33per " + (this.state.companyEmailInfo ? "warning" : "")}>
                                <h4>{messages.companyEmail}</h4>
                                <input type="text" className="ipxTxt width96per"
                                       onChange={this.changeCompanyEmail.bind(this)}
                                       onBlur={this.changeCompanyEmail.bind(this)}
                                       placeholder={messages.inputCompanyEmail}
                                       value={this.state.companyInfo.companyEmail}/>
                                <p className="warningTxt">{this.state.companyEmailInfo}</p>
                            </div>
                            <div className={"ipx_setting_td width33per " + (this.state.companyPhoneInfo ? "warning" : "")}>
                                <h4>{messages.companyPhone}</h4>
                                <input type="text" className="ipxTxt width96per"
                                       onChange={this.changeCompanyPhone.bind(this)}
                                       onBlur={this.changeCompanyPhone.bind(this)}
                                       value={this.state.companyInfo.companyPhone || ""}
                                       placeholder={messages.inputCompanyPhone}/>
                                <p className="warningTxt">{this.state.companyPhoneInfo}</p>
                            </div>
                            <div className={"ipx_setting_td width33per " + (this.state.companyMobilePhone ? "warning" : "")}>
                                <h4>{messages.companyTelephone}</h4>
                                <input type="text" className="ipxTxt width96per"
                                       onChange={this.changeMobilePhone.bind(this)}
                                       onBlur={this.changeMobilePhone.bind(this)}
                                       value={this.state.companyInfo.companyMobilePhone}
                                       placeholder={messages.inputMobilePhone}/>
                                <p className="warningTxt">{this.state.companyMobilePhone}</p>
                            </div>
                        </div>
                        <div className="ipx_setting_tr clearfix">
                            <div className="ipx_setting_td width33per">
                                <h4>{messages.country}</h4>
                                <input type="text" className="ipxTxt width98per disabled"
                                       readOnly="readOnly"
                                       value={this.state.companyInfo.countryName}/>
                            </div>
                            <div className="ipx_setting_td width66per">
                                <h4>{messages.companyAddr}</h4>
                                <input type="text" className="ipxTxt width98per"
                                       onChange={this.changeCompanyAddr.bind(this)}
                                       onBlur={this.changeCompanyAddr.bind(this)}
                                       value={this.state.companyInfo.companyAddr}/>
                            </div>
                        </div>
                        <div className="ipx_setting_tr clearfix">
                            <h4>{messages.companyUniqueId}</h4>
                            <input type="text" className="ipxTxt width33per"
                                   onChange={this.changeCompanyUniqueId.bind(this)}
                                   value={this.state.companyInfo.companyUniqueid || ""}
                                   placeholder={messages.inputCompanyUniqueId}/>
                        </div>
                        <div className="ipx_setting_tr clearfix">
                            <div className={"ipx_setting_td width60per " + (this.state.companyWebInfo ? "warning" : "")}>
                                <h4>{messages.companyWeb}</h4>
                                <input type="text" className="ipxTxt width60per"
                                       onChange={this.changeCompanyWeb.bind(this)}
                                       onBlur={this.changeCompanyWeb.bind(this)}
                                       value={this.state.companyInfo.siteUrl || ""}
                                       placeholder={messages.inputCompanyWeb}/>
                                <p className="warningTxt">{this.state.companyWebInfo}</p>
                            </div>
                        </div>
                        <div className="ipx_setting_tr clearfix">
                            <h4>{messages.companyDesc}</h4>
                            <textarea className="ipx_textarea width98per"
                                      onChange={this.changeCompanyDesc.bind(this)}
                                      value={this.state.companyInfo.companyDescription || ""}
                                      style={{"height": "400px"}}
                                      placeholder={messages.inputCompanyDesc}/>
                        </div>
                        <button className="ipx_btn ipx_blue_btn ipx_XL_btn" style={{"margin": "60px 0 0", "width": "160px"}} onClick={this.saveCompanyInfo}>{messages.save}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(injectIntl(CompanySetting));