/**
 * Created by marszed on 2017/1/24.
 */
import React, {PropTypes} from "react";
import {injectIntl} from "react-intl";
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import {formatMoney, keySort, objCopy, arrayCopy, debounce} from 'LIB/tool';
import NoData from 'COMPONENT/common/noData';

import Search from 'COMPONENT/common/form/Search';
import Select from 'COMPONENT/common/form/Select';
import Slider from 'COMPONENT/common/form/Slider';
import ViewProperty from 'COMPONENT/common/viewProperty';
import ExportProperty from 'COMPONENT/common/exportProperty';

// 不动产配置
import getPropertyMay from './getPropertyMap';


//前一次滚动的垂直距离,用于判断垂直还是水平滚动
let beforeScrollTop = 0;

class Property extends React.Component {
    constructor(props) {
        super(props);
        const {messages} = this.props.intl;
        let propertyMap = getPropertyMay(messages); // 不动产配置注入
        this.state = {
            searchOption: {}, // 刷选条件
            projectType: this.props.location.query.projectType,
            propertyMap: propertyMap,
            pageStart: 0,
            pageLength: 1000,
            hasNextPage: true,
            des: true,
            userInfo: {
                countryNameShort: 'AU'
            },
            key: "lot",
            list: [],
            left: "0px",
            top: "0px"
        };
    }

    componentDidMount = () => (
        this.getPropertyList()
    );

