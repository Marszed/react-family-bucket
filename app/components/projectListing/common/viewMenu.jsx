/**
 * Created by marszed on 2017/1/24.
 */
import React, {PropTypes} from "react";
import {Link} from "react-router";
import {injectIntl} from "react-intl";
import {decode64, getLocalStorage} from 'LIB/tool';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    goBack = () => {
        const {searchOption} = this.context.router.location.state;
        if (searchOption){
            this.context.router.push({
                pathname: '/projectListing/' + searchOption.type + '/' + searchOption.countryCode + '/overview',
                state: {
                    searchOption: searchOption
                }
            });
        } else {
            this.context.router.push('/projectListing');
        }
    };

    render() {
        const {messages} = this.props.intl;
        const {query} = this.context.router.location;
        const searchOption = this.context.router.location.state && this.context.router.location.state.searchOption ? this.context.router.location.state.searchOption : '';
        return (<div className="dev_cont_title clearfix ">
            <div className="dev_cont_titleBg">
                <a href="javascript:;" className="proj_preview_close float_lf" onClick={this.goBack}>
                    <i className="iconfont icon-close"/>
                </a>
                <h1 className="float_lf">{decode64(query.title)}</h1>
                <ol className="float_rt">
                    <Link activeClassName='active' to={{pathname: "projectListing/view/detail", state: {searchOption: searchOption}, query: {projectId: query.projectId, projectType: query.projectType, authorizeNumber: query.authorizeNumber, title: query.title, countryCode: query.countryCode}}}><i className="iconfont icon-details"/>{messages.projectDetail}</Link>
                    <Link activeClassName='active' to={{pathname: "projectListing/view/property", state: {searchOption: searchOption}, query: {projectId: query.projectId, projectType: query.projectType, authorizeNumber: query.authorizeNumber, title: query.title, countryCode: query.countryCode}}}><i className="iconfont icon-list01"/>{messages.propertyList}</Link>
                    <Link activeClassName='active' to={{pathname: "projectListing/view/sales", state: {searchOption: searchOption}, query: {projectId: query.projectId, projectType: query.projectType, authorizeNumber: query.authorizeNumber, title: query.title, countryCode: query.countryCode}}}><i className="iconfont icon-sellgrid"/>{messages.pinChart}</Link>
                </ol>
            </div>
        </div>);
    }
}

Menu.contextTypes = {
    router: PropTypes.object.isRequired
};

export default injectIntl(Menu);
