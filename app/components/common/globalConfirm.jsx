import React from "react";
import {connect} from "react-redux";
import {injectIntl} from 'react-intl';
import {setGlobalConfirm} from 'REDUX/actions/global';
import {isEqual, objCopy} from 'LIB/tool';
import pureRender from "pure-render-decorator";

@pureRender
class GlobalConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: true,
            title: '',
            content: '',
            confirm: true,
            cancel: false
        };
    }

    componentWillReceiveProps(nextProps) {
        // 搜索条件变化
        if (nextProps.global.globalConfirm && !isEqual(nextProps.global.globalConfirm, this.state)) {
            const {globalConfirm} = nextProps.global;
            // 同步子组件状态
            this.setState({
                hide: globalConfirm.hide,
                title: globalConfirm.title,
                content: globalConfirm.content,
                confirm: globalConfirm.confirm,
                cancel: globalConfirm.cancel
            });
        }
    }

    handle = (ok) => {
        this.props.dispatch(setGlobalConfirm(Object.assign(objCopy(this.state), {hide: ok})));
    };

    render() {
        const {messages} = this.props.intl;
        return (
            <div className={"ipx_pop " + (this.state.hide ? "hide" : "")}>
                <div className="ipx_pop_box ipx_pop_confirm">
                    <div className="ipx_pop_head">
                        <h2 className="float_lf">{this.state.title}</h2>
                        <a href="javascript:"
                           className="float_rt"
                           onClick={this.handle.bind(this, true)}>
                            <i className="iconfont icon-close"/>
                        </a>
                    </div>
                    <div className="ipx_pop_body" style={{"textAlign": "center"}}>
                        <p>{this.state.content}</p>
                    </div>
                    <div className="ipx_pop_foot" style={{"textAlign": this.state.cancel ? "left" : "center"}}>
                        <button className="ipx_btn ipx_M_btn ipx_red_btn width33per" onClick={this.handle.bind(this, true)}>{messages.ensure}</button>
                        {
                            this.state.cancel ? <button className="ipx_btn ipx_M_btn ipx_grey_btn width33per" onClick={this.handle.bind(this, true)}>{messages.cancel}</button> : null
                        }
                    </div>
                </div>
                <div className="ipx_pop_bg"></div>
            </div>
        );
    }
}


export default connect((store) => (store))(injectIntl(GlobalConfirm));
