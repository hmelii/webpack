import type {Configuration as DevServerConfiguration} from 'webpack-dev-server'
import {BuildOptions} from "./types/types";


export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port ?? 3000,
        open: true,
        historyApiFallback: true, // разрешить SPA,
        hot: true // позволяет вносить изменения при помощи HMR (hot module replacement) не перезагружая страницу // для фреймворков необходимо доустановить react-refresh-webpack-plugin
    }
}