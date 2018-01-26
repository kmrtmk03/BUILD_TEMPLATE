/* ==================== Import Modules ==================== */

import babelPolyfill from 'babel-polyfill'
import webpack from 'webpack'
import Setup from './setup'
import minimist from 'minimist' //引数を取得


/* ==================== Get Mode ==================== */

const knownOptions = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'local' }
}
const options = minimist(process.argv.slice(2), knownOptions)


/* ==================== Setup Class ==================== */

//SETUPファイル読み込み
const SETUP = new Setup(options.env); //引数は開発モード
const CONFIG = SETUP.config()


/* ==================== Entry Config ==================== */

// INDEXのentry設定
let ENTRY_LIST = { 'js/index.js': CONFIG.TARGETS_JS_INDEX }

// 下層の設定のentry設定
const TARGETS_JS = CONFIG.TARGETS_JS
TARGETS_JS.map ( (target) => {
    const targetKey = target.slice(6)
    const targetValue = target
    ENTRY_LIST[targetKey] = targetValue
})


/* ==================== Plugin Config ==================== */

let PLUGINS = [] //本番
if(CONFIG.IS_PRODUCTION) {
    PLUGINS.push(
        new webpack.optimize.UglifyJsPlugin()
    )
}


/* ==================== Module Export ==================== */

module.exports = {
    
    entry: ENTRY_LIST,
    
    output: {
        filename: '[name]'
    },

    plugins: PLUGINS,
    
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_module/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            'modules': false
                        }]
                    ]
                }
            }]
        }]
    },
    
    devtool: 'source-map'

}