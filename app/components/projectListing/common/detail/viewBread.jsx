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
        const {params} = this.context.router;
        return (<div className="dev_cont_subTit">
            <ol className="clearfix">
                <Link to={{pathname: "projectListing/view/detail/msg/" + params.projectId, query: {projectType: query.projectType, title: query.title}}} className="float_lf" activeClassName="active">
                    <i className="iconfont icon-profile"/>
                    <span>{messages.project + messages.msg}</span>
                </Link>
                {/*<Link to={{pathname: "projectListing/view/detail/around/" + params.projectId, query: {title: query.title}}} className="float_lf" activeClassName="active">
                    <i className="iconfont icon-map"/>
                    <span>{messages.project + messages.around}</span>
                </Link>*/}
                <Link to={{pathname: "projectListing/view/detail/document/" + params.projectId, query: {projectType: query.projectType, title: query.title}}} className="float_lf" activeClassName="active">
                    <i className="iconfont icon-document"/>
                    <span>{messages.project + messages.document}</span>
                </Link>
                <Link to={{pathname: "projectListing/view/detail/progress/" + params.projectId, query: {projectType: query.projectType, title: query.title}}} className="float_lf" activeClassName="active">
                    <i className="iconfont icon-progress"/>
                    <span>{messages.project + messages.progress}</span>
                </Link>
            </ol>
        </div>);
    }
}

Bread.contextTypes = {
    router: PropTypes.object.isRequired
};

export default injectIntl(Bread);
