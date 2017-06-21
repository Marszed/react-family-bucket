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
import Loading from "ASSET/img/ipx-loading.gif";
import { Upload } from 'antd';

const userInfo = getLocalStorage("userInfo");

function mapStateToProps(state) {
    return Object.assign({}, state);
}

class PersonInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countryList: getLocalStorage('countryList'),
            areaCode: userInfo.mobilePhone.indexOf(' ') !== -1 ? userInfo.mobilePhone.split(' ')[0] : '',
            firstNameInfo: "",
            lastNameInfo: "",
            telephoneInfo: "",
            userDefaultLogo: userInfo.profileImage,
            userInfo: objCopy(this.props.global.userInfo) || userInfo || {},
            uploadFileConfig: getUploader({
                "numberLimit": 1,
                "action": '/agent/sys/personal/profileImage',
                "fileSize": 8,
                "accept": "image/jpeg,image/png,image/gif,image/bmp,image/x-icon"
            })
        };
    }

    changeSex = (sex) => {
        let info = this.state.userInfo ;
        info.gender = sex;
        this.setState({userInfo: info});
    };
    savePersonInfo = () => {
        if (!this.validateFirstName(this.state.userInfo.firstName) || !this.validateLastName(this.state.userInfo.lastName) || !this.validateTelephone(this.state.userInfo.mobilePhone)) {
            return false;
        }
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.ACCOUNTEDIT, key: 'ACCOUNTEDIT'},
                method: 'post',
                data: {
                    nick: this.state.userInfo.nick,
                    gender: this.state.userInfo.gender,
                    firstName: this.state.userInfo.firstName,
                    lastName: this.state.userInfo.lastName,
                    mobilePhone: this.state.userInfo.mobilePhone
                }
            });
            if (!response.errType) {
                //提示更新成功
                this.props.dispatch(showToast({
                    content: this.props.intl.messages.modifyPersonSuccess,
                    state: 1
                }));
                //维护redux中的用户个人信息
                setLocalStorage('userInfo', this.state.userInfo);
                this.props.dispatch(setUserInfo(this.state.userInfo));
            }
        }.bind(this)();
    };

    changeJobTitle = (event) => {
        let info = this.state.userInfo ;
        info.nick = event.target.value;
        this.setState({userInfo: info});
    };

    changeFirstName = (event) => {
        let info = this.state.userInfo ;
        info.firstName = event.target.value;
        this.setState({userInfo: info});
        this.validateFirstName(event.target.value);
    };

    changeTelephone = (event) => {
        let info = this.state.userInfo ;
        info.mobilePhone = this.state.areaCode + ' ' + event.target.value;
        this.setState({userInfo: info});
        this.validateTelephone(event.target.value);
    };

    changeLastName = (event) => {
        let info = this.state.userInfo ;
        info.lastName = event.target.value;
        this.setState({userInfo: info});
        this.validateLastName(event.target.value);
    };

    validateFirstName = (value) => {
        if (ValidateTool.isEmpty(value)) {
            this.setState({
                firstNameInfo: this.props.intl.messages.validateRegister1
            });
            return false;
        } else {
            this.setState({
                firstNameInfo: ""
            });
            return true;
        }
    };

    validateLastName = (value) => {
        if (ValidateTool.isEmpty(value)) {
            this.setState({
                lastNameInfo: this.props.intl.messages.validateRegister2
            });
            return false;
        } else {
            this.setState({
                lastNameInfo: ""
            });
            return true;
        }
    };

    validateTelephone = (value) => {
        if (ValidateTool.isEmpty(value) ) {
            this.setState({
                telephoneInfo: this.props.intl.messages.validateTelephone
            });
            return false;
        } else {
            this.setState({
                telephoneInfo: ""
            });
            return true;
        }
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
                userInfo: Object.assign(objCopy(this.state.userInfo), {profileImage: Loading})
            });
        } else if (info.file.status === 'done') {
            /*
             // 直接读取图片文件的base64数据
             this.getBase64(info.file.originFileObj, imageUrl => this.setState({
             companyInfo: Object.assign(objCopy(this.state.companyInfo), {companyLogo: info.file.reponse.data.url})
             }));
             */
            if (info.file.response.header && info.file.response.header.code === '0000'){
                const temp = Object.assign(objCopy(this.state.userInfo), {profileImage: objCopy(info.file.response).data + "?v=" + (new Date()).getTime()});
                // 从接口返回中取出url替换loading
                this.setState({
                    userInfo: temp
                });
                //维护redux中的用户信息
                setLocalStorage('userInfo', temp);
                this.props.dispatch(setUserInfo(temp));
                // 提示用户,上传成功
                this.props.dispatch(showToast({
                    content: this.props.intl.messages.uploadSuccess,
                    state: 1
                }));
            } else {
                // 上传报错移除loading
                this.setState({
                    userInfo: Object.assign(objCopy(this.state.userInfo), {profileImage: userInfo.profileImage})
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
                userInfo: Object.assign(objCopy(this.state.userInfo), {profileImage: userInfo.profileImage})
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
        const gentlemanClassName = "ipx_radio" + (Number(this.state.userInfo.gender) === 1 ? " checked" : "");
        const ladyClassName = "ipx_radio" + (Number(this.state.userInfo.gender) === 2 ? " checked" : "");
        let mobilePhone = String(this.state.userInfo.mobilePhone).split(' ');
        mobilePhone = String(this.state.userInfo.mobilePhone).substring(String(mobilePhone[0]).length + 1,String(this.state.userInfo.mobilePhone).length);
        return (
            <div className="ipx_setting_box">
                <div className="clearfix">
                    <div className="ipx_setting_headimg">
                        <div className="ipx_setting_tr clearfix">
                            <h4>{messages.headPortrait}</h4>
                            <div className="ipx_setting_headimgbox ipx_ant_user_upload">
                                <Upload
                                    name="userInfoLogo"
                                    headers={this.state.uploadFileConfig.headers}
                                    showUploadList={this.state.uploadFileConfig.showUploadList}
                                    action={this.state.uploadFileConfig.action}
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {
                                        this.state.userInfo.profileImage ?
                                            <div className="center-middle" style={{"width":"160px", "height":"160px"}}>
                                                {
                                                    this.state.userInfo.profileImage ? <img style={{"maxHeight": 160+"px"}} src={this.state.userInfo.profileImage} /> : ''
                                                }
                                            </div> : null
                                    }
                                    <i className="iconfont icon-add"/>
                                </Upload>
                            </div>
                            <p dangerouslySetInnerHTML={{__html: messages.uploadHeadPortrait}}/>
                        </div>
                    </div>
                    <div className="ipx_setting_form">
                        <div className="ipx_setting_tr clearfix">
                            <div className={"ipx_setting_td width25per " + (this.state.firstNameInfo ? "warning" : "")}>
                                <h4>{messages.firstName}</h4>
                                <input type="text" className="ipxTxt width96per"
                                       onChange={this.changeFirstName.bind(this)}
                                       onBlur={this.changeFirstName.bind(this)}
                                       maxLength="40"
                                       placeholder={messages.firstName}
                                       value={this.state.userInfo.firstName}/>
                                <p className="warningTxt">{this.state.firstNameInfo}</p>
                            </div>
                            <div className={"ipx_setting_td width25per " + (this.state.lastNameInfo ? "warning" : "")}>
                                <h4>{messages.lastName}</h4>
                                <input type="text" className="ipxTxt width96per"
                                       onChange={this.changeLastName.bind(this)}
                                       onBlur={this.changeLastName.bind(this)}
                                       maxLength="40"
                                       placeholder={messages.lastName}
                                       value={this.state.userInfo.lastName}/>
                                <p className="warningTxt">{this.state.lastNameInfo}</p>
                            </div>
                        </div>
                        <div className="ipx_setting_tr">
                            <h4>{messages.jobTitle}</h4>
                            <input type="text" className="ipxTxt width66per" ref="jobTitle"
                                   value={this.state.userInfo.nick || ""}
                                   onChange={this.changeJobTitle.bind(this)}
                                   maxLength="20"
                                   placeholder={messages.inputJobTitle}/>
                        </div>
                        <div className="ipx_setting_tr">
                            <h4>{messages.sex}</h4>
                            <label className={gentlemanClassName} style={{"margin-right": "60px"}}>
                                <i className="iconfont icon-succeed" onClick={this.changeSex.bind(this, 1)}/>
                                <span className="v_align_mid">{messages.gentleman}</span>
                            </label>
                            <label className={ladyClassName}>
                                <i className="iconfont icon-succeed" onClick={this.changeSex.bind(this, 2)}/>
                                <span className="v_align_mid">{messages.lady}</span>
                            </label>
                        </div>
                        <div className="ipx_setting_tr clearfix">
                            <div className={"ipx_setting_td width96per " + (this.state.mobilePhone ? "warning" : "")}>
                                <h4>{messages.telephone}</h4>
                                <input type="text" className="ipxTxt"
                                       onChange={this.changeTelephone.bind(this)}
                                       onBlur={this.changeTelephone.bind(this)}
                                       style={{"width": 320 + "px"}}
                                       placeholder={messages.telephone}
                                       value={mobilePhone} />
                                <p className="warningTxt">{this.state.telephoneInfo}</p>
                            </div>
                        </div>
                        <div className="ipx_setting_tr">
                            <h4>{messages.email}</h4>
                            <input type="text" className="ipxTxt width66per disabled" value={this.state.userInfo.email} disabled="disabled"/>
                        </div>
                        <button className="ipx_btn ipx_blue_btn ipx_XL_btn" style={{"margin": "60px 0 0", "width": "160px"}} onClick={this.savePersonInfo.bind(this)}>{messages.save}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(injectIntl(PersonInfo));