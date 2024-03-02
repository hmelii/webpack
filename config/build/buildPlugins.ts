import webpack, {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
export function buildPlugins({mode, paths, analyzer = false, platform}: BuildOptions):Configuration['plugins'] {

    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins:Configuration['plugins'] = [
        new HtmlWebpackPlugin({ template: paths.html}),
        new webpack.DefinePlugin({
            __PLATFORM__: JSON.stringify(platform)
        }),

    ]

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin(), /* показывает процент готовности билда сборки В production не рекомендуется использовать*/)
        plugins.push(new ForkTsCheckerWebpackPlugin()) // ускоряет сборку/пересборку Выносит проверку типов в отдельный процесс
            plugins.push(new ReactRefreshWebpackPlugin())
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }))

    }

    if(analyzer) {
        plugins.push(new BundleAnalyzerPlugin())
    }

    return  plugins
}