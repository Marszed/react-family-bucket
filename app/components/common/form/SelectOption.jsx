/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';

export default class selectOption extends React.Component {
    constructor(props) {
        super(props);
    }
    handleArrowClick = (option) => (
        this.props.selectHandler(option)
    );
    render = () => (
        <li onClick={this.handleArrowClick.bind(this, this.props.item)}>{this.props.item.dicValue}</li>
    );
}

