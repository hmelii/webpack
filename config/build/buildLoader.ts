import {ModuleOptions} from 'webpack'
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";

export function buildLoader(options: BuildOptions): ModuleOptions['rules'] {

    const isDev = options.mode === 'development';

    const cssLoaderWithModules =
        {
            loader: "css-loader",
            options: {
                modules: {
                    localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
                },

            }
        }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [

            // Creates `style` nodes from JS strings
            //"style-loader",
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            cssLoaderWithModules
            ,
            // Compiles Sass to CSS
            "sass-loader",
        ],
    }

    const tsLoader = {
        // ts-loader умеет работать с JSX
        // если б мы не использовали typescript: нужен был бы babel-loader
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    return [
        scssLoader,
        tsLoader,

    ]
}