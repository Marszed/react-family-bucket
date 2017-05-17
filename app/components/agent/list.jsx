/**
 * Created by marszed on 2017/5/12.
 */
import React from "react";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import {getLocalStorage, objCopy, isEqual} from "LIB/tool";
import {showToast} from "REDUX/actions/global";

import defaultHead from 'ASSET/img/defaulthead.jpg';
import NoData from 'COMPONENT/common/noData';
import Page from 'COMPONENT/common/page';
import InlineLoading from 'COMPONENT/common/inlineLoading';
import Add from './add';
import Update from './update';
import pureRender from "pure-render-decorator";


function mapStateToProps(state) {
    return Object.assign({}, state);
}
@pureRender
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateHide: true,
            start: 0,
            length: 10,
            state: 1,
            search: '',
            reset: false, // 重置用户添加
            page: {}
        };
    }

    componentDidMount = () => (
        this.getAgentList({})
    );
    // 获取经纪人列表
    getAgentList = (obj) => {
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.AGENTLIST + (obj.pageNum !== undefined ? obj.pageNum : this.state.start) + '/' + this.state.length, key: 'AGENTLIST'},
                method: 'post',
                headers: {
                    'Content-Type':	'application/x-www-form-urlencoded'
                },
                dataSerialize: true,
                data: {
                    search: this.state.search
                },
                inlineLoading: true
            });
            if (!response.errType) {
                this.setState({
                    start: response.data.data.nextPage,
                    page: response.data.data
                });
            }
        }.bind(this)();
    };
    // 添加经纪人
    addAgent = (obj) => {
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.AGENTADD, key: 'AGENTADD'},
                method: 'post',
                data: obj
            });
            if (!response.errType) {
                this.props.dispatch(showToast({
                    content: this.props.intl.messages.add + this.props.intl.messages.success,
                    state: 1
                }));
                this.getAgentList({pageNum: 0});
            }
        }.bind(this)();
    };
    // 编辑经纪人
    updateAgent = (obj) => {
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.AGENTUPDATE, key: 'AGENTUPDATE'},
                method: 'put',
                data: obj
            });
            if (!response.errType) {
                let temp = objCopy(this.state.page);
                temp.list.map((option) => {
                    if (obj.agentId === option.agentId){
                        option.firstName = obj.firstName;
                        option.lastName = obj.lastName;
                        option.gender = obj.gender;
                        option.empNum = obj.empNum;
                        return false;
                    }
                });
                this.setState({
                    page: temp,
                    updateData: Object.assign(objCopy(this.state.updateData), obj)
                });
                this.props.dispatch(showToast({
                    content: this.props.intl.messages.update + this.props.intl.messages.success,
                    state: 1
                }));
            }
        }.bind(this)();
    };
    // 禁用启用经纪人
    disableAgent = (obj) => {
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.AGENTDISABLED + obj.agentId + '/' + obj.state, key: 'AGENTDISABLED'},
                method: 'put'
            });
            if (!response.errType) {
                let temp = objCopy(this.state.page);
                temp.list.map((option) => {
                    if (obj.agentId === option.agentId){
                        option.state = obj.state;
                        return false;
                    }
                });
                this.setState({
                    page: temp,
                    updateData: Object.assign(objCopy(this.state.updateData), obj)
                });
                this.props.dispatch(showToast({
                    content: (obj.state === 1 ? this.props.intl.messages.enable : this.props.intl.messages.disable) + this.props.intl.messages.success,
                    state: 1
                }));
            }
        }.bind(this)();
    };
    // 接收分页组件返回的当前页数
    pageHandler(pageNum){
        this.setState({
            start: pageNum
        });
        this.getAgentList({search: this.state.search, pageNum: pageNum});
    }
    // 添加新用户
    addHandler = () => (
        this.setState({hideAddShot: (new Date()).getTime()})
    );

    // 编辑用户
    updateHandler = (obj) => (
        this.setState({hideUpdateShot: (new Date()).getTime(), updateData: obj})
    );

    render() {
        const {messages} = this.props.intl;
        return (
            <div>
                <div className="agency_agentbox clearfix">
                    {/*数据列表筛选模块*/}
                    <div className="table_screen clearfix">
                        <input type="text" onInput={(event) => (this.setState({search: event.target.value}))} className="ipxTxt float_lf" style={{marginRight: 10 + 'px'}} value={this.state.search} placeholder={messages.searchAgent} />
                        <button className="ipx_btn ipx_bluebd_btn ipx_L_btn" style={{marginRight: 5 + 'px'}} onClick={this.getAgentList.bind(this, {search: this.state.search, pageNum: 0})}>{messages.search}</button>
                        <button className="ipx_btn ipx_blue_btn ipx_L_btn float_rt" onClick={this.addHandler}>+ {messages.addNewUser}</button>
                    </div>
                    {
                        this.state.page.list && this.state.page.list.length ?
                            <table cellPadding="0" cellSpacing="0" className="cms_data_table">
                                <tr>
                                    <th width="22%">{messages.logoName}</th>
                                    <th width="15%">{messages.empNum}</th>
                                    <th width="10%">{messages.sex}</th>
                                    <th width="18%">{messages.telephone}</th>
                                    <th width="20%">{messages.email}</th>
                                    <th width="15%">{messages.operation}</th>
                                </tr>
                                {
                                    this.state.page.list.map((obj) => (
                                        <tr style={{textAlign: 'center'}} key={obj.agentId}>
                                            <td style={{textAlign: 'left'}}><div className="company_person_head"><img src={obj.img || defaultHead}/></div><span className="company_person_name">{obj.firstName + ' ' + obj.lastName}</span></td>
                                            <td>{obj.empNum}</td>
                                            <td>{Number(obj.gender) === 1 ? messages.male : (Number(obj.gender) === 2 ? messages.female : messages.other)}</td>
                                            <td>{obj.mobilePhone}</td>
                                            <td>{obj.email}</td>
                                            <td className="cms_data_contrl"> <a href="javascript:;" onClick={this.updateHandler.bind(this, obj)} className="ipx_btn ipx_grey_btn ipx_XS_btn">{messages.edit}</a> </td>
                                        </tr>
                                    ))
                                }
                            </table> : <NoData/>
                    }
                    <InlineLoading />
                    {
                        this.state.page.list && this.state.page.list.length ? <Page currentPage={this.state.page.pageNum} range={7} totalPages={this.state.page.pages} onChange={this.pageHandler.bind(this)}/> : null
                    }
                </div>
                <Add messages={messages} hideShot={this.state.hideAddShot} submit={this.addAgent.bind(this)}/>
                <Update messages={messages} hideShot={this.state.hideUpdateShot} submit={this.updateAgent.bind(this)} disableAgent={this.disableAgent.bind(this)} data={this.state.updateData}/>
            </div>
        );
    }
}

export default connect(mapStateToProps)(injectIntl(List));