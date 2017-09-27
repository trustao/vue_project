# 项目名称
****
## 快速开始
* 克隆仓库

```
    git clone （地址）
```
* 安装依赖
```
npm install
//建议将仓库源换淘宝的源，再进行安装，速度较快。
npm config set registry https://registry.npm.taobao.org
```    
* 配置px2rem单位

设计图宽度为`375` 则跳过此步骤。
```
|--build
    |--utils.js
```
```
23      var px2remLoader = {
24        loader: 'px2rem-loader',
25        options: {
26          remUnit: 37.5  
27        }
28      }
```
将`remUnit`值改为` 设计图宽度/100 ` 。
公司UI设计图一般都是```375```,则不用修改。

* 配置dev服务
```
|--config
    |--index.js
```
```  
    ......
24    dev: {
25        env: require('./dev.env'),
26        port: 9500,  //根据自己需要配置一个未占用的端口号
27        autoOpenBrowser: true,
28        assetsSubDirectory: 'static',
29        assetsPublicPath: '/',
30        proxyTable: {
31          '/rest': {                          
32             target: 'http://192.168.0.119:8084', //配置转发地址，以/rest开头的地址都会转发到这个地址上。可配置多个。
33             pathRewrite: {
34              '^/rest': '/'
35             }
36          }
37        },
......
```

* 运行项目
```
npm run dev 

在src 中开始编写代码
```

