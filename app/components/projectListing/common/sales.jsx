/**
 * Created by marszed on 2017/1/24.
 */
import React, {PropTypes} from "react";
import {injectIntl} from "react-intl";
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import {formatMoney, objCopy, langPackageInject} from 'LIB/tool';


import NoData from 'COMPONENT/common/noData';
import Select from 'COMPONENT/common/form/Select';
import Slider from 'COMPONENT/common/form/Slider';
import ViewProperty from 'COMPONENT/common/viewProperty';

// 不动产配置
import getPropertyMay from './getPropertyMap';

class Sales extends React.Component {
    constructor(props) {
        super(props);
        let messages = objCopy(this.props.intl.messages);
        const zhFlag = langPackageInject().indexOf('zh') === -1; //  true 英文 false 中文
        let query = this.props.router.location.query;
        let propertyMap = getPropertyMay(messages, {}); // 不动产配置注入
        if(zhFlag){
            if (propertyMap.countryCode[query.countryCode] == 'US'){
                messages.ownerCrop = 'HOA';
            }
            if (propertyMap.countryCode[query.countryCode] == 'AU'){
                messages.ownerCrop = 'Body Corporation';
                messages.buildPrice = 'House Price';
            }
        }
        this.state = {
            propertyMap: propertyMap,
            messages: messages,
            statusObj: { // 1:未售,2:预定中,3:已售
                available: true,
                reserved: true,
                sold: true
            },
            fontSize: 50, // 视野控制
            isAbroad: -1 //-1:全部,1:可以购买,0:不能购买
        };
    }

    componentDidMount = () => (
        this.getPropertyList()
    );

