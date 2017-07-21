/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import { connect } from 'react-redux';
import loading from 'ASSET/img/ipx-loading.gif';

function mapStateToProps(state) {
    return Object.assign({}, state.global);
}

class InlineLoading extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className={"ipx_loading" + (this.props.inlineLoading ? "" : " hide")}>
            <img src={loading} alt="IPX"/>
            <span>{this.props.inlineLoading}</span>
        </div>;
    }
}

export default connect(mapStateToProps)(InlineLoading);
