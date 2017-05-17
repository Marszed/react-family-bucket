/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import { Link } from 'react-router';
import noFoundImage from "ASSET/img/404.jpg";

class NoFound extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{
                "backgroundImage": "url(" + noFoundImage + ")",
                "textAlign": "center",
                "backgroundColor": "#eee",
                "backgroundPosition": "center top",
                "backgroundRepeat": "no-repeat"
            }}>
                <p style={{
                    "display": "inline-block",
                    "margin": "390px auto",
                    "textAlign": "center",
                    "fontSize": 14 + "px",
                    "background": "#eee"
                }}>哦额! 您访问的页面可能不在地球上，请检查您的链接，或者直接 <Link to="/" style={{
                    "color:": "#00afb4"
                }}>返回首页</Link>！</p>
            </div>
        );
    }
}

export default NoFound;