## 项目说明
此项目用于开发公司H5单页应用项目，使用Vue为基本框架进行组件化开发。
* [目录结构](#contents)
* [Webpack配置](#webpack)
* [less、sass、stylus等编译工具配置](#tools)
* [Eslint配置](#eslint)
* [移动端适配](#viewport)
* [1像素边框](#1px)
* [背景图引入](#backgroundImage)
* [字体图标使用](#fonticon)
* [移动端常用字体](#fonts)
* [组件化开发](#component)
* [前端路由](#route)
* [单元测试](#test)
* [打包部署](#product)

****
<span id="contents"></span>
### 目录结构


基本目录结构如下

```
.
|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- dev-client.js                // 热重载相关
|   |-- dev-server.js                // 构建本地服务器
|   |-- utils.js                     // 构建工具相关,用于配置各类loader          
|   |-- webpack.base.conf.js         // webpack基础配置
|   |-- webpack.dev.conf.js          // webpack开发环境配置
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|   |-- webpack.test.conf.js         // webpack项目测试配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目变量配置，运行端口配置，代理转发配置   
|   |-- prod.env.js                  // 生产环境变量
|   |-- test.env.js                  // 测试环境变量
|-- src                              // 源码目录,存放需webpack编译打包的资源      
|   |-- assets                       // 项目公共资源
|       |-- fonts                    // 字体文件，常用于字体图标
|       |-- images                   // 图片资源
|       |-- js                       // 公共js资源
|       |-- less                     // 公共样式资源 less
|   |-- components                   // 存放vue公共组件
|   |-- utils                        // 使用到的工具类js 
|   |-- router                       // Vue路由文件
|   |-- views                        // 存放vue路由页面
|   |-- App.vue                      // vue根入口组件
|   |-- main.js                      // app入口文件，webpack打包入口，加载各种公共组件
|-- static                           // 静态文件资源，存放无需编译打包可直接引用的文件，如min.js css 较大的图片等
|-- product                          // 部署环境目录
|   |-- dist                         // 项目打包后生成的静态资源
|   |-- app.js                       // 测试、生产环境所使用的node的web服务文件，**需配置端口号，转发规则等**。
|   |-- package.json                 // 此为node服务所需依赖，项目所需依赖不在此处。部署时，需要安装所需依赖。
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .gitignore                       // git上传需要忽略的文件格式
|-- .eslintignore                    // eslint代码风格规范检查忽略的文件
|-- .eslintrc.js                     // eslint配置文件，用于配置规则等
|-- README.md                        // 项目说明
|-- favicon.ico                      
|-- index.html                       // 入口页面
|-- package.json                     // 项目基本信息
.
```
<span id="webpack"></span>
### webpack配置
*在不引入新的配置工具或有新的配置需求时，无需进行webpack相关配置。*

`|-- build`  目录下进行webpack的相关配置。
    在`webpack.base.conf.js`中配置入口出口及用到基本的loader规则。根据不同模式（`dev/build/test`），启动不同编译过程。具体执行操作可看`package.json  ---scripts`。
开发模式下，执行`dev-serve.js`，进行代码编译，并启动本地web服务，有服务上的需求时可在此文件中配置，使用的是`express`。有在开发模式的编译需求时在`webpack.dev.conf.js`中配置。生产模式则 `webpack.pro.conf.js`.
引入新的文件类型时，在文件添加配置规则（基本用不着）
```
    module: {
        rules: [
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,     // 文件后缀检查正则
                loader: 'url-loader',                       // 使用的loader工具
                options: {                                  // 配置参数
                    limit: 10000,                           // 大于此值时不进行编译
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')  // 输出文件名
                 }
            }
```
<span id="tools"></span>
### less、sass、stylus等编译工具配置
*使用less无需单独安装*

```
    |--build
        |--utils
```
在该文件中进行相关loader配置，本项目已配置less、sass、stylus的loader工具，无需再进行配置。直接安装相关依赖即可使用。 如 
```
npm install less --save-dev
npm install less-loader --save-dev
```
<span id="eslint"></span>
### Eslint配置
此项目使用Eslint进行代码风格统一，便于团队协作，写出规范的代码。使用规则为[JavaScript Standard Style](https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style)。
开发过程中未遵循此规范的代码会抛出如下类似错误，及错误位置。刚开始使用可能会有些不习惯，但这个错误提示比较清楚，修改相对简单，基本可以很快适应。
```
Errors:
  1  http://eslint.org/docs/....
```
可直接根据提示网址查看错误规则。此处不再一一赘述。  
在`根目录下 .eslintrc.js`中可配置自定义规则。
如使用Google的规范[ Google JavaScript style](https://github.com/google/eslint-config-google)可进行如下配置
```
npm install --save-dev eslint eslint-config-google
```
在`.eslintrc.js`中
```
{
  "extends": "google",
  "rules": {
    // Additional, per-project rules...
  }
}

```
有需要增加的规则在`rules`中添加，具体规则见[Eslint规则](https://eslint.org/docs/rules/)

<span id="viewport"></span>
### 适配方案
此项目采用rem适配，使用手机淘宝flexible + px2remLoader来实现。配置完成可直接写设计图上的大小，免去换算，便于开发。
flexible的思路是根据不同像素比来设置meta标签，计算`rem = width / 10`。具体实现可见源码。px2rem是一个lodaer工具，根据设置的单位将px转为rem  `rem = px / remUnit`.
因此所需设置的就是根据设计图宽度`remUnit = 设计图宽度 / 10`来实现免换算，保证在不同设备下布局一致。
```
|-- build
    |-- utils.js
```
```
23      var px2remLoader = {
24        loader: 'px2rem-loader',
25        options: {
26          remUnit: XXX  
27        }
28      }
```
另外， 我们可以通过 `/* no */`来实现局部不转换，如设置1px的边框
```
    border: 1px solid #000; /* no */
```

<span id="1px"></span>
### 1像素边框
1像素边框有多种实现方案，此项目使用伪元素来实现，是兼容性较好，代码简单、使用较多一种。但也有一定局限，无法实现圆角，元素本身有伪元素时无法直接使用。
实现代码在
```
|-- src
    |-- assets
        |--less
            |-- mixin.less
            |-- base.less
```
`mixin.less`中 
```
.border-1px(@color) {
  position: relative;
  &:after {
    position: absolute;
    left: 0;
    bottom: 0;
    content: "";
    display: block;
    border-top: 1px solid @color;/*no*/
    width: 100%;
  }
}
```
`base.less`中，根据不同像素比来进行缩放，使得最终得到1物理像素的边框。
```
@media (min-device-pixel-ratio: 2),(-webkit-min-device-pixel-ratio: 2) {
  .border-1px {
    &:after {
      transform: scaleY(0.5);
      -webkit-transform: scaleY(0.5);
    }
  }
}

@media (min-device-pixel-ratio: 3),(-webkit-min-device-pixel-ratio: 3) {
  .border-1px {
    &:after {
      transform: scaleY(0.333333333333333333);
      -webkit-transform: scaleY(0.333333333333333333);
    }
  }
}
```
通过`.border-1px(颜色);`来为元素添加底边框，如需要其他边框同理。


<span id="backgroundImage"></span>
### 背景图引入
UI设计师会提供3种大小的图片，保证不同设备下能展示出最佳的效果。为书写简便，在`mixin.less`中写好混合。

```
.bg-image(@url) {
  background-image: url("../img/@{url}.png");
  background-size: 100%;
  background-repeat: no-repeat;
  @media (min-device-pixel-ratio: 2),(-webkit-min-device-pixel-ratio: 2) {
    background-image:  url("../img/@{url}@2x.png");
  }
  @media (min-device-pixel-ratio: 3),(-webkit-min-device-pixel-ratio: 3) {
    background-image: url("../img/@{url}@3x.png");
  }
}

```
即可使用`.bg-image(@url);`来插入背景图。根据需要修改上面代码。

<span id="fonticon"></span>
### 字体图标使用
字体图标引入比较简单，UI设计师会提供字体图标文件。
将`.eot .svg .ttf .woff`后缀的四个文件放到
```
|-- src
    |-- assets
        |-- fonts
```
目录下，UI提供的`style.css`中的代码复制到 `src/assets/less/fonts.less` 中，修改引用路径。例如

```
@font-face {
  font-family: 'icomoon';
  src:  url('../fonts/icomoon.eot?9rgzzw');
  src:  url('../fonts/icomoon.eot?9rgzzw#iefix') format('embedded-opentype'),
  url('../fonts/icomoon.ttf?9rgzzw') format('truetype'),
  url('../fonts/icomoon.woff?9rgzzw') format('woff'),
  url('../fonts/icomoon.svg?9rgzzw#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-close:before {
  content: "\e904";
}
...
```
使用 `<span class="icon-close"></span>`即可插入图标。

原理：通过选择器`[class^="icon-"]`找到以`icon-`开头的className,通过伪类来加入字体。

<span id="fonts"></span>
### 移动端常用字体
设置
```
html {
    font-family: "Hiragino Sans GB", Helvetica, Tahoma, Arial, "PingFang SC", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei";
}

```
以上为苹果或安卓自带的、较为常用的、比较漂亮的字体。
<span id="component"></span>
### 组件化开发
项目基于Vue框架进行组件化开发。组件化开发可以带来很大的便利，提高复用性，便于团队协作等等。具体参见[官方文档](https://cn.vuejs.org/v2/guide/components.html#main)。建议通读文档后再进行开发。
项目通过[vue单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)进行开发。基本结构如下

```
<template>
    <div>
        ...     // template内不允许并列多个标签，确保有一个标签包裹全部。
    </div>
</template>

<script>
    import Hello from '@/views/Hello'
    export default {
      data () {
          return {
              ...        // data必须为函数返回对象。
          }
      },
      components: {
          Hello
      }
    }
</script>

<style lang="less">

</style>
```
也可以将js与css分离

```
<template>
  <div>...</div>
</template>
<script src="./my-component.js"></script>
<style src="./my-component.css"></style>
```


每一个.vue文件就是一个组件，组件可嵌套，父子组件间数据传递通过`props`来实现。
需要注意此为单向数据流，子组件直接改变数据值不会引起父组件的改变。可以通过传递对象，改变对象内部数据来实现数据传递，也可以传递函数。除了普通数据传递的方法也可以引入[vuex](https://vuex.vuejs.org/zh-cn/)，来管理全部状态。根据项目复杂程度合理引入。


<span id="route"></span>
### 前端路由
单页应用通常由前端来管理路由，Vue的路由是由[vue-router](https://github.com/vuejs/vue-router)来管理的。使得地址栏改变时不会刷新页面，从而获得较好体验。这里简单说明前端路由及后端路由的区别。
* 后端路由
通常路由都是由后端web服务来管理，根据不同的请求来返回不同的页面，每当地址栏路径改变时，都会发送请求而后返回页面，进行渲染，路由跳转时会有一段空白期。
* 前端路由
前端路由是通过url的hash值`（地址栏中#后面的部分）`来实现，在路由改变时是hash值的改变，不会引起页面刷新。通过js监测改变，从而展示相应的内容。根本上其实就是js根据url的值操作生成DOM。只是Vue2.0+引入了虚拟DOM，与Ract一样采用类似Diff算法，只更新需要的DOM，从而更加高效。

路由的配置在`/src/router/index.js`中，通过`import`引入组件，在`routes`中添加路由。例如：
```
import Hello from '@/views/Hello'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
})
```
更多详细用法参见[文档](https://router.vuejs.org/zh-cn/)

通常使用Vue路由URL如下：`http://localhost:8080/#/route`，使用`mode: history`可以去掉#号，但此时部署到环境时会有一些问题。参见[history模式](#history)。

<span id="test"></span>
### 单元测试
*有需要时进行*

在`/test/unit/specs/`中编写断言进行单元测试。针对每个组件我们只用关心它的输入与输出，这十分利于进行测试。具体方法参考[文档](https://cn.vuejs.org/v2/guide/unit-testing.html)

<span id="product"></span>
### 打包部署

1. 执行
```
npm run build
```
进行编译，在`product/`中生成`dist`目录，即项目资源。公司web服务由前端负责，做路由与转发的工作。项目使用node作为web服务，需要编写一定代码。基本功能已在`product/app.js`中实现，配置好转发地址即可使用。

2. 将`product`目录上传到服务器中,或压缩tar/zip等上传。
3. 若无node，先安装node。地址：[https://nodejs.org/en/download/]。
4. 下载web服务所需依赖，执行

```
npm install
```
5. 使用 pm2 启动服务。若无pm2执行 `npm install -g pm2`安装。在项目根目录中执行
```
pm2 start app.js --name (项目名称)
```
执行成功会看到pm2列表中有该项目。
更多pm2操作参考[文档](https://github.com/Unitech/pm2)

## 常见问题
*****
### history模式
在vue-router中使用history模式可以去掉#，但在生产服务中会有一定问题。
非history模式时，路由改变是#后面的部分改变，浏览器不会刷新页面。当去掉#时，
路由改变，浏览器会认为地址已经改变，向该地址发送请求，web服务没有该路由则会返回404。因此在使用history模式时，后端应放弃对路由的管理，全部交由前端管理。
具体思路是除转发路径外的所有路径都返回dist下的index页面。若需要404页面则在前端路由中自定义404页面。使用hapi框架时如下：

```
// 在Response返回前做处理
server.ext({
  type: 'onPreResponse',
  method: function (request, reply) {
    const response = request.response
    if (!response.isBoom) {  // 如果状态正常则继续返回
      return reply.continue();
    }
    if ((/^\/api/).test(request.path) || '/favicon.ico' === request.path) { 
    // 以api开头的路径正常返回，用于转发正确的接口状态。
      return reply.continue();
    }
    if (request.response.output.statusCode === 404) {
    // 找不到路径时返回页面
      return reply.file('./dist/index.html')
    }
  }
})

```
*注： 在一些版本的微信浏览器会存在页面刷新的问题。由于会优先取缓存，因此不会看到空白，但会读加载条。*

*注：在微信浏览器中复制地址及分享页面不会保存URL中的hash值，因此需要此功能时应当使用history模式。*

### polyfill
为兼容一些老版本浏览器，建议使用polyfill，应为这些浏览器对h5新增的js函数的兼容不是很好。具体可根据需要引入。如promise polyfill。 在`main.js `中 `require('es6-promise').polyfill()`
### 移动端console.log
某些问题在pc上调试时是不会出现的，需要在真机上进行调试，此时使用`vconsole`可以看到打印日志信息，便于定位问题。
在`main.js `中

```
if (process.env.NODE_ENV === 'development') {
   require('vconsole')
  /* console的插件，便于在移动端查看console信息，但无法正确指向抛出位置，pc调试时可以注释掉。 */
}
```
