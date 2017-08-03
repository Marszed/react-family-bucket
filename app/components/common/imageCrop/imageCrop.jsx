import React from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import ReactCrop from 'react-image-crop';
import {setImageCropResponse, setImageCropRequest} from "REDUX/actions/global";
import {objCopy, isEqual, getBase64ByFile, getBlobByBase64} from 'LIB/tool';
import './imageCrop.css';

class ImageCrop extends React.Component {
    constructor(props) {
        super(props);
        // 设置图片初始值
        this.state = {
            src: null,
            disabled: true, // 没有图片资源默认不可裁剪
            crossorigin: 'true',
            crop: {
                x: 0,
                y: 0,
                // aspect: false,
                width: 50,
                height: 50
            },
            imageSquare: true,
            imageAlt: 'ipx',
            /*minWidth: 50,
            minHeight: 50,
            maxWidth: 400,
            maxHeight: 400*/
        };
    }

    // 监听数据变化
    componentWillReceiveProps(nextProps) {
        if (nextProps.global.imageCropRequest && !isEqual(nextProps.global.imageCropRequest, this.state.imageCropRequest)) {
            const {imageCropRequest} = nextProps.global;
            this.setState({
                imageCropRequest: imageCropRequest
            });
            if (imageCropRequest && imageCropRequest.cropFile){
                getBase64ByFile(imageCropRequest.cropFile).then((base64) => {
                    this.setState({
                        src: base64,
                        disabled: false,
                        crop: imageCropRequest.crop || this.state.crop,
                        imageSquare: imageCropRequest.imageSquare !== undefined ? imageCropRequest.imageSquare : this.state.imageSquare,
                        imageAlt: imageCropRequest.imageAlt || this.state.imageAlt,
                        minWidth: imageCropRequest.minWidth || this.state.minWidth,
                        minHeight: imageCropRequest.minHeight || this.state.minHeight,
                        maxWidth: imageCropRequest.maxWidth || this.state.maxWidth,
                        maxHeight: imageCropRequest.maxHeight || this.state.maxHeight
                    });
                }).catch((error) => {
                    console.log('file to image base64 failure');
                    console.log(error);
                });
            }
        }
    }

    onImageLoaded = (crop) => {
        console.log('onImageLoaded:');
        console.log(crop);
        this.onCropChange(crop);
    };

    onCropComplete = (crop) => {
        console.log('onCropComplete:');
        console.log(crop);
        this.setState({crop});
    };

    onCropChange = (crop) => {
        console.log('onCropChange:');
        console.log(crop);
        this.cropImage(this.state.src, crop);
    };

