/**
 * Created by marszed on 2017/1/24.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import pureRender from "pure-render-decorator";
import {isEqual, objCopy, encode64, formatMoney, debounce} from 'LIB/tool';
import {injectIntl} from 'react-intl';
import {setCountry, setProjectList, setFormBox} from 'REDUX/actions/project';
import {showToast} from 'REDUX/actions/global';
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import NavBread from './navBread';
import NoData from 'COMPONENT/common/noData';
import DefaultImg from 'ASSET/img/defaultProject.jpg';
import Agreement from './agreement';
import GaveAgency from './gaveAgency';


//前一次滚动的垂直距离,用于判断垂直还是水平滚动

@pureRender
class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [0, 100],
            params: this.props.params,
            start: 1,
            length: 10,
            projectList: this.props.project.projectList,
            beforeScrollTop:0
        };
    }

    componentWillMount() {
        if (Number(this.context.router.location.query.isFresh) === 1) {
            this.context.router.push({
                pathname: '/projectListing/' + (this.context.router.params.type || 1) +'/country.000/overview',
                query: {isFresh: 0}
            });
            setTimeout(() => (window.location.reload(true)));
        }
    }

    componentDidMount() {
        this.getProjectList({
            countryCode: this.state.params.country,
            type: this.state.params.type
        }, 'init');
        window.addEventListener('resize', debounce(() => (this.autoImage()), 300));
        this.refs.projectDiv.scrollTop = 0;
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.autoImage);
    }

    componentWillReceiveProps(nextProps) {
        // 路由变化
        if (nextProps.params && !isEqual(nextProps.params, this.state.params)) {
            console.log('params======>>>>>>>>>>>');
            console.log(nextProps.params);
            this.setState({
                params: nextProps.params,
                start: 1,
                length: 10,
                beforeScrollTop:0,
                scrollHeight:0
            });
            this.refs.projectDiv.scrollTop = 0;
        }
        // 项目列表数据变化
        if (nextProps.project.projectList && !isEqual(nextProps.project.projectList, this.state.projectList)) {
            console.log('---------121321321321');
            this.setState({
                projectList: nextProps.project.projectList
            });
            this.autoImage(nextProps.project.projectList);
        }
        // 搜索条件变化
        if (nextProps.project.searchOption && !isEqual(nextProps.project.searchOption, this.state.searchOption)) {
            console.log('searchOption======>>>>>>>>>>>');
            console.log(nextProps.project.searchOption);
            // 同步子组件状态
            this.setState({
                searchOption: nextProps.project.searchOption,
                start: 1,
                length: 10,
                beforeScrollTop:0
            });
            this.refs.projectDiv.scrollTop = 0;
            this.getProjectList(nextProps.project.searchOption, 'update');
        }
        // 视图类型变化
        if (nextProps.global.formRadioType && !isEqual(nextProps.global.formRadioType, this.state.formRadioType)) {
            this.setState({
                formRadioType: nextProps.global.formRadioType.value
            });
        }
    }

    // 不动产项目列表查询
    getProjectList(option, force) {
        const {messages} = this.props.intl;
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
        if (option.countryCode === 'country.000'){
            option.countryCode = 'ALL';
        }
        let responseHandler = async function () {
            const start = (force === 'append' && this.state.hasNextPage) ? (this.state.start + 1) : 1;

            let response = await asyncAwaitCall({
                url: {value: INTERFACE.PROJECTLIST + start + '/' + this.state.length, key: 'PROJECTLIST'},
                method: 'post',
                data: option,
                dataSerialize: true
            });
            if (force === 'append'){
                this.setState({
                    loadMoreState: false
                });
            }
            if (!response.errType) {
                let res = response.data.data;
                this.setState({
                    start: start,
                    hasNextPage: res.page.hasNextPage,
                    projectList: {
                        total: res.page.total,
                        favoriteNumber: res.favoriteNumber,
                        authorizeNumber: res.authorizeNumber,
                        list: (this.state.projectList && force === 'append') ? objCopy(this.state.projectList.list).concat(res.page.list) : res.page.list
                    }
                });
                this.props.dispatch(setProjectList({
                    favoriteNumber: res.favoriteNumber,
                    authorizeNumber: res.authorizeNumber,
                    total: res.page.total,
                    list: this.state.projectList.list ? objCopy(this.state.projectList.list).concat(res.page.list) : res.page.list
                }));
            }
        }.bind(this)();
    }

    // 不动产项目收藏和取消收藏
    collect(option){
        const {messages} = this.props.intl;

        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.PROJECTCOLLECT + option.projectId, key: 'PROJECTCOLLECT'},
                method: 'put',
                params: {
                    collectFlag: !(option.favoriteFlag === 1)
                },
                dataSerialize: true
            });
            if (!response.errType) {
                this.props.dispatch(showToast({
                    content: option.favoriteFlag !== 1? messages.markedSuccess : messages.cancelMarked,
                    state: 1
                }));
                let temp = objCopy(this.state.projectList);
                temp.list.map((obj) => {
                    if (obj.projectId === option.projectId){
                        obj.favoriteFlag = option.favoriteFlag === 1 ? 0 : 1;
                        return false;
                    }
                });
                temp.favoriteNumber = option.favoriteFlag === 1 ? (temp.favoriteNumber - 1) : (temp.favoriteNumber + 1);
                this.props.dispatch(setProjectList(temp));
            }
        }.bind(this)();
    }
    // 查看项目详情
    gaveAgencyHandler = (obj) => {
        this.context.router.push({pathname: "projectListing/view/msg/" + obj.projectId, query: {projectType: obj.projectType, authorizeNumber: obj.authorizeNumber, title: encode64(obj.title)}});
    };
    // 已阅读并且同意协议
    agreementHandler = (flag) => {
        if (flag === false){
            this.props.dispatch(showToast({
                content: this.props.intl.messages.agreementTip2,
                state: 2
            }));
        }
        this.refs.agreement.hideHandler(flag);
    };
    // 滚动加载
    onScroll(event){
        // scrollTop为滚动条在Y轴上的滚动距离。
        // clientHeight为内容可视区域的高度。
        // scrollHeight为内容可视区域的高度加上溢出（滚动）的距离。
        // event.target.scrollHeight - event.target.clientHeight == scrollTop 滚动到底部
        if (event.target.scrollHeight - event.target.offsetHeight <= (event.target.scrollTop + 20) && event.target.scrollTop > this.state.beforeScrollTop) {
            this.setState({
                beforeScrollTop:event.target.scrollTop
            });
            this.getProjectList(this.props.project.searchOption || {
                countryCode: this.state.params.country,
                type: this.state.params.type
            }, 'append');
        }
    }

    // 图片自适应
    imageAutoSize = (e) => {
        const lineHeight = 3 * (e.target.width) / 4;
        this.setState({
            lineHeight: lineHeight
        });
        this.autoImage('',lineHeight);
    };
    autoImage = (list, lineHeight) => {
        let projectList = objCopy(list || this.state.projectList);
        projectList.list.map((obj) => {
            if (!obj.lineHeight){
                obj.lineHeight = lineHeight || this.state.lineHeight;
            }
        });
        this.setState({
            projectList: projectList
        });
    };
    // 展开缩进筛选表单
    formBoxHandler = () => {
        if (this.props.project.formBox !== -1000){
            this.props.dispatch(setFormBox(-1000));
        }
    };
    // 跳转到价格列表
    onLinkTo = (obj) => {
        this.context.router.push({
            pathname: '/projectListing/view/property/' + obj.projectId,
            query: {
                authorizeNumber: obj.authorizeNumber,
                countryCode: obj.countryCode,
                projectType: obj.projectType,
                title: encode64(obj.title)
            },
            state: {
                propertyIds: obj.propertyIds
            }
        });
    };

    render() {
        const {messages} = this.props.intl;
        let items = this.state.projectList && this.state.projectList.list ? this.state.projectList.list.map((obj) => {
                let sellsPerformance ;
                if (obj.reservedNum + obj.noSoldNum + obj.soldNum === 0){
                    sellsPerformance = "";
                } else {
                    let noSoldWidthStyle;
                    let noSoldWidth = 100 * (obj.noSoldNum / (obj.reservedNum + obj.noSoldNum + obj.soldNum)).toFixed(2);
                    if(noSoldWidth < 20){
                        noSoldWidthStyle = {left: '20%'};
                    } else if (noSoldWidth > 80) {
                        noSoldWidthStyle = {right: '20%'};
                    } else {
                        noSoldWidthStyle = {left: noSoldWidth + '%'};
                    }

                    noSoldWidth = noSoldWidth < 20 ? 20 : noSoldWidth > 78 ? 78 : noSoldWidth;
                    sellsPerformance =
                        <div className="sellsPerformance">
                            <ul>
                                <li className="ipxblue_txt" style={{left: 0 + '%'}}>{messages.noSoldNum} {obj.noSoldNum}</li>
                                <li className="ipxyellow_txt" style={noSoldWidthStyle}>{messages.reservedNum} {obj.reservedNum}</li>
                                <li className="ipxred_txt" style={{right: 0 + '%'}}>{messages.soldNum} {obj.soldNum}</li>
                            </ul>
                            <div className="sellper_chart">
                                <span className="sell_available" style={{width: 100 * (obj.noSoldNum / (obj.reservedNum + obj.noSoldNum + obj.soldNum)).toFixed(2) + '%'}}/>
                                <span className="sell_booking" style={{width: 100 * (obj.reservedNum / (obj.reservedNum + obj.noSoldNum + obj.soldNum)).toFixed(2) + '%'}}/>
                                <span className="sell_sold" style={{width: 100 * (obj.soldNum / (obj.reservedNum + obj.noSoldNum + obj.soldNum)).toFixed(2) + '%'}}/>
                            </div>
                        </div>;
                }
                let areaUnit;
                if(obj.country === 'country.004') {
                    areaUnit = " ㎡";
                } else {
                    areaUnit = " ft²";
                }

                let area ;
                if (obj.minArea === null && obj.maxArea === null){
                    area = 0 + areaUnit;
                } else if(obj.minArea === obj.maxArea){
                    area = obj.minArea + areaUnit;
                } else {
                    area = obj.minArea + " - " + obj.maxArea + areaUnit;
                }
            return (
                <table className="project_l_box" cellPadding="0" cellSpacing="0" key={obj.projectId}>
                    <tr>
                        <td width="320">
                            <div className="proj_l_box_lf">
                                <img src={obj.frontImage || DefaultImg}/>
                                <span
                                    className="proj_l_imgtag">{messages['projectType' + obj.projectType]}</span>
                                <span className="v_align_mid"/>
                            </div>
                        </td>
                        <td className="proj_l_box_rt">
                            <div className="proj_l_box_top clearfix">
                                <h3 className="text-elps">{obj.title}</h3>
                                <ul className="proj_box_toplist">
                                    <li>
                                        <Link to={{pathname: "projectListing/view/property/" + obj.projectId, query: {projectType: obj.projectType, authorizeNumber: obj.authorizeNumber, title: encode64(obj.title), countryCode: obj.countryCode}}} className="iconfont icon-list01"> {messages.propertyList}</Link>
                                    </li>
                                    <li>
                                        <Link to={{pathname: "projectListing/view/sales/" + obj.projectId, query: {projectType: obj.projectType, authorizeNumber: obj.authorizeNumber, title: encode64(obj.title), countryCode: obj.countryCode}}} className="iconfont icon-sellgrid"> {messages.pinChart}</Link>
                                    </li>
                                    <li>
                                        <Link to={{pathname: "projectListing/view/msg/" + obj.projectId, query: {projectType: obj.projectType, authorizeNumber: obj.authorizeNumber, title: encode64(obj.title), countryCode: obj.countryCode}}} className="iconfont icon-details"> {messages.projectDetail}</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="proj_l_box_bottom">
                                <div className="float_lf">
                                                        <span className="proj_l_box_address">{obj.countryName}
                                                            - {obj.regionFirstName} - {obj.detailAddr}</span>
                                    <table>
                                        <tr>
                                            <td><strong>{messages.priceRange}</strong></td>
                                            <td>{obj.currencyName} {formatMoney(obj.minPrice)} - {obj.currencyName} {formatMoney(obj.maxPrice)}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>{messages.targetDistance}</strong></td>
                                            <td>{(obj.targetDistance + 'km') || ''}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>{messages.area}</strong></td>
                                            <td>{area}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>{messages.purchaseCount}</strong></td>
                                            <td><strong className="ipxblue_txt">{obj.noSoldNum}</strong></td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="float_rt">
                                    {sellsPerformance}
                                    {
                                        (Number(this.state.params.type) === 1 && this.state.params.country !== 'country.000') ? <div className="proj_box_m_search clearfix" onClick={this.onLinkTo.bind(this, obj)}>
                                                <span className="float_lf">{obj.propertyNum || 0} {messages.meetConditionsTip}</span>
                                                <i className="iconfont icon-list01 float_rt"/>
                                            </div> : null
                                    }
                                    <div className="proj_l_box_button clearfix">
                                                                    <span onClick={this.collect.bind(this, obj)} className={"float_lf" + (obj.favoriteFlag === 1 ? ' checked' : '')}>
                                                                        <i className={"iconfont" + (obj.favoriteFlag === 1 ? ' icon-favorite2' : ' icon-favorite1')}/> {obj.favoriteFlag === 1?messages.bookmarked:messages.marked}
                                                                    </span>
                                        <button onClick={this.gaveAgencyHandler.bind(this, obj)}
                                                className={"ipx_btn ipx_M_btn float_rt " + (obj.authorizeNumber === 0 || obj.authorizeNumber === null ? 'ipx_bluebd_btn' : 'ipx_white_btn')}>
                                            {obj.authorizeNumber === 0 || obj.authorizeNumber === null ? messages.view : (messages.available)}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            )}) : <NoData/>;
        return (
            <div>
                <div className="agency_proj_cont" ref="projectDiv" style={{top: Number(this.state.params.type) === 1 ? '120px' : '60px'}} onScroll={this.onScroll.bind(this)} onMouseEnter={this.formBoxHandler}>
                    <NavBread params={this.state.params}/>
                    {
                        this.state.formRadioType === 1 ?
                            <div className="project_listbox clearfix">
                                {items}
                            </div>
                            :
                            <div className="project_gridbox clearfix">
                                {
                                    this.state.projectList && this.state.projectList.list ? this.state.projectList.list.map((obj) => (
                                            <div className="project_box" key={obj.projectId}>
                                                <div className="project_box_main">
                                                    <div className="proj_box_head clearfix">
                                                        <h3 className="float_lf text-elps">
                                                            <a href="javascript:;" title={obj.title}>{obj.title}</a>
                                                        </h3>
                                                    </div>
                                                    <div className="proj_box_m_img" style={{height: obj.lineHeight ? (obj.lineHeight + 'px') : 'auto'}}>
                                                        <ul className="proj_box_m_imglist">
                                                            <li>
                                                                <Link to={{pathname: "projectListing/view/property/" + obj.projectId, query: {projectType: obj.projectType, authorizeNumber: obj.authorizeNumber, title: encode64(obj.title), countryCode: obj.countryCode}}} className="iconfont icon-list01"> {messages.propertyList}</Link>
                                                            </li>
                                                            <li>
                                                                <Link to={{pathname: "projectListing/view/sales/" + obj.projectId, query: {projectType: obj.projectType, authorizeNumber: obj.authorizeNumber, title: encode64(obj.title), countryCode: obj.countryCode}}} className="iconfont icon-sellgrid"> {messages.pinChart}</Link>
                                                            </li>
                                                            <li>
                                                                <Link to={{pathname: "projectListing/view/msg/" + obj.projectId, query: {projectType: obj.projectType, authorizeNumber: obj.authorizeNumber, title: encode64(obj.title), countryCode: obj.countryCode}}} className="iconfont icon-details"> {messages.projectDetail}</Link>
                                                            </li>
                                                        </ul>
                                                        <b className="proj_box_M_tag">{messages['projectType' + obj.projectType]}</b>
                                                        <img className="proj_box_coverimg" src={obj.frontImage || DefaultImg} onLoad={this.imageAutoSize}/>
                                                        <span className="v_align_mid" style={{lineHeight: obj.lineHeight ? (obj.lineHeight + 'px') : 'auto'}}/>
                                                    </div>
                                                    <div className="proj_box_m_info clearfix">
                                                <span className="float_lf">{obj.countryName}
                                                    - {obj.regionFirstName}</span>
                                                        <span onClick={this.collect.bind(this, obj)}
                                                              className={"float_rt" + (obj.favoriteFlag === 1 ? ' checked' : '')}><i
                                                            className={"iconfont" + (obj.favoriteFlag === 1 ? ' icon-favorite2' : ' icon-favorite1')}/> {obj.favoriteFlag === 1?messages.bookmarked:messages.marked}</span>
                                                    </div>
                                                    <div className="proj_box_m_btn clearfix">
                                                     <span className="float_lf">
                                                         {obj.minPrice === obj.maxPrice && obj.minPrice === 0?"-" : obj.minPrice === obj.maxPrice?
                                                             obj.currencyName + ' ' + obj.maxPrice:
                                                             obj.currencyName + ' ' + obj.minPrice + ' - ' + obj.maxPrice
                                                         }
                                                     </span>
                                                        <button onClick={this.gaveAgencyHandler.bind(this, obj)}
                                                                className={"ipx_btn ipx_M_btn float_rt " + (obj.authorizeNumber === 0 || obj.authorizeNumber === null ? 'ipx_bluebd_btn' : 'ipx_white_btn')}>
                                                            {obj.authorizeNumber === 0 || obj.authorizeNumber === null ? messages.view : (messages.available)}
                                                            </button>
                                                    </div>
                                                    {
                                                        (Number(this.state.params.type) === 1 && this.state.params.country !== 'country.000') ? <div className="proj_box_m_search clearfix" onClick={this.onLinkTo.bind(this, obj)}>
                                                                <span className="float_lf">{obj.propertyNum || 0} {messages.meetConditionsTip}</span>
                                                                <i className="iconfont icon-list01 float_rt"/>
                                                            </div> : null
                                                    }
                                                </div>
                                            </div>
                                        )) : <NoData/>
                                }
                            </div>
                    }
                    <p className={"loadmore " + (this.state.loadMoreState ? '' : 'hide')}>{messages.loadMore}</p>
                </div>
                <Agreement ref="agreement" messages={messages} submit={this.agreementHandler.bind(this)}/>
                <GaveAgency data={this.state.agentData} messages={messages} agentTime={this.state.agentTime}/>
            </div>
        );
    }
}

Overview.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect((store) => (store))(injectIntl(Overview));
