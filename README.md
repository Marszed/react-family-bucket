# react-family-bucket (react全家桶-pc端-spa)<br>

##  [工程项目简介](https://www.processon.com/view/link/58981142e4b0c738ed002c68)

##  [在线地址](https://agent.ipx.net "欢迎入驻")


### 解决过的棘手问题

#### `问题1: web端大文件异步上传实现方案`
引发原因: 在用户需要批量上传大文件时，若用户切换页面上传中的文件会终止
解决原理: 在根组件中,添加UploadFile组件<在整个应用使用流程中一直存在，不管路由是否存在>
解决方案: <br>
    1: 业务组件点击触发上传，通过redux通知UploadFile组件<br>
    2: 接收到上传通知,通过js模拟input file选取操作<有兼容问题><br>
    ```javascript
        openFileInput = () => {
            const brower = Tool.getBrower();
            const fileInput = document.querySelector("input[name=ajax_upload_file_input]");
            if (brower.firefox) {
                let a = document.createEvent("MouseEvents"); //FF的处理
                a.initEvent("click", true, true);
                fileInput.dispatchEvent(a);
            } else {
                fileInput.click();
            }
        };


#### `问题2: web端大文件异步上传实现方案`

#### `问题3: web端直传阿里OSS<强烈推荐👍>`

#### `问题4: 图像裁剪上传👍>`

