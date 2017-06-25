/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {arrayCopy, decode64} from 'LIB/tool';
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import env from 'CONFIG/env';

class ExportProperty extends React.Component {
    constructor(props){
        super(props);
        const data = this.getDefault();
        this.state = {
            searchOption: {},
            baseInfo: data.baseInfo,
            baseAll: data.baseAll,
            otherAll: data.otherAll,
            otherInfo: data.otherInfo,
            hide: true,
            country: ''
        };
    }
    getDefaultObj = (data) => {
        let req = {}, res ={};
        if (data.foremost){
            data.foremost.map((obj) => {
                req[obj.key] = obj;
            });
        }
        if (data.secondary){
            data.secondary.map((obj) => {
                req[obj.key] = obj;
            });
        }
        if (data.landInfo){
            data.landInfo.map((obj) => {
                req[obj.key] = obj;
            });
        }
        if (data.basicInfo){
            data.basicInfo.map((obj) => {
                req[obj.key] = obj;
            });
        }
        if (data.supplement){
            data.supplement.map((obj) => {
                req[obj.key] = obj;
            });
        }
        // 排序下
        if (data.order){
            data.order.map((obj) => {
                for(let key in req){
                    if(key == obj){
                        res[key] = req[key];
                        return false;
                    }
                }
            });
        }
        return res;
    };
    getDefault = (type) => {
        if (!type){
            return {};
        }
        const {query} = this.props;
        const data = this.getDefaultObj(this.props.propertyMap[type || this.state.country][query.projectType]);
        let baseInfo = [], otherInfo = [];
        for (let key in data) {
            if (data.hasOwnProperty(key)){
                if (data[key].unit === 'mon' || data[key].unit === 'percent'){
                    otherInfo.push({
                        'key': key,
                        'value': true
                    });
                } else {
                    baseInfo.push({
                        'key': key,
                        'value': true
                    });
                }
            }
        }
        return {
            baseInfo: baseInfo,
            otherInfo: otherInfo
        };
    };
    exportHandler = () => {
        const {query} = this.props;
        let propertiesFields = [];
        this.state.baseInfo.map((obj) => {
            if (obj.value){
                propertiesFields.push(obj.key);
            }
        });
        this.state.otherInfo.map((obj) => {
            if (obj.value){
                propertiesFields.push(obj.key);
            }
        });
        if (!propertiesFields.length){
            this.props.exportTipHandler();
            return false;
        }
        // window.open(env.config.origin + INTERFACE.EXPORT + '/xls' + '?projectId=' + query.projectId + '&projectName=' + encodeURI(decode64(query.title)) + '&propertiesFields=' + propertiesFieldsParams);

        let token = window.localStorage.getItem("token");
        let responseHandler = function (){
            let xmlRequest = new XMLHttpRequest();
            xmlRequest.open("post", env.config.origin + INTERFACE.EXPORT + '/xls', true);
            xmlRequest.responseType = "blob";
            xmlRequest.setRequestHeader("Content-Type", "application/json");
            xmlRequest.setRequestHeader("Authorization",  'bearer ' + token);
            xmlRequest.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let response = this.response;
                    let url = window.URL.createObjectURL(response);
                    let tempLink = document.createElement('a');
                    tempLink.href = url;
                    tempLink.setAttribute('download', decode64(query.title) + '.xls');
                    tempLink.click();
                }
            };
            debugger;
            xmlRequest.send(JSON.stringify(
                {
                    "propertiesFields": propertiesFields,
                    "projectId" : query.projectId,
                    "projectName" : decode64(query.title),
                    "lot": this.state.searchOption.lot,
                    "priceMin": this.state.searchOption.priceMin,
                    "priceMax": this.state.searchOption.priceMax,
                    "beds": this.state.searchOption.bed,
                    "carSpace": this.state.searchOption.carSpace,
                    "studys": this.state.searchOption.study,
                    "baths": this.state.searchOption.bath,
                    "abroadFlag": this.state.searchOption.isAbroad === undefined ? '' : (this.state.searchOption.isAbroad === true ? 1 : 0)
                })
            );
        }.bind(this)();
    };
    closeHandler = (flag) => (
        this.setState({
            hide: flag
        })
    );
    setCountryHandler = (country, searchOption) => {
        this.setState({
            searchOption: searchOption
        });
        this.resetHandler(country);
    };
    // 单选
    checkHandler = (type, key, value) => {
        let array = arrayCopy(this.state[type]), temp = {}, countTrue = 0, countFalse = 0;
        array.map((obj) => {
            if (obj.key === key) {
                obj.value = value;
            } else {
                if (obj.value) {
                    countTrue += 1;
                }
                if (!obj.value) {
                    countFalse += 1;
                }
            }
        });
        if (value){
            countTrue += 1;
        } else {
            countFalse += 1;
        }
        if (countTrue === this.state[type].length){
            temp[type.replace('Info', 'All')] = true;
        }
        if (countFalse){
            temp[type.replace('Info', 'All')] = false;
        }
        temp[type] = array;
        this.setState(temp);
    };
    // 重置
    resetHandler = (type) => {
        let country = '';
        if (typeof type === 'string'){
            country = type;
        } else {
            country = this.state.country
        }
        const data = this.getDefault(country);
        this.setState({
            country: country,
            baseInfo: data.baseInfo,
            baseAll: data.baseAll,
            otherAll: data.otherAll,
            otherInfo: data.otherInfo
        });
    };
    render = () => {
        if (!this.state.baseInfo){
            return null;
        }
        const {messages} = this.props;
        let tempBaseInfo = [], tempOtherInfo = [];
        for (let i = 0, len = this.state.baseInfo.length; i < len; i += 2) {
            tempBaseInfo.push(this.state.baseInfo.slice(i, i + 2));
        }
        for (let i = 0, len = this.state.otherInfo.length; i < len; i += 2) {
            tempOtherInfo.push(this.state.otherInfo.slice(i, i + 2));
        }
        return <div className={"ipx_pop" + (this.state.hide ? ' hide' : '')}>
            <div className="ipx_pop_box property_export_pop">
                <div className="ipx_pop_head">
                    <h2 className="float_lf">{messages.exportPropertyList}</h2>
                    <a href="javascript:;" className="float_rt" title={messages.close} onClick={this.closeHandler.bind(this, true)}><i className="iconfont icon-close"/></a>
                </div>
                <div className="ipx_pop_body" style={{'padding':'10px 0 30px 50px'}}>
                    <div className="Property_details_info">
                        <table className="Property_info_lf" cellPadding="0" cellSpacing="0" style={{textAlign: 'left'}}>
                            <tr>
                                <th colSpan="2" style={{'textAlign': 'left',"paddingLeft":"0px"}}>{messages.baseInfo}</th>
                            </tr>
                            {
                                tempBaseInfo.map((option) => (
                                    <tr>
                                        {
                                            option.map((obj, index) => (
                                                <td style={{"paddingLeft":"0px"}} key={obj.key}><label className={"ipx_checkbox" + (obj.value ? ' checked' : '')} onClick={this.checkHandler.bind(this, 'baseInfo', obj.key, !obj.value)}><i className="iconfont icon-succeed"/> <span className="text-elps">{messages[obj.key]}</span> </label></td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </table>
                        <table className="Property_info_rt" cellPadding="0" cellSpacing="0" style={{textAlign: 'left'}}>
                            <tr>
                                <th colSpan="2" style={{'textAlign': 'left',"paddingLeft":"0px"}}>{messages.otherCharges}</th>
                            </tr>
                            {
                                tempOtherInfo.map((option) => (
                                    <tr>
                                        {
                                            option.map((obj, index) => (
                                                <td style={{"paddingLeft":"0px"}} key={obj.key}><label className={"ipx_checkbox" + (obj.value ? ' checked' : '')} onClick={this.checkHandler.bind(this, 'otherInfo', obj.key, !obj.value)}><i className="iconfont icon-succeed"/> <span className="text-elps">{messages[obj.key]}</span> </label></td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </div>
                <div className="ipx_pop_foot align_ct">
                    <button className="ipx_btn ipx_M_btn ipx_blue_btn width20per" onClick={this.exportHandler}>{messages.exportFile}</button>
                    <button className="ipx_btn ipx_M_btn ipx_grey_btn width20per" onClick={this.resetHandler}>{messages.reset}</button>
                </div>
            </div>
            <div className="ipx_pop_bg"></div>
        </div>;
    };
}

export default ExportProperty;
