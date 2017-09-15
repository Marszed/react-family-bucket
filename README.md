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


#### `问题2: 文件扩展名在window下获取file.file为空，已查证兼容问题，mac下无此问题`
解决方案: 字符串截取

#### `问题3: web端直传阿里OSS<强烈推荐👍>`

#### `问题4: 图像裁剪上传👍>`

