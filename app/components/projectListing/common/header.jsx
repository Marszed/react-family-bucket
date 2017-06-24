/**
 * Created by marszed on 2017/1/24.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {setFormBox} from 'REDUX/actions/project';
import {setFormRadioType} from 'REDUX/actions/global';
import {Link} from 'react-router';
import {isEqual, getLocalStorage} from 'LIB/tool';
import {injectIntl} from 'react-intl';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            params: this.props.params,
            userInfo: getLocalStorage('userInfo')
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params && !isEqual(nextProps.params, this.state.params)) {
            this.setState({
                params: nextProps.params
            });
            this.props.dispatch(setFormRadioType({
                key: 'viewType',
                value: 0
            }));
        }
        if (nextProps.project.projectList && !isEqual(nextProps.project.projectList, this.state.projectList)) {
            this.setState({
                projectList: nextProps.project.projectList
            });
        }
    }
    // 展开缩进筛选表单
    formBoxHandler = () => {
        if (this.props.project.formBox !== -1000){
            this.props.dispatch(setFormBox(-1000));
        }
    };
    render() {
        const {messages} = this.props.intl;

        return (<div className="dev_cont_title clearfix" onMouseEnter={this.formBoxHandler}>
            <div className="dev_cont_titleBg">
                <h1 className="float_lf">{messages.projectListing}</h1>
                <ul>
                    {
                        this.state.userInfo && this.state.userInfo.allFlag === true ? <li className={Number(this.state.params.type) === 1 ? 'active' : ''}>
                                <Link to="/projectListing/1/country.000/overview">{messages.ipxMarket}</Link>
                            </li>: null
                    }
                    <li className={Number(this.state.params.type) === 2 ? 'active' : ''}>
                        <Link to="/projectListing/2/country.000/overview">{messages.available1 + ' '}<span>({this.state.projectList ? this.state.projectList.authorizeNumber : 0})</span></Link>
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
