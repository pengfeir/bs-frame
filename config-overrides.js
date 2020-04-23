/* config-overrides.js */
const { override, fixBabelImports ,addWebpackAlias,addDecoratorsLegacy,addLessLoader} = require('customize-cra'),
path = require('path')
module.exports = override(
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
);

