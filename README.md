

#### 智慧油库前端工程，基于 vuejs，目录结构根据 vue-cli 官方推荐的结构。

---

##### 开发环境安装步骤：

1. 安装 nodeJs、npm,准备一个 webServer(nginx、tomcat).

2. npm i -g cnpm webpack --registry=https://registry.npm.taobao.org
   使用上述命令全局安装 cnpm（npm 国内的淘宝镜像）、webpack(打包工具).

3. cd 到项目的 webpack.config.js 所在位置，执行 cnpm install,
   若安装时间过长，则删除 node_modules 目录，重新执行上述命令。(此步骤快慢与网速相关，网速过慢会导致安装失败).

4. 打包与运行.

    1. 开发者模式: 执行 npm run dev.
    2. 打包命令： 执行 npm run build.

    #### 注意事项:

    从 svn 检出的代码无需执行上述步骤，直接放入 webserver，访问即可.
