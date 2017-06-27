/**
 * Created by marszed on 2017/1/24.
 */
import React, {PropTypes} from "react";
import {Link} from "react-router";
import {injectIntl} from "react-intl";

class Bread extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {messages} = this.props.intl;
        const {query} = this.context.router.location;
        const searchOption = this.context.router.location.state && this.context.router.location.state.searchOption ? this.context.router.location.state.searchOption : '';
        return (<div className="dev_cont_subTit">
            <ol className="clearfix">
                <Link to={{pathname: "projectListing/view/detail/msg", state: {searchOption: searchOption}, query: {projectId: query.projectId, projectType: query.projectType, authorizeNumber: query.authorizeNumber, title: query.title, countryCode: query.countryCode}}} className="float_lf" activeClassName="active">
                    <i className="iconfont icon-profile"/>
                    <span>{messages.projectDetail}</span>
                </Link>
                {/*<Link to={{pathname: "projectListing/view/detail/around", state: {searchOption: searchOption}, query: {projectId: query.projectId, projectType: query.projectType, authorizeNumber: query.authorizeNumber, title: query.title, countryCode: query.countryCode}}} className="float_lf" activeClassName="active">
                 <i className="iconfont icon-map"/>
                 <span>{messages.project + messages.around}</span>
                 </Link>*/}
                <Link to={{pathname: "projectListing/view/detail/document", state: {searchOption: searchOption}, query: {projectId: query.projectId, projectType: query.projectType, authorizeNumber: query.authorizeNumber, title: query.title, countryCode: query.countryCode}}} className="float_lf" activeClassName="active">
                    <i className="iconfont icon-document"/>
                    <span>{messages.projectDoc}</span>
                </Link>
                <Link to={{pathname: "projectListing/view/detail/progress", state: {searchOption: searchOption}, query: {projectId: query.projectId, projectType: query.projectType, authorizeNumber: query.authorizeNumber, title: query.title, countryCode: query.countryCode}}} className="float_lf" activeClassName="active">
                    <i className="iconfont icon-progress"/>
                    <span>{messages.projectProgress}</span>
                </Link>
            </ol>
        </div>);
    }
}

Bread.contextTypes = {
    router: PropTypes.object.isRequired
};

export default injectIntl(Bread);
