/**
 * Created by marszed on 2017/1/24.
 */
import React, {PropTypes} from "react";
import {injectIntl} from "react-intl";
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from 'HTTP';
import NoData from 'COMPONENT/common/noData';
import FixSlider from 'COMPONENT/common/fixSlider/slider';


class Document extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceList1: [],
            resourceList2: [],
            resourceList4: [],
            resourceList8: [],
            resourceList9: [],
            resourceList10: []
        };
    }

    componentDidMount = () => (
        this.getDocumentList()
    );

    getDocumentList = () => {
        const {query} = this.context.router.location;
        let responseHandler = async function () {
            let response = await asyncAwaitCall({
                url: {value: INTERFACE.DOCUMENT + query.projectId, key: 'DOCUMENT'},
                method: 'get'
            });
            if (!response.errType) {
                const data = response.data.data, len = data.length;
                let resourceList2 = [], // 户型图-图片
                    resourceList8 = [], // 户型图-pdf
                    resourceList1 = [], // 楼书
                    resourceList4 = [], // 买卖合同
                    resourceList9 = [], // 土地合同
                    resourceList10 = []; // 建房合同
                for (let i = 0; i < len; i++){
                    if (data[i].resourceType - 0 === 1){
                        resourceList1.push(data[i]);
                    } else if (data[i].resourceType - 0 === 2){
                        resourceList2.push(data[i]);
                    } else if (data[i].resourceType - 0 === 4){
                        resourceList4.push(data[i]);
                    } else if (data[i].resourceType - 0 === 8){
                        resourceList8.push(data[i]);
                    } else if (data[i].resourceType - 0 === 9){
                        resourceList9.push(data[i]);
                    } else if (data[i].resourceType - 0 === 10){
                        resourceList10.push(data[i]);
                    }
                }
                this.setState({
                    resourceList1: resourceList1,
                    resourceList2: resourceList2,
                    resourceList4: resourceList4,
                    resourceList8: resourceList8,
                    resourceList9: resourceList9,
                    resourceList10: resourceList10
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
        const {messages} = this.props.intl;
        const {query} = this.context.router.location;
        return <div className="proj_creat_img">
            {/*没有文档数据展示暂无数据*/}
            {
                !this.state.resourceList1.length && !this.state.resourceList2.length && !this.state.resourceList4.length && !this.state.resourceList8.length && !this.state.resourceList9.length && !this.state.resourceList10.length ? <NoData/> : null
            }
            {/*户型图*/}
            {
                Number(query.projectType) !== 4 ? <ul className="clearfix">
                        {
                            this.state.resourceList2 ? this.state.resourceList2.map((obj, index) => (
                                    <li key={obj.resourceId} onClick={this.viewHandle.bind(this, index, this.state.resourceList2)}>
                                        <div className="proj_creat_imgbox">
                                            <img src={obj.resourceUrl}/>
                                        </div>
                                        <div className="proj_img_info_show">{obj.remark}</div>
                                    </li>
                                )) : null
                        }
                    </ul> : null
            }
            {
                Number(query.projectType) !== 4 && this.state.resourceList2 && this.state.resourceList2.length ? <FixSlider speed={1.5} delay={3} ref="slider" pause={true} autoplay={false} dots={false} noDelete={true} arrows={true}/> : null
            }
            {/*户型图-pdf*/}
            {
                Number(query.projectType) !== 4 ? <table className="proj_file_list" cellPadding="0" cellSpacing="0">
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
                    </table> : null
            }
            {/*楼书*/}
            <table className="proj_file_list" cellPadding="0" cellSpacing="0">
                <tr className="proj_file_list_head">
                    <th className="proj_file_head_plus"><i className="iconfont icon-layout font_24px"/></th>
                    <th className="proj_file_head_tit"><b className="v_align_mid">{messages.brochure}</b></th>
                    <th>{messages.fileType}</th>
                    <th>{messages.fileSize}</th>
                    <th>{messages.operation}</th>
                </tr>
                {
                    this.state.resourceList1 ? this.state.resourceList1.map((obj) => (
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
            {/*买卖合同*/}
            {
                !this.state.resourceList4 || !this.state.resourceList4.length ? null :
                    <table className="proj_file_list" cellPadding="0" cellSpacing="0">
                        <tr className="proj_file_list_head">
                            <th className="proj_file_head_plus"><i className="iconfont icon-layout font_24px"/></th>
                            <th className="proj_file_head_tit"><b className="v_align_mid">{messages.businessContract}</b></th>
                            <th>{messages.fileType}</th>
                            <th>{messages.fileSize}</th>
                            <th>{messages.operation}</th>
                        </tr>
                        {
                            this.state.resourceList4 ? this.state.resourceList4.map((obj) => (
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
            }
            {/*土地合同*/}
            {
                !this.state.resourceList9 || !this.state.resourceList9.length ? null :
                    <table className="proj_file_list" cellPadding="0" cellSpacing="0">
                        <tr className="proj_file_list_head">
                            <th className="proj_file_head_plus"><i className="iconfont icon-layout font_24px"/></th>
                            <th className="proj_file_head_tit"><b className="v_align_mid">{messages.landContract}</b></th>
                            <th>{messages.fileType}</th>
                            <th>{messages.fileSize}</th>
                            <th>{messages.operation}</th>
                        </tr>
                        {
                            this.state.resourceList9 ? this.state.resourceList9.map((obj) => (
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
            }
            {/*建房合同*/}
            {
                !this.state.resourceList10 || !this.state.resourceList10.length ? null :
                    <table className="proj_file_list" cellPadding="0" cellSpacing="0">
                        <tr className="proj_file_list_head">
                            <th className="proj_file_head_plus"><i className="iconfont icon-layout font_24px"/></th>
                            <th className="proj_file_head_tit"><b className="v_align_mid">{messages.buildingContract}</b></th>
                            <th>{messages.fileType}</th>
                            <th>{messages.fileSize}</th>
                            <th>{messages.operation}</th>
                        </tr>
                        {
                            this.state.resourceList10 ? this.state.resourceList10.map((obj) => (
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
            }
        </div>;
    };
}

Document.contextTypes = {
    router: PropTypes.object.isRequired
};

export default injectIntl(Document);
