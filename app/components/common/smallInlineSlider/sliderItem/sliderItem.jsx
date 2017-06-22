/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';


export default class sliderItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { count, item } = this.props;
        const width = 100 / count + '%';
        const src = JSON.stringify(item.url || item.resourceUrl);
        const style = {
            width: width,
            float: 'left',
            height: '100%',
            backgroundImage: 'url(' + src + ')',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'contain'
        };
        return (
            <li className="slider-item" style={style}/>
        );
    }
}

