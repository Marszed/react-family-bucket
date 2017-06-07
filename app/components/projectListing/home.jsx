/**
 * Created by zhuo on 2017/1/24.
 */
import React from "react";
import {connect} from 'react-redux';
import Menu from "../common/menu";
import pureRender from "pure-render-decorator";
import {setFormRadioType} from 'REDUX/actions/global';

@pureRender
class Home extends React.Component {

    componentWillUnmount(){
        this.props.dispatch(setFormRadioType({
            key: 'viewType',
            value: 0
        }));
    }

    render = () => (
        <div>
            <Menu/>
            <div className="ipx_dev_cont">
                {this.props.children}
            </div>
        </div>
    );
}

export default connect((state) => (state))(Home);