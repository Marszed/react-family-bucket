/**
 * Created by marszed on 2017/1/24.
 */
import React, {PropTypes} from 'react';
import {formatMoney, langPackageInject, objCopy} from 'LIB/tool';
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import SmallInlineSlider from 'COMPONENT/common/smallInlineSlider/slider';

class ViewProperty extends React.Component {
    constructor(props){
        super(props);
        const {propertyMap, query, messages} = this.props;
        const country = propertyMap.countryCode[query.countryCode];
        const data = propertyMap[country][query.projectType];
        const zhFlag = langPackageInject().indexOf('zh') === -1; //  true 英文 false 中文
        this.state = {
            query: query,
            messages: messages,
            country: country,
            currencyName: propertyMap.monUnit[zhFlag ? 'en' : 'zh'][country],
            projectType: query.projectType,
            data: data,
            propertyMap: propertyMap,
            areaUnit: propertyMap.areaUnit,
            lengthUnit: propertyMap.lengthUnit,
            propertyStatusClass: ['ipxblue_txt', 'ipxyellow_txt', 'ipxred_txt'],
            detail: '',
            iconSecond: {
                width: 'icon-width',
                length: 'icon-height',
                landArea: 'icon-area',
                bed: 'icon-bedroom',
                bath: 'icon-washroom',
                study: 'icon-bookroom',
                carSpace: 'icon-Garage',
            },
            hide: true
        };
    }

