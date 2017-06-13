/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {connect} from 'react-redux';
import pureRender from "pure-render-decorator";
import {isEqual, objCopy, setLocalStorage} from 'LIB/tool';
import {injectIntl} from 'react-intl';
import {setSearchOption} from 'REDUX/actions/project';
import {setAutoComplete, setFormSlider, setFormRadioAuthorize, setFormSelectOrder, setFormSearch, setFormRadio, setFormSelect, setFormSelectCheck} from 'REDUX/actions/global';
import SelectOrder from 'COMPONENT/common/form/SelectOrder';
import RadioType from 'COMPONENT/common/form/RadioType';
import RadioAuthorize from 'COMPONENT/common/form/RadioAuthorize';

@pureRender
class NavBread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            params: this.props.params,
            searchOption: this.props.project.searchOption || {},
            projectList: this.props.project.projectList || {}
        };
    }

    componentWillReceiveProps(nextProps) {
        // 路由变化
        if (nextProps.params && !isEqual(nextProps.params, this.state.params)) {
            this.setState({
                params: nextProps.params
            });
            // 路由变化，清空刷选条件
            setTimeout(() => (
                this.clearSearchOption('CLEAR_ALL')
            ), 0);
        }
        if (nextProps.project.projectList && !isEqual(nextProps.project.projectList, this.state.projectList)) {
            this.setState({
                projectList: nextProps.project.projectList
            });
        }
        if (nextProps.project.searchOption && !isEqual(nextProps.project.searchOption, this.state.searchOption)) {
            this.setState({
                searchOption: nextProps.project.searchOption
            });
        }
    }

    componentWillUnmount() {
        // 缓存筛选条件
        setLocalStorage('searchParams', this.state.params);
    }

    // 数据收集
    onChange(option) {
        this.setState(option);
        setTimeout(() => (
            this.onSubmit(option)
        ), 0);
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
    onSubmit = () => {
        const {params} = this.props;
        this.props.dispatch(setSearchOption(this.parameterFilter(Object.assign(objCopy(this.props.project.searchOption), {
            type: this.state.type || params.type,
            countryCode: params.country
        }, {
            orderBy: this.state.orderBy,
            orderDirection: this.state.orderDirection
        }))));
    };

    clearSearchOption = (option) => {
        let temp = objCopy(this.state.searchOption), array = [];
        if (option === 'CLEAR_ALL') { // 清空全部
            this.props.dispatch(setSearchOption({
                type: this.state.params.type,
                countryCode: this.state.params.country,
                title: '',
                propertyMax: 0,
                propertyMin: 0,
                abroadFlag: -1,
                projectTypes: [],
                beds: 0,
                baths: 0,
                studys: 0
            }));
            this.props.dispatch(setFormSearch({
                key: 'title',
                value: ''
            }));
            this.props.dispatch(setFormSelectCheck({
                key: 'projectTypes',
                value: []
            }));
            this.props.dispatch(setFormRadio({
                key: 'propertyMinMax',
                value: 0
            }));
            this.props.dispatch(setFormSelect({
                key: 'abroadFlag',
                value: -1
            }));
            this.props.dispatch(setFormSelectOrder({
                key: 'type',
                value: ''
            }));
            this.props.dispatch(setFormSlider({
                key: 'propertyPriceMinMax',
                value: 0
            }));
            this.props.dispatch(setAutoComplete({
                key: 'regionFirstCode',
                value: 0
            }));
            setTimeout(() => {
                this.props.dispatch(setFormSelectOrder({
                    key: 'orderByDirection',
                    value: ''
                }));
                this.props.dispatch(setFormSlider({
                    key: 'commissionMinMax',
                    value: 0
                }));
                this.props.dispatch(setFormSelect({
                    key: 'beds',
                    value: 0
                }));
                this.props.dispatch(setAutoComplete({
                    key: 'regionSecondCode',
                    value: 0
                }));
            }, 0);
            setTimeout(() => {
                this.props.dispatch(setFormSlider({
                    key: 'unitPriceMinMax',
                    value: 0
                }));
                this.props.dispatch(setFormSelect({
                    key: 'baths',
                    value: 0
                }));
            }, 0);
            setTimeout(() => {
                this.props.dispatch(setFormSlider({
                    key: 'periodMinMax',
                    value: 0
                }));
                this.props.dispatch(setFormSelect({
                    key: 'studys',
                    value: 0
                }));
            }, 0);
            setTimeout(() => {
                this.props.dispatch(setFormSlider({
                    key: 'areaMinMax',
                    value: 0
                }));
            }, 0);
            setTimeout(() => {
                this.props.dispatch(setFormSlider({
                    key: 'distanceMinMax',
                    value: 0
                }));
            }, 0);
        } else if (option instanceof Object) { // 项目类型清空
            temp.projectTypes.map((obj) => {
                if (option.value !== obj) {
                    array.push(obj);
                }
            });
            temp.projectTypes = array;
            this.props.dispatch(setSearchOption(temp));
            this.props.dispatch(setFormSelectCheck({
                key: option.key,
                value: temp.projectTypes
            }));
        } else {
            if (option === 'propertyMinMax') { // 项目规模清空
                temp.propertyMin = 0;
                temp.propertyMax = 0;
                this.setState({
                    searchOption: temp
                });
                this.props.dispatch(setSearchOption(temp));
                this.props.dispatch(setFormRadio({
                    key: 'propertyMinMax',
                    value: 0
                }));
            } else if (option === 'title') {
                delete temp[option];
                this.props.dispatch(setSearchOption(temp));
                this.props.dispatch(setFormSearch({
                    key: option,
                    value: ''
                }));
            } else if (option.indexOf('MinMax') !== -1){
                delete temp[option.replace('Min', '')];
                delete temp[option.replace('Max', '')];
                this.props.dispatch(setSearchOption(temp));
                this.props.dispatch(setFormSlider({
                    key: option,
                    value: 0
                }));
            } else if (option.indexOf('regionFirstCode') !== -1){
                delete temp.regionFirstCode;
                delete temp.regionSecondCode;
                this.props.dispatch(setSearchOption(temp));
                this.props.dispatch(setAutoComplete({
                    key: 'regionFirstCode',
                    value: 0
                }));
                setTimeout(() => (
                    this.props.dispatch(setAutoComplete({
                        key: 'regionSecondCode',
                        value: 0
                    }))
                ), 0);
            } else if (option.indexOf('regionSecondCode') !== -1){
                delete temp.regionSecondCode;
                this.props.dispatch(setSearchOption(temp));
                this.props.dispatch(setAutoComplete({
                    key: 'regionSecondCode',
                    value: 0
                }));
            } else {
                delete temp[option];
                this.props.dispatch(setSearchOption(temp));
                this.props.dispatch(setFormSelect({
                    key: option,
                    value: (option === 'abroadFlag') ? -1 : 0
                }));
            }
        }
    };

    getFormOptionLength = (searchOption) => {
        let len = 0; // 筛选条件个数，超过三个(暂定)显示...
        if (searchOption.title) {
            len += 1;
        }
        if (searchOption.propertyMin) {
            len += 1;
        }
        if (searchOption.propertyPriceMin && searchOption.propertyPriceMin !== undefined) {
            len += 1;
        }
        if (searchOption.commissionMin && searchOption.commissionMin !== undefined) {
            len += 1;
        }
        if (searchOption.unitPriceMin && searchOption.unitPriceMin !== undefined) {
            len += 1;
        }
        if (searchOption.periodMin && searchOption.periodMin !== undefined) {
            len += 1;
        }
        if (searchOption.areaMin && searchOption.areaMin !== undefined) {
            len += 1;
        }
        if (searchOption.distanceMin && searchOption.distanceMin !== undefined) {
            len += 1;
        }
        if (searchOption.beds) {
            len += 1;
        }
        if (searchOption.baths) {
            len += 1;
        }
        if (searchOption.studys) {
            len += 1;
        }
        if (searchOption.regionFirstCode) {
            len += 1;
        }
        if (searchOption.regionSecondCode) {
            len += 1;
        }
        if (searchOption.abroadFlag !== undefined && searchOption.abroadFlag !== null && searchOption.abroadFlag !== -1) {
            len += 1;
        }
        if (searchOption.projectTypes && searchOption.projectTypes.length) {
            len += 1;
        }
        return len;
    };

    render() {
        const {params} = this.props;
        const {messages} = this.props.intl;
        const propertyMinMaxName = [messages.smallScale, messages.middleScale, messages.largeScale];
        const {searchOption, projectList} = this.state;
        const projectTypes = searchOption.projectTypes ? searchOption.projectTypes.map((obj) => (
                <li onClick={this.clearSearchOption.bind(this, {
                    key: 'projectTypes',
                    value: obj
                })}>{messages['projectType' + obj]} ×</li>
            )) : '';

        const len = this.getFormOptionLength(searchOption);

        return (<table className="agency_p_cont_tip" cellPadding="0" cellSpacing="0" width="100%">
            <tr>
                <td>
                    <span
                        className="agency_p_span">{messages.currentResult}：<strong>{projectList ? projectList.total : 0}</strong> {messages.count + messages.project}</span>
                    <ol className="agency_p_ol">
                        {
                            searchOption.title ?
                                <li onClick={this.clearSearchOption.bind(this, 'title')}>{searchOption.title} ×</li> : ''
                        }
                        {
                            searchOption.propertyMin ?
                                <li onClick={this.clearSearchOption.bind(this, 'propertyMinMax')}>{searchOption.propertyMin == 1 ? propertyMinMaxName[0] : (searchOption.propertyMin == 51 ? propertyMinMaxName[1] : propertyMinMaxName[2])} ×</li> : ''
                        }
                        {
                            searchOption.abroadFlag !== undefined && searchOption.abroadFlag !== null && searchOption.abroadFlag !== -1 ?
                                <li onClick={this.clearSearchOption.bind(this, 'abroadFlag')}>{searchOption.abroadFlag === 1 ? messages.purchase : messages.purchaseFalse} ×</li> : ''
                        }
                        {
                            projectTypes
                        }
                        {
                            searchOption.beds ?
                                <li onClick={this.clearSearchOption.bind(this, 'beds')}>{messages.beds + searchOption.beds} ×</li> : ''
                        }
                        {
                            searchOption.baths ?
                                <li onClick={this.clearSearchOption.bind(this, 'baths')}>{messages.baths + searchOption.baths} ×</li> : ''
                        }
                        {
                            searchOption.studys ?
                                <li onClick={this.clearSearchOption.bind(this, 'studys')}>{messages.studys + searchOption.studys} ×</li> : ''
                        }
                        {
                            searchOption.propertyPriceMin !== undefined ?
                                <li onClick={this.clearSearchOption.bind(this, 'propertyPriceMinMax')}>{messages.propertyPrice + ' ' + searchOption.propertyPriceMin + '~' + searchOption.propertyPriceMax} ×</li> : ''
                        }
                        {
                            searchOption.commissionMin !== undefined ?
                                <li onClick={this.clearSearchOption.bind(this, 'commissionMinMax')}>{messages.commission + ' ' + searchOption.commissionMin + (searchOption.commissionType === 1 ? '' : '%') + '~' + searchOption.commissionMax + (searchOption.commissionType === 1 ? '' : '%')} ×</li> : ''
                        }
                        {
                            searchOption.unitPriceMin !== undefined ?
                                <li onClick={this.clearSearchOption.bind(this, 'unitPriceMinMax')}>{messages.price + '/' + messages.squareMetre + ' ' + searchOption.unitPriceMin + '~' + searchOption.unitPriceMax} ×</li> : ''
                        }
                        {
                            searchOption.periodMin !== undefined ?
                                <li onClick={this.clearSearchOption.bind(this, 'periodMinMax')}>{messages.period + ' ' + searchOption.periodMin + '~' + searchOption.periodMax} ×</li> : ''
                        }
                        {
                            searchOption.areaMin !== undefined ?
                                <li onClick={this.clearSearchOption.bind(this, 'areaMinMax')}>{messages.area + ' ' + searchOption.areaMin + '~' + searchOption.areaMax} ×</li> : ''
                        }
                        {
                            searchOption.distanceMin !== undefined ?
                                <li onClick={this.clearSearchOption.bind(this, 'distanceMinMax')}>{messages.targetDistance + ' ' + searchOption.distanceMin + '~' + searchOption.distanceMax} ×</li> : ''
                        }
                        {
                            searchOption.regionFirstCode !== undefined ?
                                <li onClick={this.clearSearchOption.bind(this, 'regionFirstCode')}>{messages.regionFirst} ×</li> : ''
                        }
                        {
                            searchOption.regionSecondCode !== undefined ?
                                <li onClick={this.clearSearchOption.bind(this, 'regionSecondCode')}>{messages.regionSecond} ×</li> : ''
                        }
                        {

                            len > 5 ? <li className="agency_p_ol_more">...</li> : ''
                        }
                        {
                            len ? <li onClick={this.clearSearchOption.bind(this, 'CLEAR_ALL')}>{messages.clearAll} ×</li> : ''
                        }
                    </ol>
                </td>
                <td width="500">
                    {
                        Number(params.type) === 1 ? <RadioType name="viewType"/> : ''
                    }
                    <SelectOrder name="orderByDirection" onChange={this.onChange.bind(this)}/>
                </td>
            </tr>
        </table>);
    }
}

export default connect((store) => (store))(injectIntl(NavBread));
