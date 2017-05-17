/**
 * Created by marszed on 2017/5/12.
 */
import React from "react";
import {createForm} from "rc-form";
import {objCopy} from 'LIB/tool';
import pureRender from "pure-render-decorator";

@pureRender
class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: this.props.hide || true,
            gender: '',
            data: {}
        };
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.hideShot !== undefined && nextProps.hideShot !== this.state.hideShot){
            this.setState({
                hideShot: nextProps.hideShot
            });
            this.hideHandler(false);
        }
        if (nextProps.data !== undefined && nextProps.data !== this.state.data){
            this.setState({
                data: nextProps.data,
                gender: Number(nextProps.data.gender)
            });
        }
    }

    hideHandler = (flag) => {
        this.setState({
            hide: flag
        });
        // 关闭窗口重置
        if (flag === true){
            this.onReset();
        }
    };

    submit = () => {
        this.props.form.validateFields((error, value) => {
            if (!error) {
                this.props.submit(Object.assign(objCopy(value), {
                    agentId: this.state.data.agentId,
                    firstName: value.firstName,
                    lastName: value.lastName,
                    empNum: value.empNum,
                    gender: this.state.gender
                }));
                // 重置添加
                setTimeout(() => (
                    this.onReset()
                ), 0);
            } else {
                console.log('编辑经纪人验证报错', value);
            }
        });
    };

    onReset = () => {
        this.props.form.resetFields();
        this.setState({
            gender: ''
        });
        setTimeout(() => {
            for (let i = 0; i < 3; i++){
                document.getElementsByName('agentInput' + (i + 1))[0].value = '';
            }
        }, 0);
    };

    genderHandler = (gender) => {
        this.setState({
            gender: gender
        });
    };

    disableAgent = (state) => (
        this.props.disableAgent({
            agentId: this.state.data.agentId,
            state: state
        })
    );

    render() {
        const {messages} = this.props;
        const {data} = this.state;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div className={"ipx_pop zIndex-1000" + (this.state.hide ? ' hide' : '')}>
                <div className="ipx_pop_box property_export_pop">
                    <div className="ipx_pop_head">
                        <h2 className="float_lf">{messages.updateAgent}</h2>
                        <a href="javascript:;" className="float_rt" title={messages.close} onClick={this.hideHandler.bind(this, true)}><i className="iconfont icon-close"/></a>
                    </div>
                    <div className="ipx_pop_body">
                        <table width="500" className="addnewAgent" id="addAgent">
                            <tr>
                                <td width="150" className="addnewAgent_tit">{messages.name}</td>
                                <td>
                                    <input name='agentInput1' className={"ipxTxt addnewAgent_txt1" + (!!getFieldError('firstName') ? ' warning' : '')} type="text" placeholder={messages.firstName} maxLength="50" {...getFieldProps('firstName', {
                                        rules: [
                                            {
                                                required: true,
                                                message: messages.pleaseInput + messages.firstName
                                            }
                                        ],
                                        initialValue: data.firstName
                                    })}/>
                                    <input name='agentInput2' className={"ipxTxt addnewAgent_txt1" + (!!getFieldError('lastName') ? ' warning' : '')} type="text" placeholder={messages.lastName} {...getFieldProps('lastName', {
                                        rules: [
                                            {
                                                required: true,
                                                message: messages.pleaseInput + messages.lastName
                                            }
                                        ],
                                        initialValue: data.lastName
                                    })}/>
                                    <p className={"warningTxt" + ((getFieldError('firstName') || getFieldError('lastName')) ? '' : ' hide')}>
                                        {
                                            getFieldError('firstName') ? getFieldError('firstName')[0] : (getFieldError('lastName') ? getFieldError('lastName')[0] : null)
                                        }
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td width="150" className="addnewAgent_tit">{messages.sex}</td>
                                <td>
                                    <label className={"ipx_checkbox" + (Number(this.state.gender) === 1 ? ' checked' : '')}>
                                        <i className="iconfont icon-succeed" onClick={this.genderHandler.bind(this, 1)}/> &nbsp; <span className="text-elps">{messages.male}</span>
                                    </label>
                                    <label className={"ipx_checkbox" + (Number(this.state.gender) === 2 ? ' checked' : '')}>
                                        <i className="iconfont icon-succeed" onClick={this.genderHandler.bind(this, 2)}/> &nbsp; <span className="text-elps">{messages.female}</span>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td width="150" className="addnewAgent_tit">{messages.employeeNumber}</td>
                                <input name='agentInput3' className={"ipxTxt addnewAgent_txt" + (getFieldError('empNum') ? ' warning' : '')}
                                       maxLength="50" type="text" placeholder={messages.pleaseInput + messages.employeeNumber}
                                       {...getFieldProps('empNum', {
                                           validateTrigger: 'onChange',
                                           rules: [
                                               {
                                                   required: true,
                                                   message: messages.pleaseInput + messages.employeeNumber
                                               }
                                           ],
                                           initialValue: data.empNum
                                       })}/>
                                <p className={"warningTxt" + (getFieldError('empNum') ? '' : ' hide')}>
                                    {getFieldError('empNum') ? getFieldError('empNum')[0] : null}
                                </p>
                            </tr>
                        </table>
                    </div>
                    <div className="ipx_pop_foot align_ct">
                        <button className="ipx_btn ipx_M_btn ipx_blue_btn width20per" onClick={this.submit} type="submit">{messages.confirm}</button>
                        <button className="ipx_btn ipx_M_btn ipx_red_btn width20per" onClick={this.disableAgent.bind(this, (Number(this.state.data.state) === 1 ? 0 : 1))}>{Number(this.state.data.state) === 1 ? messages.disable : messages.enable}</button>
                        <button className="ipx_btn ipx_M_btn ipx_grey_btn width20per" onClick={this.hideHandler.bind(this, true)}>{messages.cancel}</button>
                    </div>
                </div>
                <div className="ipx_pop_bg"></div>
            </div>
        );
    }
}

export default createForm()(Update);