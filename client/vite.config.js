 
  import { VitePWA } from 'vite-plugin-pwa'


  // vite.config.js

export default {
    // specify the entry point for your app
    // this can be a JavaScript or TypeScript file
    entry: 'script.js',
  
    // configure plugins
    plugins: [ VitePWA({
      
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'My Awesome App',
        short_name: 'MyApp',
        description: 'My Awesome App description',
        theme_color: '#ffffff',
        icons: [
          {
            src: "/images/logo.png",
            type: "image/png",
            sizes: "1024x1024"
          }
        ]}
    })],
  
    // set up a proxy server for API requests
    server: {
      proxy: {
        '/api': 'http://localhost:3000'
      }
    }
  }
  