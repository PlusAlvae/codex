 
  
  // vite.config.js

export default {
    // specify the entry point for your app
    // this can be a JavaScript or TypeScript file
    entry: 'script.js',
  
    // configure plugins
    plugins: [],
  
    // set up a proxy server for API requests
    server: {
      proxy: {
        '/api': 'http://localhost:3000'
      }
    }
  }