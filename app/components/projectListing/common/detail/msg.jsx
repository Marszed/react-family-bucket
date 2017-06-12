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

let markers = [];

class Msg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchType: "",searchArray:[]};
    }

    componentDidMount = () => (
        this.getProjectDetail()
    );


    googleMap(longitude, latitude, title) {
        const myLatlng = new google.maps.LatLng(latitude || -0.120850, longitude || 51.508742);

        const mapProp = {
            center: myLatlng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        let map = new google.maps.Map(document.getElementById("container"), mapProp);

        let marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            draggable: false,
            title: title
        });
    };

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
                this.googleMap(response.data.data.longitude,
                    response.data.data.latitude,
                    response.data.data.title);
            }
        }.bind(this)();
    };

    searchAround= (type) => {
        this.clearMarker();//先移除旧标记
        this.setState({searchType:type});
        let pyrmont = new google.maps.LatLng(this.state.latitude, this.state.longitude);
        let request = {
            location: pyrmont,
            radius: 1000,
            types: [type]
        };
        const mapProp = {
            center: pyrmont,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        let map = new google.maps.Map(document.getElementById("container"), mapProp);
        let service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                let searchArr = [];
                for (let i = 0; i < results.length; i++) {
                    let place = results[i];
                    this.addMarker(map,place.geometry.location,place.name);//追加新地点标记
                    let searchInfo = {};
                    searchInfo.name = place.name;
                    searchInfo.rating = Math.floor(place.rating == undefined? 0 : place.rating);
                    searchInfo.distance = this.getDistance(pyrmont,place.geometry.location);
                    searchArr.push(searchInfo);
                }
                this.setState({searchArray:searchArr});
            }
        });
    };

    getDistance = (start,end) => {
        let lat1 = (Math.PI/180)*start.lat();
        let lat2 = (Math.PI/180)*end.lat();
        let lon1 = (Math.PI/180)*start.lng();
        let lon2 = (Math.PI/180)*end.lng();
        //地球半径
        let R = 6371;
        //两点间距离 km，如果想要米的话，结果*1000就可以了
        let d =  Math.acos(Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1))*R;
        return d.toFixed(1);
    };

    addMarker = (map,position,title) =>{
        let marker = new google.maps.Marker({
            position: position,
            map: map,
            draggable:false,
            title:title

        });

        markers.push(marker);
    };

    clearMarker = () => {
        for(let i=0;i<markers.length;i++){
            markers[i].setMap(null);
        }
        markers.length=0;

        this.setState({searchArray:[]});
    };

    render = () => {
        const {messages} = this.props.intl;
        let noSoldWidth = 100 * (this.state.available / (this.state.reserved + this.state.available + this.state.sold)).toFixed(2);
        noSoldWidth = noSoldWidth < 12 ? 12 : noSoldWidth > 88 ? 88 : noSoldWidth;
        const projectType = [messages.projectType1, messages.projectType2, messages.projectType3, messages.projectType4];
        let sellsPerformance ;
        if (this.state.reserved + this.state.available + this.state.sold === 0){
            sellsPerformance =
                <div className="sellsPerformance">
                    <ul>
                        <li className="ipxblue_txt" style={{left: 0 + '%'}}>{messages.noSoldNum} {this.state.available}</li>
                        <li className="ipxyellow_txt" style={{left: 34 + '%'}}>{messages.reservedNum} {this.state.reserved}</li>
                        <li className="ipxred_txt" style={{right: 0 + '%'}}>{messages.soldNum} {this.state.sold}</li>
                    </ul>
                    <div className="sellper_chart">
                        <span className="sell_available" style={{width: 34 + '%'}}/>
                        <span className="sell_booking" style={{width: 33 + '%'}}/>
                        <span className="sell_sold" style={{width: 33 + '%'}}/>
                    </div>
                </div>;
        } else {
            sellsPerformance =
                <div className="sellsPerformance">
                    <ul>
                        <li className="ipxblue_txt" style={{left: 0 + '%'}}>{messages.noSoldNum} {this.state.available}</li>
                        <li className="ipxyellow_txt" style={{left: noSoldWidth + '%'}}>{messages.reservedNum} {this.state.reserved}</li>
                        <li className="ipxred_txt" style={{right: 0 + '%'}}>{messages.soldNum} {this.state.sold}</li>
                    </ul>
                    <div className="sellper_chart">
                        <span className="sell_available" style={{width: 100 * (this.state.available / (this.state.reserved + this.state.available + this.state.sold)).toFixed(2) + '%'}}/>
                        <span className="sell_booking" style={{width: 100 * (this.state.reserved / (this.state.reserved + this.state.available + this.state.sold)).toFixed(2) + '%'}}/>
                        <span className="sell_sold" style={{width: 100 * (this.state.sold / (this.state.reserved + this.state.available + this.state.sold)).toFixed(2) + '%'}}/>
                    </div>
                </div>;
        }

        let searchInfos = this.state.searchArray.map(searchInfo => {
            let rates = "";
            for (let i = 0; i < searchInfo.rating; i++){
                rates += '<i class="iconfont icon-favorite2"/>';
            }
            return <tr>
                <td style={{"textAlign": "left"}}>{searchInfo.name}</td>
                <td style={{"textAlign": "center"}}><div dangerouslySetInnerHTML={{__html: rates}} /></td>
                <td style={{"textAlign": "center"}}>{searchInfo.distance}km</td>
            </tr>;
        });
        return !this.state.projectId ? <div className="ipx_proj_preview_cont"><div className="agency_preview_box"><NoData/></div></div> : <div className="ipx_proj_preview_cont"><div className="agency_preview_box">
                <InlineSlider speed={1.5} delay={3} pause={true} autoplay={false} dots={false} arrows={true} items={this.state.picList}/>
                <div className="agency_preview_info">
                    <div className="agency_prevw_infoLf">
                        <h4 className="agency_previw_h4">{messages.salesStatus}</h4>
                        {sellsPerformance}
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
                            <div className="proj_preview_h4box">
                                <h4>{messages.intentMoney}</h4>
                                <span className="ipxblue_txt">{this.state.currencyName} {this.state.reservationFee}</span>
                                <div className="proj_preview_h4cont">{this.state.reservationDetail}</div>
                            </div>
                            <div className="proj_preview_h4box">
                                <h4>{messages.termNumber}</h4>
                                <span className="ipxblue_txt">{this.state.termNumber}{messages.termNumberUnit} <i className="iconfont icon-wenhao" title={Number(this.state.termNumber) === 1?messages.termNumberTip1:messages.termNumberTip2}/></span>
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
                    <div className="agency_previw_nearby">
                        <span onClick={this.searchAround.bind(this,'bank')}
                              className={this.state.searchType == 'bank'?"active" : ""}>
                            <i className="iconfont icon-Bank"/>{messages.bank}
                        </span>
                        <span onClick={this.searchAround.bind(this,'school')}
                              className={this.state.searchType == 'school'?"active" : ""}>
                            <i className="iconfont icon-education"/>{messages.school}
                        </span>
                        <span onClick={this.searchAround.bind(this,'food')}
                              className={this.state.searchType == 'food'?"active" : ""}>
                            <i className="iconfont icon-Restautant"/>{messages.food}
                        </span>
                        <span onClick={this.searchAround.bind(this,'hospital')}
                              className={this.state.searchType == 'hospital'?"active" : ""}>
                            <i className="iconfont icon-Hospital"/>{messages.hospital}
                        </span>
                        <span onClick={this.searchAround.bind(this,'bus_station')}
                              className={this.state.searchType == 'bus_station'?"active" : ""}>
                            <i className="iconfont icon-Station"/>{messages.busStation}
                        </span>
                        <span onClick={this.searchAround.bind(this,'grocery_or_supermarket')}
                              className={this.state.searchType == 'grocery_or_supermarket'?"active" : ""}>
                            <i className="iconfont icon-shopping"/>{messages.supermarket}
                        </span>
                        <span onClick={this.searchAround.bind(this,'police')}
                              className={this.state.searchType == 'police'?"active" : ""}>
                            <i className="iconfont icon-police"/>{messages.police}
                        </span>
                    </div>
                    <div className="agency_previw_mapBox" id="container"></div>
                    <table className="agency_previw_star_table"
                           style={{border:0,cellPadding:0,cellSpacing:0}}>
                        <tr>
                            <th style={{"textAlign": "left"}} className="star_table_name_td">{messages.mapName}</th>
                            <th style={{"textAlign": "center"}} className="star_table_score_td">{messages.mapScore}</th>
                            <th style={{"textAlign": "center"}} className="star_table_distance_td">{messages.mapDistance}</th>
                        </tr>
                        {searchInfos}
                    </table>
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
