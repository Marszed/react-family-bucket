/**
 * Created by zhuo on 2017/1/24.
 */
import React from "react";
import {injectIntl} from "react-intl";
import Menu from "COMPONENT/common/menu";
import Header from "COMPONENT/common/setting/header";
import Child from "./companySetting";
import pureRender from "pure-render-decorator";

@pureRender
class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render = () => {
        const {messages} = this.props.intl;
        return <div>
            <Menu/>
            <div className="ipx_dev_cont">
                <Header title={messages.companySetting} data={[{title: messages.companySetting, to: '/companySetting'}]}/>
                <Child/>
            </div>
        </div>;
    };
}

export default injectIntl(Home);