const path = require("path"); //调用node.js中的路径
module.exports = {
  entry: {
    index: "./src/js/index.js" //需要打包的文件
  },
  output: {
    filename: "[name].js", //输入的文件名是什么，生成的文件名也是什么
    path: path.resolve(__dirname, "../out") //指定生成的文件目录
  },
  mode: "development", //开发模式，没有对js等文件压缩，默认生成的是压缩文件
  resolve: {
    alias: {
      page: path.resolve(_dirname, "src/page") // 属性作用，当输入page时，自动替换为src/page
    }
  },

  devServer: {
    port: 8080, // 服务器端口号
    historyApiFallback: {
      // index: "/dist/index.html" // 属性作用，当访问到404页面时，会自动导航至这里
    }
  }
};
