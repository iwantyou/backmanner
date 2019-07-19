# my-project

> back-stage management
## Build Setup

``` bash
# install dependencies  安装依赖
npm install

# serve with hot reload at localhost:8080  运行在本地8080端口
npm run dev

# build for production with minification   
npm run build

# build for production and view the bundle analyzer report  代码分析
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 固定项目运行库版本
- 设置npm选项
```bash
npm config set save true -g
npm config set save-exact true -g
npm config set registry https://registry.npm.taobao.org -g
```