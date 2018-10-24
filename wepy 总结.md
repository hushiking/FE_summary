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

> 在官方原始项目的基础上开发自己的小程序项目，安装依赖，借用原始项目的 `.editorconfig 、 esliint 、 webpack` 配置，添加自己的 `.gitignore` 配置如下：

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

> 如果项目根目录不包含 `project.config.json` 文件，手动添加该文件，配置如下：

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

## WePy的一些坑

1. 如果data数据是对象，改变对象的属性值无法触发重新渲染，必须给对象重新赋值（即改变对象存储的内存地址），页面才会重新渲染
2. Wepy使用this.xx = xx更新数据，如果每次更新的数据值没有发生变化，则页面不重新渲染
3. 卸载页面时（即onUnload方法中）修改数据，需要使用`this.$apply()`让它立即改变
4. 异步函数内部，一定要使用`this.$apply()`立即改变修改值，在回调函数中也要使用`this.$apply()`立即赋值

## 设置微信开发者工具

点击右侧双箭头选择详情，修改项目设置，调整基础调试库，不勾选 ES6 转 ES5 与 启用自定义处理命令；勾选上传代码时样式自动补全，上传代码时自动压缩，不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书以及启用多核心编译

## 实例

分为 App 小程序实例、Page 页面实例和 Component 组件实例

