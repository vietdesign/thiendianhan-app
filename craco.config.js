const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      if (env === 'production') {
        // Disable source maps trong production để bảo vệ code
        webpackConfig.devtool = false;
        // Loại bỏ tất cả source map plugins
        webpackConfig.plugins = webpackConfig.plugins.filter(plugin => {
          return !plugin.constructor.name.includes('SourceMap');
        });
        // Disable source maps trong optimization
        if (webpackConfig.optimization) {
          webpackConfig.optimization.minimize = true;
          webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer || [];
        }
        // Force disable source maps trong tất cả rules
        if (webpackConfig.module && webpackConfig.module.rules) {
          webpackConfig.module.rules.forEach(rule => {
            if (rule.use && Array.isArray(rule.use)) {
              rule.use.forEach(use => {
                if (use.options && use.options.sourceMap !== undefined) {
                  use.options.sourceMap = false;
                }
              });
            }
          });
        }
        // Disable source maps trong output
        if (webpackConfig.output) {
          webpackConfig.output.sourceMapFilename = undefined;
        }
      }
      // Nếu là development thì giữ nguyên (có source map để debug)
      return webpackConfig;
    },
  },
  devServer: {
    port: 5000, // Thay đổi port từ 3000 thành 5000
    devMiddleware: {
      writeToDisk: false,
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
}; 