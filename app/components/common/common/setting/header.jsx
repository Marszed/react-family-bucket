/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="dev_cont_title">
            <div className="dev_cont_titleBg">
                <h1 className="float_lf">{this.props.title}</h1>
                <ul>
                    {
                        this.props.data.map((obj) => (
                            <li><Link to={obj.to} activeClassName='active'>{obj.title}</Link></li>
                        ))
                    }
                </ul>
            </div>
        </div>;
    }
}

export default Header;