const path = require("path");
const {
  override,
  fixBabelImports,
  addWebpackAlias,
  overrideDevServer
} = require("customize-cra");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

const addCustomize = () => (config) => {
  if (process.env.NODE_ENV === "production") {
    // 关闭sourceMap
    config.devtool = false;
    config.output.filename = "[name].[hash].bundle.js";
    config.output.chunkFilename = "[name].[hash].chunk.js";
    config.plugins.push(
      new CompressionWebpackPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.js$|\.css$/,
        threshold: 10240,
        minRatio: 0.8
      })
    );
    // 使用Scope
    config.optimization.concatenateModules = true;
    config.optimization.runtimeChunk = "single";
    config.devServer = {
      historyApiFallback: true
    };
    console.log(config);
  }
  return config;
};

module.exports = {
  webpack: override(
    // 配置路径访问快捷键 @/xxx
    addWebpackAlias({
      "@": resolve("src")
    }),
    // 压缩js等
    addCustomize()
  )
};
