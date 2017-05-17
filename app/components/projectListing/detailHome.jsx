/**
 * Created by zhuo on 2017/1/24.
 */
import React from "react";
import pureRender from "pure-render-decorator";

@pureRender
class Home extends React.Component {
    render = () => (
        <div>
            {this.props.children}
        </div>
    );
}

export default Home;