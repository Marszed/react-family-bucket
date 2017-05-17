/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {connect} from 'react-redux';
import pureRender from "pure-render-decorator";
import {isEqual, objCopy, arrayCopy} from 'LIB/tool';
import {showToast} from 'REDUX/actions/global';
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import DefaultImg from 'ASSET/images/defaulthead.jpg';
import {setProjectList} from 'REDUX/actions/project';

//前一次滚动的垂直距离,用于判断垂直还是水平滚动
let beforeScrollTop = 0;

function mapStateToProps(state) {
    return Object.assign({}, state);
}

@pureRender
class Agreement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: this.props.hide || true,
            start: 0,
            length: 10,
            data: {},
            search: '',
            agreement: true,
            agentList: [],
            agentListOrigin: [],
            authListOrigin: [],
            authList: []
        };
    }


    componentWillReceiveProps(nextProps){
        if (nextProps.agentTime !== undefined && !isEqual(nextProps.agentTime, this.state.agentTime)){
            this.setState({
                data: nextProps.data,
                agentTime: nextProps.agentTime
            });
            this.hideHandler(false);
            this.getAuthList(nextProps.data).then((response) => {
                if (response !== 'error'){
                    this.getAgentList();
                }
            });
        }
    }
    // 已选状态匹配
    agentListCheck = (a, b) => {
        let temp = objCopy(a);
        temp.map((option) => {
            let flag = false;
            b.map((obj) => {
                if (obj.agentId === option.agentId && Number(obj.isAuth) === 1){
                    flag = true;
                    return false;
                }
            });
            option.isAuth = flag ? 1 : 0;
        });
        return temp;
    };

    // 获取经纪人列表
    getAgentList = (force, option) => {
        const {messages} = this.props;
        if (force === 'append'){
            this.setState({
                loadMoreState: true
            });
        }
        if (this.state.hasNextPage === false && force === 'append') {
            this.props.dispatch(showToast({
                content: messages.noMore,
                state: 2
            }));
            this.setState({
                loadMoreState: false
            });
            return false;
        }
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.AGENTLIST + (option && option.pageNum !== undefined ? option.pageNum : this.state.start) + '/' + this.state.length, key: 'AGENTLIST'},
                method: 'post',
                headers: {
                    'Content-Type':	'application/x-www-form-urlencoded'
                },
                dataSerialize: true,
                data: {
                    search: this.state.search
                }
            });
            if (force === 'append'){
                this.setState({
                    loadMoreState: false
                });
            }
            if (!response.errType) {
                let res = response.data.data;
                let temp = (this.state.agentList && force === 'append') ? objCopy(this.state.agentList).concat(res.list) : res.list;
                const agentListOriginTemp = objCopy(temp);
                this.setState({
                    start: res.pageNum,
                    hasNextPage: res.hasNextPage,
                    agentList: this.agentListCheck(temp, this.state.authList),
                    agentListOrigin: agentListOriginTemp
                });
            }
        }.bind(this)();
    };
    // 获取此项目已授权的经纪人列表
    getAuthList = (obj) => (
        new Promise((resolve, reject) => {
            let responseHandle = async function () {
                if (!obj.projectId){
                    reject('error');
                }
                let response = await asyncAwaitCall({
                    url: {value: INTERFACE.AGENTAUTHLIST + obj.projectId, key: 'AGENTAUTHLIST'},
                    method: 'get'
                });
                if (!response.errType) {
                    this.setState({
                        authList: response.data.data,
                        authListOrigin: response.data.data
                    });
                    resolve(response.data.data);
                } else {
                    reject('error');
                }
            }.bind(this)();
        })
    );
    // 经济公司将项目授权给经纪人和取消授权
    authHandler = () => {
        const {messages} = this.props;
        let authAgentIdList = [];
        this.state.authList.map((obj) => {
            if (obj.isAuth === 1){
                authAgentIdList.push(obj.agentId);
            }
        });
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.AGENTAUTH + this.state.data.projectId, key: 'AGENTAUTH'},
                method: 'put',
                params: {
                    authAgentIds: authAgentIdList.join(',')
                }
            });
            if (!response.errType) {
                this.props.dispatch(showToast({
                    content: messages.authorize + messages.success,
                    state: 1
                }));
                let temp = objCopy(this.props.project.projectList);
                if (temp.list){
                    temp.list.map((obj) => {
                        if (obj.projectId === this.state.data.projectId){
                            obj.authorizeNumber = authAgentIdList.length;
                            return false;
                        }
                    });
                }
                // response.data.data true 不变 false +1  authAgentIdList.length == 0 -1
                if (!authAgentIdList.length){
                    temp.authorizeNumber -= 1;
                    this.props.dispatch(setProjectList(temp));
                } else if (response.data.data === true){ // +1
                    temp.authorizeNumber += 1;
                    this.props.dispatch(setProjectList(temp));
                } else {
                    this.props.dispatch(setProjectList(temp));
                }
            }
        }.bind(this)();
    };

    hideHandler = (flag) => {
        this.setState({
            hide: flag
        });
        if (flag === true){
            let temp1 = objCopy(this.state.agentList);
            temp1.map((option) => {
                option.isAuth = 0;
            });
            this.setState({
                agentList: temp1,
                start: 0,
                search: ''
            });
        }
    };

    // 滚动加载
    onScroll(event){
        // scrollTop为滚动条在Y轴上的滚动距离。
        // clientHeight为内容可视区域的高度。
        // scrollHeight为内容可视区域的高度加上溢出（滚动）的距离。
        // event.target.scrollHeight - event.target.clientHeight == scrollTop 滚动到底部
        if (event.target.scrollHeight - event.target.offsetHeight <= event.target.scrollTop && event.target.scrollTop !== beforeScrollTop) {
            beforeScrollTop = event.target.scrollTop;
            this.getAgentList('append');
        }
    }
    // 移除经纪人
    deleteHandler = (obj) => {
        let temp1 = objCopy(this.state.agentList), temp2 = objCopy(this.state.authList), array = [];
        temp1.map((option) => {
            if (option.agentId === obj.agentId){
                option.isAuth = 0;
                return false;
            }
        });
        temp2.map((option) => {
            if (option.agentId !== obj.agentId){
                array.push(option);
            }
        });
        this.setState({
            agentList: temp1,
            authList: array
        });
    };
    // 移除全部经纪人
    deleteAllHandler = () => {
        let temp1 = objCopy(this.state.agentList);
        temp1.map((option) => {
            option.isAuth = 0;
        });
        this.setState({
            agentList: temp1,
            authList: []
        });
    };
    // 添加经纪人
    addHandler = (obj) => {
        if (obj.isAuth === 1){
            return false;
        }
        let temp1 = objCopy(this.state.agentList), temp2 = objCopy(this.state.authList);
        temp1.map((option) => {
            if (option.agentId === obj.agentId){
                option.isAuth = 1;
                return false;
            }
        });
        temp2.push({
            agentId: obj.agentId,
            isAuth: 1,
            profileImage: obj.profileImage,
            name: obj.firstName + ' ' + obj.lastName,
            projectIdList: []
        });
        this.setState({
            agentList: temp1,
            authList: temp2
        });
    };
    // 添加全部经纪人
    addAllHandler = () => {
        let temp1 = objCopy(this.state.agentList), temp2 = [];
        temp1.map((option) => {
            option.isAuth = 1;
            temp2.push({
                agentId: option.agentId,
                isAuth: 1,
                profileImage: option.profileImage,
                name: option.firstName + ' ' + option.lastName,
                projectIdList: []
            });
        });
        this.setState({
            agentList: temp1,
            authList: temp2
        });
    };
    // searchHandler
    searchHandler = (event) => (
        this.setState({search: event.target.value})
    );
    render() {
        const {messages} = this.props;
        return (<div className={"ipx_pop" + (this.state.hide ? ' hide' : '')}>
            <div className="ipx_pop_box ipx_pop_addMan">
                <div className="ipx_pop_head">
                    <h2 className="float_lf"><span className="ipxblue_txt">{this.state.data.title}</span> - {messages.authorizeAgent}</h2>
                    <a href="javascript:;" className="float_rt" title={messages.close} onClick={this.hideHandler.bind(this, true)}><i className="iconfont icon-close"/></a>
                </div>
                <div className="ipx_pop_body">
                    <div className="ipx_pop_addMan_lf float_lf" onScroll={this.onScroll.bind(this)}>
                        <div className="addMan_search">
                            <input type="text" value={this.state.search} placeholder={messages.searchAgent} onChange={this.searchHandler}/>
                            <button onClick={this.getAgentList.bind(this, 'search', {search: this.state.search, pageNum: 0})}><i className="iconfont icon-magnifier"/></button>
                        </div>
                        <div className="addMan_title clearfix">
                            <span className="float_lf">{messages.allAgent}</span>
                            <a className="float_rt" href="javascript:;" onClick={this.addAllHandler}>{messages.addAll}</a>
                        </div>
                        <ul className="addMan_list">
                            {
                                this.state.agentList.map((obj) => (
                                    <li key={obj.agentId} className={Number(obj.isAuth) === 1 ? "active" : ''} onClick={this.addHandler.bind(this, obj)}><div><img src={obj.profileImage || DefaultImg}/></div><span>{obj.firstName + ' ' + obj.lastName}</span></li>
                                ))
                            }
                        </ul>
                        <p className={"loadmore " + (this.state.loadMoreState ? '' : 'hide')}>{messages.loadMore}</p>
                    </div>
                    <div className="ipx_pop_addMan_rt float_lf">
                        <div className="addMan_title clearfix">
                            <span className="float_lf">{messages.authorizedAgent}</span>
                            <a className="float_rt" href="javascript:;" onClick={this.deleteAllHandler}>{messages.removeAll}</a>
                        </div>
                        <ul className="addMan_list">
                            {
                                this.state.authList.map((obj) => (
                                    Number(obj.isAuth) === 1 && <li key={obj.agentId} onClick={this.deleteHandler.bind(this, obj)}><div><img src={obj.profileImage || DefaultImg}/></div><span>{obj.name}</span></li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="ipx_pop_foot align_ct">
                    <button className="ipx_btn ipx_M_btn ipx_blue_btn width20per" onClick={this.authHandler}>{messages.ensure}</button>
                    <button className="ipx_btn ipx_M_btn ipx_grey_btn width20per" onClick={this.hideHandler.bind(this, true)}>{messages.cancel}</button>
                </div>
            </div>
            <div className="ipx_pop_bg"></div>
        </div>);
    }
}

export default connect(mapStateToProps)(Agreement);
