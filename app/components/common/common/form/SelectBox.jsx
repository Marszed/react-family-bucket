/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import SelectOption from './SelectOption';
import {langPackageInject} from "LIB/tool";


let pleaseChoose = "Please Choose";

if (langPackageInject().indexOf('zh') !== -1){
    pleaseChoose = "请选择";
}

class SelectBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: '',
            chosen: false,
            initState: true,
            hide: false,
            info: ""
        };
    }
    // 检查自身是否满足验证规则
    checkSelf = () => (
        this.setState({
            initState: false
        })
    );
    clearSelect = () => (
        this.setState({placeholder: this.props.placeholder})
    );
    selectHandler = (options) => {
        this.setState({
            placeholder: options.dicValue,
            hide: true
        });
        // 通知父级接受用户选择参数
        this.props.chooseHandler(Object.assign({level: this.props.leave}, options));
    };
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.placeholder){
            this.setState({
                placeholder: nextProps.placeholder,
                initState: true
            });
        } else {
            this.setState({
                placeholder: "",
                initState: false
            });
        }
    };
    mouseLeaveHandler = () => {
        if (this.props.leave === "one"){
            this.setState({initState: false});
        }
    };
    mouseEnterHandler(event){
        this.setState({
            hide: false
        });
    }
    render() {
        const liItem = this.props.items.map((item, index) => (
            <SelectOption item={item} key={item.regionId} selectHandler={this.selectHandler.bind(this)}/>
        ));

        return (
            <div>
                <div className={this.props.className || "ipx_select width96per" + ((this.state.placeholder !== this.props.placeholder || this.state.placeholder !== pleaseChoose || this.state.initState) ? "" : " warning")}
                     onMouseLeave={this.mouseLeaveHandler.bind(this)}
                     onMouseEnter={this.mouseEnterHandler.bind(this)}
                     onClick={this.mouseEnterHandler.bind(this)}
                >
                    <div>
                        <span>{this.state.placeholder || pleaseChoose}</span>
                        <i className="iconfont icon-downArrow"/>
                    </div>
                    <ul className={this.state.hide ? "hide" : ""}>
                        {liItem}
                    </ul>
                </div>
                <p className={"warningTxt" + ((this.state.placeholder !== this.props.placeholder || this.state.placeholder !== pleaseChoose || this.state.initState) ? " hide" : "")}>{pleaseChoose}</p>
            </div>
        );
    }
}

SelectBox.defaultProps = {
    items: [],
    leave: 'one'
};

export default SelectBox;