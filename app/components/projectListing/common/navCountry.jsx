/**
 * Created by marszed on 2017/1/24.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {isEqual, objCopy, langPackageInject} from 'LIB/tool';
import {injectIntl} from 'react-intl';
import {setCountry, setSearchOption, setFormBox} from 'REDUX/actions/project';
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import pureRender from "pure-render-decorator";

import Search from 'COMPONENT/common/form/Search';
import Radio from 'COMPONENT/common/form/Radio';
import Select from 'COMPONENT/common/form/Select';
import SelectCheck from 'COMPONENT/common/form/SelectCheck';
import Slider from 'COMPONENT/common/form/Slider';
import AutoComplete from 'COMPONENT/common/form/AutoComplete';

import AU_MAP_CN from 'ASSET/images/AU_map_CN.jpg';
import AU_MAP_EN from 'ASSET/images/AU_map_EN.jpg';
import UK_MAP_CN from 'ASSET/images/UK_map_CN.jpg';
import UK_MAP_EN from 'ASSET/images/UK_map_EN.jpg';
import US_MAP_CN from 'ASSET/images/US_map_CN.jpg';
import US_MAP_EN from 'ASSET/images/US_map_EN.jpg';

let AU_MAP,UK_MAP,US_MAP;
let language = langPackageInject();
if(language === 'en_US'){
    AU_MAP = AU_MAP_EN;
    UK_MAP = UK_MAP_EN;
    US_MAP = US_MAP_EN;
} else {
    AU_MAP = AU_MAP_CN;
    UK_MAP = UK_MAP_CN;
    US_MAP = US_MAP_CN;
}

@pureRender
class NavCountry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: this.props.project.country || [],
            params: this.props.params,
            countryIcon: {
                "country.000": "icon-earth1",
                "country.002": "icon-USA",
                "country.003": "icon-UK",
                "country.004": "icon-AU",
                "country.005": "icon-CA"
            },
            title: '',
            type: '1',
            countryCode: 'ALL',
            propertyMax: 0,
            propertyMin: 0,
            abroadFlag: -1,
            projectTypes: [],
            beds: 0,
            baths: 0,
            studys: 0,
            carSpace: 0,
            expendPX: -1000
        };
    }

    componentDidMount() {
        if (!this.props.project.country) {
            this.getCountryCode();
        } else {
            this.setState({
                country: this.props.project.country
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params && !isEqual(nextProps.params, this.state.params)) {
            this.setState({
                params: nextProps.params
            });
        }
        if (nextProps.global.formSelect && nextProps.global.formSelect.key && !isEqual(nextProps.global.formSelect.key, this.state[nextProps.global.formSelect.key])) {
            let temp = {};
            temp[nextProps.global.formSelect.key] = nextProps.global.formSelect.value;
            this.setState(temp);
        }
        // 刷选表单伸缩展开
        if (nextProps.project.formBox && (nextProps.project.formBox !== this.state.expendPX)) {
            this.setState({
                expendPX: nextProps.project.formBox
            });
        }
        // 下拉列表更新
        if (nextProps.global.formSelect && nextProps.global.formSelect.key && !isEqual(nextProps.global.formSelect.key, this.state[nextProps.global.formSelect.key])) {
            let temp = {};
            temp[nextProps.global.formSelect.key] = nextProps.global.formSelect.value;
            this.setState(temp);
        }
        // 搜索框更新
        if (nextProps.global.formSearch && nextProps.global.formSearch.key && !isEqual(nextProps.global.formSearch.value, this.state[nextProps.global.formSearch.key])) {
            let temp = {};
            temp[nextProps.global.formSearch.key] = undefined;
            this.setState(temp);
        }
        // 单选框-项目规模更新
        if (nextProps.global.formRadio && nextProps.global.formRadio.key && !isEqual(nextProps.global.formRadio.value, this.state[nextProps.global.formRadio.key])) {
            this.setState({
                propertyMax: undefined,
                propertyMin: undefined
            });
        }
        // 复选框更新
        if (nextProps.global.formSelectCheck && nextProps.global.formSelectCheck.key && !isEqual(nextProps.global.formSelectCheck.value, this.state[nextProps.global.formSelectCheck.key])) {
            let temp = {};
            temp[nextProps.global.formSelectCheck.key] = [];
            this.setState(temp);
        }
        // 滑块更新
        if (nextProps.global.formSlider && nextProps.global.formSlider.key && !isEqual(nextProps.global.formSlider.value, this.state[nextProps.global.formSlider.key])) {
            let temp = {};
            temp[nextProps.global.formSlider.key.replace('Max', '')] = undefined;
            temp[nextProps.global.formSlider.key.replace('Min', '')] = undefined;
            this.setState(temp);
        }
        // 行政区自动完成更新
        if (nextProps.global.formAutoComplete && nextProps.global.formAutoComplete.key && !isEqual(nextProps.global.formAutoComplete.value, this.state[nextProps.global.formAutoComplete.key])) {
            let temp = {};
            temp.regionFirstCode = undefined;
            temp.regionFirst = undefined;
            temp.regionSecondCode = undefined;
            temp.regionSecond = undefined;
            this.setState(temp);
        }
    }

    // 获取二级菜单国家列表
    getCountryCode() {
        let responseHandler = async function () {
            const {messages} = this.props.intl;
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.COUNTRY, key: 'COUNTRY'},
                method: 'get',
                params: {
                    language: langPackageInject()
                },
                loading: false
            });
            if (!response.errType) {
                let country = response.data.data;
                country.forEach((countryDate) => {
                    if (countryDate.dicCode === "country.000"){
                        country.splice(country.indexOf(countryDate), 1);
                    }
                });
                country.unshift({
                    "dicCode": 'country.000',
                    "nameShort": 'ALL',
                    "dicValue": messages.all
                });
                this.setState({
                    country: country
                });
                // 缓存国家列表信息
                this.props.dispatch(setCountry(country));
            }
        }.bind(this)();
    }

    // 展开查询表单
    expendForm(e) {
        e.stopPropagation();
        if (this.props.project.formBox !== 60){
            this.props.dispatch(setFormBox(60));
        }
    }

    // 数据收集
    onChange(name, value, _name, _value) {
        let option = {};
        const propertyMinMax = [{min: 1, max: 50}, {min: 51, max: 200}, {min: 201, max: 0}];
        if (name === 'propertyMinMax' && value > 0) {
            this.setState({
                propertyMax: propertyMinMax[value - 1].max,
                propertyMin: propertyMinMax[value - 1].min
            });
        } else if (name === 'abroadFlag') {
            option[name] = value - 1;
            this.setState(option);
        } else {
            let _state = this.state;
            if (name === 'regionFirstCode' && value === ''){
                delete _state['regionFirstCode'];
                delete _state['regionFirst'];
                delete _state['regionSecondCode'];
                delete _state['regionSecond'];
                this.setState(_state);
            } else if (name === 'regionSecondCode' && value === ''){
                delete _state['regionSecondCode'];
                delete _state['regionSecond'];
                this.setState(_state);
            } else {
                option[name] = value;
                if(_name !== undefined && _value !== undefined){
                    option[_name] = _value;
                }
                this.setState(option);
                if (name === 'title') {
                    this.onSubmit(option);
                }
            }
        }
    }

    //parameter filter 冗余参数过滤
    parameterFilter = (req) => {
        let obj = {};
        for (let key in req){
            if (req[key] !== undefined && req.hasOwnProperty(key)){
                obj[key] = req[key];
            }
        }
        return obj;
    };

    // submit
    onSubmit = (option) => {
        const {params} = this.props;
        let req = Object.assign(objCopy(this.props.project.searchOption), {
            type: params.type,
            countryCode: params.country,
            title: this.state.title,
            propertyMax: this.state.propertyMax,
            propertyMin: this.state.propertyMin,
            abroadFlag: this.state.abroadFlag,
            projectTypes: this.state.projectTypes,
            beds: this.state.beds,
            baths: this.state.baths,
            studys: this.state.studys,
            carSpace: this.state.carSpace,
            propertyPriceMin: this.state.propertyPriceMin,
            propertyPriceMax: this.state.propertyPriceMax,
            commissionType: this.state.commissionType,
            commissionMin: this.state.commissionMin,
            commissionMax: this.state.commissionMax,
            periodMin: this.state.periodMin,
            periodMax: this.state.periodMax,
            areaMin: this.state.areaMin,
            areaMax: this.state.areaMax,
            distanceMin: this.state.distanceMin,
            distanceMax: this.state.distanceMax,
            unitPriceMin: this.state.unitPriceMin,
            unitPriceMax: this.state.unitPriceMax,
            regionFirstCode: this.state.regionFirstCode,
            regionSecondCode: this.state.regionSecondCode,
            regionFirst: this.state.regionFirst,
            regionSecond: this.state.regionSecond,
            timeStamp:new Date().getTime()
        }, option);

        this.props.dispatch(setSearchOption(this.parameterFilter(req)));
    };

    render() {
        const {messages} = this.props.intl;
        let Map = '',areaUnit,currency;
        if(this.state.params.country === 'country.002'){
            Map = US_MAP;
            areaUnit = 'ft²';
            currency = 'USD';
        } else if(this.state.params.country === 'country.003'){
            Map = UK_MAP;
            areaUnit = 'ft²';
            currency = 'GBP';
        } else if(this.state.params.country === 'country.004'){
            Map = AU_MAP;
            areaUnit = '㎡';
            currency = 'AUD';
        }

        return <div className="dev_cont_subtitle">
            <div className="dev_cont_sub_screen">
                <dl className="proj_screen_start">
                    <dt><i className="iconfont icon-screen"/><span>{messages.screen}</span></dt>
                    {
                        this.state.country ? this.state.country.map((obj) => (
                                <Link className={obj.dicCode === this.state.params.country ? 'active' : ''}
                                      onMouseEnter={this.expendForm.bind(this)}
                                      to={"/projectListing/" + this.state.params.type + '/' + obj.dicCode + "/overview"}>
                                    <i className={"iconfont " + this.state.countryIcon[obj.dicCode]}/>
                                    <span>{obj.dicValue}</span>
                                </Link>
                            )) : ''
                    }
                </dl>
                <Search name="title" onChange={this.onChange.bind(this)} onSubmit={this.onSubmit.bind(this)} placeholder={messages.searchProjectName}/>
                <div className="proj_screen_cont ipx_ant"
                     onKeyUp={this.onKeyUp}
                     style={{top: this.state.expendPX + 'px'}}>
                    <div className="proj_screen_cont_lf">
                        <div className="proj_county_map">
                            <img src={Map}/>
                        </div>
                        <AutoComplete
                            data={{
                                title: messages.region + messages.choose,
                                placeholder: messages.pleaseChoose,
                                params: messages.params
                            }}
                            params={this.state.params}
                            onChange={this.onChange.bind(this)}
                        />
                    </div>
                    <div className="proj_screen_cont_tr">
                        <Radio name="propertyMinMax" onChange={this.onChange.bind(this)}/>
                    </div>
                    <div className="proj_screen_cont_rt clearfix">
                        <div className="proj_screen_cont_tr clearfix">
                            <SelectCheck name="projectTypes" onChange={this.onChange.bind(this)} data={{title: messages.projectTypes}}/>
                            <Slider name="propertyPriceMinMax" onChange={this.onChange.bind(this)}
                                    data={{
                                        markUnit: "k",
                                        min: 0,
                                        max: 5000,
                                        defaultValue: [0, 5000],
                                        markMin: 0,
                                        title: messages.propertyPrice,
                                        markMax: 5000,
                                        step: 10,
                                        childStyle: {width: 300 + 'px'}
                                    }}/>
                        </div>
                        <div className="proj_screen_cont_tr clearfix">
                            <Select name="beds" onChange={this.onChange.bind(this)} data={{title: messages.beds}}
                                    key={this.state.updateKey}/>
                            <Select name="baths" onChange={this.onChange.bind(this)} data={{title: messages.baths}}
                                    key={this.state.updateKey}/>
                            <Select name="studys" onChange={this.onChange.bind(this)} data={{title: messages.studys}}
                                    key={this.state.updateKey}/>
                            <Select name="carSpace" onChange={this.onChange.bind(this)} data={{title: messages.carSpaces}}
                                    key={this.state.updateKey}/>
                            {
                                this.state.params.country === 'country.004' ?
                                    <Select name="abroadFlag" onChange={this.onChange.bind(this)} key={this.state.updateKey}
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
                                      }}/> : null
                            }
                        </div>
                        <div className="proj_screen_cont_tr clearfix">
                            <Slider name="unitPriceMinMax" onChange={this.onChange.bind(this)}
                                    data={{
                                        min: 0,
                                        max: 20000,
                                        defaultValue: [0, 20000],
                                        markMin: 0,
                                        markMax: 20000,
                                        step: 1000,
                                        title: messages.price + ' / ' + messages.squareMetre + ' （' + currency + '）',
                                        childStyle: {width: 200 + 'px'}
                                    }}/>
                            <Slider name="periodMinMax" onChange={this.onChange.bind(this)}
                                    data={{
                                        markUnit: messages.month,
                                        min: 0,
                                        max: 60,
                                        defaultValue: [0, 60],
                                        markMin: 0,
                                        markMax: 60,
                                        title: messages.period
                                    }}/>
                            <Slider name="areaMinMax" onChange={this.onChange.bind(this)}
                                    data={{
                                        min: 0,
                                        max: 500,
                                        defaultValue: [0, 500],
                                        markMin: 0,
                                        markMax: 500,
                                        title: messages.area + '（' + areaUnit +'）'
                                    }}/>
                            <Slider name="distanceMinMax" onChange={this.onChange.bind(this)}
                                    data={{
                                        markUnit: 'km',
                                        min: 0,
                                        max: 50,
                                        defaultValue: [0, 50],
                                        markMin: 0,
                                        markMax: 50,
                                        step: 5,
                                        title: messages.targetDistance + '（km）'
                                    }}/>
                        </div>
                        <div className="proj_screen_cont_tr clearfix">
                            <div className="proj_screen_cont_td proj_screen_serchbtn">
                                <button className="ipx_btn ipx_blue_btn ipx_L_btn" onClick={this.onSubmit.bind(this, {})}>{messages.search}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default connect((state) => (state))(injectIntl(NavCountry));
