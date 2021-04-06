// This will send requests from your frontend to your back-end server at http://localhost:3000/

module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000/',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }