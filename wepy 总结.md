# wepy-cli

1. 全局安装或更新WePY命令行工具

    ```bash
    npm install wepy-cli -g
    ```
2. 进入项目，安装依赖
3. 开始实时编译

    ```bash
    wepy build --watch
    ```

在官方原始项目的基础上开发自己的小程序项目，安装依赖，借用原始项目的 `.editorconfig 、 esliint 、 webpack` 配置，添加自己的 `.gitignore` 配置如下：

```bash
.vscode
.DS_Store
/node_modules
/logs
/cache
/dist
/nfs
/static/node_modules
/static/download
.wepycache
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

如果项目根目录不包含 `project.config.json` 文件，手动添加该文件，配置如下：

```json
{
    "description": "project description",
    "setting": {
        "urlCheck": true,
        "es6": false,
        "postcss": false,
        "minified": false
    },
    "compileType": "miniprogram",
    "appid": "touristappid",
    "projectname": "Project name",
    "miniprogramRoot": "./dist"
}
```

## app.wpy

小程序入口，不包含 template 标签

包含一个 config 属性，和其它全局属性、方法、事件。其中config属性对应原生的app.json文件

```html
<script>
import wepy from 'wepy';
export default class extends wepy.app {
    config = {
        "pages":[
            "pages/index/index"
        ],
        "window":{
            "backgroundTextStyle": "light",
            "navigationBarBackgroundColor": "#fff",
            "navigationBarTitleText": "WeChat",
            "navigationBarTextStyle": "black"
        }
    };
    // 自定义属性
    globalData = {
        userInfo: null,
        // 访问后端接口 url
        backgroundCheckUrl: 'http://192.168.0.103:3001' //'https://sdgo.lzkjchina.com'  //'http://zeningtest.free.ngrok.cc'
    };
    onLaunch() {
        console.log(this);
    }
}
</script>

<style lang="less">

</style>
```

## index.wpy

小程序首页，可以引入其他组件

```html
<template>
    <!-- 绑定事件 -->
    <view class="container"
    @touchstart="handleTouchstart"
    @touchend="handleTouchend">
    <!-- 绑定鼠标点击事件，如果不需要参数或者仅需要事件参数e，可以只写 methods 里面的函数名 -->
    <view class="logoCardContainer" @tap="sendCard">
        <view>
            <image src="/asserts/image/home/plus.png" />
        </view>
        <text>写卡片</text>
    </view>
    <!-- 根据 isShow 属性判断是否显示该组件 -->
    <ProductCard wx:if="{{isShow}}" />
    <BtnCom />
    </view>
</template>
<script>
    import wepy from "wepy";
    import BtnCom from "../components/btnCom";
    import ProductCard from "../components/productCard";
    export default class Index extends wepy.page {
        config = {
            navigationBarTitleText: "SDGo社区"
        };
        // 必须定义 components 属性才能在在页面中使用该组件
        components = {
            BtnCom,
            ProductCard
        };
        data = {
            isShow: false,
            sendCardPower: 1
        };
        methods = {
            // 路由跳转
            navigate(pageName) {
                wepy.navigateTo({
                    url: `/pages/${pageName}/index`
                });
            }
            // 写卡片
            sendCard() {
                let localUrl = this.$parent.globalData.backgroundCheckUrl;
                let session_key = wx.getStorageSync('session_key');
                GET(`${localUrl}/user/user`, {
                    session_key: session_key
                }, res => {
                    if (res.data.status === 1) {
                        this.sendCardPower = res.data.data.send_card_power;
                        this.$apply();
                        this.methods.navigate('add_card_page', this.sendCardPower);
                    } else {
                        console.log(res, '失败');
                    }
                });
            }
        };
        // 自定义方法，触发子组件 switchCard 方法更新卡片数据
        assignmentAction(item) {
            this.$broadcast('switchCard', item);
        }
    }
</script>
```

## 组件通信与交互

`$boradcast` 与 `$emit` 调用的必须是组件 events 中的方法，而 `$invoke` 调用的必须是 methods 中的方法

1. 父组件 --> 子组件

    `this.$broadcast('子组件 events 中的函数名', 1, 2, 3, 4)`

2. 子组件 --> 父组件

    `this.$emit('父组件 events 中的函数名', 1, 2, 3, 4)`

3. 一个页面或组件对另一个组件中的方法的直接调用，通过传入组件路径找到相应的组件（**先退到页面，再进入页面中的另一个组件**），然后再调用其方法（**必须写在 methods 属性中**）

    `this.$invoke('./../ProductCard', 'someMethod', someArgs)`

## props 传值

1. 静态传值，在父组件 template 模板部分的组件标签中，使用子组件 props 对象中所声明的属性名作为其属性名来接收父组件传递的值

    ```c#
    <child title="mytitle"></child>

    // child.wpy
    props = {
        title: String
    };

    onLoad () {
        console.log(this.title); // mytitle
    }
    ```
2. 动态传值

    1. `.sync` 表明父组件数据绑定至子组件的效果
    2. 设置子组件 props 的 `twoWay: true` 来达到子组件数据绑定至父组件的效果

## 组件循环渲染

```html
<template>
    <!-- 注意，使用for属性，而不是使用wx:for属性 -->
    <repeat for="{{list}}" key="index" index="index" item="item">
        <!-- 插入<script>脚本部分所声明的child组件，同时传入item -->
        <child :item="item"></child>
    </repeat>
</template>
```

## 卡片左滑右滑

依据点击鼠标开始事件与点击鼠标结束事件判断卡片左滑或者右滑

```js
handleTouchstart(e) {
    this.mouseData.lastX = e.touches[0].pageX;
    this.mouseData.lastY = e.touches[0].pageY;
},
handleTouchend(e) {
    // this.currentGesture = 0;
    // this.mouseData.text = '没有滑动';
    var currentX = e.changedTouches[0].pageX;
    var currentY = e.changedTouches[0].pageY;
    var tx = currentX - this.mouseData.lastX;
    var ty = currentY - this.mouseData.lastY;
    var text = "";
    // 左右方向滑动
    if (Math.abs(tx) > Math.abs(ty)) {
        if (tx < 0) {
            text = "left";
            this.sliderCardAddNum();
        } else if (tx > 0) {
            this.sliderCardAddNum();
            text = "right";
        }
    } else {
        if (ty < 0) {
            text = "up";
        } else if (ty > 0) {
            text = "down";
        }
    }
    // 将当前坐标保存进行下次计算
    this.mouseData.lastX = currentX;
    this.mouseData.lastY = currentY;
    // this.mouseData.text = text
    // 滑动卡片
    this.sliderCard(text);
}
```
