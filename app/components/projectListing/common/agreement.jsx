/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';

class Agreement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: this.props.hide !== undefined ? this.props.hide : true, // 经纪公司是否已经阅读了协议
            agreement: true
        };
    }

    hideHandler = (flag) => (
        this.setState({
            hide: flag
        })
    );

    agreementHandler = (flag) => (
        this.setState({
            agreement: flag
        })
    );

    agreeSubmitHandler = () => (
        this.props.submit(this.state.agreement)
    );

    render() {
        const {messages} = this.props;
        return (<div className={"ipx_pop" + (this.state.hide ? ' hide' : '')}>
            <div className="ipx_pop_box ipx_pop_contract">
                <div className="ipx_pop_head">
                    <h2 className="float_lf">{messages.agreeSign}</h2>
                </div>
                <div className="ipx_pop_body">
                    <h2>项目签约公共协议</h2>
                        <br/>
                        <br/>
                    <h4>保护隐私的承诺</h4>
                        <br/>
                        <br/>
                    <p>IPX平台高度重视、尊重和保护您的隐私权，因此将竭力确保本网站收集到的个人信息（为本隐私条款之目的，亦包括本隐私条款中提及的任何相关数据）仅用于本隐私条款中所陈述的用途。</p>
                        <br/>
                    <h4>引言</h4>
                        <br/>
                    <p>本隐私条款和本网站的使用条款（包括用户注册协议、IPX服务规则等）共同列明IPX平台在处理从您那里收集到的或您提供给IPX平台的任何个人信息时所秉持的原则。除IPX平台有特别要求外，您不必表明身份或透露您的个人信息。一旦您向我们提供您的个人信息（即任何可以用于识别您身份的信息)，我们保证，这些信息将仅用于IPX平台为您提供客户支持之目的。请认真阅读以下内容，以理解IPX平台关于您个人信息的观点、做法，以及了解IPX平台将如何处理您的个人信息。</p>
                        <br/>
                    <h4>1. IPX平台收集的信息</h4>
                    <br/>
                    <p>IPX平台可能收集和使用关于您的下列信息，您使用IPX平台网服务即表明您同意IPX平台的该等收集与使用:
                        (1)您在填写IPX平台上的表格时提供的信息，包括但不限于您注册并使用IPX平台、注册参与同步拍、订阅服务、上传资料或请求进一步服务时所提供的信息。
                        (2)您与IPX平台联系的通信记录。
                        (3)IPX平台请您完成的研究调查。
                        (4)您通过IPX平台网完成交易时，以及参与任何网上竞拍时（无论成功与否）提交的信息。
                        (5)您访问IPX平台网时的信息及您访问的资料, 包括但不限于流量数据、位置数据、网络日志和其他通信数据, 不论出于IPX平台计算费用之目的或其他目的。
                    </p>
                        <br/>
                    <h4>1. IPX平台收集的信息</h4>
                        <br/>
                    <p>IPX平台可能收集和使用关于您的下列信息，您使用IPX平台网服务即表明您同意IPX平台的该等收集与使用:
                        (1)您在填写IPX平台上的表格时提供的信息，包括但不限于您注册并使用IPX平台、注册参与同步拍、订阅服务、上传资料或请求进一步服务时所提供的信息。
                        (2)您与IPX平台联系的通信记录。
                        (3)IPX平台请您完成的研究调查。
                        (4)您通过IPX平台网完成交易时，以及参与任何网上竞拍时（无论成功与否）提交的信息。
                        (5)您访问IPX平台网时的信息及您访问的资料, 包括但不限于流量数据、位置数据、网络日志和其他通信数据, 不论出于IPX平台计算费用之目的或其他目的。
                    </p>
                        <br/>
                    <h4>1. IPX平台收集的信息</h4>
                        <br/>
                    <p>IPX平台可能收集和使用关于您的下列信息，您使用IPX平台网服务即表明您同意IPX平台的该等收集与使用:
                        (1)您在填写IPX平台上的表格时提供的信息，包括但不限于您注册并使用IPX平台、注册参与同步拍、订阅服务、上传资料或请求进一步服务时所提供的信息。
                        (2)您与IPX平台联系的通信记录。
                        (3)IPX平台请您完成的研究调查。
                        (4)您通过IPX平台网完成交易时，以及参与任何网上竞拍时（无论成功与否）提交的信息。
                        (5)您访问IPX平台网时的信息及您访问的资料, 包括但不限于流量数据、位置数据、网络日志和其他通信数据, 不论出于IPX平台计算费用之目的或其他目的。
                    </p>
                </div>
                <div className="ipx_pop_foot align_ct">
                    <label className={"ipx_checkbox" + (this.state.agreement ? ' checked' : '')} onClick={this.agreementHandler.bind(this, !this.state.agreement)}><i className="iconfont icon-succeed"/> <span className="text-elps">{messages.agreementTip}</span> </label><br/>
                    <button onClick={this.agreeSubmitHandler} className="ipx_btn ipx_M_btn ipx_blue_btn width20per">{messages.agree}</button>
                </div>
            </div>
            <div className="ipx_pop_bg"></div>
        </div>);
    }
}

export default Agreement;
