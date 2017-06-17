import React from "react";
import {injectIntl} from 'react-intl';

class Confirm extends React.Component {
    constructor(props) {
        super(props);
    }

    handle(ok) {
        this.props.handle(true, ok);
    }

    render() {
        const {messages} = this.props.intl;
        return (
            <div className={"ipx_pop " + (this.props.hide ? "hide" : "")}>
                <div className="ipx_pop_box ipx_pop_confirm">
                    <div className="ipx_pop_head">
                        <h2 className="float_lf">{this.props.title}</h2>
                        <a href="javascript:" className="float_rt" onClick={this.handle.bind(this, false)}>
                            <i className="iconfont icon-close"/></a>
                    </div>
                    <div className="ipx_pop_body" style={{"textAlign": "center"}}>
                        <p>{this.props.content}</p>
                    </div>
                    <div className="ipx_pop_foot">
                        <button className="ipx_btn ipx_M_btn ipx_red_btn width33per"
                                onClick={this.handle.bind(this, true)}>
                            {messages.deleteResourceTip}
                        </button>
                        <button className="ipx_btn ipx_M_btn ipx_grey_btn width33per"
                                onClick={this.handle.bind(this, false)}>
                            {messages.cancel}
                        </button>
                    </div>
                </div>
                <div className="ipx_pop_bg"></div>
            </div>

        );
    }
}


export default injectIntl(Confirm);
