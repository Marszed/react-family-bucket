/**
 * Created by marszed on 2017/1/24.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {isEqual} from 'LIB/tool';
import {injectIntl} from 'react-intl';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            params: this.props.params
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params && !isEqual(nextProps.params, this.state.params)) {
            this.setState({
                params: nextProps.params
            });
        }
        if (nextProps.project.projectList && !isEqual(nextProps.project.projectList, this.state.projectList)) {
            this.setState({
                projectList: nextProps.project.projectList
            });
        }
    }

    render() {
        const {messages} = this.props.intl;

        return (<div className="dev_cont_title clearfix">
            <div className="dev_cont_titleBg">
                <h1 className="float_lf">{messages.projectListing}</h1>
                <ul>
                    <li className={Number(this.state.params.type) === 1 ? 'active' : ''}>
                        <Link to="/projectListing/1/country.000/overview">{messages.all}</Link>
                    </li>
                    <li className={Number(this.state.params.type) === 2 ? 'active' : ''}>
                        <Link to="/projectListing/2/country.000/overview">{messages.authorized + ' '}<span>({this.state.projectList ? this.state.projectList.authorizeNumber : 0})</span></Link>
                    </li>
                    <li className={Number(this.state.params.type) === 3 ? 'active' : ''}>
                        <Link to="/projectListing/3/country.000/overview">{messages.bookmarked + ' '}<span>({this.state.projectList ? this.state.projectList.favoriteNumber : 0})</span></Link>
                    </li>
                    {/*<li className={Number(this.state.params.type) === 4 ? 'active' : ''}>
                     <Link to="/projectListing/4/ALL/gird">{messages.browsed}</Link>
                     </li>*/}
                </ul>
            </div>
        </div>);
    }
}

Header.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect((store) => (store))(injectIntl(Header));
