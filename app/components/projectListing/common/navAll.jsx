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
            expendPX: -455
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
    expendForm(type, e) {
        e && e.stopPropagation();
        this.setState({
            expendPX: type ? 60 : -455
        });
        /*debounce(() => (
            this.setState({
                expendPX: type ? 60 : -455
            })
        ), 250);*/
    }

    // 数据收集
    onChange(name, value) {
        let option = {};
        const propertyMinMax = [{min: 1, max: 49}, {min: 50, max: 200}, {min: 201, max: 0}];
        if (name === 'propertyMinMax') {
            this.setState({
                propertyMax: value === -1 ? 0 : propertyMinMax[value - 1].max,
                propertyMin: value === -1 ? 0 : propertyMinMax[value - 1].min
            });
        } else if (name === 'abroadFlag') {
            option[name] = value - 1;
            this.setState(option);
        } else {
            option[name] = value;
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
            studys: this.state.studys
        }, option);

        this.props.dispatch(setSearchOption(this.parameterFilter(req)));
    };

    render() {
        const {messages} = this.props.intl;

        return <div className="dev_cont_subtitle">
            <div className="dev_cont_sub_screen" onMouseLeave={this.expendForm.bind(this, false)}>
                <dl className="proj_screen_start">
                    <dt><i className="iconfont icon-screen"/><span>{messages.screen}</span></dt>
                    {
                        this.state.country ? this.state.country.map((obj) => (
                            <Link className={obj.dicCode === this.state.params.country ? 'active' : ''}
                                  onMouseEnter={this.expendForm.bind(this, this.state.params.country === obj.dicCode)}
                                  to={"/projectListing/" + this.state.params.type + '/' + obj.dicCode + "/overview"}>
                                <i className={"iconfont " + this.state.countryIcon[obj.dicCode]}/>
                                <span>{obj.dicValue}</span>
                            </Link>
                        )) : ''
                    }
                </dl>
                <Search name="title" onChange={this.onChange.bind(this)} onSubmit={this.onSubmit.bind(this)} placeholder={messages.searchProjectName}/>
                <div className="proj_screen_cont"
                     onKeyUp={this.onKeyUp}
                     style={{top: this.state.expendPX + 'px'}}>
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
                        </div>
                        <div className="proj_screen_cont_tr clearfix">
                            <SelectCheck name="projectTypes" onChange={this.onChange.bind(this)}
                                         data={{title: messages.projectTypes}}/>
                            <Select name="beds" onChange={this.onChange.bind(this)} data={{title: messages.beds}}
                                    key={this.state.updateKey}/>
                            <Select name="baths" onChange={this.onChange.bind(this)} data={{title: messages.baths}}
                                    key={this.state.updateKey}/>
                            <Select name="studys" onChange={this.onChange.bind(this)} data={{title: messages.studys}}
                                    key={this.state.updateKey}/>
                        </div>

                        <div className="proj_screen_cont_tr clearfix">
                            <div className="proj_screen_cont_td proj_screen_serchbtn">
                                <button className="ipx_btn ipx_blue_btn ipx_L_btn"
                                        onClick={this.onSubmit.bind(this, {})}>{messages.search}</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>;
    }
}

export default connect((state) => (state))(injectIntl(NavAll));
