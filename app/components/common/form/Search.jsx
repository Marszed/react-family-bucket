/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {isEqual, objCopy} from 'LIB/tool';
import pureRender from "pure-render-decorator";
import {setFormSearch} from 'REDUX/actions/global';

/**
 * data 数据类型
 * placeHolder
 * value 搜索值
 */
@pureRender
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data || ''
        };
    }

    componentWillReceiveProps(nextProps) {
        // 收到组件更新指令 formSearch 变化并且 更新的key与组件的name一致
        if (nextProps.global.formSearch && nextProps.global.formSearch.key === this.props.name) {
            this.setState({
                data: nextProps.global.formSearch.value || ''
            });
            // 移除组件更新指令
            this.props.dispatch(setFormSearch(''));
        }
    }

    onInput = (e) => {
        this.setState({
            data: e.target.value
        });
    };

    onKeyUp = (e) => {
        e.keyCode === 13 && this.onSubmit();
    };

    onChange = () => {
        this.props.onChange(this.props.name, this.state.data);
    };

    onSubmit = () => {
        this.props.onSubmit({});
    };

    render() {
        return (
            <div className={this.props.className || "proj_screen_search"} onKeyUp={this.onKeyUp}>
                <input type="text" value={this.state.data} onInput={this.onInput} onBlur={this.onChange} placeholder={this.props.placeholder} maxLength={this.props.maxLength || 200}/>
                <button onClick={this.onSubmit} type="submit"><i className="iconfont icon-magnifier"/></button>
            </div>
        );
    }
}

export default connect((store) => (store))(injectIntl(Search));