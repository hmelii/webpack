import {ModuleOptions} from 'webpack'
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import ReactRefreshTypeScript from 'react-refresh-typescript'

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

    /*const tsLoader = {
        // ts-loader умеет работать с JSX
        // если б мы не использовали typescript: нужен был бы babel-loader
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }*/

   const tsLoader = {
        // ts-loader умеет работать с JSX
        // если б мы не использовали typescript: нужен был бы babel-loader
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [{
            loader: 'ts-loader',
            options: {
                transpileOnly: isDev, // не проверять тайп ошибки при дев режиме // сильно ускоряет пересборку
                getCustomTransformers: () => ({
                    before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                }),
            }
        }]
    }

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const svgLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: {not: [/url/]}, // тут исключаем гет запросы
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true, /* позволяет svg добавлять инлайн размеры*/
                    svgoConfig: { // эта настройка позволяет использовать цвет шрифта для цвета иконки
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true
                                }
                            }
                        ]
                    }
                }
            }
        ],
    }

    const svgUrlLoader = {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url позволяет использовать svg в качестве картинки в img c get параметром url
    }

    return [
        scssLoader,
        tsLoader,
        assetLoader,
        svgUrlLoader,
        svgLoader

    ]
}