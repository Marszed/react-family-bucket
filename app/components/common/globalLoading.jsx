/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {injectIntl} from 'react-intl';
import { connect } from 'react-redux';
import loading from 'ASSET/img/ipx-loading.gif';
import pureRender from "pure-render-decorator";

function mapStateToProps(state) {
    return Object.assign({}, state.global);
}
@pureRender
class GlobalLoading extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className={"zIndex_1 " + (this.props.globalLoading ? "" : "hide")}
            style={{
                "position": "fixed",
                "left": 0,
                "top": 0,
                "right": 0,
                "bottom": 0,
                "height": 100 + "%"
            }}>
            <div className="ipx_loading_pop layer-zIndex-2000">
                <img src={loading} alt="IPX"/>
                <span>{this.props.globalLoading || this.props.intl.messages.loading}</span>
            </div>
        </div>;
    }
}

export default connect(mapStateToProps)(injectIntl(GlobalLoading));