    getPropertyList = () => {
        const {query} = this.context.router.location;
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.CHART + query.projectId, key: 'CHART'},
                method: 'get',
                params: {
                    propertyStatus: [1, 2, 3].join(','),
                    isAbroad: -1
                }
            });
            if (!response.errType) {
                const {data} = response.data;
                this.setState({
                    list: data.reverse()
                });
            }
        }.bind(this)();
    };

    // 数据收集
    onChange = (name, value) => {
        if (name === 'fontSize'){
            this.setState({
                fontSize: value
            });
        } else if (name === 'isAbroad'){
            this.setState({
                isAbroad: value ? (value - 1) : -1
            });
        } else {
            let statusObj = objCopy(this.state.statusObj), temp = {};
            temp[name] = !statusObj[name];
            this.setState({
                statusObj: Object.assign(statusObj, temp)
            });
        }
    };

    viewPropertyDetail = (obj) => (
        this.refs.viewProperty.getPropsData(obj)
    );

    render = () => {
        const {messages} = this.state;
        const {countryCode, projectType} = this.props.location.query;
        const statusClass = ['ipxblue_bg', 'ipxyellow_bg', 'ipxred_bg'];
        let select = countryCode === "country.004"?
            <Select name="isAbroad" onChange={this.onChange.bind(this)} key={this.state.updateKey}
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
                    }}/> : "";
        return (
            <div>
                <ViewProperty ref="viewProperty" messages={messages} propertyMap={this.state.propertyMap} propertyDetail={this.state.propertyDetail} query={this.props.location.query}/>
                <div className="agency_sellgrid_tit ipx_ant">
                    {/*筛选栏*/}
                    <div className="proj_screen_cont_td">
                        <h3>{messages.stateFilter}</h3>
                        <div className="agency_sellgrid_checkbox">
                            <label onClick={this.onChange.bind(this, 'available')} className={"ipx_checkbox" + (this.state.statusObj.available ? ' checked' : '')}><i className="iconfont icon-succeed"/> <span className="text-elps ipxblue_txt"><strong>{messages.available}</strong></span> </label>
                            <label onClick={this.onChange.bind(this, 'reserved')} className={"ipx_checkbox" + (this.state.statusObj.reserved ? ' checked' : '')}><i className={"iconfont icon-succeed" + (this.state.statusObj.reserved ? ' ipxyellow_bg' : '')}/> <span className="text-elps ipxyellow_txt"><strong>{messages.reserved}</strong></span> </label>
                            <label onClick={this.onChange.bind(this, 'sold')} className={"ipx_checkbox" + (this.state.statusObj.sold ? ' checked' : '')}><i className={"iconfont icon-succeed" + (this.state.statusObj.sold ? ' ipxred_bg' : '')}/> <span className="text-elps ipxred_txt"><strong>{messages.sold}</strong></span> </label>
                        </div>
                    </div>
                    {select}
                    <Slider name="fontSize" onChange={this.onChange.bind(this)} data={{
                        markUnit: "%",
                        min: 12,
                        max: 100,
                        defaultValue: 50,
                        markMin: 12,
                        markMax: 100,
                        style:{float:'right'},
                        title: messages.viewControl,
                        childStyle: {width: 200 + 'px'}
                    }}/>
                </div>
                {/*销控图*/}
                <div className="agency_sellgrid_Area">
                    {
                        this.state.list && this.state.list.length ? <div className="agency_sellgrid_box" style={{fontSize: this.state.fontSize + 'px'}}>
                            {
                                this.state.list.map((option) => (
                                    <ul className="agency_sellgrid_ul" key={option.floorLevel}>
                                        {
                                            option.results.map((obj, index) => (
                                                (( ((Number(obj.propertyStatus) === 3 && this.state.statusObj.sold) ||
                                                (Number(obj.propertyStatus) === 2 && this.state.statusObj.reserved) ||
                                                (Number(obj.propertyStatus) === 1 && this.state.statusObj.available)) &&
                                                ((Number(obj.isAbroad) === Number(this.state.isAbroad)) || this.state.isAbroad === -1))) ? <li key={obj.propertyId} className={statusClass[Number(obj.propertyStatus) - 1]} onClick={this.viewPropertyDetail.bind(this, obj)}>
                                                        <h2>#{obj.lot}</h2>
                                                        {
                                                            projectType != 4 ? <ol className={this.state.fontSize <= 36 ? 'hide' : ''}>
                                                                <li title={messages.beds + ': ' + obj.bed}><i className="iconfont icon-bedroom"/> {obj.bed}</li>
                                                                <li title={messages.studys + ': ' + obj.study}><i className="iconfont icon-bookroom"/> {obj.study}</li>
                                                                <li title={messages.carSpace + ': ' + obj.carSpace}><i className="iconfont icon-Garage"/> {obj.carSpace}</li>
                                                                <li title={messages.baths + ': ' + obj.bath}><i className="iconfont icon-washroom"/> {obj.bath}</li>
                                                                {/*建筑面积(公寓，独栋别墅，联排别墅用)*/}
                                                                {
                                                                    (projectType != 4) ? <li title={messages.constructionArea + ': ' + (obj.constructionArea)}><i className="iconfont icon-totalArea"/> {obj.constructionArea} {obj.areaUnit}</li> : null
                                                                }
                                                                {/*土地面积(土地，独栋别墅用)*/}
                                                                {
                                                                    (projectType == 2 || projectType == 4) ? <li title={messages.landArea + ': ' + (obj.landArea)}><i className="iconfont icon-area"/> {obj.landArea} {obj.areaUnit}</li> : null
                                                                }
                                                            </ol> : <ol className={this.state.fontSize <= 36 ? 'hide' : ''}>
                                                                <li title={messages.width + ': ' + obj.width}><i className="iconfont icon-width"/> {obj.width}</li>
                                                                <li title={messages.length + ': ' + obj.length}><i className="iconfont icon-height"/> {obj.length}</li>
                                                                <li title={messages.landArea + ': ' + (obj.landArea)}>{obj.landArea} {obj.areaUnit}</li>
                                                            </ol>
                                                        }
                                                        <p className={this.state.fontSize <= 36 ? 'hide' : ''}>{obj.currencyName} {obj.price ? formatMoney(obj.price) : ''}</p>
                                                    </li> : <li className="white_bg" key={'white_' + index} style={{fontSize: this.state.fontSize + 'px'}}/>
                                            ))
                                        }
                                    </ul>
                                ))
                            }
                        </div> : <NoData/>
                    }
                </div>
            </div>
        );
    };
}

Sales.contextTypes = {
    router: PropTypes.object.isRequired
};

export default injectIntl(Sales);
