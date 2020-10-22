const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader');
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
function resolveLoad(dir) {
  return path.join(__dirname,  dir)
}
console.log(resolve('src'))
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'templatecomp.min.js',
    library: ['templatecomp'],
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
      ,   
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          limit: 8192,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
 
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolveLoad('src'),
    }
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
    "element-ui": {
      root: 'ELEMENT',
      commonjs: 'element-ui',
      commonjs2: 'element-ui',
      amd: 'ELEMENT'
    }
  },
  devServer: {
    open:true,
    historyApiFallback: true,
    noInfo: true,
    host: "0.0.0.0",
    proxy: {
      '/index.php':{
          target:'http://dgj-dev.kzmall.cc',
          changeOrigin:true,
          pathRewrite:{
              '/index.php':'/index.php'
          }
      },
      '/statics':{
          target:'http://dgj-dev.kzmall.cc',
          changeOrigin:true,
          
      }
      
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new VueLoaderPlugin(),
],
  devtool: '#source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = false
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
