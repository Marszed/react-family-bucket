/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {arrayCopy, decode64} from 'LIB/tool';
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';

class ExportProperty extends React.Component {
    constructor(props){
        super(props);
        const data = this.getDefault();
        this.state = {
            baseInfo: data.baseInfo,
            baseAll: data.baseAll,
            otherAll: data.otherAll,
            otherInfo: data.otherInfo,
            hide: true
        };
    }
    getDefault = () => {
        const countryNameShot = 'AU';
        const {query} = this.props;
        const data = this.props.propertyMap[countryNameShot][query.projectType];
        let baseInfo = [], otherInfo = [];
        for (let key in data) {
            if (data.hasOwnProperty(key)){
                if (data[key].unit === '$' || data[key].unit === '%'){
                    otherInfo.push({
                        'key': key,
                        'value': false
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
            otherInfo: otherInfo,
            baseAll: true,
            otherAll: false
        };
    };

    exportHandler = () => {
        const {params, query} = this.props;
        let fieldNames = [];
        this.state.baseInfo.map((obj) => {
            if (obj.value){
                fieldNames.push(obj.key);
            }
        });
        this.state.otherInfo.map((obj) => {
            if (obj.value){
                fieldNames.push(obj.key);
            }
        });
        console.log(fieldNames);
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.EXPORT, key: 'EXPORT'},
                method: 'post',
                data: {
                    projectId: params.projectId,
                    projectName: decode64(query.title),
                    fieldNames: fieldNames
                }
            });
            if (!response.errType) {
                //TODO 新开窗口下载文件
            }
        }.bind(this)();
    };
    closeHandler = (flag) => (
        this.setState({
            hide: flag
        })
    );
    // 全选
    checkAllHandler = (type, flag) => {
        let temp = {};
        temp[type.replace('Info', 'All')] = flag;
        let array = arrayCopy(this.state[type]);
        array.map((obj) => (
            obj.value = flag
        ));
        temp[type] = array;
        this.setState(temp);
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
    resetHandler = () => {
        const data = this.getDefault();
        this.setState({
            baseInfo: data.baseInfo,
            baseAll: data.baseAll,
            otherAll: data.otherAll,
            otherInfo: data.otherInfo
        });
    };
    render = () => {
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
                <div className="ipx_pop_body">
                    <div className="Property_details_info">
                        <table className="Property_info_lf" cellPadding="0" cellSpacing="0">
                            <tr>
                                <th colSpan="2" style={{'textAlign': 'left'}}>{messages.baseInfo}</th>
                            </tr>
                            <tr>
                                <td><label className={"ipx_checkbox" + (this.state.baseAll ? ' checked' : '')} onClick={this.checkAllHandler.bind(this, 'baseInfo', !this.state.baseAll)}><i className="iconfont icon-succeed"/> <span className="text-elps">{messages.checkAll}</span> </label></td>
                                <td>&nbsp;</td>
                            </tr>
                            {
                                tempBaseInfo.map((option) => (
                                    <tr>
                                        {
                                            option.map((obj, index) => (
                                                <td key={obj.key}><label className={"ipx_checkbox" + (obj.value ? ' checked' : '')} onClick={this.checkHandler.bind(this, 'baseInfo', obj.key, !obj.value)}><i className="iconfont icon-succeed"/> <span className="text-elps">{messages[obj.key]}</span> </label></td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </table>
                        <table className="Property_info_rt" cellPadding="0" cellSpacing="0">
                            <tr>
                                <th colSpan="2" style={{'textAlign': 'left'}}>{messages.otherCharges}</th>
                            </tr>
                            <tr>
                                <td><label className={"ipx_checkbox" + (this.state.otherAll ? ' checked' : '')} onClick={this.checkAllHandler.bind(this, 'otherInfo', !this.state.otherAll)}><i className="iconfont icon-succeed"/> <span className="text-elps">{messages.checkAll}</span> </label></td>
                                <td>&nbsp;</td>
                            </tr>
                            {
                                tempOtherInfo.map((option) => (
                                    <tr>
                                        {
                                            option.map((obj, index) => (
                                                <td key={obj.key}><label className={"ipx_checkbox" + (obj.value ? ' checked' : '')} onClick={this.checkHandler.bind(this, 'otherInfo', obj.key, !obj.value)}><i className="iconfont icon-succeed"/> <span className="text-elps">{messages[obj.key]}</span> </label></td>
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
