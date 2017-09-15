# react-family-bucket (react全家桶-pc端-spa)<br>

##  [工程项目简介](https://www.processon.com/view/link/58981142e4b0c738ed002c68)

##  [在线地址](https://agent.ipx.net "欢迎入驻")


### 解决过的棘手问题

#### `问题1: web端大文件异步上传实现方案`
引发原因: 在用户需要批量上传大文件时，若用户切换页面上传中的文件会终止
解决原理: 在根组件中,添加UploadFile组件在整个应用使用流程中一直存在，不管路由是否存在
解决方案: 
1: 业务组件点击触发上传，通过redux通知UploadFile组件
2: 接收到上传通知,通过js模拟input file选取操作
```javascript
const openFileInput = () => {
    const brower = Tool.getBrower();
    const fileInput = document.querySelector("input[name=ajax_upload_file_input]");
    if (brower.firefox) {
        let a = document.createEvent("MouseEvents"); //FireFox兼容处理
        a.initEvent("click", true, true);
        fileInput.dispatchEvent(a);
    } else {
        fileInput.click();
    }
};
```
3: 获取文件流，设置表单域，通过ajax模拟表单提交，需设置请求头`'Content-Type': 'multipart/form-data'`，超时时间尽量长
4: 收到成功响应，通过redux通知业务组件追加一条新纪录



#### `问题2: 文件扩展名在window下获取file.type为空，系统兼容问题，mac下无此问题`
解决方案: 文件名截取文件扩展名
```javascript
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    //String.lastIndexOf() 方法返回指定值（本例中的'.'）在调用该方法的字符串中最后出现的位置，如果没找到则返回 -1。
    //对于'filename'和'.hiddenfile'，lastIndexOf的返回值分别为0和-1无符号右移操作符(»>) 将-1转换为4294967295，将-2转换为4294967294,
    //这个方法可以保证边缘情况时文件名不变。
    //String.prototype.slice() 从上面计算的索引处提取文件的扩展名。如果索引比文件名的长度大，结果为""。
 }
```



#### `问题3: web端直传阿里OSS<强烈推荐👍>`
解决方案：[服务端签名直传并设置上传回调](https://help.aliyun.com/document_detail/31927.html)
一个服务端的签名只能对应一个文件，所以如果需要批量上传得让后台批量生产签名与callback以及业务中的唯一ID



#### `问题4: 上传进度条处理方案`
利用xmlRequest2 的onprogress监听文件上传的进度`不是上传完成的进度`，只表示客户端文件流发送的进度，真正意义上的上传完成进度需要
[文档链接](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload)



#### `问题5: 本地图像裁剪上传问题`
解决原理: file -> base64 -> canvas crop -> file -> upload<br>
1: 根据文件流获取图片base64
```javascript
export function getBase64ByFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            if (reader.result) {
                resolve(reader.result);
            } else {
                reject('get image file base64 data error');
            }
        }.bind(this);
    });
}
```

2: 利用canvas进行裁剪
a: 放大镜效果原理: 选中区域宽度(动态计算): 预览容器宽度(自定义) = 放大展现的图片宽度(自定义): 预览图片缩放宽度(待求)
b: 如果利用裁剪完成后的base64图片数据做预览处理，图片会模糊，利用原图用过样式控制显示局部区域无此问题（借鉴worktile网站的个人头像裁剪,xixi）
c: crop方法
```javascript
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

        // 裁剪完成后的base64数据
        return canvas.toDataURL(cropFile.type, 1), // 图片质量为1，不做压缩处理
    };
```

3: base64转Blob文件
```javascript
export function getBlobByBase64(file, type) {
    //去掉url的头，并转换为byte
    let bytes = window.atob(file.split(',')[1]);
    //处理异常,将ascii码小于0的转换为大于0
    let ab = new ArrayBuffer(bytes.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {type: type || 'image/jpeg'});
}
```
