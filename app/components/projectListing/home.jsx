/**
 * Created by zhuo on 2017/1/24.
 */
import React from "react";
import Menu from "../common/menu";
import pureRender from "pure-render-decorator";
import {cookie} from 'LIB/tool';

@pureRender
class Home extends React.Component {

    componentWillMount = () => {
        if (Number(this.props.location.query.isFresh) === 1) {
            this.props.router.push({
                pathname: '/projectListing/' + cookie('allFlag') + '/country.000/overview',
                query: {isFresh: 0}
            });
            setTimeout(() => (window.location.reload(true)));
        }
    };

    render = () => (
        <div>
            <Menu/>
            <div className="ipx_dev_cont">
                {this.props.children}
            </div>
        </div>
    );
}

export default Home;