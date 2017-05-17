/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {formatMoney} from 'LIB/tool';
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import InlineSlider from 'COMPONENT/common/inlineSlider/slider';

class ViewProperty extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            detail: '',
            hide: true
        };
    }

    getPropertyDetail = (obj) => {
        const {params} = this.props;
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.PROPERTYDETAIL + params.projectId + '/' + obj.propertyId, key: 'PROPERTYDETAIL'},
                method: 'get'
            });
            if (!response.errType) {
                const data = response.data.data.floorPlans, len = data.length;
                let resourceList2 = [], // 户型图-图片
                    resourceList8 = []; // 户型图-pdf
                for (let i = 0; i < len; i++){
                    if (data[i].resourceType - 0 === 2){
                        resourceList2.push(data[i]);
                    } else if (data[i].resourceType - 0 === 8){
                        resourceList8.push(data[i]);
                    }
                }
                this.setState({
                    detail: response.data.data,
                    resourceList2: resourceList2,
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
    };
    closeHandler = () => (
        this.setState({
            hide: true
        })
    );
    render = () => {
        const {messages, countryName} = this.props;
        const {detail} = this.state;
        const staticMessages = {
            aspectName: [messages.EAST, messages.WEST, messages.SOUTH, messages.NORTH, messages.SOUTHEAST, messages.NORTHEAST, messages.SOUTHWEST, messages.NORTHWEST, messages.EAST_WEST, messages.NORTH_SOUTH, messages.central],
            // 房屋景观
            houseViewName: [messages.cityView, messages.seaView, messages.mountainView, messages.parkView, messages.waterView],
            // propertyStatusName
            propertyStatusName: [messages.available, messages.reserved, messages.sold],
            // yesNo
            yesNo: [messages.yes, messages.no],
            // 不动产状态
            propertyStatusWord: [messages.available, messages.reserved, messages.sold],
            // 面积单位
            areaUnit: {
                AU: '(㎡)',
                UK: '(Ft²)',
                US: '(Ft²)'
            },
            propertyStatusClass: ['ipxblue_txt', 'ipxyellow_txt', 'ipxred_txt']
        };
        return <div className={"Property_details_slide" + (this.state.hide ? ' hide' : '')}>
            <div className="Property_details_head">
                <a href="javascript:;" className="proj_preview_close float_lf" onClick={this.closeHandler}><i className="iconfont icon-close"/></a>
                <h1 className="float_lf">#{detail.lot}</h1>
                <b className={"float_lf " + (staticMessages.propertyStatusClass[detail.propertyStatus - 0 - 1])}>{staticMessages.propertyStatusWord[detail.propertyStatus - 0 - 1]}</b>
            </div>
            <div className="Property_details_body">
                <ul className="Property_details_iconbox">
                    <li><b>{detail.bed || 0}</b><i className="iconfont icon-bedroom"/><em>{messages.beds}</em></li>
                    <li><b>{detail.carSpace || 0}</b><i className="iconfont icon-Garage"/><em>{messages.carSpace}</em></li>
                    <li><b>{detail.bath || 0}</b><i className="iconfont icon-washroom"/><em>{messages.baths}</em></li>
                    <li><b>{detail.study || 0}</b><i className="iconfont icon-bookroom"/><em>{messages.studys}</em></li>
                    <li><b>{detail.storageNo || 0}</b><i className="iconfont icon-storehouse"/><em>{messages.storageNumber}</em></li>

                </ul>
                <div className="Property_details_info">
                    <table className="Property_info_lf" cellPadding="0" cellSpacing="0">
                        <tr>
                            <th colSpan="2" style={{textAlign: 'left'}}>{messages.baseInfo}</th>
                        </tr>
                        <tr>
                            <td>{messages.internalArea}</td>
                            <td>{detail.internalArea} {detail.areaUnit}</td>
                        </tr>
                        {/*联排别墅，独栋别墅： 建筑面积和室内面积*/}
                        {
                            Number(this.props.query.projectType) === 2 || Number(this.props.query.projectType) === 3 ? <tr>
                                    <td>{messages.constructionArea}|{messages.internalArea}</td>
                                    <td>{detail.constructionArea}|{detail.internalArea} {detail.areaUnit}</td>
                                </tr> : null
                        }
                        {/*公寓才有总面积： 室内面积+室外面积*/}
                        {
                            Number(this.props.query.projectType) === 1 ? <tr>
                                <td>{messages.totalArea}</td>
                                <td>{detail.internalArea + detail.balconyArea} {detail.areaUnit}</td>
                            </tr> : null
                        }
                        {/*土地： 土地面积*/}
                        {
                            Number(this.props.query.projectType) === 4 ? <tr>
                                    <td>{messages.landArea}</td>
                                    <td>{detail.landArea} {detail.areaUnit}</td>
                                </tr> : null
                        }
                        <tr>
                            <td>{messages.floorLevel}</td>
                            <td>{detail.floorLevel}</td>
                        </tr>
                        <tr>
                            <td>{messages.houseView}</td>
                            <td>{staticMessages.houseViewName[detail.houseView - 0 - 1]}</td>
                        </tr>
                        <tr>
                            <td>{messages.isAbroad}</td>
                            <td className="ipxblue_txt"><strong>{detail.isAbroad === true ? messages.isAbroadYes : messages.isAbroadNo}</strong></td>
                        </tr>
                        <tr>
                            <td>{messages.aspect}</td>
                            <td>{staticMessages.aspectName[detail.aspect - 0 - 1]}</td>
                        </tr>
                        <tr>
                            <td>{messages.totalPrice}</td>
                            <td className="ipxblue_txt"><strong>{detail.currencyName} {formatMoney(detail.price)}</strong></td>
                        </tr>
                    </table>
                    <table className="Property_info_rt" cellPadding="0" cellSpacing="0">
                        <tr>
                            <th colSpan="2" align="left">{messages.otherCharges}</th>
                        </tr>
                        <tr>
                            <td>{messages.estimatedStampDuty}</td>
                            <td>{detail.estimatedStampDuty ? (detail.estimatedStampDuty + ' %') : null}</td>
                        </tr>
                        <tr>
                            <td>{messages.estimatedCancelRates}</td>
                            <td>{detail.estimatedCancelRates ? (detail.estimatedCancelRates + ' %') : null}</td>
                        </tr>
                        <tr>
                            <td>{messages.waterRates}</td>
                            <td>{detail.waterRates ? (detail.currencyName + '' + detail.waterRates) : null}</td>
                        </tr>
                        <tr>
                            <td>{messages.stampDutySaving}</td>
                            <td>{detail.stampDutySaving ? (detail.currencyName + '' + formatMoney(detail.stampDutySaving)) : null}</td>
                        </tr>
                        <tr>
                            <td>{messages.dutiableValue}</td>
                            <td>{detail.dutiableValue ? (detail.currencyName + '' + formatMoney(detail.dutiableValue)) : null}</td>
                        </tr>
                        <tr>
                            <td>{messages.landTax}</td>
                            <td>{detail.landTax ? (detail.currencyName + '' + formatMoney(detail.landTax)) : null}</td>
                        </tr>
                        <tr>
                            <td>{messages.rentRange}</td>
                            <td>{detail.rentalGuarrante ? (detail.rentalGuarrante + '%') : null}</td>
                        </tr>

                    </table>
                </div>
                <div className="Property_layoutImgbox">
                    <h4>{messages.apartmentRenderings}</h4>
                    {
                        this.state.resourceList2 ? <InlineSlider speed={1.5} delay={3} pause={true} autoplay={false} tips={false} dots={false} arrows={true} items={this.state.resourceList2}/> : null
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
                                    <td className="proj_last_td"><a href={obj.resourceUrl} target="_blank">{messages.download}</a></td>
                                </tr>
                            )) : null
                    }
                </table>
            </div>
        </div>;
    };
}

export default ViewProperty;
