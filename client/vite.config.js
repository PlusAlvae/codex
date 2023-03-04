 
  import { VitePWA } from 'vite-plugin-pwa'


  // vite.config.js

export default {
    // specify the entry point for your app
    // this can be a JavaScript or TypeScript file
    entry: 'script.js',
  
    // configure plugins
    plugins: [ VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'My Awesome App',
        short_name: 'MyApp',
        description: 'My Awesome App description',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
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
  