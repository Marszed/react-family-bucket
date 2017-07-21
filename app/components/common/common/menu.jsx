/**
 * Created by marszed on 2017/1/24.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { FormattedMessage, injectIntl} from 'react-intl';
import { Link } from 'react-router';
import INTERFACE from "INTERFACE/config";
import {getLocalStorage, objCopy, isEqual} from 'LIB/tool';
import CompanyLogo from '../common/companyLogo';
import {asyncAwaitCall} from 'HTTP';
import Confirm from "../common/confirm";
import {setGlobalConfirm} from 'REDUX/actions/global';
import defaulthead from 'ASSET/img/defaulthead.jpg';
import pureRender from "pure-render-decorator";

@pureRender
class Menu extends React.Component {
    constructor(props) {
        super(props);
        const {messages} = this.props.intl;
        this.state = {
            userInfo: objCopy(this.props.global.userInfo) || getLocalStorage("userInfo") || {},
            optHide: true,
            optTitle: messages.deleteResourceTip,
            optContent: messages.confirmLogout
        };
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.global.userInfo && !isEqual(nextProps.global.userInfo, this.state.userInfo)){
            this.setState({
                userInfo: nextProps.global.userInfo
            });
        }
    }
    // 弹出框
    changeOptHide(optHide, ok) {
        this.setState({
            optHide: optHide
        });
        if (ok) {
            this.logout();
        }
    }
    //注销操作
    logout(){
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.LOGOUT, key: 'LOGOUT'},
                method: 'get'
            });
            window.localStorage.clear();
            setTimeout(() => (this.context.router.push('/')), 0);
        }.bind(this)();
    }

    // 未签约经纪公司，访问权限受限，弹出请签约
    showPlatformConfirm = () => {
        const {messages} = this.props.intl;
        this.props.dispatch(setGlobalConfirm({
            hide: false,
            title: messages.tips,
            content: messages.isPlatformTip,
            confirm: true,
            cancel: false
        }));
    };


    render() {
        const {userInfo} = this.state;
        return <div className="ipx_dev_lf">
            <div className="ipx_dev_logo ipxblue_bg">
                <CompanyLogo/>
            </div>
            <div className="ipx_dev_nav">
                <Link to="/dashboard" className="ipx_dev_nav_box" activeClassName="active">
                    <li>
                        <i className="iconfont icon-dashboard"/>
                        <span>
                            <b/>
                            <FormattedMessage
                                id='dashBoard'
                                tagName="cite"
                                defaultMessage='DashBoard!'
                            />
                        </span>
                    </li>
                </Link>
                <Link to="/projectListing" className="ipx_dev_nav_box" activeClassName="active">
                    <li>
                        <i className="iconfont icon-projects"/>
                        <span>
                            <b/>
                            <FormattedMessage
                                id='projectListing'
                                tagName="cite"
                                defaultMessage='Project Listing!'
                            />
                        </span>
                    </li>
                </Link>
                {
                    userInfo && userInfo.isPlatformFlag ? <Link to="/agentSetting" className="ipx_dev_nav_box" activeClassName="active">
                            <li>
                                <i className="iconfont icon-tie"/>
                                <span>
                                <b/>
                                <FormattedMessage
                                    id='agentSetting'
                                    tagName="cite"
                                    defaultMessage='agentSetting!'/>
                                </span>
                            </li>
                        </Link> : <a href="javascript:;" className="ipx_dev_nav_box" onClick={this.showPlatformConfirm}>
                            <li>
                                <i className="iconfont icon-tie"/>
                                <span>
                                <b/>
                                <FormattedMessage
                                    id='agentSetting'
                                    tagName="cite"
                                    defaultMessage='agentSetting!'/>
                                </span>
                            </li>
                        </a>
                }
                <Link to="/personSetting" className="ipx_dev_nav_box" activeClassName="active">
                    <li>
                        <i className="iconfont icon-setting"/>
                        <span>
                            <b/>
                            <FormattedMessage
                                id='personSetting'
                                tagName="cite"
                                defaultMessage='personSetting!'/>
                        </span>
                    </li>
                </Link>
                <Link to="/companySetting" className="ipx_dev_nav_box" activeClassName="active">
                    <li>
                        <i className="iconfont icon-card"/>
                        <span>
                            <b/>
                            <FormattedMessage
                                id='companySetting'
                                tagName="cite"
                                defaultMessage='companySetting!'
                            />
                        </span>
                    </li>
                </Link>
            </div>
            <div className="ipx_dev_personal">
                <a href="javascript:" style={{backgroundImage: `url(${JSON.stringify(userInfo.profileImage || defaulthead)})`}}/>
                <h2><a href="javascript:" style={{'whiteSpace': 'nowrap'}}>{userInfo.firstName + " " + userInfo.lastName}</a></h2>
                <h3 title=""><FormattedMessage id='agency'/></h3>
                <ul className="dev_persn_menu">
                    <li title={this.props.intl.messages.logout} onClick={() => (
                        this.setState({
                            optHide: false
                        })
                    )}>
                        <i className="iconfont icon-logout"/>
                        <span>
                            <b/>
                            <a href="javascript:;">
                                <FormattedMessage id='logout' tagName="cite"/>
                            </a>
                        </span>
                    </li>
                </ul>
            </div>
            <Confirm hide={this.state.optHide}
                     title={this.state.optTitle}
                     handle={this.changeOptHide.bind(this)}
                     content={this.state.optContent}/>
        </div>;
    }
}

Menu.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect((store) => (store))(injectIntl(Menu));
