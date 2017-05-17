import React from "react";

export default class Confirm extends React.Component {
    constructor(props) {
        super(props);
    }

    handle(ok) {
        this.props.handle(true, ok);
    }

    render() {
        return (
            <div className={"ipx_pop " + (this.props.hide ? "hide" : "")}>
                <div className="ipx_pop_box ipx_pop_confirm">
                    <div className="ipx_pop_head">
                        <h2 className="float_lf">{this.props.title}</h2>
                        <a href="javascript:" className="float_rt" onClick={this.handle.bind(this, false)}>
                            <i className="iconfont icon-close"/></a>
                    </div>
                    <div className="ipx_pop_body">
                        <p>{this.props.content}</p>
                    </div>
                    <div className="ipx_pop_foot">
                        <button className="ipx_btn ipx_M_btn ipx_red_btn width33per"
                                onClick={this.handle.bind(this, true)}>
                            确认
                        </button>
                        <button className="ipx_btn ipx_M_btn ipx_grey_btn width33per"
                                onClick={this.handle.bind(this, false)}>
                            取消
                        </button>
                    </div>
                </div>
                <div className="ipx_pop_bg"></div>
            </div>

        );
    }
}

