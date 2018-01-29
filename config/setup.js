import globAll from 'glob-all'

export default class Setup {

    constructor(DistMode) {
        this.MODE = DistMode
    }

    config() {

        //CONFIG ARRAY
        let CONFIG = {}

        //CONFIG
        CONFIG.BROWSER_LIST = 'last 2 version' //ブラウザのバージョン

        //DIRECTORY
        CONFIG.SRC_DIR = './src'
        CONFIG.BASE_DIR = './_local'

        //COMMON FILE
        CONFIG.COMMON_CSS_FILE = '/common/css/common.css'
        CONFIG.COMMON_JS_FILE = '/common/js/common.js'

        // COMPONENT
        CONFIG.COMMON_HEAD_FILE = '../common/template/_head'
        CONFIG.COMMON_FOOT_FILE = '../common/template/_foot'
        CONFIG.COMMON_HEADER_FILE = '../common/template/_header'
        CONFIG.COMMON_FOOTER_FILE = '../common/template/_footer'
        CONFIG.COMMON_SIDE_FILE = '../common/template/_side'

        //CSS - JS LINK
        CONFIG.INDEX_CSS_FILE = './css/index.css'
        CONFIG.INDEX_JS_FILE = './js/index.js'

        //EDIT
        CONFIG.EDIT_EJS_INDEX = '/index/*.ejs'
        CONFIG.EDIT_CSS_INDEX = '/index/css/*.css'
        CONFIG.EDIT_JS_INDEX = "/index/js/*.js"
        CONFIG.EDIT_EJS = '/**/*.ejs'
        CONFIG.EDIT_CSS = '/**/*.css'
        CONFIG.EDIT_JS = '/**/*.js'

        //IMG
        CONFIG.EDIT_IMG_INDEX = "/index/img/*.+(jpg|png|gif|)"
        CONFIG.EDIT_SVG_INDEX = '/index/img/*.svg'
        CONFIG.EDIT_IMG = '/**/*.+(jpg|png|gif|)'
        CONFIG.EDIT_SVG = '/**/*.svg'

        //EXCLUDE
        CONFIG.EXCLUDE_EJS = `!${ CONFIG.SRC_DIR }/**/_*.ejs`
        CONFIG.EXCLUDE_CSS = `!${ CONFIG.SRC_DIR }/**/_*.css`
        CONFIG.EXCLUDE_EJS_INDEX = `!${ CONFIG.SRC_DIR + CONFIG.EDIT_EJS_INDEX }`
        CONFIG.EXCLUDE_CSS_INDEX = `!${ CONFIG.SRC_DIR + CONFIG.EDIT_CSS_INDEX }`
        CONFIG.EXCLUDE_IMG_INDEX = `!${ CONFIG.SRC_DIR + CONFIG.EDIT_IMG_INDEX }`
        CONFIG.EXCLUDE_SVG_INDEX = `!${ CONFIG.SRC_DIR + CONFIG.EDIT_SVG_INDEX }`

        //TASK
        CONFIG.TASK_DEFAULT = 'default'
        CONFIG.TASK_BUILD = 'build'
        CONFIG.TASK_EJS = 'ejs'
        CONFIG.TASK_POSTCSS = 'postcss'
        CONFIG.TASK_JS = 'js'
        CONFIG.TASK_IMG = 'img'
        CONFIG.TASK_SVG = 'svg'
        CONFIG.TASK_SERVER = 'server'
        CONFIG.TASK_BS = 'bs'
        CONFIG.TASK_CLEAN = 'clean'

        //TASK_INDEX
        CONFIG.TASK_EJS_INDEX = 'ejsIndex'
        CONFIG.TASK_POSTCSS_INDEX = 'postcssIndex'
        CONFIG.TASK_IMG_INDEX = 'imgIndex'
        CONFIG.TASK_SVG_INDEX = 'svgIndex'

        //TASK BUILD
        CONFIG.BUILD = [
            CONFIG.TASK_EJS_INDEX,
            CONFIG.TASK_POSTCSS_INDEX,
            CONFIG.TASK_IMG_INDEX,
            CONFIG.TASK_SVG_INDEX,
            CONFIG.TASK_EJS,
            CONFIG.TASK_POSTCSS,
            CONFIG.TASK_JS,
            CONFIG.TASK_IMG,
            CONFIG.TASK_SVG
        ]

        //BUILD TARGET JS
        CONFIG.TARGETS_JS = globAll.sync([
            CONFIG.SRC_DIR + CONFIG.EDIT_JS,
            `!${ CONFIG.SRC_DIR + CONFIG.EDIT_JS_INDEX }`
        ])
        CONFIG.TARGETS_JS_INDEX = './src/index/js/index.js'

        //コマンドの引数で分岐
        switch (this.MODE) {

            //local
            case 'local':
                CONFIG.MODE = 'local'
                CONFIG.URL = 'http://localhost:3000'
                CONFIG.DIST_DIR = CONFIG.BASE_DIR
                CONFIG.IS_PRODUCTION = false
                break

            //開発環境
            case 'development':
                CONFIG.MODE = 'develompent'
                CONFIG.URL = 'https://development.co.jp'
                CONFIG.DIST_DIR = './_development'
                CONFIG.IS_PRODUCTION = false
                break

            //本番環境
            case 'production':
                CONFIG.MODE = 'production'
                CONFIG.URL = 'https://production.co.jp'
                CONFIG.DIST_DIR = './_production'
                CONFIG.IS_PRODUCTION = true
                break

        }
        return CONFIG
    }
}