    getPropertyDetail = (obj) => {
        const {query} = this.props;
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.PROPERTYDETAIL + query.projectId + '/' + obj.propertyId, key: 'PROPERTYDETAIL'},
                method: 'get'
            });
            if (!response.errType) {
                const data = response.data.data.floorPlans, len = data.length;
                this.setState({
                    detail: response.data.data,
                    resourceList2: data
                });
                if(this.refs.SmallInlineSlider){
                    this.refs.SmallInlineSlider.setState({
                        items: data
                    });
                }
            }
        }.bind(this)();
    };

    getDocumentList = () => {
        const {query} = this.props;
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.DOCUMENT + query.projectId, key: 'DOCUMENT'},
                method: 'get'
            });
            if (!response.errType) {
                const data = response.data.data, len = data.length;
                let resourceList8 = []; // 户型图-pdf同
                for (let i = 0; i < len; i++){
                    if (data[i].resourceType - 0 === 8){
                        resourceList8.push(data[i]);
                    }
                }
                this.setState({
                    resourceList8: resourceList8
                });
            }
        }.bind(this)();
    };


    getPropsData = (obj) => {
        this.setState({
            hide: false
        });
        this.getPropertyDetail(obj);
        this.getDocumentList();
    };
    closeHandler = () => (
        this.setState({
            hide: true
        })
    );
    render = () => {
        const {detail, propertyMap, messages, data, areaUnit, lengthUnit, currencyName, country, query, iconSecond} = this.state;
        return <div className={"Property_details_slide" + (this.state.hide ? ' hide' : '')}>
            <div className="Property_details_head">
                <a href="javascript:;" className="proj_preview_close float_lf" onClick={this.closeHandler}><i className="iconfont icon-close"/></a>
                <h1 className="float_lf">#{detail.lot}</h1>
                <b className={"float_lf " + (this.state.propertyStatusClass[detail.propertyStatus - 0 - 1])}>{propertyMap.propertyStatusWord[detail.propertyStatus - 0 - 1]}</b>
            </div>
            <div className="Property_details_body">
                <ul className="Property_details_iconbox">
                    {
                        data.secondary.map((obj) => (
                            <li><b>{detail[obj.key] || 0}</b><i className={"iconfont " + iconSecond[obj.key]}/><em>{messages[obj.key]}</em></li>
                        ))
                    }
                </ul>
                <div className="Property_details_info">
                    <div className="float_lf">
                    {
                        data.basicInfo ? <table className="Property_info_table" cellPadding="0" cellSpacing="0">
                                <tr>
                                    <th colSpan="2" style={{textAlign: 'left'}}>{messages.basicInfo}</th>
                                </tr>
                                {
                                    data.basicInfo.map((obj) => {
                                        if (obj.key === 'aspect'){
                                            return <tr>
                                                <td>{messages[obj.key]}</td>
                                                <td>{propertyMap.aspectName[detail[obj.key] - 0 - 1]}</td>
                                            </tr>
                                        } else if (obj.key === 'houseView'){
                                            return <tr>
                                                <td>{messages[obj.key]}</td>
                                                <td>{propertyMap.houseViewName[detail[obj.key] - 0 - 1]}</td>
                                            </tr>
                                        } else if (obj.key === 'isDisplay'){
                                            return <tr>
                                                <td>{messages[obj.key]}</td>
                                                <td>{propertyMap.yesNo[detail[obj.key] ? 0 : 1]}</td>
                                            </tr>
                                        } else if (obj.key === 'isAbroad'){
                                            return <tr>
                                                <td>{messages[obj.key]}</td>
                                                <td>{propertyMap.isAbroadName[detail[obj.key] ? 0 : 1]}</td>
                                            </tr>
                                        } else if (obj.key === 'floorLevel'){
                                            let floorLevelContent = detail[obj.key];
                                            propertyMap.floorLevel.map((option) => {
                                                if (option.id == detail[obj.key]){
                                                    floorLevelContent = option.data;
                                                    return false;
                                                }
                                            });
                                            return <tr>
                                                <td>{messages[obj.key]}</td>
                                                <td>{floorLevelContent}</td>
                                            </tr>
                                        } else {
                                            return <tr>
                                                <td>{messages[obj.key]}</td>
                                                {
                                                    (obj.unit === 'mon' || obj.unit === 'percent') && !detail[obj.key] ? <td/> :
                                                        <td>{obj.unit === 'mon' ? formatMoney(detail[obj.key] || 0) : detail[obj.key]} {obj.unit ? (obj.unit === 'area' ? areaUnit[country] : (obj.unit === 'percent' ? '%' : (obj.unit === 'len' ? lengthUnit[country] : currencyName))) : null}</td>
                                                }
                                            </tr>
                                        }
                                    })
                                }
                            </table> : null
                    }
                    {
                        Number(query.projectType) !== 1 && data.landInfo ?
                                <table className="Property_info_table" cellPadding="0" cellSpacing="0">
                                    <tr>
                                        <th colSpan="2" style={{textAlign: 'left'}}>{messages.landInfo}</th>
                                    </tr>
                                    {
                                        data.landInfo.map((obj) => {
                                            if (obj.key === 'aspect'){
                                                return <tr>
                                                    <td>{messages[obj.key]}</td>
                                                    <td>{propertyMap.aspectName[detail[obj.key] - 0 - 1]}</td>
                                                </tr>
                                            } else if (obj.key === 'houseView'){
                                                return <tr>
                                                    <td>{messages[obj.key]}</td>
                                                    <td>{propertyMap.houseViewName[detail[obj.key] - 0 - 1]}</td>
                                                </tr>
                                            } else if (obj.key === 'isDisplay'){
                                                return <tr>
                                                    <td>{messages[obj.key]}</td>
                                                    <td>{propertyMap.yesNo[detail[obj.key] ? 0 : 1]}</td>
                                                </tr>
                                            } else if (obj.key === 'isAbroad'){
                                                return <tr>
                                                    <td>{messages[obj.key]}</td>
                                                    <td>{propertyMap.isAbroadName[detail[obj.key] ? 0 : 1]}</td>
                                                </tr>
                                            } else {
                                                return <tr>
                                                    <td>{messages[obj.key]}</td>
                                                    {
                                                        (obj.unit === 'mon' || obj.unit === 'percent') && !detail[obj.key] ? <td/> :
                                                            <td>{obj.unit === 'mon' ? formatMoney(detail[obj.key] || "") : (detail[obj.key] || "")} {obj.unit ? (obj.unit === 'area' ? (detail[obj.key] ? areaUnit[country] : "") : (obj.unit === 'percent' ? (detail[obj.key] ? "%" : "") : (obj.unit === 'len' ? (detail[obj.key] ? lengthUnit[country] : "") : currencyName))) : null}</td>
                                                    }
                                                </tr>
                                            }
                                        })
                                    }
                                </table> : null
                    }
                </div>
                    {
                        data.supplement ?
                            <div className="float_lf"><table className="Property_info_table" cellPadding="0" cellSpacing="0">
                                <tr>
                                    <th colSpan="2" style={{textAlign: 'left'}}>{messages.supplement}</th>
                                </tr>
                                {
                                    data.supplement.map((obj) => {
                                        if (obj.key === 'aspect'){
                                            return <tr>
                                                <td>{messages[obj.key]}</td>
                                                <td>{propertyMap.aspectName[detail[obj.key] - 0 - 1]}</td>
                                            </tr>
                                        } else if (obj.key === 'houseView'){
                                            return <tr>
                                                <td>{messages[obj.key]}</td>
                                                <td>{propertyMap.houseViewName[detail[obj.key] - 0 - 1]}</td>
                                            </tr>
                                        } else if (obj.key === 'isDisplay'){
                                            return <tr>
                                                <td>{messages[obj.key]}</td>
                                                <td>{propertyMap.yesNo[detail[obj.key] ? 0 : 1]}</td>
                                            </tr>
                                        } else if (obj.key === 'isAbroad'){
                                            return <tr>
                                                <td>{messages[obj.key]}</td>
                                                <td>{propertyMap.isAbroadName[detail[obj.key] ? 0 : 1]}</td>
                                            </tr>
                                        } else {
                                            return <tr>
                                                <td>{messages[obj.key]}</td>
                                                {
                                                    (obj.unit === 'mon' || obj.unit === 'percent') && !detail[obj.key] ? <td/> :
                                                        <td>{obj.unit === 'mon' ? formatMoney(detail[obj.key] || 0) : detail[obj.key]} {obj.unit ? (obj.unit === 'area' ? areaUnit[country] : (obj.unit === 'percent' ? '%' : (obj.unit === 'len' ? lengthUnit[country] : currencyName))) : null}</td>
                                                }
                                            </tr>
                                        }
                                    })
                                }
                            </table>
                            </div> : null
                    }
                </div>
                <div className="Property_layoutImgbox">
                    <h4>{messages.apartmentRenderings}</h4>
                    {
                        this.state.resourceList2 ? <SmallInlineSlider ref="SmallInlineSlider" speed={1.5} delay={3} pause={true} autoplay={false} tips={false} dots={false} arrows={true} items={this.state.resourceList2}/> : null
                    }
                </div>
                {/*户型图-pdf*/}
                <table className="proj_file_list" cellPadding="0" cellSpacing="0">
                    <tr className="proj_file_list_head">
                        <th className="proj_file_head_plus"><i className="iconfont icon-layout font_24px"/></th>
                        <th className="proj_file_head_tit"><b className="v_align_mid">{messages.apartmentRenderings}</b></th>
                        <th>{messages.fileType}</th>
                        <th>{messages.fileSize}</th>
                        <th>{messages.operation}</th>
                    </tr>
                    {
                        this.state.resourceList8 ? this.state.resourceList8.map((obj) => (
                                <tr className="proj_file_list_tr" key={obj.resourceId}>
                                    <td className="proj_first_td"><i className={"iconfont icon-" + (obj.fileType ? obj.fileType.replace('.', '') : "file")}/></td>
                                    <td className="proj_tit_td">{obj.fileName}</td>
                                    <td>{obj.fileType || ""}</td>
                                    <td>{obj.fileSize}M</td>
                                    {
                                        query.authorizeNumber && Number(query.authorizeNumber) !== 0 ? <td className="proj_last_td"><a href={obj.resourceUrl} target="_blank">{messages.download}</a></td> : <td className="grey_txt666">{messages.downLoadToAuth}</td>
                                    }
                                </tr>
                            )) : null
                    }
                </table>
            </div>
        </div>;
    };
}

ViewProperty.contextTypes = {
    router: PropTypes.object.isRequired
};

export default ViewProperty;
