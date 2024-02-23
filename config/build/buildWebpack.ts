import webpack from "webpack";
import path from "path";
import {buildDevServer} from "./buildDevServer";
import {buildLoader} from "./buildLoader";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions} from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {

    const {mode, paths} = options

    const isDev = mode === 'development';

    return {
        mode: mode ?? 'development', // env.mode задаётся в package.json
        // entry: path.resolve(__dirname, 'src', 'index.js') // один вариант точки входа
        entry: {
            main: paths.entry //  вариант с несколькими точками входа
        },
        output: {
            path: paths.output,
            // filename: 'build.js' // точное название бандла
            filename: '[name].[contenthash].js',
            clean: true // читсти перед сборкой папку
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoader(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? buildDevServer(options) : undefined

    }
}