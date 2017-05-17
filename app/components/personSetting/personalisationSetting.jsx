/**
 * Created by marszed on 2017/5/12.
 */
import React from "react";
import {injectIntl} from "react-intl";
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import {getLocalStorage, setLocalStorage, cookie, langPackageInject} from "LIB/tool";

class PersonalisationSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountId: "",
            showLang: "",
            language: "",
            hide: false
        };
    }

    componentWillMount() {
        this.setState({
            accountId: getLocalStorage("userInfo").accountId,
            language: langPackageInject(),
            showLang: langPackageInject().indexOf('zh') !== -1 ? "中文" : "English"
        });
    }

    handleChangeLang(language) {
        this.setState({
            showLang: language.indexOf('zh') !== -1 ? "中文" : "English",
            language: language,
            hide: true
        });
    }

    saveLanguage() {
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.LANGUAGECHANGE + this.state.language, key: 'LANGUAGECHANGE'},
                method: 'put'
            });
            if (!response.errType) {
                cookie('language', this.state.language);
                window.localStorage.setItem('token', response.data.data);
                setTimeout(() => (window.location.reload(true)), 10);
            }
        }.bind(this)();
    }

    mouseEnterHandler(){
        this.setState({
            hide: false
        });
    }

    render() {
        const {messages} = this.props.intl;
        return (
            <div className="ipx_setting_box">
                <div className="clearfix">
                    <div className="ipx_setting_form">
                        <div className="ipx_setting_tr">
                            <h4>{messages.systemLang}</h4>
                            <div className="ipx_select width33per" onMouseEnter={this.mouseEnterHandler.bind(this)}>
                                <div>
                                    <span>{this.state.showLang}</span>
                                    <i className="iconfont icon-downArrow"/>
                                </div>
                                <ul className={this.state.hide ? "hide" : ""}>
                                    <li onClick={this.handleChangeLang.bind(this, "zh_CN")}>中文</li>
                                    <li onClick={this.handleChangeLang.bind(this, "en_US")}>English</li>
                                </ul>
                            </div>
                        </div>
                        <button className="ipx_btn ipx_blue_btn ipx_XL_btn" style={{"margin": "60px 0 0", "width": "160px"}} onClick={this.saveLanguage.bind(this)}>{messages.saveSpace}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(PersonalisationSetting);