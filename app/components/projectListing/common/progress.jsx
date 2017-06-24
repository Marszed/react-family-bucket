/**
 * Created by marszed on 2017/1/24.
 */
import React, {PropTypes} from "react";
import {injectIntl, FormattedDate} from "react-intl";
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import NoData from 'COMPONENT/common/noData';
import FixSlider from 'COMPONENT/common/fixSlider/slider';

class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => (
        this.getProgressList()
    );

    getProgressList = () => {
        const {query} = this.context.router.location;
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.PROGRESS + query.projectId, key: 'PROGRESS'},
                method: 'get'
            });
            if (!response.errType) {
                this.setState({
                    list: response.data.data
                });
            }
        }.bind(this)();
    };

    viewHandle(index, array) {
        let temp = [];
        if (array.length) {
            for (let i = 0, len = array.length; i < len; i++) {
                temp.push({
                    "id": array[i].resourceId,
                    "progressId": array[i].progressId,
                    "fileName": array[i].fileKey,
                    "url": array[i].resourceUrl
                });
            }
            if(this.refs.slider){
                this.refs.slider.updateSilderHandle(temp, index);
            }
        }
    }

    render = () => {
        console.log(this.state.list);
        const {messages} = this.props.intl;
        const items = this.state.list && this.state.list.length ? this.state.list.map((obj) => (
            <div key={obj.progressId}>
                <div className="proj_record_box">
                    <div className="proj_record_tit">
                        <div className="proj_record_calendar">
                            <i className="iconfont icon-calendar"/>
                            <b className="record_cal_date">
                                <FormattedDate value={new Date(obj.updateTime)}/>
                            </b>
                            <b className="record_cal_time hide">{messages.today}</b>
                        </div>
                        <div className="proj_record_contrl">
                        </div>
                    </div>
                    <div className="proj_record_cont clearfix">
                        <div className="proj_record_imgbox">
                            <ol>
                                {
                                    obj.historyresourceList[0] ? <li onClick={this.viewHandle.bind(this, 0, obj.historyresourceList)}>
                                            <div><img src={obj.historyresourceList[0].resourceUrl}/></div>
                                        </li> : null
                                }
                            </ol>
                            <div className="proj_record_imgnumb">
                                <b>{obj.historyresourceList.length}P</b>
                            </div>
                        </div>
                        <div className="proj_record_txt grey_bgf4">
                            <div style={{'wordBreak': 'break-word'}}>{obj.updateDes}</div>
                        </div>
                    </div>
                </div>

                <div className="proj_record_line"></div>
            </div>
        )) : null;
        return <div className="proj_creat_record">
            {items}
            {
                this.state.list && this.state.list.length ? null : <NoData/>
            }
            {
                this.state.list && this.state.list.length ? <FixSlider speed={1.5} delay={3} ref="slider" pause={true} autoplay={false} dots={false} noDelete={true} arrows={true}/> : null
            }
        </div>;
    };
}

Progress.contextTypes = {
    router: PropTypes.object.isRequired
};

export default injectIntl(Progress);
