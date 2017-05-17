/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import pureRender from "pure-render-decorator";

@pureRender
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputPageNum: 1
        };
        this.handleChange = this.handleChange.bind(this);
        this.pageSubmit = this.pageSubmit.bind(this);
    }
    // 显示的页码按钮数量， 默认为 7
    getRange() {
        return this.props.range || 7;
    }
    // 获取当前页面，默认 1
    getCurrentPage() {
        return this.props.currentPage || 1;
    }
    // 页数拆分
    getPages() {
        const { totalPages } = this.props; // 总页数
        let left;
        let right;
        const range = this.getRange(); // 显示的页码按钮数量
        const pages = [];
        let currentPage = this.getCurrentPage(); // 当前页码

        if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        left = currentPage - Math.floor(range / 2) + 1;
        if (left < 1) {
            left = 1;
        }

        right = left + range - 2;
        if (right >= totalPages) {
            right = totalPages;
            left = right - range + 2;
            if (left < 1) {
                left = 1;
            }
        } else {
            right -= left > 1 ? 1 : 0;
        }

        if (left > 1) {
            pages.push(1);
        }
        if (left > 2) {
            pages.push('<..');
        }
        for (let i = left; i < right + 1; i++) {
            pages.push(i);
        }
        if (right < totalPages - 1) {
            pages.push('..>');
        }
        if (right < totalPages) {
            pages.push(totalPages);
        }
        return { pages, totalPages };
    }
    // 点击分页
    handleChange(value) {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }
    // 输入翻页
    inputPageHandler(e){
        let value = e.target.value.trim();
        // 大于0的正整数
        if (/^[1-9]\d*$/.test(value)){
            this.setState({
                inputPageNum: value
            });
        } else {
            this.setState({
                inputPageNum: 0
            });
        }
    }
    // 翻页提交
    pageSubmit(){
        if ((this.state.inputPageNum <= this.props.totalPages && this.state.inputPageNum >= 1)){
            this.refs.inputPage.value = '';
            this.props.onChange(this.state.inputPageNum);
        }
    }
    render() {

        const currentPage = this.getCurrentPage();
        const items = [];
        const { pages, totalPages } = this.getPages();
        // 上一页
        items.push(
            <a href="javascript:;"
               key="previous"
               className={currentPage <= 1 ? "disable" : ""}
               onClick={currentPage <= 1 ? null : () => this.handleChange(currentPage - 1)}>&lt;</a>
        );
        // 中间页码
        pages.forEach((value, index) => {
            if (value === '<..' || value === '..>') {
                items.push(<a className="ipx_turnPage_txt">&hellip;</a>);
            } else {
                items.push(
                    <a href="javascript:;"
                       key={value}
                       className={value === currentPage ? "active" : ""}
                       onClick={value === currentPage ? null : () => this.handleChange(value)}>{value}</a>
                );
            }
        });
        // 下一页
        items.push(
            <a href="javascript:;"
               key="next"
               onClick={currentPage >= totalPages ? null : () => this.handleChange(currentPage + 1)}
               className={currentPage >= totalPages ? "disable" : ""}>&gt;</a>
        );
        // 页码输入
        items.push(
            <a className="ipx_turnPage_input">
                <input type="text"
                       ref="inputPage"
                       onChange={this.inputPageHandler.bind(this)}/>
            </a>
        );
        // 页码提交
        items.push(
            <a className="ipx_turnPage_go" onClick={this.pageSubmit}>GO</a>
        );
        return (
            <ul className="ipx_turnPage">
                {!this.props.totalPages ? "" : items}
            </ul>
        );
    }
}

export default Page;