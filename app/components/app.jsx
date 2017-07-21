/**
 * Created by marszed on 2017/3/3.
 */
import React from 'react';
import GlobalLoading from 'COMPONENT/common/globalLoading';
import GlobalConfirm from 'COMPONENT/common/globalConfirm';
import Toast from 'COMPONENT/common/toast';
import ImageCrop from 'COMPONENT/common/imageCrop/imageCrop';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            {this.props.children}
            <GlobalLoading />
            <GlobalConfirm />
            <Toast />
            <ImageCrop />
        </div>;
    }
}
