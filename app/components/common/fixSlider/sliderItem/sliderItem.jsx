/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';


export default class sliderItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { count, item } = this.props;
        let width = 100 / count + '%';
        return (
            <li className="slider-item" style={{width: width}}>
                <img src={item.url || item.resourceUrl} alt={item.fileName || 'ipx'}/>
            </li>
        );
    }
}

