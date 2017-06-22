/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {isEqual, objCopy, langPackageInject} from 'LIB/tool';
import {setCountry} from 'REDUX/actions/project';
import pureRender from "pure-render-decorator";
import {setAutoComplete} from 'REDUX/actions/global';
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import { AutoComplete } from 'antd';

/**
 * data 数据类型
 * title 标题
 * defaultValue 默认选中值
 * placeholder 输入框提示
 * disabled 是否禁用
 * value 制定当前选中的条目
 */
@pureRender
class Radio extends React.Component {
    constructor(props) {
        super(props);
        const {messages} = this.props.intl;
        this.state = this.getDefaultProps(messages);
    }

    getDefaultProps = (messages, params) => (
        {
            params: params || this.props.data.params,
            title: this.props.data.title || messages.region,
            placeholder: this.props.data.placeholder || messages.pleaseChoose,
            dataSource1: [], // 一级行政区 value 集合
            dataSource2: [], // 二级行政区
            disabled1: true, // 一级行政区 禁用
            disabled2: true,
            dataSourceObj1: [], // 一级行政区 object 集合
            dataSourceObj2: [] // 二级行政区
        }
    );

    // 获取二级菜单国家列表
    getCountryCode = () => {
        const language = langPackageInject();
        return new Promise((resolve, reject) => {
            let responseHandler = async function () {
                const {messages} = this.props.intl;
                let response = await asyncAwaitCall({
                    url: {value: INTERFACE.COUNTRY, key: 'COUNTRY'},
                    method: 'get',
                    params: {
                        language: language
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
                    resolve(country);
                    // 缓存国家列表信息
                    this.props.dispatch(setCountry(country));
                } else {
                    reject('error');
                }
            }.bind(this)();
        });
    };

    componentWillMount(){
        this.getCountryCode().then((response) => {
            if (response !== 'error'){
                this.getRegionList('', 1, this.props.params.country, response);
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params && !isEqual(nextProps.params, this.state.params)) {
            const {messages} = this.props.intl;
            let temp = this.getDefaultProps(messages, nextProps.params);
            this.setState(temp);
            if (!this.props.project.country){
                this.getCountryCode().then((response) => {
                    if (response !== 'error'){
                        this.getRegionList('', 1, nextProps.params.country, response);
                    }
                });
            } else {
                this.getRegionList('', 1, nextProps.params.country);
            }
        }
        // formAutoComplete 变化并且 更新的key与组件的name一致
        if (nextProps.global.formAutoComplete && nextProps.global.formAutoComplete.key === 'regionFirstCode') {
            let temp = Object.assign(objCopy(this.state), {
                disabled2: true,
                value1: ''
            });
            this.setState(temp);
            // 移除组件更新指令
            this.props.dispatch(setAutoComplete(''));
            // 更新父组件缓存
            this.props.onChange('regionFirstCode', undefined);
        }
        // formAutoComplete 变化并且 更新的key与组件的name一致
        if (nextProps.global.formAutoComplete && nextProps.global.formAutoComplete.key === 'regionSecondCode') {
            let temp = Object.assign(objCopy(this.state), {
                value2: ''
            });
            this.setState(temp);
            // 移除组件更新指令
            this.props.dispatch(setAutoComplete(''));
            // 更新父组件缓存
            this.props.onChange('regionSecondCode', undefined);
        }
    }

    // 获取区域信息中的子级区域列表
    getRegionList(regionId, type, country, countryList){
        if (!this.state.params){
            return false;
        }
        if (!regionId){
            let tempCountry = country ? country : this.state.params.country;
            (this.props.project.country || countryList).map((obj) => {
                if (tempCountry === obj.dicCode){
                    regionId = obj.regionId;
                    return false;
                }
            });
        }
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.REGION + regionId, key: 'REGION'},
                method: 'get',
                loading: false
            });
            let dataSource = [];
            if (!response.errType) {
                response.data.data.map((obj) => (
                    dataSource.push(obj.dicValue)
                ));
                if (type === 1){
                    this.setState({
                        dataSource1: dataSource,
                        dataSourceObj1: response.data.data,
                        disabled1: false
                    });
                } else {
                    this.setState({
                        dataSource2: dataSource,
                        dataSourceObj2: response.data.data,
                        disabled2: false
                    });
                }
            }
        }.bind(this)();
    }

    // 自动完成变化
    onChange = (value) => {
        console.log(value);
    };

    // 自动完成选中
    onSelect = (type, value) => {
        if (type === 1){
            if (value === '') {
                this.props.onChange('regionFirstCode', '');
                this.setState({
                    value1: '',
                    value2: '',
                    disabled2:true
                });
                return false;
            }
            this.state.dataSourceObj1.map((obj) => {
                if (value === obj.dicValue){
                    this.setState({
                        value1: value
                    });
                    this.props.onChange('regionFirstCode', obj.dicCode,'regionFirst',value);
                    this.getRegionList(obj.regionId, 2);
                    return false;
                }
            });
            return false;
        }
        if (type === 2){
            this.state.dataSourceObj1.map((obj) => {
                if (this.state.value1 && this.state.value1 === obj.dicValue){
                    this.props.onChange('regionFirstCode', obj.dicCode,'regionFirst',obj.dicValue);
                    return false;
                }
            });
            if (value === '') {
                this.props.onChange('regionSecondCode', '');
                this.setState({
                    value2: ''
                });
                return false;
            }
            this.state.dataSourceObj2.map((obj) => {
                if (value === obj.dicValue){
                    this.setState({
                        value2: value
                    });
                    this.props.onChange('regionSecondCode', obj.dicCode,'regionSecond',value);
                    return false;
                }
            });
        }
    };

    render() {
        return (
            <div className="proj_screen_cont_td ipx_ant_area">
                <h3>{this.state.title}</h3>
                <div id="IPXArea1" style={{
                    marginBottom: 10 + 'px',
                    width: 200,
                    position: 'relative',
                    height: 40
                }}>
                    <AutoComplete
                        dataSource={this.state.dataSource1}
                        className="ipx_select"
                        style={{
                            width: 200
                        }}
                        value={this.state.value1}
                        disabled={this.state.disabled1}
                        onChange={this.onSelect.bind(this, 1)}
                        getPopupContainer={() => document.getElementById('IPXArea1')}
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        placeholder={this.state.placeholder}
                    />
                </div>
                <div id="IPXArea2" style={{
                    width: 200,
                    position: 'relative',
                    height: 40
                }}>
                    <AutoComplete
                        dataSource={this.state.dataSource2}
                        className="ipx_select"
                        style={{
                            width: 200
                        }}
                        value={this.state.value2}
                        disabled={this.state.disabled2}
                        onChange={this.onSelect.bind(this, 2)}
                        getPopupContainer={() => document.getElementById('IPXArea2')}
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        placeholder={this.state.placeholder}
                    />
                </div>
            </div>
        );
    }
}

export default connect((store) => (store))(injectIntl(Radio));