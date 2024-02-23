/*const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')*/

import path from 'path'
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from 'webpack';
import 'webpack-dev-server';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {buildWebpack} from "./config/build/buildWebpack";
import {BuildMode, BuildPaths} from './config/build/types/types';

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


interface EnvVariables {
  mode: BuildMode
  port: number
  analyzer: boolean
}

export default (env: EnvVariables) => { // с typescript


  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
  }

  const config: webpack.Configuration =  buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths,
    analyzer: env.analyzer
  })
  return  config
}

