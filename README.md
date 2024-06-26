## 项目简介
##### 在线预览地址：[摸鱼学社](http://loaf.zhangjiancong.top)
##### 项目开发文档：[摸鱼学社开发文档](https://lhcgmmdf97.feishu.cn/docs/doccnYqYVMI4JMLmANnXKGCwdKe)

技术栈：React(Hook) + React-Router v6 + styled-components + Ant Design <br />

本项目名为摸鱼学社，是一个基于 React + Node 的类掘金的社区网站，
不仅提供不同方向技术的社区交流分享服务，还有力扣专区和摸鱼专区进行开拓性尝试，
个人也可以定制自己的私人库(比如社区主题色，字体大小等等)。

#### 目标：致力于打造一个信息覆盖面广、体验良好、找到家一般的功能社区网站

<br />

### 使用

安装依赖，启动项目

```
# yarn
# yarn install
# yarn start

# npm
# npm install
# npm run start
```

### 构建

打包项目

```
# yarn
# yarn build

# npm
# npm run build
```

### 适配

- 使用百分比结合 flex 进行布局，以响应式地满足大部分布局

### 创新点

- 根据程序员这一群体的特殊性，我们集合了社区、力扣、发文、自定义工具库等等功能
- 定制化个人设置，让每个用户都有一个不一样的体验（例如主题色、文章字体大小）
- 页面中增加动画过渡，更符合视觉感受
- 提供年度报告等统计数据，采用 echarts 进行可视化函数，直观展示出数据
- 提供单次阅读时长提醒，让您在浏览社区的同时同时注意休息
- 提供文章稍后再看的缓存功能，让您可以记录下自己想看的文章

### 优化

- 使用 React 官方的 Suspense 及 lazy 组件实现路由懒加载及组件按需加载，减少首屏加载时间
- 使用魔法注释 webpackChunkName 减少打包时包体积
- 利用缓存，不重复加载相同资源且加快资源访问速度，提升用户体验(配置 runtimeChunk 和 利用浏览器缓存)
- 通过 webpack 本地对 js 和 css 文件做 gzip 压缩，减轻服务器压力
- 使用分页和图片懒加载减少页面同时加载多个 DOM 节点的压力
- 防抖和节流，限制了短时间内页面滚动次数和图标点击次数，减少前端多次请求 js 和后端多次请求数据的压力
- 请求数据时采用了分页请求

### 用户体验

- 空白时使用加载中图标、骨架屏作视觉上的过渡
- 页头、文章详情页实现视差滚动
- 右下角提供返回顶部组件
- 设置隐藏彩蛋，文章详情处点赞可触发
