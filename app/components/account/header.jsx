import React from "react";
import pureRender from "pure-render-decorator";
import {langPackageInject, cookie} from "LIB/tool";
import Logo from 'ASSET/img/ipx_lf_logo2.png';

@pureRender
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: langPackageInject()
        };
    }
    changeLanguage = () => {
        let language = this.state.language.indexOf('en') !== -1 ? 'zh_CN' : 'en_US';
        this.setState({language: language});
        cookie('language', language);
        setTimeout(() => {
            if (language === 'zh_CN'){
                window.location.href = window.location.href.replace(/language=en_US/, "language=" + language);
            } else {
                window.location.href = window.location.href.replace(/language=zh_CN/, "language=" + language);
            }
        }, 0);
    };
    render(){
        const languageMessage = this.state.language.indexOf('en') !== -1 ? '切换为中文' : 'Switch to English';
        return (
        <div className={this.props.hide ? null : "login_header"}>
            {
                this.props.hide ? null : <a href="http://ipx.net" className="float_lf ipxLogin_logo" target="_blank"><img src={Logo}/></a>
            }
            <a className="ipx_sign_language" href="javascript:;" onClick={this.changeLanguage}>{languageMessage}</a>
        </div>
        );
    }
}

export default Header;