/**
 * Created by marszed on 2017/1/24.
 */
import React, {PropTypes} from "react";
import {connect} from 'react-redux';
import {injectIntl} from "react-intl";
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import {formatMoney, objCopy} from 'LIB/tool';
import NoData from 'COMPONENT/common/noData';
import echart from "ASSET/js/echarts.min";
import InlineSlider from 'COMPONENT/common/inlineSlider/slider';
import {showToast} from 'REDUX/actions/global';
import bank from "ASSET/img/icon-bank.png";
import school from "ASSET/img/icon-school.png";
import food from "ASSET/img/icon-restaurant.png";
import hospital from "ASSET/img/icon-hospital.png";
import bus_station from "ASSET/img/icon-station.png";
import grocery_or_supermarket from "ASSET/img/icon-shopping.png";
import police from "ASSET/img/icon-police.png";

let markers = [];

class Msg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType: "",
            searchArray:[],
            mapHide:false,
            moreHide:true,
            createTime:'2017-06-08',
            lastTime:'2017-06-08',
            favoriteFlag:false
        };
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

        let projectMarker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            draggable: false,
            title: title
        });
    };

    getProjectDetail = () => {
        const {params} = this.context.router;
        const {messages} = this.props.intl;
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.PROJECTDETAIL + params.projectId, key: 'PROJECTDETAIL'},
                method: 'get'
            });
            if (!response.errType) {
                let res = response.data.data;
                this.setState(res);
                let projectChart = echart.init(document.getElementById('projectChart'));
                let projectData = [
                    {
                        value: res.available,
                        name: messages.available,
                        itemStyle: {
                            normal: {
                                color: "#00afb4"
                            }
                        }
                    },
                    {
                        value: res.reserved,
                        name: messages.reserved,
                        itemStyle: {
                            normal: {
                                color: "#fad285"
                            },
                        }
                    },
                    {
                        value: res.sold,
                        name: messages.sold,
                        itemStyle: {
                            normal: {
                                color: "#eb7366"
                            },
                        }
                    }
                ];
                let option = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b} : {c} ({d}%)",
                        textStyle: {
                            fontStyle: 'normal',
                            fontSize: '10',
                            fontFamily:'normal'
                        }
                    },
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius : '80%',
                            center: ['50%', '50%'],
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            }
                        }
                    ]
                };
                option.series[0].data = projectData.sort(function (a, b) { return a.value - b.value; });
                projectChart.setOption(option);
                this.googleMap(response.data.data.longitude,
                    response.data.data.latitude,
                    response.data.data.title);
                this.searchAround('bank');
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
                    this.addMarker(map,place.geometry.location,place.name,type);//追加新地点标记
                    let searchInfo = {};
                    searchInfo.name = place.name;
                    searchInfo.rating = Math.floor(place.rating == undefined? 0 : place.rating);
                    searchInfo.distance = this.getDistance(pyrmont,place.geometry.location);
                    searchArr.push(searchInfo);
                }
                this.setState({searchArray:searchArr});
            }

            this.addMarker(map,pyrmont,this.state.title,'project');
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

    addMarker = (map,position,title,type) =>{
        let icon = null;
        if (type === 'bank'){
            icon = bank;
        } else if (type === 'school'){
            icon = school;
        } else if (type === 'food'){
            icon = food;
        } else if (type === 'hospital'){
            icon = hospital;
        } else if (type === 'bus_station'){
            icon = bus_station;
        } else if (type === 'grocery_or_supermarket'){
            icon = grocery_or_supermarket;
        } else if (type === 'police'){
            icon = police;
        }


        let marker = new google.maps.Marker({
            position: position,
            map: map,
            draggable:false,
            title:title,
            icon:icon
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

    changeMapHide = () => {
      let mapHide = this.state.mapHide;
      this.setState({mapHide:!mapHide});
    };

    changeMoreHide = () => {
        let moreHide = this.state.moreHide;
        this.setState({moreHide:!moreHide});
    };
    // 不动产项目收藏和取消收藏
    collect = () => {
        const {messages} = this.props.intl;
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.PROJECTCOLLECT + this.state.projectId, key: 'PROJECTCOLLECT'},
                method: 'put',
                params: {
                    collectFlag: !this.state.favoriteFlag
                },
                dataSerialize: true
            });
            if (!response.errType) {
                this.props.dispatch(showToast({
                    content: (!this.state.favoriteFlag? '' : messages.cancel) + messages.marked + messages.success,
                    state: 1
                }));
                this.setState({favoriteFlag: !(this.state.favoriteFlag)});
            }
        }.bind(this)();
    };

    render = () => {
        const {messages} = this.props.intl;
        const projectType = [messages.projectType1, messages.projectType2, messages.projectType3, messages.projectType4];
        let searchInfos;
        if (this.state.searchArray && this.state.searchArray.length > 0) {
            searchInfos = this.state.searchArray.map(searchInfo => {
                let rates = "";
                for (let i = 0; i < searchInfo.rating; i++){
                    rates += '<i class="iconfont icon-favorite2"/>';
                }

                return <li>
                    <p>{searchInfo.name}</p>
                    <span>
                            <em>{searchInfo.distance}km</em>
                            <div dangerouslySetInnerHTML={{__html: rates}} />
                        </span>
                </li>;
            });
        } else {
            searchInfos = <li style={{'textAlign':'center'}}><span>{messages.searchNoData}</span></li>;
        }
        let aboardInfo = '';
        if(this.state.countryCode === 'country.004'){
            aboardInfo = <p><span>{messages.abroadFlag}</span><b className="ipxblue_txt">{this.state.isAbroad === true ? messages.purchase : (this.state.isAbroad === false ? messages.purchaseFalse : '-')}</b></p>;
        }
        let bonusTime;
        if (!this.state.bonus || this.state.bonus === null) {
            bonusTime = '-';
        } else if (this.state.bonus.isForever === 1){
            bonusTime = messages.forever;
        } else  {
            bonusTime = messages.periodValidity + '：' + '<strong>' + this.state.bonus.startTime.replace(/-/g, '/') + ' - ' + this.state.bonus.endTime.replace(/-/g, '/') + '</strong>';
        }
        return !this.state.projectId ?
            <div className="ipx_proj_preview_cont"><div className="ipx_proj_preview_wrap"><NoData/></div></div> :
            <div className="ipx_proj_preview_cont">
                <div className="ipx_proj_preview_wrap">
                    <div className="ipx_proj_preview_lf">
                        <div className="proj_preview_share clearfix">
                            <span className="float_lf proj_type_box"><em>●</em>{projectType[this.state.projectType - 1]}</span>
                            <span className="float_lf"><b>{messages.createTime}： {new Date(this.state.createTime).format('yyyy-MM-dd')}</b> |<b>{messages.lastTime}：{new Date(this.state.lastTime).format('yyyy-MM-dd')}</b></span>
                            <span className={this.state.favoriteFlag?"float_rt checked":"float_rt"} onClick={this.collect.bind(this)}>
                                <i className={this.state.favoriteFlag?"iconfont icon-favorite2":"iconfont icon-favorite1"}/>{this.state.favoriteFlag?messages.bookmarked:messages.marked}
                            </span>
                        </div>

                        <InlineSlider speed={1.5} delay={3} pause={true} autoplay={false} arrows={true} items={this.state.picList}/>

                        <div className="preview_common_stylebox base_infomation">
                            <h3 className="preview_common_h3">{messages.baseInfo}</h3>
                            <div className="agency_info_attr_box clearfix">
                                <ul className="preview_info float_lf">
                                    <li><span className="preview_info_attr">{messages.country}</span><span className="preview_info_value">{this.state.countryName}</span></li>
                                    <li><span className="preview_info_attr">{messages.region}</span><span className="preview_info_value">{this.state.regionFirstName} {this.state.regionSecondName ? '-' : ''} {this.state.regionSecondName} {this.state.regionThirdName ? '-' : ''} {this.state.regionThirdName}</span></li>
                                    <li><span className="preview_info_attr">{messages.detailAddr}</span><span className="preview_info_value">{this.state.detailAddr}</span></li>
                                </ul>
                                <ul className="preview_info float_rt">
                                    <li><span className="preview_info_attr">{messages.zipCode}</span><span className="preview_info_value">{this.state.zipCode}</span></li>
                                    <li><span className="preview_info_attr">{messages.targetDistance}</span><span className="preview_info_value">{this.state.targetDistance} km</span></li>
                                </ul>
                            </div>
                            <div className="description_id" style={{display:this.state.moreHide?'none':'block'}}>
                                <h3 className="preview_common_h3">{messages.projectIntro}</h3>
                                <div className="agency_previw_description" dangerouslySetInnerHTML={{__html: this.state.description}}>
                                </div>
                            </div>
                            <span className="previw_checkmore" onClick={this.changeMoreHide.bind(this)}><span>{this.state.moreHide?messages.seeMore:messages.seeHide}</span>
                                <i className={this.state.moreHide?'iconfont icon-arrowdown':'iconfont icon-arrowup'}/></span>
                        </div>
                        <div className="preview_common_stylebox preview_map_wrap">
                            <h3 className="preview_common_h3">{messages.projectAround}</h3>
                            <ul className="preview_map_tag">
                                <li onClick={this.searchAround.bind(this,'bank')}
                                    className={this.state.searchType == 'bank'?"active" : ""}>
                                    <i className="iconfont icon-Bank"/>{messages.bank}
                                </li>
                                <li onClick={this.searchAround.bind(this,'school')}
                                    className={this.state.searchType == 'school'?"active" : ""}>
                                    <i className="iconfont icon-education"/>{messages.school}
                                </li>
                                <li onClick={this.searchAround.bind(this,'food')}
                                    className={this.state.searchType == 'food'?"active" : ""}>
                                    <i className="iconfont icon-Restautant"/>{messages.food}
                                </li>
                                <li onClick={this.searchAround.bind(this,'bus_station')}
                                    className={this.state.searchType == 'bus_station'?"active" : ""}>
                                    <i className="iconfont icon-Station"/>{messages.busStation}
                                </li>
                                <li onClick={this.searchAround.bind(this,'hospital')}
                                    className={this.state.searchType == 'hospital'?"active" : ""}>
                                    <i className="iconfont icon-hospital3"/>{messages.hospital}
                                </li>
                                <li onClick={this.searchAround.bind(this,'grocery_or_supermarket')}
                                    className={this.state.searchType == 'grocery_or_supermarket'?"active" : ""}>
                                    <i className="iconfont icon-shopping"/>{messages.supermarket}
                                </li>
                                <li onClick={this.searchAround.bind(this,'police')}
                                    className={this.state.searchType == 'police'?"active" : ""}>
                                    <i className="iconfont icon-police"/>{messages.police}
                                </li>
                            </ul>
                            <div className="preview_map_box">
                                <div className="preview_map_frame" id="container"></div>
                                <div className="preview_map_list" style={{width:this.state.mapHide?'0px':'220px'}}>
                                    <a href="javascript:;" onClick={this.changeMapHide.bind(this)}
                                       className={this.state.mapHide?'iconfont icon-arrowleft':'iconfont icon-arrowright'}/>
                                    <ul style={{display:this.state.mapHide?'none':'block'}}>
                                        {searchInfos}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="preview_common_stylebox">
                            <h3 className="preview_common_h3">{messages.sellingPoints}</h3>
                            <ul className="sellpoint_view_ul">
                                {
                                    this.state.sellingPointList.map((obj, index) => (<li key={index}>{obj}</li>))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="ipx_proj_preview_rt">
                        <div className="preview_common_stylebox clearfix">
                            <h3 className="preview_common_h3">{messages.salesStatus}</h3>
                            <ul className="sales_chart_ul">
                                <li><em className="ipxblue_bg"/><span> {messages.available} <b className="ipxblue_txt">{this.state.available}</b></span></li>
                                <li><em className="ipxyellow_bg"/><span> {messages.reserved} <b className="ipxyellow_txt">{this.state.reserved}</b></span></li>
                                <li><em className="ipxred_bg"/><span> {messages.sold} <b className="ipxred_txt">{this.state.sold}</b></span></li>
                            </ul>
                            <div className="sales_chart_frame" id="projectChart">
                            </div>
                        </div>
                        <div className="preview_common_stylebox preview_sell_information">
                            <h3 className="preview_common_h3">{messages.tradeInfo}</h3>
                            {aboardInfo}
                            <p><span>{messages.priceRange}</span><b className="ipxblue_txt">{this.state.currencyName} {formatMoney(this.state.minPrice)} - {formatMoney(this.state.maxPrice)} </b></p>
                            <ul className="clearfix">
                                <li><span>{messages.intentMoney}<i className="iconfont icon-wenhao" title={this.state.reservationDetail}/></span><br/><strong className="ipxblue_txt">{this.state.currencyName} {this.state.reservationFee}</strong></li>
                                <li><span>{messages.termNumber}<i className="iconfont icon-wenhao" title={Number(this.state.termNumber) === 1?messages.termNumberTip1:messages.termNumberTip2}/></span><br/><strong className="ipxblue_txt">{this.state.termNumber}{messages.termNumberUnit}</strong></li>
                            </ul>
                        </div>
                        <div className="preview_common_stylebox">
                            <h3 className="preview_common_h3">{messages.preferentialPolicy}</h3>
                            <p className="preview_bonus_time" dangerouslySetInnerHTML={{__html:bonusTime}}/>
                            <div className="preview_bonus_detail" dangerouslySetInnerHTML={{__html: !this.state.bonus || this.state.bonus === null ? null : this.state.bonus.content}}></div>
                        </div>
                        <div className="preview_common_stylebox">
                            <h3 className="preview_common_h3">{messages.transactionProgress}</h3>
                            <ul className="preview_sell_steps">
                                {
                                    this.state.transactionList ? this.state.transactionList.map((option, _index) => (
                                            <li key={option.transactionId}>
                                                <em>{_index + 1}</em>
                                                <div>
                                                    <span>
                                                      <b>{option.transactionRate && option.transactionRate !== null ? option.transactionRate + '%' : option.transactionMoney}  <strong>
                                                          {
                                                            this.state.termNumber !== 2 ? '' : (this.state.termNumber === 1 ? messages.landCost : (option.transactionType === 1 ? messages.landCost : (messages.buildHouseCost)))
                                                            }</strong>
                                                      </b>
                                                      <p>{option.transactionContent}</p>
                                                    </span>
                                                </div>
                                            </li>
                                        )) : ''
                                }

                            </ul>
                        </div>
                    </div>
                </div></div>;
    };
}

Msg.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect((store) => (store))(injectIntl(Msg));
