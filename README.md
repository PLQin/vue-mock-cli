
引自 [vue-cli-mock](https://github.com/carrotz/vue-cli-mock) 进行再创作;

表示非常感谢 @carrotz

<p align="center">
  <img width="320" src="./readme-logo.png" title="vue-mock-cli" alt="vue-mock-cli">
</p>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/typicode/json-server">
    <img src="https://img.shields.io/badge/jsonserver-0.14.2-brightgreen.svg" alt="json-server">
  </a>
  <a href="http://mockjs.com">
    <img src="https://img.shields.io/badge/MockJs-1.0.1-brightgreen.svg" alt="mockjs">
  </a>
</p>


## 😜 功能与配置

- 监听多文件    
  更新 `mock` 目录下文件的内容后手动刷新页面即可, 核心代码 :   
  ```json
  // package.json
  "scripts": {

    // 特殊情况需要使用单引号(或者反引号?) nodemon --watch mock --exec 'json-server mock/index.js --port 3020 --m mock/post-to-get.js'
    "mock": "nodemon --watch mock --exec json-server mock/index.js --port 3020 --m mock/post-to-get.js",

  }
  ```


## 😁 所有命令

``` bash
# install dependencies
npm install

# serve with hot reload at
npm run dev

# build for production with minification
npm run build

# run mock serve 
# access to specific approaches such as: http://localhost:3020/posts can get the data
npm run mock

# run serve with mock serve
npm run mockdev
```


## \# 目录结构
```
└── mock/                 # mock配置目录
  └── index.js          # mock数据出口
  └── post-to-get.js    # post映射为get中间件
```

## \# 说明
[JSON Server](https://github.com/typicode/json-server) 是一个创建伪RESTful服务器的工具，具体使用方法可以看官方文档，这里直接讲在vue-cli 中的用法。


## \# 配置流程
- 全局安装 ``$ npm install -g json-server``
- 项目目录下创建 ``mock`` 文件夹
- ``mock`` 文件夹下添加 ``db.json`` 文件，内容如下

  ```
  {
    "posts": [
      { "id": 1, "title": "json-server", "author": "typicode" }
    ],
    "comments": [
      { "id": 1, "body": "some comment", "postId": 1 }
    ],
    "profile": { "name": "typicode" }
  }
  ```

- ``package.json`` 添加命令
  ```
  "mock": "json-server --watch mock/db.json",
  "mockdev": "npm run mock & npm run dev" // Mac
  // "mockdev": "npm run mock | npm run dev" // Window
  ```


## \# mockjs.js 批量生成伪数据

如果需要大量的伪数据，手动构造比较费时费力，可以使用 [mockjs](http://mockjs.com/examples.html) 批量生成。mockjs.js 的具体使用参见官方文档，这里做一个示例。

- ``$ npm install mockjs`` 安装 mockjs

-  ``mock`` 目录下创建 ``mock-data.js``，内容如下
    ```
    module.exports = function () {
      var Mock = require("mockjs");
      var _ = require("lodash");

      return {
        people: _.times(100, function (n) {
          return {
            id: n,
            name: Random.cfirst(),
            avatar: Random.image('200x100')
          }
        }),
        address: _.times(100, function (n) {
          return {
            id: Mock.mock('@guid'),
            city: Mock.mock('@city'),
            county: Mock.mock('@county')
          }
        })
      }
    }
    ```

- npm bash 中运行`json-server mock/mock-data.js` 在 json server 中使用 mockjs
请求 http://localhost:3020/address 可以获取到随机生成的伪数据


## \# 添加中间件

json server 使用 [RESTful 架构](http://www.ruanyifeng.com/blog/2011/09/restful)，GET请求可以获取数据，POST 请求则是添加数据。

在开发过程中，有时候想直接模拟获取POST请求返回结果，可以添加 express 中间件 将POST请求转为GET请求。

- ``mock`` 目录下创建 ``post-to-get.js``，内容如下
  ```
  module.exports = function (req, res, next) {
    req.method = "GET";
    next();
  }
  ```
- 启动命令添加运行中间件 ``--m mock/post-to-get.js``
  ```
  "mock": "json-server --watch mock/db.json --m mock/post-to-get.js",
  ```

重新启动服务，POST请求就被转换为GET请求了

![](http://upload-images.jianshu.io/upload_images/1651860-d62321826379a90a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

其他需求也可以通过添加不同的中间件实现。

## \# 代理设置
在 ``config/index.js`` 的 ``proxyTable`` 将请求映射到 http://localhost:3020

![](http://upload-images.jianshu.io/upload_images/1651860-1629801bae740557.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

代码中添加请求以测试效果

![](http://upload-images.jianshu.io/upload_images/1651860-0206a52db3368cfc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