参考 [Wepy 官方文档](https://tencent.github.io/wepy/document.html#/?id=%E5%AE%9E%E4%BE%8B)

由于 Page 页面实际上继承自 Component 组件，即 Page 也是组件。除扩展了页面所特有的 `config` 配置以及特有的页面生命周期函数之外，其它属性和方法与 Component 一致

在 Page 页面实例中，可以通过 `this.$parent` 来访问App实例，在 Component 组件实例中，`this.$parent` 表示组件的父组件

在 Component 组件实例中，`this.$root` 表示组件所在的 Page 对象，如果当前组件是 Page 对象，那么 $root 的值就是自己本身

注意：**WePY中的methods属性只能声明页面wxml标签的bind、catch事件，不能声明自定义方法，这与Vue中的用法是不一致的**

## 组件通信与交互

`$boradcast` 与 `$emit` 调用的*必须是组件 events 中的方法*，而 `$invoke` 调用的*必须是 methods 中的方法*

1. 父组件 --> 子组件

    `this.$broadcast('子组件 events 中的函数名', 1, 2, 3, 4)`

2. 子组件 --> 父组件

    `this.$emit('父组件 events 中的函数名', 1, 2, 3, 4)`

3. 一个页面或组件对另一个组件中的方法的直接调用，通过传入组件路径找到相应的组件（**先退回页面（pages），再进入页面中的另一个组件（components）**），然后再调用其方法（**必须写在 methods 属性中**）

    `this.$invoke('./../ProductCard', 'someMethod', someArgs)`

## 组件自定义事件处理函数

通过 `.user` 修饰符为组件绑定自定义事件，如 `@customEvent.user="myFn"`

其中，`@` 表示修饰符，`customEvent` 表示自定义事件名称，`.user` 表示事件后缀

目前总共有三种事件后缀：

1. `.default`: 绑定小程序冒泡型事件，如 `bindtap`，可省略不写
2. `.stop`: 绑定小程序捕获型事件，如 `catchtap`
3. `.user`: 绑定用户自定义组件事件，通过 `$emit` 触发。**注意，如果用了自定义事件，则events中对应的监听函数不会再执行**

## props 传值

1. 静态传值，在父组件 template 模板部分的组件标签中，使用子组件 props 对象中所声明的属性名作为其属性名来接收父组件传递的值

    ```js
    // 在父组件中使用子组件并传值

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

## 界面交互反馈

包含 wx.showToast 与 wx.showModel 等，参考小程序官方文档 [wx.showToast](https://developers.weixin.qq.com/miniprogram/dev/api/api-react.html#wxshowtoastobject)

## app.wpy

小程序入口，不包含 template 标签

包含一个 config 属性，和其它全局属性、方法、事件。其中config属性对应原生的app.json文件

```html
<script>
import wepy from 'wepy';
export default class extends wepy.app {
    // 配置小程序页面与小程序外观
    config = {
        // 默认加载最上面的页面
        "pages":[
            // 加载页
            "pages/loading_page/index",
            // 登录页
            "pages/login",
            // 首页
            "pages/index",
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

### 卡片左滑右滑

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

## textarea 文本框

输入触发 `@input` 事件

```html
<template>
    <view class="comentCotioner">
        <textarea @input="getContent" placeholder="请输入评论" />
        <view @tap="sendComment" class='button'>发 布</view>
    </view>
</template>
<script>
    import wepy from 'wepy'
    export default class SendComment extends wepy.component {
        data = {
            content: ''
        }
        props = {
            cardId: Number
        }
        methods = {
            // 获取文本框输入的内容
            getContent(e) {
                this.content = e.detail.value
            }
            sendComment() {
                let content = this.content;
                if (this.content.length <= 0) {
                    wx.showModal({
                        title: '提示',
                        content: '评论内容不能为空，请重新填写后发布！',
                        showCancel: false
                    })
                    return;
                }
            }
        }
    }
</script>
```

## 路由跳转（navigateTo 与 redirectTo）

参考 [小程序导航官方文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui-navigate.html)

1. wx.navigateTo(Object)，**注意：目前页面路径最多只能十层**

    保留当前页面，跳转到应用内的某个页面，使用 `wx.navigateBack` 可以返回到原页面。

    ```js
    // 向要跳转的页面传递参数

    wx.navigateTo({
        url: `/pages/team_comment_page/index?id=${this.card_id}`
    })
    ```
    team_comment_page 页面，在跳转完页面的`onLoad(options)`方法的`options`参数中可以获取上个页面传过来的参数
    ```js
    <script>
    import wepy from 'wepy'
    export default class TeamComment extends wepy.page {
        data = {
            card_id: 0
        }
        onLoad(options) {
            this.card_id = options.id;
        }
    }
    </script>
    ```
2. wx.redirectTo(Object)

    关闭当前页面，跳转到应用内的某个页面

    ```js
    wx.redirectTo({
        url: 'test?id=1'
    })
    ```
3. wx.navigateBack(Object)

    关闭当前页面，返回上一页面或多级页面。可通过 `getCurrentPages()` 获取当前的页面栈，决定需要返回几层

    ```js
    // 注意：调用 navigateTo 跳转时，调用该方法的页面会被加入堆栈，而 redirectTo 方法则不会。见下方示例代码
    // 此处是A页面

    wx.navigateTo({
        url: 'B?id=1'
    })
    // 此处是B页面

    wx.navigateTo({
        url: 'C?id=1'
    })
    // 在C页面内 navigateBack，将返回A页面

    wx.navigateBack({
        delta: 2
    })
    ```

## 图片预览 previewImg

```html
<template>
    <view class="imgContainer" style="background-image: url('{{img_url}}')" data-image="{{img_url}}" @tap.stop="previewImg">
        <!-- <image class="content" src="{{img_url}}" /> -->
    </view>
</template>
<script>
    previewImg(e) {
        var pages = getCurrentPages() //获取加载的页面数组
        var currentPage = pages[pages.length - 1] // 获取当前页面对象
        var url = currentPage.route // 获取当前页面 url
        if (url === 'pages/team_comment_page/index') {
            wx.previewImage({
                current: e.currentTarget.dataset.image, // 获取当前点击元素的 img_url
                urls: [e.currentTarget.dataset.image]
            })
        } else {
            wepy.navigateTo({
                url: `/pages/team_comment_page/index?id=${this.card_id}`
            })
        }
    }
</script>
```
