/**
 * Created by marszed on 2017/4/24.
 */
import React from "react";
import pureRender from "pure-render-decorator";
import {injectIntl} from "react-intl";
import {Link} from "react-router";
import INTERFACE from "INTERFACE/config";
import {encode64, getLocalStorage} from 'LIB/tool';
import {asyncAwaitCall} from 'HTTP';
import echart from "ASSET/js/echarts";
import Menu from "../common/menu";

@pureRender
class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectTotalNum: 0,
            pojectWaitAuditNum: 0,
            projectRejectNum: 0,
            projectAcceptNum: 0,
            vendorUserNum: 0,
            vendorUserWaitAuditNum: 0,
            vendorUserRejectNum: 0,
            vendorUserAcceptNum: 0,
            today: new Date(),
            data: {}
        };
    }

    componentWillMount() {
        if (Number(this.props.location.query.isFresh) === 1) {
            this.props.router.push({
                pathname: 'dashboard',
                query: {isFresh: 0}
            });
            setTimeout(() => (window.location.reload(true)));
        }
    }

    componentDidMount() {
        let ajaxAsync = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.HOME, key: "HOME"},
                method: 'get'
            });
            if (!response.errType) {
                const {messages} = this.props.intl;
                const {data} = response.data;
                let projectChart = echart.init(document.getElementById('projectChart'));
                let accountChart = echart.init(document.getElementById('accountChart'));
                let projectData = [
                    {
                        value: data.authorizedProjectCount,
                        name: messages.authorized + messages.project,
                        itemStyle: {
                            normal: {
                                color: "#eb7366"
                            },
                            emphasis: {
                                color: "#eb7366"
                            }
                        }
                    },
                    {
                        value: data.farovitedProjectCount,
                        name: messages.authorized + messages.bookmarked,
                        itemStyle: {
                            normal: {
                                color: "#00afb4"
                            },
                            emphasis: {
                                color: "#00afb4"
                            }
                        }
                    }
                ];
                let accountData = [
                    {
                        value: data.disabledAgentCount,
                        name: messages.disabled,
                        itemStyle: {
                            normal: {
                                color: "#eb7366"
                            },
                            emphasis: {
                                color: "#eb7366"
                            }
                        }
                    },
                    {
                        value: data.enabledAgentCount,
                        name: messages.enabled,
                        itemStyle: {
                            normal: {
                                color: "#00afb4"
                            },
                            emphasis: {
                                color: "#00afb4"
                            }
                        }
                    }
                ];
                let option = {
                    tooltip: {
                        show: false
                    },
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: ['70%', '85%'],
                            avoidLabelOverlap: false,
                            hoverAnimation: false,
                            legendHoverLink: false,
                            stillShowZeroSum: false,
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            }
                        }
                    ]
                };
                option.series[0].data = projectData;
                projectChart.setOption(Object.assign({}, option));
                option.series[0].data = accountData;
                accountChart.setOption(Object.assign({}, option));
                this.setState({
                    data: data
                });
            }
        }.bind(this)();
    }

    render = () => {
        const {messages} = this.props.intl;
        const weekday = [messages.SUN, messages.MON, messages.TUE, messages.WED, messages.THU, messages.FRI, messages.SAT];
        return <div>
            <Menu/>
            <div className="ipx_dev_cont">
                <div className="dev_cont_titleBg clearfix">
                    <h1 className="float_lf">{messages.homePage}</h1>
                </div>
                <div className="dev_cont_subTit_home">
                    <span className="home_welcome_tips">{messages.today + messages.yes}{this.state.today.getFullYear()}{messages.year}{this.state.today.getMonth() + 1}{messages.month}{this.state.today.getDate()}{messages.month}, {weekday[this.state.today.getDay()]}</span>
                </div>

                <div className="cms_cont_main">
                    <table className="cms_home_chart_table"
                           style={{border: '0', cellPadding: '0', cellSpacing: '0'}}>
                        <tr>
                            <th style={{'align': 'left'}} colSpan="2">{messages.focusContentTip}</th>
                        </tr>
                        <tr>
                            <td style={{align: "center", verticalAlign: "middle"}}>
                                <div className="cms_home_chart_td clearfix">
                                    <div className="cms_home_chart_box">
                                        <dl className="cms_home_chart_data">
                                            <dt><i className="iconfont icon-projects"/></dt>
                                            <dd>{messages.project + messages.totalCount}</dd>
                                            <dd className="cms_home_chart_dataNumb">{this.state.data.authorizedProjectCount + this.state.data.farovitedProjectCount}</dd>
                                        </dl>
                                        <div className="cms_home_chart" id="projectChart"
                                             style={{
                                                 "boxSizing": "border-box"
                                             }}>
                                        </div>
                                    </div>
                                    <ul className="cms_home_chart_ul">
                                        <Link to={'/projectListing/2/country.000/overview'}>
                                            <li><a href="javascript:;"><i className="ipxred_bg"/><span>{messages.authorized + messages.project}：<b className="ipxred_txt">{this.state.data.authorizedProjectCount}</b> {messages.bar}</span></a></li>
                                        </Link>
                                        <Link to={'/projectListing/3/country.000/overview'}>
                                            <li><a href="javascript:;"><i className="ipxblue_bg"/><span>{messages.bookmarked + messages.project}：<b className="ipxblue_txt">{this.state.data.farovitedProjectCount}</b> {messages.bar}</span></a></li>
                                        </Link>
                                    </ul>
                                </div>
                            </td>
                            <td style={{align: "center", verticalAlign: "middle"}}>
                                <div className="cms_home_chart_td clearfix">
                                    <div className="cms_home_chart_box">
                                        <dl className="cms_home_chart_data">
                                            <dt><i className="iconfont icon-person"/></dt>
                                            <dd>{messages.agent + messages.totalCount}</dd>
                                            <dd className="cms_home_chart_dataNumb">{this.state.data.disabledAgentCount + this.state.data.enabledAgentCount}</dd>
                                        </dl>
                                        <div className="cms_home_chart" id="accountChart"
                                             style={{
                                                 "boxSizing": "border-box"
                                             }}>
                                        </div>
                                    </div>
                                    <ul className="cms_home_chart_ul">
                                        <Link to={'/agentSetting/disabled'}>
                                            <li><a href="javascript:;"><i className="ipxred_bg"/><span>{messages.disabled}：<b className="ipxred_txt">{this.state.data.disabledAgentCount}</b> {messages.bar}</span></a></li>
                                        </Link>
                                        <Link to={'/agentSetting/list'}>
                                            <li><a href="javascript:;"><i className="ipxblue_bg"/><span>{messages.enabled}：<b className="ipxblue_txt">{this.state.data.enabledAgentCount}</b> {messages.bar}</span></a></li>
                                        </Link>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>;
    };
}

export default ((store) => (store))(injectIntl(DashBoard));