/**
 * Created by zhuo on 2017/1/24.
 */
import React from "react";
import Menu from "../common/menu";
import pureRender from "pure-render-decorator";

@pureRender
class Home extends React.Component {

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