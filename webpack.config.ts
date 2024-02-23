/*const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')*/

import path from 'path'
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from 'webpack';
import 'webpack-dev-server';
import type {Configuration as DevServerConfiguration} from 'webpack-dev-server'
/*
module.exports = {
  mode: 'production',
   // entry: path.resolve(__dirname, 'src', 'index.js') // один вариант точки входа
  entry: {
    main: path.resolve(__dirname, 'src', 'index.js') //  вариант с несколькими точками входа
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    // filename: 'build.js' // точное название бандла
    filename: '[name].[contenthash].js',
    clean: true // читсти перед сборкой папку
  },
}*/

/*module.exports = (env) => { // без typescript
  return {
    mode: env.mode ?? 'development', // env.mode задаётся в package.json
    // entry: path.resolve(__dirname, 'src', 'index.js') // один вариант точки входа
    entry: {
      main: path.resolve(__dirname, 'src', 'index.ts') //  вариант с несколькими точками входа
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      // filename: 'build.js' // точное название бандла
      filename: '[name].[contenthash].js',
      clean: true // читсти перед сборкой папку
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html')
      }),
      new webpack.ProgressPlugin() // показывает процент готовности билда сборки В production не рекомендуется использовать
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    
  }
}*/

type Mode = 'production' | 'development'

interface EnvVariables {
  mode: Mode
  port: number
}

export default (env: EnvVariables) => { // с typescript

  const isDev = env.mode === 'development';


  const config: webpack.Configuration =  {
    mode: env.mode ?? 'development', // env.mode задаётся в package.json
    // entry: path.resolve(__dirname, 'src', 'index.js') // один вариант точки входа
    entry: {
      main: path.resolve(__dirname, 'src', 'index.ts') //  вариант с несколькими точками входа
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      // filename: 'build.js' // точное название бандла
      filename: '[name].[contenthash].js',
      clean: true // читсти перед сборкой папку
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html')
      }),
      new webpack.ProgressPlugin() // показывает процент готовности билда сборки В production не рекомендуется использовать
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: isDev ? 'inline-source-map' : false,
    devServer: isDev ? {
      port: env.port ?? 3000,
      open: true
    } : undefined

  }
  return  config
}

