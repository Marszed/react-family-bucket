/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {isEqual, objCopy, langPackageInject, debounce} from 'LIB/tool';
import {injectIntl} from 'react-intl';
import {setCountry, setSearchOption} from 'REDUX/actions/project';
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import pureRender from "pure-render-decorator";

import Search from 'COMPONENT/common/form/Search';
import Radio from 'COMPONENT/common/form/Radio';
import Select from 'COMPONENT/common/form/Select';
import SelectCheck from 'COMPONENT/common/form/SelectCheck';

@pureRender
class NavAll extends React.Component {
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
            type: '1',
            countryCode: 'country.000',
            title: '',
            propertyMax: 0,
            propertyMin: 0,
            abroadFlag: -1,
            projectTypes: [],
            beds: 0,
            baths: 0,
            studys: 0,
            expendPX: -95
        };
    }

    componentDidMount() {
        if (!this.props.project.country) {
            this.getCountryCode();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params && !isEqual(nextProps.params, this.state.params)) {
            this.setState({
                params: nextProps.params
            });
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
    }

    // 获取二级菜单国家列表
    getCountryCode() {
        let responseHandler = async function () {
            const {messages} = this.props.intl;
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.COUNTRY, key: 'COUNTRY'},
                method: 'get',
                loading: false
            });
            if (!response.errType) {
                let country = response.data.data;
                country.forEach((countryDate) => {
                    if (countryDate.dicCode === "country.000"){
                        country.splice(country.indexOf(countryDate), 1);
                    }
                });
                country.push({
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
    expendForm(px, e) {
        e.stopPropagation();
        this.setState({
            expendPX: px
        });
    }

    // 数据收集
    onChange(name, value, _name, _value) {
        let option = {};
        const propertyMinMax = [{min: 1, max: 50}, {min: 51, max: 200}, {min: 201, max: 0}];
        if (name === 'propertyMinMax') {
            this.setState({
                propertyMax: !value || value === -1 ? 0 : propertyMinMax[value - 1].max,
                propertyMin: !value || value === -1 ? 0 : propertyMinMax[value - 1].min
            });
        } else if (name === 'abroadFlag') {
            option[name] = value - 1;
            this.setState(option);
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
        const temp = {
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
            timeStamp:new Date().getTime()
        };

        for(let key in temp){
            if (key === 'projectTypes' && !temp[key].length){
                delete temp[key];
            } else if (temp[key] === undefined || temp[key] === ''){
                delete temp[key];
            }
        }

        let req = Object.assign(objCopy(this.props.project.searchOption), temp, option);
        this.props.dispatch(setSearchOption(this.parameterFilter(req)));
        // 收起搜索条件
        this.setState({
            expendPX: -95
        });
    };

    render() {
        const {messages} = this.props.intl;

        return <div className="dev_cont_subtitle">
            <div className="dev_cont_sub_screen">
                <dl className="proj_screen_start">
                    {
                        this.state.country ? this.state.country.map((obj) => (
                            <Link className={obj.dicCode === this.state.params.country ? 'active' : ''}
                                  to={"/projectListing/" + this.state.params.type + '/' + obj.dicCode + "/overview"}>
                                <i className={"iconfont " + this.state.countryIcon[obj.dicCode]}/>
                                <span>{obj.dicValue}</span>
                            </Link>
                        )) : null
                    }
                </dl>
                <Search name="title" onChange={this.onChange.bind(this)} onSubmit={this.onSubmit.bind(this)} placeholder={messages.searchProjectName}/>
                <div className="proj_screen_cont"
                     onKeyUp={this.onKeyUp}
                     style={{top: this.state.expendPX + 'px', 'boxShadow': '0 3px 8px rgba(0,0,0,.3)'}}>
                    <div className="proj_screen_cont_rt" style={{marginLeft: '130px'}}>
                        <div className="proj_screen_cont_tr clearfix">
                            <Radio name="propertyMinMax" onChange={this.onChange.bind(this)}/>
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
                                    }}/>
                            <SelectCheck name="projectTypes" onChange={this.onChange.bind(this)}
                                         data={{title: messages.projectTypes}}/>
                        </div>
                        <div className="proj_screen_cont_tr clearfix">
                            <div className="proj_screen_cont_td proj_screen_serchbtn">
                                <button className="ipx_btn ipx_blue_btn ipx_L_btn"
                                        onClick={this.onSubmit.bind(this, {})}>{messages.search}</button>
                            </div>
                        </div>
                    </div>
                    <a href="javascript:;" className="proj_screen_control_btn"  style={{'textDecoration' : 'none', 'boxShadow': '0 3px 8px rgba(0,0,0,.3)'}} onClick={this.expendForm.bind(this, this.state.expendPX == 60 ? -95 : 60)}>{messages.advanceSearch} <i className={"iconfont " + (this.state.expendPX == 60 ? "icon-arrowup" : "icon-arrowdown")}/></a>
                </div>
            </div>
        </div>;
    }
}

export default connect((state) => (state))(injectIntl(NavAll));
