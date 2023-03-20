const path = require('path')

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "./src/assets/scss/variables.scss";'
      }
    }
  },
  //
  devServer: {
    port: process.env.VUE_APP_PORT,
    proxy: {
      '/api': { target: 'http://markex-dev-app-04.lan:3000', pathRewrite: { '^/api': '/api/v1' }, ws: true, changeOrigin: false, logLevel: 'debug' }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('fonts', path.resolve('./src/assets/fonts/'))
    config.resolve.alias.set('components', path.resolve('./src/components'))
    config.resolve.alias.set('images', path.resolve('./src/assets/images/'))
    config.resolve.alias.set('styles', path.resolve('./src/assets/scss/'))
    config.resolve.alias.set('api', path.resolve('./src/api'))
    config.resolve.alias.set('config', path.resolve('./config'))
    config.resolve.alias.set('ui', path.resolve('./src/components/ui'))
    config.resolve.alias.set('models', path.resolve('./src/models'))
    config.resolve.alias.set('utils', path.resolve('./src/utils'))
  }
}
