/**
 * Created by zhuo on 2017/1/24.
 */
import React from "react";
import Menu from "./common/viewMenu";
import Bread from "./common/viewBread";
import pureRender from "pure-render-decorator";


@pureRender
class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        const location = this.props.router.getCurrentLocation();
        return <div className="ipx_proj_preview">
            <Menu/>
            {
                location.pathname.indexOf('/detail') !== -1 ? <Bread/> : null
            }
            {this.props.children}
        </div>;
    };
}

export default Home;