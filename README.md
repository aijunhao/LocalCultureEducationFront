# 佛缘普陀

乡土文化教育项目前端部分，采用 vue.js 开发，项目运行前需要进行配置（请先确保有 node.js 和 vue.js 运行环境）。

项目采用 vue-cli 3.0 脚手架。

## 项目配置

### 安装依赖包

命令行进入项目目录，运行如下命令。

```
npm install
```

### 后端服务器配置

项目根目录下 `src/config.js` 文件配置后端服务器地址及接口名。默认后端服务器地址为私人阿里云服务器地址。按需求切换使用云服务器或者本地服务器。

<font color="red">注意：这里配置的是后端接口，ip地址及端口号与前端项目无关。</font>

```js
// config.js

// // 云地址
const BASE_URL = "http://120.79.254.54:3004";
// 本地测试
// const BASE_URL = "http://localhost:3004";
```

## 编译运行

```
npm run serve
```

## 编译生成可执行文件

可执行文件在项目根目录下，默认文件名为 `dist` 。

<font color="red">可执行文件需要在服务器环境下下运行，直接打开无效。</font>

```
npm run build
```

### 本地服务器运行

如果需要运行 `dist` 中的可执行文件，需要在搭建服务器。

这里使用 `serve` 来模拟服务器环境。

```shell
# 安装 serve 服务器
npm i -g serve

# 命令行进入 dist 文件夹中

# 运行 serve
F:\WorkSpace\Project\LocalCultureEducation\LocalCultureEducationFront\dist>serve

   ┌───────────────────────────────────────────────────┐
   │                                                   │
   │   Serving!                                        │
   │                                                   │
   │   - Local:            http://localhost:5000       │
   │   - On Your Network:  http://192.168.205.1:5000   │
   │                                                   │
   │   Copied local address to clipboard!              │
   │                                                   │
   └───────────────────────────────────────────────────┘
```

如上就是简单的服务器运行 vue 可执行文件的操作。<font color="red">这种操作有一个问题，vue 页面刷新后会报错，需要额外配置。</font>

为了方便起见，请查看我的个人云服务器已配置完成的项目：www.aijunhao.com.cn:3003