    cropImage = (src, crop) => {
        const {imageSquare} = this.state;
        const {cropFile} = this.state.imageCropRequest;
        const widthRefer = imageSquare ? 100 : 266;
        const heightRefer = imageSquare ? 100 : 88;

        let loadedImg = new Image();
        loadedImg.src = src;
        let imageWidth = loadedImg.naturalWidth; // 获取图片原始宽度
        let imageHeight = loadedImg.naturalHeight;
        let cropX = (crop.x / 100) * imageWidth; // 获取图片裁剪横坐标
        let cropY = (crop.y / 100) * imageHeight;
        let cropWidth = (crop.width / 100) * imageWidth; // 获取图片裁剪宽度
        let cropHeight = (crop.height / 100) * imageHeight;


        //------裁剪图片生成-------

        let canvas = document.createElement('canvas');
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        let ctx = canvas.getContext('2d');
        const imageCropCopy = document.getElementsByClassName("ReactCrop__image-copy")[0];
        const imageCropCopyWidth = imageCropCopy.width;
        const imageCropCopyHeight = imageCropCopy.height;
        ctx.drawImage(loadedImg, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

        this.setState({
            cropped: canvas.toDataURL(cropFile.type, 1), // 图片质量为1，不做压缩处理
            crop
        });

        //------预览图片样式控制-------

        //选中区域宽度
        const cropSelectWidth = (crop.width / 100) * imageCropCopyWidth;
        const cropSelectHeight = (crop.height / 100) * imageCropCopyHeight;
        // 缩放比例
        const rateWidth = cropSelectWidth/widthRefer;
        const rateHeight = cropSelectHeight/heightRefer;

        // 选中区域宽度: 预览容器宽度 = 裁剪区域展现的图片宽度: 预览图片缩放宽度(待求)
        // cropSelectWidth : 100 = imageCropCopyWidth : y
        const newWidth = imageCropCopyWidth/rateWidth;
        const newHeight = imageCropCopyHeight/rateHeight;
        this.setState({
            imagePreview: {
                width: newWidth + 'px',
                maxWidth: newWidth + 'px',
                height: newHeight + 'px',
                maxHeight: newHeight + 'px',
                marginLeft: -newWidth*(crop.x/100) + 'px',
                marginTop: -newHeight*(crop.y/100) + 'px'
            }
        });
    };

    onAspectRatioChange = (crop) => {
        this.setState(crop);
    };

    // 开始上传
    uploadHandler = () => {
        if (this.state.cropped) {
            this.setState({
                src: null,
                cropped: null
            });
            const {cropFile, key} = this.state.imageCropRequest;
            this.props.dispatch(setImageCropResponse({
                key: key,
                cropTime: (new Date()).getTime(),
                cropFile: getBlobByBase64(this.state.cropped, cropFile.type),
                cropFileType: cropFile.type,
                cropFileName: cropFile.name
            }));
        }
    };

    // 取消上传
    cancelHandler = () => {
        this.setState({
            src: null,
            cropped: null,
            imageCropRequest: ''
        });
        this.props.dispatch(setImageCropRequest(''));
    };

    render() {
        const {messages} = this.props.intl;
        const {imageSquare} = this.state;
        return (
            <div>
                <div className={"ipx_pop " + (!this.state.src ? "hide" : "")}>
                    <div className="ipx_pop_box ipx_pop_imageCrop">
                        <div className="ipx_pop_head">
                            <h2 className="float_lf">{messages.imageCrop}</h2>
                            <a href="javascript:" className="float_rt" onClick={this.cancelHandler}>
                                <i className="iconfont icon-close"/></a>
                        </div>
                        {
                            imageSquare ?
                                <div className="ipx_pop_body ipx_imageCrop_square">
                                    <div className="imageCrop_square_box inline_block_box">
                                        <ReactCrop
                                            {...this.state}
                                            onImageLoaded={crop => this.onImageLoaded(crop)}
                                            onComplete={crop => this.onCropComplete(crop)}
                                            onAspectRatioChange={crop => this.onAspectRatioChange(crop)}
                                            onChange={this.onCropChange}
                                        />
                                    </div>
                                    <div className="inline_block_box">
                                        <p style={{marginBottom: '10px'}}>{messages.uploadPreview}</p>
                                        <div className="imageCrop_preview_box">
                                            <img src={this.state.src} alt={this.state.imageAlt} style={this.state.imagePreview}/>
                                        </div>
                                    </div>
                                </div> :
                                <div className="ipx_pop_body ipx_imageCrop_rectangle">
                                    <div className="imageCrop_rectangle_box inline_block_box v_align_bottom" style={{marginRight: '10px'}}>
                                        <ReactCrop
                                            {...this.state}
                                            onImageLoaded={crop => this.onImageLoaded(crop)}
                                            onComplete={crop => this.onCropComplete(crop)}
                                            onAspectRatioChange={crop => this.onAspectRatioChange(crop)}
                                            onChange={this.onCropChange}
                                        />
                                    </div>
                                    <div className="ipx_imageCrop_preview clearfix inline_block_box v_align_bottom">
                                        <span className="float_lf">{messages.uploadPreview}</span>
                                        <div className="imageCrop_preview_box float_lf">
                                            <img src={this.state.src} alt={this.state.imageAlt} style={this.state.imagePreview}/>
                                        </div>
                                    </div>
                                </div>
                        }
                        <div className="ipx_pop_foot">
                            <button className="ipx_btn ipx_M_btn ipx_blue_btn width33per"
                                    onClick={this.uploadHandler}>
                                {messages.uploadStart}
                            </button>
                        </div>
                    </div>
                    <div className="ipx_pop_bg"></div>
                </div>
            </div>
        );
    }
}

export default connect((store) => (store))(injectIntl(ImageCrop));
