/**
 * Created by ander on 2017/2/22.
 */
import React from 'react';
import {connect} from 'react-redux';
import INTERFACE from "INTERFACE/config";
import {asyncAwaitCall} from "HTTP";
import {companyInfo} from "REDUX/actions/global";
import {getLocalStorage, setLocalStorage, objCopy, isEqual} from "LIB/tool";

class CompanyLogo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            companyInfo: objCopy(this.props.global.companyInfo) || getLocalStorage("companyInfo") || {}
        };
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.global.companyInfo && !isEqual(nextProps.global.companyInfo, this.state.companyInfo)){
            this.setState({
                companyInfo: nextProps.global.companyInfo
            });
        }
    }
    componentDidMount(){
        // todo 获取经济公司信息
        return false;
        let companyStoreInfo = this.props.companyInfo;
        if (companyStoreInfo){
            this.setState({
                companyName: companyStoreInfo.companyName,
                companyLogo: companyStoreInfo.companyLogo
            });
        } else {
            let responseHandler = async function () {
                let response = await asyncAwaitCall({
                    url: {value: INTERFACE.COMPANYINFO, key: 'COMPANYINFO'},
                    method: 'get',
                    loading: false
                });

                if (response.errType || !response.data) {
                    return false;
                }

                this.props.dispatch(companyInfo(response.data.data));

                this.setState({
                    companyName: response.data.data.companyName,
                    companyLogo: response.data.data.companyLogo
                });
            }.bind(this)();
        }
    }

    render(){
        if (!this.state.companyInfo.companyLogo || this.state.companyInfo.companyLogo === null){
            return (<a href="javascript:" title={this.state.companyInfo.companyName} className="ipx_company_logo"/>);
        } else {
            return (<a href="javascript:" title={this.state.companyInfo.companyName} className="newcompany_logo center-middle"><span/><img src={this.state.companyInfo.companyLogo}/></a>);
        }
    }
}

export default connect((store) => (store))(CompanyLogo);