    getPropertyList = () => {
        const {params} = this.context.router;
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.PROPERTY + params.projectId + '/' + this.state.pageStart + '/' + this.state.pageLength, key: 'PROPERTY'},
                method: 'post',
                headers: {
                    'Content-Type':	'application/x-www-form-urlencoded'
                },
                dataSerialize: true
            });
            if (!response.errType) {
                const {data} = response.data;
                const temp = (data.page.list).sort(keySort(this.state.key, this.state.des));
                this.setState({
                    list: temp,
                    listCopy: temp,
                    lastTime: data.lastTime,
                    userInfo: {
                        countryNameShort: data.country.toUpperCase()
                    },
                    hasNextPage: data.page.hasNextPage,
                    pageStart: data.hasNextPage ? (this.state.pageStart + 1) : this.state.pageStart,
                    currencyName: data.page.list[0] ? data.page.list[0].currencyName : ""
                });
            }
        }.bind(this)();
    };

    // 数据收集
    onChange = (name, value) => {
        let temp = {};
        temp[name] = name === 'isAbroad' ? (value ? !!(value - 1) : undefined) : value;
        const searchOptionReset = Object.assign(objCopy(this.state.searchOption), temp);
        this.setState({
            searchOption: searchOptionReset
        });
        debounce(this.onSubmit(searchOptionReset), 500);
    };

    // submit
    onSubmit = (option) => {
        let array = [];
        // 刷选条件过滤
        this.state.listCopy.map((obj) => {
            let flag = true;
            // 物业号
            if (option.lot && obj.lot.indexOf(option.lot) === -1) {
                flag = false;
            }
            // 价钱
            if (option.priceMin && (option.priceMin > obj.price || option.priceMax < obj.price)) {
                flag = false;
            }
            // 卧室数量
            if (option.bed && obj.bed < option.bed) {
                flag = false;
            }
            // 车位数量
            if (option.carSpace && obj.carSpace < option.carSpace) {
                flag = false;
            }
            // 书房数量
            if (option.study && obj.study < option.study) {
                flag = false;
            }
            // 浴室数量
            if (option.bath && obj.bath < option.bath) {
                flag = false;
            }
            // 仓库数量
            if (option.storageNo && obj.storageNo < option.storageNo) {
                flag = false;
            }
            // 海外是否可购
            if (option.isAbroad !== undefined && obj.isAbroad !== option.isAbroad) {
                flag = false;
            }
            if (flag){
                array.push(obj);
            }
        });
        this.setState({
            list: array
        });
    };

    listSort = (name, type) => {
        this.setState({
            list: (objCopy(this.state.list)).sort(keySort(name, type)),
            des: type,
            key: name
        });
    };

    scrollHandler = (event) => {
        // 滚动加载
        // scrollTop为滚动条在Y轴上的滚动距离。
        // clientHeight为内容可视区域的高度。
        // scrollHeight为内容可视区域的高度加上溢出（滚动）的距离。
        // event.target.scrollHeight - event.target.clientHeight == scrollTop 滚动到底部
        if (event.target.scrollHeight - event.target.offsetHeight <= event.target.scrollTop && event.target.scrollTop !== beforeScrollTop){
            beforeScrollTop = event.target.scrollTop;
            // this.getPropertyList();
        }
        this.setState({
            left: event.target.scrollLeft + 'px',
            top: event.target.scrollTop + 'px'
        });
    };

    viewPropertyDetail = (obj) => (
        this.refs.viewProperty.getPropsData(obj)
    );

    exportHandler = () => (
        this.refs.exportProperty.closeHandler(false)
    );

    render = () => {
        // 没有拿到项目类型，渲染空模板
        if (!this.state.projectType){
            return <NoData/>;
        }

        const {messages} = this.props.intl;
        const {userInfo, projectType, propertyMap: getPropertyMap} = this.state;
        const propertyStatusClass = ['ipxblue_txt', 'ipxyellow_txt', 'ipxred_txt'];

        //------获取配置表中，当前项目所属国家所属类型下的所有字段-----start
        let propertyMap = JSON.parse(JSON.stringify(getPropertyMap)),
            keysCountry = [];
        for (let key in propertyMap[userInfo.countryNameShort][projectType]) {
            if ((propertyMap[userInfo.countryNameShort][projectType]).hasOwnProperty(key)){
                keysCountry.push(key);
            }
        }
        propertyMap[userInfo.countryNameShort].keys = keysCountry;
        if (!propertyMap[userInfo.countryNameShort].keys.length){
            this.setState({
                propertyMap: propertyMap
            });
        }
        const keys = keysCountry;
        //------获取配置表中，当前项目所属国家所属类型下的所有字段-----end

        // 表头
        let keysMap = {};
        let thead = keys.map((obj, index) => {
            keysMap[obj] = true;
            return <span style={{left: index === 0 ? this.state.left : ''}}
                         className={index === 0 ? 'proj_propty_lot' : ''}
                         onClick={this.listSort.bind(this, obj, !this.state.des)}>
                        {messages[obj]}
                {
                    // 面积单位
                    (obj === 'internalArea' || obj === 'balconyArea' || obj === 'landArea' || obj === 'constructionArea') ?
                        propertyMap.areaUnit[userInfo.countryNameShort] :
                        (
                            // 长度单位
                            (obj === 'width' || obj === 'length') ?
                                propertyMap.LengthUnit[userInfo.countryNameShort] : ''
                        )
                }
                <div className={"sortArrow" + ( this.state.key === obj ? (this.state.des === true ? " sortArrow_des" : " sortArrow_asc") : "")}>
                        <i className="iconfont icon-upArrow"/>
                        <i className="iconfont icon-downArrow"/>
                    </div>
                </span>;
        });

        // 表体
        const spanTd = (obj, key) => (<span>{obj[key]}</span>);
        const spanAbroad = (obj, key) => (
            <span>{obj[key] === true ? messages.isAbroadYes : messages.isAbroadNo}</span>
        );
        const spanPropertyStatus = (obj, key) => (
            <span className={propertyStatusClass[obj[key] - 0 - 1]}>{propertyMap.propertyStatusWord[obj[key] - 0 - 1]}</span>
        );
        const spanYesNo = (obj, key) => (
            <span>{obj[key] === true ? messages.yes : messages.no}</span>
        );
        const spanPrice = (obj, key) => (
            <span>{obj[key] !== undefined ? (formatMoney(obj[key], 2) + ' ' + (obj.currencyName)) : null}</span>
        );
        const spanArea = (obj, key) => (
            <span>{obj[key] + ' ' + (propertyMap.areaUnit[userInfo.countryNameShort]).replace('(', '').replace(')', '')}</span>
        );
        const spanLength = (obj, key) => (
            <span>{obj[key] + 'b ' + propertyMap.LengthUnit[userInfo.countryNameShort].replace('(', '').replace(')', '')}</span>
        );
        const spanPercent = (obj, key) => (
            <span>{obj[key] !== undefined ? (obj[key] + ' %') : null}</span>
        );
        const spanAspectName = (obj, key) => (
            <span>{propertyMap.aspectName[obj[key] - 0 - 1]}</span>
        );
        const spanHouseViewName = (obj, key) => (
            <span>{propertyMap.houseViewName[obj[key] - 0 - 1]}</span>
        );
        const spanLot = (obj, key) => (
            <span style={{left: this.state.left}} className={"proj_propty_lot " + propertyStatusClass[obj.propertyStatus - 0 - 1]}>
                {obj[key]}
                <ul>
                    <li onClick={this.viewPropertyDetail.bind(this, obj)}><i className="iconfont icon-check"/> {messages.view}</li>
                </ul>
            </span>
        );
        const tbody = this.state.list && this.state.list.length ? this.state.list.map((obj) => (<div className="proj_propty_tr clearfix" key={obj.propertyId}>
                {
                    keys.map((key) => {
                        if (key === 'lot'){
                            return spanLot(obj, key);
                        } if (key === 'price' || key === 'landPrice' || key === 'buildPrice' || key === 'estimatedCancelRates'
                            || key === 'waterRates' || key === 'ownerCrop' || key === 'insurance' || key === 'transactionFee'
                            || key === 'titleInsurance'){
                            return spanPrice(obj, key); // 价格
                        } else if (key === 'internalArea' || key === 'balconyArea' || key === 'landArea' || key === 'constructionArea'){
                            return spanArea(obj, key); // 面积
                        } else if (key === 'width' || key === 'length') {
                            return spanLength(obj, key); // 长度
                        } else if (key === 'estimatedStampDuty' || key === 'propertyTax' || key === 'rentalGuarrante') {
                            return spanPercent(obj, key); // 百分比
                        } else if (key === 'isDisplay'){
                            return spanYesNo(obj, key);
                        } else if (key === 'isAbroad'){
                            return spanAbroad(obj, key);
                        } else if (key === 'aspect'){
                            return spanAspectName(obj, key);
                        } else if (key === 'houseView'){
                            return spanHouseViewName(obj, key);
                        } else if (key === 'propertyStatus'){
                            return spanPropertyStatus(obj, key);
                        } else {
                            return spanTd(obj, key);
                        }
                    })
                }
            </div>)) : null;

        return (
            <div>
                <ViewProperty ref="viewProperty" messages={messages} countryName={this.state.userInfo.countryNameShort} params={this.context.router.params} query={this.props.location.query}/>
                <ExportProperty ref="exportProperty" messages={messages}/>
                <div className="agency_screen_titbox">
                    <div className="proj_screen_cont_tr clearfix ipx_ant">
                        <div className="proj_screen_cont_td">
                            <h3>{messages.lot}</h3>
                            <Search name="lot" className="agency_titbox_searchlot" onChange={this.onChange.bind(this)} onSubmit={() => (false)} placeholder={messages.lot}/>
                        </div>
                        <Slider name="priceMinMax" onChange={this.onChange.bind(this)} data={{
                            markUnit: "$",
                            min: 1,
                            max: 500,
                            defaultValue: [1, 500],
                            markMin: 1,
                            markMax: 500,
                            title: messages.propertyPrice + ' （' + messages.auDollar + '）',
                            childStyle: {width: 200 + 'px'}
                        }}/>
                        <Select name="bed" onChange={this.onChange.bind(this)} data={{title: messages.beds}}
                                key={this.state.updateKey}/>
                        <Select name="carSpace" onChange={this.onChange.bind(this)} data={{title: messages.carSpace}}
                                key={this.state.updateKey}/>
                        <Select name="study" onChange={this.onChange.bind(this)} data={{title: messages.studys}}
                                key={this.state.updateKey}/>
                        <Select name="bath" onChange={this.onChange.bind(this)} data={{title: messages.baths}}
                                key={this.state.updateKey}/>
                        <Select name="isAbroad" onChange={this.onChange.bind(this)} key={this.state.updateKey}
                                data={{
                                    list: [
                                        {
                                            value: 0,
                                            content: messages.arbitrarily
                                        },
                                        {
                                            value: 1,
                                            content: messages.purchaseFalse
                                        },
                                        {
                                            value: 2,
                                            content: messages.purchase
                                        }
                                    ]
                                }}/>
                        <div className="proj_screen_cont_td float_rt">
                            <h3>&nbsp;</h3>
                            <button className="ipx_L_btn ipx_bluebd_btn ipx_btn" onClick={this.exportHandler}><i className="iconfont icon-exportexl"/>{messages.exportFile}</button>
                            <p className="proj_screen_update_time">{messages.listUpdateTime} : {this.state.lastTime ? (new Date(this.state.lastTime + 8 * 1000 * 60 * 60)).toISOString().slice(0, 10) : '-'}</p>
                        </div>
                    </div>
                </div>
                <div className="proj_propty_tabBox" onScroll={this.scrollHandler}>
                    <div className="proj_propty_table">
                        <div className="proj_propty_thead" style={{top: this.state.top}}>
                            {thead}
                        </div>
                        {tbody}
                    </div>
                </div>
            </div>
        );
    };
}

Property.contextTypes = {
    router: PropTypes.object.isRequired
};

export default injectIntl(Property);
