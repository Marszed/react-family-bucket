/**
 * Created by marszed on 2017/1/24.
 */
import React, {PropTypes} from "react";
import {injectIntl} from "react-intl";
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import {formatMoney, keySort, objCopy, arrayCopy, debounce, langPackageInject} from 'LIB/tool';
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
        let messages = objCopy(this.props.intl.messages);
        const zhFlag = langPackageInject().indexOf('zh') === -1; //  true 英文 false 中文
        let propertyMap = getPropertyMay(messages, {}); // 不动产配置注入
        let query = this.props.router.location.query;
        if(zhFlag){
            if (propertyMap.countryCode[query.countryCode] == 'US'){
                messages.ownerCrop = 'HOA';
            }
            if (propertyMap.countryCode[query.countryCode] == 'AU'){
                messages.ownerCrop = 'Body Corporation';
                messages.buildPrice = 'House Price';
            }
        }
        this.state = {
            countryNameShort: '',
            messages: messages,
            propertyArray: [],
            searchOption: {}, // 刷选条件
            projectType: this.props.location.query.projectType,
            propertyMap: propertyMap,
            pageStart: 0,
            pageLength: 1000,
            hasNextPage: true,
            des: false,
            key: "lot",
            list: [],
            left: "0px",
            top: "0px"
        };
    }

    getDefault = (data) => {
        let req = [], res =[];
        if (data.foremost){
            data.foremost.map((obj) => {
                req.push(obj);
            });
        }
        if (data.secondary){
            data.secondary.map((obj) => {
                req.push(obj);
            });
        }
        if (data.landInfo){
            data.landInfo.map((obj) => {
                req.push(obj);
            });
        }
        if (data.basicInfo){
            data.basicInfo.map((obj) => {
                req.push(obj);
            });
        }
        if (data.supplement){
            data.supplement.map((obj) => {
                req.push(obj);
            });
        }
        // 排序下
        if (data.order){
            data.order.map((obj) => {
                req.map((option) => {
                    if(option.key == obj){
                        res.push(option);
                        return false;
                    }
                });
            });
        }
        return res;
    };

    componentDidMount = () => (
        this.getPropertyList()
    );

    getPropertyList = () => {
        const {params} = this.context.router;
        const {state} = this.context.router.location;
        // 从路由state获取从项目列表匹配的不动产ID集合
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
                let temp = (data.page.list).sort(keySort(this.state.key, this.state.des));
                let check1 = [], check2 =[];
                if (state && state.propertyIds && state.propertyIds.length){
                    // 带了刷选条件，需要优先显示已匹配的
                    temp.map((obj) => {
                        let flag = false;
                        state.propertyIds.map((propertyId) => {
                            if(obj.propertyId == propertyId){
                                flag = true;
                                return false;
                            }
                        });
                        if(flag){
                            check1.push(obj);
                        } else {
                            check2.push(obj);
                        }
                    });
                    temp = check1.concat(check2);
                }

                const countryNameShort = data.country.toUpperCase();
                let messages = objCopy(this.props.intl.messages);
                const zhFlag = (langPackageInject()).indexOf('zh') === -1; //  true 英文 false 中文
                if(zhFlag){
                    if (countryNameShort == 'US'){
                        messages.ownerCrop = 'HOA';
                    }
                    if (countryNameShort == 'AU'){
                        messages.ownerCrop = 'Body Corporation';
                        messages.buildPrice = 'House Price';
                    }
                }
                this.setState({
                    list: temp,
                    listCopy: temp,
                    lastTime: data.lastTime,
                    messages: messages,
                    countryNameShort: countryNameShort,
                    currencyName: (langPackageInject()).indexOf('zh') === -1 ? this.state.propertyMap.monUnit.en[countryNameShort] : this.state.propertyMap.monUnit.zh[countryNameShort],
                    hasNextPage: data.page.hasNextPage,
                    pageStart: data.hasNextPage ? (this.state.pageStart + 1) : this.state.pageStart,
                    propertyArray: this.getDefault(this.state.propertyMap[countryNameShort][this.state.projectType])
                });
            }
        }.bind(this)();
    };

    // 数据收集
    onChange = (name, value, _name, _value) => {
        let temp = {}, temp2 = {};
        temp[name] = name === 'isAbroad' ? (value ? !!(value - 1) : undefined) : value;
        if(_name && _value){
            temp2[_name] = _name === 'isAbroad' ? (_value ? !!(_value - 1) : undefined) : _value;
        }
        const searchOptionReset = Object.assign(objCopy(this.state.searchOption), temp, temp2);
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
            if ((option.priceMin && option.priceMax) && (option.priceMin*1000 > obj.price || option.priceMax*1000 < obj.price)) {
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

    exportHandler = () => {
        this.refs.exportProperty.closeHandler(false);
        this.refs.exportProperty.setCountryHandler(this.state.countryNameShort);
    };

    render = () => {
        // 没有拿到项目类型，渲染空模板
        if (!this.state.countryNameShort){
            return <NoData/>;
        }

        const {messages} = this.state;
        let propertyArray = [];
        this.state.propertyArray.map((obj) => {
            if(obj.key !== 'isDisplay'){
                propertyArray.push(obj);
            }
        });
        const propertyStatusClass = ['ipxblue_txt', 'ipxyellow_txt', 'ipxred_txt'];

        // 表头
        let thead = propertyArray.map((obj, index) => {
            return <span style={{left: index == 0 ? this.state.left : ''}}
                         className={index == 0 ? 'proj_propty_lot propty_pricelist_span_lot' : ('propty_pricelist_span_' + (obj.key))}
                         onClick={this.listSort.bind(this, obj.key, !this.state.des)}>
                        {messages[obj.key]}
                {
                    // 面积单位
                    (obj.unit === 'area') ?
                        (' (' + this.state.propertyMap.areaUnit[this.state.countryNameShort] + ')') :
                        (
                            // 长度单位
                            (obj.unit === 'len') ?
                                (' (' +  this.state.propertyMap.lengthUnit[this.state.countryNameShort] + ')') :
                                // 百分比
                                (
                                    (obj.unit === 'percent') ? ' (%)' : (
                                            // 金额
                                            (obj.unit === 'mon') ? (' (' + this.state.currencyName + (obj.key === 'estRate' ? (this.state.countryNameShort === 'US' ? messages.unitMonth : messages.unitWeek) : '') + ')') : ''
                                        )
                                )
                        )
                }
                <div className={"sortArrow" + ( this.state.key == obj.key ? (this.state.des == true ? " sortArrow_des" : " sortArrow_asc") : "")}>
                        <i className="iconfont icon-upArrow"/>
                        <i className="iconfont icon-downArrow"/>
                    </div>
                </span>
        });

        // 表体
        let tbody = '';
        const spanTd = (obj,key) => { return (
            <span className={'propty_pricelist_span_' + key}>{obj[key] !== undefined ? obj[key] : ''}</span>
        )};
        const spanAbroad = (obj,key) => { return (
            <span className={'propty_pricelist_span_' + key}>{obj[key] == true ? messages.isAbroadYes : messages.isAbroadNo}</span>
        )};
        const spanPropertyStatus = (obj, key) => (
            <span className={propertyStatusClass[obj[key] - 0 - 1] + (' propty_pricelist_span_' + key)}>{this.state.propertyMap.propertyStatusWord[obj[key] - 0 - 1]}</span>
        );
        const spanYesNo = (obj,key) => { return (
            <span className={'propty_pricelist_span_' + key}>{obj[key] == true ? messages.yes : messages.no}</span>
        )};
        const spanPrice = (obj,key) => {return (
            <span className={'propty_pricelist_span_' + key}>{obj[key] !== undefined ? formatMoney(obj[key], 2) : ''}</span>
        )};
        const spanArea = (obj,key) => {return (
            <span className={'propty_pricelist_span_' + key}>{obj[key] !== undefined ? obj[key] : ''}</span>
        )};
        const spanLength = (obj,key) => {return (
            <span className={'propty_pricelist_span_' + key}>{obj[key] !== undefined ? obj[key] : ''}</span>
        )};
        const spanPercent = (obj,key) => {return (
            <span className={'propty_pricelist_span_' + key}>{obj[key] !== undefined ? obj[key] : ''}</span>
        )};
        const spanAspectName = (obj,key) => {return (
            <span className={'propty_pricelist_span_' + key}>{this.state.propertyMap.aspectName[obj[key]-0-1]}</span>
        )};
        const spanHouseViewName = (obj,key) => {return (
            <span className={'propty_pricelist_span_' + key}>{this.state.propertyMap.houseViewName[obj[key]-0-1]}</span>
        )};
        const spanFloorLevel = (obj,key) => {
            let floorLevel = '';
            this.state.propertyMap.floorLevel.map((option) => {
                if(option.id == obj[key]){
                    floorLevel = option.data || obj[key];
                    return false;
                }
            });
            return <span className={'propty_pricelist_span_' + key}>{floorLevel}</span>
        };
        const spanLot = (obj,key) => { return (
            <span style={{left: this.state.left}} className="proj_propty_lot propty_pricelist_span_lot">
                {obj[key]}
                <ul>
                    <li onClick={this.viewPropertyDetail.bind(this, obj)}><i className="iconfont icon-check"/> {messages.view}</li>
                </ul>
            </span>
        )};

        if (this.state.list && this.state.list.length) {
            tbody = this.state.list.map((obj) => {
                return (<div className="proj_propty_tr clearfix" key={obj.propertyId}>
                    {
                        propertyArray.map((option)=>{
                            if(option.key == 'lot'){
                                return spanLot(obj,option.key);
                            } else if(option.unit === 'mon'){
                                return spanPrice(obj,option.key); // 价格
                            } else if (option.unit === 'area'){
                                return spanArea(obj,option.key); // 面积
                            } else if (option.unit === 'len') {
                                return spanLength(obj,option.key); // 长度
                            } else if (option.unit === 'percent') {
                                return spanPercent(obj,option.key); // 百分比
                            } else if(option.key == 'isDisplay'){
                                return spanYesNo(obj,option.key);
                            } else if(option.key == 'isAbroad'){
                                return spanAbroad(obj,option.key);
                            } else if (option.key == 'aspect'){
                                return spanAspectName(obj,option.key);
                            } else if (option.key == 'houseView'){
                                return spanHouseViewName(obj,option.key);
                            } else if (option.key == 'floorLevel'){
                                return spanFloorLevel(obj,option.key);
                            } else if (option.key == 'propertyStatus') {
                                return spanPropertyStatus(obj,option.key);
                            } else {
                                return spanTd(obj,option.key);
                            }
                        })
                    }
                </div>);
            });
        }

        return (
            <div>
                <ViewProperty ref="viewProperty" propertyMap={this.state.propertyMap} messages={messages} countryName={this.state.country} params={this.context.router.params} query={this.props.location.query}/>
                <ExportProperty ref="exportProperty" messages={messages} propertyMap={this.state.propertyMap} params={this.props.params} query={this.props.router.location.query}/>
                <div className="agency_screen_titbox">
                    <div className="proj_screen_cont_tr proj_screen_cont_td clearfix ipx_ant">
                        <div className="proj_screen_cont_td">
                            <h3>{messages.lot}</h3>
                            <Search name="lot" className="agency_titbox_searchlot" onChange={this.onChange.bind(this)} onSubmit={() => (false)} placeholder={messages.lot}/>
                        </div>
                        <Slider name="priceMinMax" onChange={this.onChange.bind(this)} data={{
                            markUnit: "k",
                            min: 1,
                            max: 5000,
                            defaultValue: [1, 5000],
                            markMin: 1,
                            title: messages.propertyPrice,
                            markMax: 5000,
                            step: 10,
                            childStyle: {width: 200 + 'px'}
                        }}/>
                        <Select name="bed" onChange={this.onChange.bind(this)} data={{title: messages.beds}}
                                key={this.state.updateKey}/>
                        <Select name="carSpace" onChange={this.onChange.bind(this)} data={{title: messages.carSpaces}}
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
