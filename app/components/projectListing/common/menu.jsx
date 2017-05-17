/**
 * Created by marszed on 2017/1/24.
 */
import React from "react";
import {Link} from "react-router";
import {FormattedMessage} from "react-intl";
import store from "REDUX/action/global";

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            sort: 1
        };
    }

    //在页面被渲染之前执行，也就是在render方法之前执行
    componentWillMount() {
        const getState = store.getState();
        if (getState.projectList && getState.projectList.filterParams) {
            this.setState({
                type: getState.projectList.filterParams.type,
                sort: getState.projectList.filterParams.sort
            });
        }
    }

    changeType(type) {
        this.setState({type: type});
        this.props.filterParams({
            type: type,
            sort: this.state.sort
        });
    }

    changeSort() {
        let sort = this.state.sort === 0 ? 1 : 0;
        this.setState({sort: sort});

        this.props.filterParams({
            type: this.state.type,
            sort: sort
        });
    }

    render() {
        return <div className="dev_cont_subTit">
            <ul className="float_lf">
                <a onClick={this.changeType.bind(this, '')}
                    className={this.state.type === '' ? "active" : ""}>
                    <FormattedMessage id='allProjects'/> <i>{this.props.count.allCount}</i>
                </a>
                <a onClick={this.changeType.bind(this, '0')}
                    className={this.state.type === '0' ? "active" : ""}>
                    <FormattedMessage id='saveProjects'/> <i>{this.props.count.saveCount}</i>
                </a>
                <a onClick={this.changeType.bind(this, '1')}
                    className={this.state.type === '1' ? "active" : ""}>
                    <FormattedMessage id='rejectProjects'/> <i>{this.props.count.rejectCount}</i>
                </a>
                <a onClick={this.changeType.bind(this, '2')}
                    className={this.state.type === '2' ? "active" : ""}>
                    <FormattedMessage id='underProjects'/> <i>{this.props.count.underCount}</i>
                </a>
            </ul>
            <div className="float_rt">
                <dl className="cont_publishTime">
                    <dt><FormattedMessage id='sort'/></dt>
                    <dd onClick={this.changeSort.bind(this)} className="active"><FormattedMessage id='time'/>
                        <div className={this.state.sort === '1' ? "sortArrow sortArrow_des" : "sortArrow sortArrow_asc"}>
                            <i className="iconfont icon-upArrow"/>
                            <i className="iconfont icon-downArrow"/>
                        </div>
                    </dd>
                </dl>
                <dl className="cont_viewmodel">
                    <dt><FormattedMessage id='view'/></dt>
                    <Link to="/projectListing/grid" activeClassName="active"><i className="iconfont icon-grid"/></Link>
                    <Link to="/projectListing/list" activeClassName="active"><i className="iconfont icon-viewlist"/></Link>
                </dl>
            </div>
        </div>;
    }
}
