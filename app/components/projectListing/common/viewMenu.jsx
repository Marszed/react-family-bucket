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
        const searchParams = getLocalStorage('searchParams');
        if (searchParams){
            this.context.router.push('/projectListing/' + searchParams.type + '/' + searchParams.country + '/overview');
        } else {
            this.context.router.push('/projectListing');
        }
    };

    render() {
        const {messages} = this.props.intl;
        const {query} = this.context.router.location;
        const {params} = this.context.router;
        return (<div className="dev_cont_title clearfix ">
            <div className="dev_cont_titleBg">
                <a href="javascript:;" className="proj_preview_close float_lf" onClick={this.goBack}>
                    <i className="iconfont icon-close"/>
                </a>
                <h1 className="float_lf">{decode64(query.title)}</h1>
                <ol className="float_rt">
                    <Link activeClassName='active' to={{pathname: "projectListing/view/msg/" + params.projectId, query: {projectType: query.projectType, authorizeNumber: query.authorizeNumber, title: query.title, countryCode: query.countryCode}}}><i className="iconfont icon-details"/>{messages.projectDetail}</Link>
                    <Link activeClassName='active' to={{pathname: "projectListing/view/property/" + params.projectId, query: {projectType: query.projectType, authorizeNumber: query.authorizeNumber, title: query.title, countryCode: query.countryCode}}}><i className="iconfont icon-list01"/>{messages.propertyList}</Link>
                    <Link activeClassName='active' to={{pathname: "projectListing/view/sales/" + params.projectId, query: {projectType: query.projectType, authorizeNumber: query.authorizeNumber, title: query.title, countryCode: query.countryCode}}}><i className="iconfont icon-sellgrid"/>{messages.pinChart}</Link>
                    <Link activeClassName='active' to={{pathname: "projectListing/view/document/" + params.projectId, query: {projectType: query.projectType, authorizeNumber: query.authorizeNumber, title: query.title, countryCode:query.countryCode}}}><i className="iconfont icon-document"/>{messages.project + ' ' + messages.document}</Link>
                    <Link activeClassName='active' to={{pathname: "projectListing/view/progress/" + params.projectId, query: {projectType: query.projectType, authorizeNumber: query.authorizeNumber, title: query.title, countryCode:query.countryCode}}}><i className="iconfont icon-progress"/>{messages.project + ' ' + messages.progress}</Link>
                </ol>
            </div>
        </div>);
    }
}

Menu.contextTypes = {
    router: PropTypes.object.isRequired
};

export default injectIntl(Menu);
