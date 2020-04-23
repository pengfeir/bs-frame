/* config-overrides.js */
const { override, fixBabelImports ,addWebpackAlias,addDecoratorsLegacy,addLessLoader,overrideDevServer} = require('customize-cra'),
path = require('path'),
proxy = () => (configFunction) => {
  configFunction.proxy = {
      '/api/': {
          target: '',
          changeOrigin: true,
          pathRewrite: { '^/api': '/' },
      },
  };

  return configFunction;
}
module.exports = {
webpack:override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, 'src')
  }),
  addLessLoader({
    javascriptEnabled: true,
  }),
  addDecoratorsLegacy()
),
// devServer: overrideDevServer(
//   proxy()
// )
}

