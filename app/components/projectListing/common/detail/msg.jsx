/**
 * Created by marszed on 2017/1/24.
 */
import React, {PropTypes} from "react";
import {injectIntl} from "react-intl";
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import {formatMoney} from 'LIB/tool';
import NoData from 'COMPONENT/common/noData';
import InlineSlider from 'COMPONENT/common/inlineSlider/slider';

class Msg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => (
        this.getProjectDetail()
    );

    getProjectDetail = () => {
        const {params} = this.context.router;
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.PROJECTDETAIL + params.projectId, key: 'PROJECTDETAIL'},
                method: 'get'
            });
            if (!response.errType) {
                let res = response.data.data;
                this.setState(res);
            }
        }.bind(this)();
    };

    render = () => {
        const {messages} = this.props.intl;
        let noSoldWidth = 100 * (this.state.available / (this.state.reserved + this.state.available + this.state.sold)).toFixed(2);
        noSoldWidth = noSoldWidth < 12 ? 12 : noSoldWidth > 84 ? 84 : noSoldWidth;
        let soldWidth = 100 * ((this.state.available + this.state.reserved) / (this.state.reserved + this.state.available + this.state.sold)).toFixed(2);
        soldWidth = soldWidth < 24 ? 24 : soldWidth > 92 ? 92 : soldWidth;
        const projectType = [messages.projectType1, messages.projectType2, messages.projectType3, messages.projectType4];
        return !this.state.projectId ? <div className="ipx_proj_preview_cont"><div className="agency_preview_box"><NoData/></div></div> : <div className="ipx_proj_preview_cont"><div className="agency_preview_box">
                <InlineSlider speed={1.5} delay={3} pause={true} autoplay={false} dots={false} arrows={true} items={this.state.picList}/>
                <div className="agency_preview_info">
                    <div className="agency_prevw_infoLf">
                        <h4 className="agency_previw_h4">{messages.salesStatus}</h4>
                        <div className="sellsPerformance">
                            <ul>
                                <li className="ipxblue_txt" style={{left: 0 + '%'}}>{messages.noSoldNum} {this.state.available}</li>
                                <li className="ipxyellow_txt" style={{left: noSoldWidth + '%'}}>{messages.reservedNum} {this.state.reserved}</li>
                                <li className="ipxred_txt" style={{left: soldWidth + '%'}}>{messages.soldNum} {this.state.sold}</li>
                            </ul>
                            <div className="sellper_chart">
                                <span className="sell_available" style={{width: 100 * (this.state.available / (this.state.reserved + this.state.available + this.state.sold)).toFixed(2) + '%'}}/>
                                <span className="sell_booking" style={{width: 100 * (this.state.reserved / (this.state.reserved + this.state.available + this.state.sold)).toFixed(2) + '%'}}/>
                                <span className="sell_sold" style={{width: 100 * (this.state.sold / (this.state.reserved + this.state.available + this.state.sold)).toFixed(2) + '%'}}/>
                            </div>
                        </div>
                        <h4 className="agency_previw_h4">{messages.baseInfo}</h4>
                        <div className="agency_info_attr_box clearfix">
                            <ul className="preview_info float_lf">
                                <li><span className="preview_info_attr">{messages.propertyType}</span><span className="preview_info_value">{projectType[this.state.projectType]}</span></li>
                                <li><span className="preview_info_attr">{messages.priceRange}</span><span className="preview_info_value">{this.state.currencyName} {formatMoney(this.state.minPrice)} - {this.state.currencyName} {formatMoney(this.state.maxPrice)} </span></li>
                                <li><span className="preview_info_attr">{messages.country}</span><span className="preview_info_value">{this.state.countryName}</span></li>
                                <li><span className="preview_info_attr">{messages.region}</span><span className="preview_info_value">{this.state.regionFirstName} {this.state.regionSecondName ? '-' : ''} {this.state.regionSecondName} {this.state.regionThirdName ? '-' : ''} {this.state.regionThirdName}</span></li>
                                <li><span className="preview_info_attr">{messages.detailAddr}</span><span className="preview_info_value">{this.state.reservationDetail}</span></li>
                            </ul>
                            <ul className="preview_info float_rt">
                                <li><span className="preview_info_attr">{messages.zipCode}</span><span className="preview_info_value">{this.state.zipCode}</span></li>
                                <li><span className="preview_info_attr">{messages.saleTime}</span><span className="preview_info_value">{this.state.zipCode}</span></li>
                                <li><span className="preview_info_attr">{messages.targetDistance}</span><span className="preview_info_value">{this.state.targetDistance} km</span></li>
                            </ul>
                        </div>
                        <h4 className="agency_previw_h4">{messages.sellingPoints}</h4>
                        <ul className="sellpoint_view_ul">
                            {
                                this.state.sellingPointList.map((obj, index) => (<li key={index}>{obj}</li>))
                            }
                        </ul>
                    </div>
                    <div className="agency_prevw_infoRt">
                        <div className="preview_trade_area">
                            <div className="proj_preview_h4box">
                                <h4>{messages.abroadFlag}</h4>
                                <span className="ipxblue_txt">{this.state.isAbroad === true ? messages.purchase : (this.state.isAbroad === false ? messages.purchaseFalse : '-')}</span>
                            </div>
                            {
                                this.state.isAbroad === true?
                                    <div className="proj_preview_h4box">
                                        <h4>{messages.quantity}</h4>
                                        <div className="proj_preview_h4cont">
                                            {messages.abroadTip1}{this.state.abroadPercent ? (this.state.abroadPercent + '%') : this.state.abroadNumber}{messages.abroadTip2}
                                        </div>
                                    </div> : ""
                            }
                            <div className="proj_preview_h4box">
                                <h4>{messages.intentMoney}</h4>
                                <span className="ipxblue_txt">{this.state.currencyName} {this.state.reservationFee}</span>
                                <div className="proj_preview_h4cont">{this.state.reservationDetail}</div>
                            </div>
                            <div className="proj_preview_h4box">
                                <h4>{messages.termNumber}</h4>
                                <span className="ipxblue_txt">{this.state.termNumber}{messages.termNumberUnit} <i className="iconfont icon-wenhao" title={messages.termNumberTip}/></span>
                            </div>
                            <div className="proj_preview_h4box">
                                <h4>{messages.preferentialPolicy}</h4>
                                <p className="proj_preview_h4cont">{messages.periodValidity}：<strong>{!this.state.bonus || this.state.bonus === null ? '-' : (this.state.bonus.startTime.replace(/-/g, '/') + ' - ' +this.state.bonus.endTime.replace(/-/g, '/'))}</strong></p>
                                <div className="proj_preview_h4cont" dangerouslySetInnerHTML={{__html: !this.state.bonus || this.state.bonus === null ? null : this.state.bonus.content}}></div>
                            </div>
                            <div className="proj_preview_h4box">
                                <h4>{messages.transactionProgress}</h4>
                                <div className="proj_preview_h4cont">
                                    <table cellPadding="0" cellSpacing="0" width="100%">
                                        <tr>
                                            <th width="15%">{messages.step}</th>
                                            <th width="25%">{messages.transactionValue}</th>
                                            <th width="60%">{messages.transactionDescription}</th>
                                        </tr>
                                        {
                                            this.state.transactionList ? this.state.transactionList.map((option, _index) => (
                                                <tr key={option.transactionId}>
                                                    <td><strong>{_index + 1}</strong></td>
                                                    <td className={this.state.termNumber === 1 ? 'landprice' : (option.transactionType === 1 ? "landprice" : ('buildprice'))}>
                                                        <b>{option.transactionRate && option.transactionRate !== null ? option.transactionRate + '%' : option.transactionMoney}</b>
                                                        {
                                                            this.state.termNumber !== 2 ? '' : <br/>
                                                        }
                                                        {
                                                            this.state.termNumber !== 2 ? '' : (this.state.termNumber === 1 ? messages.landCost : (option.transactionType === 1 ? messages.landCost : (messages.buildHouseCost)))
                                                        }
                                                    </td>
                                                    <td>{option.transactionContent}</td>
                                                </tr>
                                            )) : ''
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="agency_preview_detail">
                    <h4 className="agency_previw_h4">{messages.region + messages.around}</h4>
                    <div className="agency_previw_mapBox"/>
                    <h4 className="agency_previw_h4">{messages.projectIntro}</h4>
                    <div className="agency_previw_description" dangerouslySetInnerHTML={{__html: this.state.description}}></div>
                </div>
            </div></div>;
    };
}

Msg.contextTypes = {
    router: PropTypes.object.isRequired
};

export default injectIntl(Msg);
