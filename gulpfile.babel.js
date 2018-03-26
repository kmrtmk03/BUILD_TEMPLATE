/* ==================== Import Modules ==================== */

// ===== System =====
import gulp from 'gulp'
import changed from 'gulp-changed'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import rename from 'gulp-rename'
import gulpif from 'gulp-if'
import minimist from 'minimist'
import browserslist from 'browserslist'
import runSequence from 'run-sequence'
import rimraf from 'rimraf'

// ===== HTML =====
import ejs from 'gulp-ejs'
import minifyHTML from 'gulp-minify-html'

// ===== CSS =====
import postcss from 'gulp-postcss'
import autoprefixer from 'gulp-autoprefixer'
import cssmin from 'gulp-cssmin'

// ===== JavaScript =====
import webpack from 'webpack'
import webpackStream from 'webpack-stream'

// ===== Image =====
import imagemin from 'gulp-imagemin'
import imageminJPG from 'imagemin-mozjpeg'
import imageminPNG from 'imagemin-pngquant'
import imageminGIF from 'imagemin-gifsicle'
import svgmin from 'gulp-svgmin'


/* ==================== MyClass import ==================== */

import webpackConfig from './config/webpack.config' //webpackのconfig
import Setup from './config/setup' //セットアップ用のClass


/* ==================== Get Mode ==================== */

const knownOptions = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'local' }
}
const options = minimist(process.argv.slice(2), knownOptions)


/* ==================== Setup Class ==================== */

const SETUP = new Setup(options.env); //引数は開発モード
const CONF = SETUP.config()


/* ==================== Support Browser ==================== */
const SUPPORT_BROWSERS = browserslist(CONF.BROWSER_LIST)


/* ==================== EJS  ==================== */

// ===== Index =====
gulp.task(CONF.TASK_EJS_INDEX, () => {
    taskEJS(CONF.SRC_DIR + CONF.EDIT_EJS_INDEX, CONF.DIST_DIR)
})

// ===== Underlayer =====
gulp.task(CONF.TASK_EJS, () => {
    taskEJS([CONF.SRC_DIR + CONF.EDIT_EJS, CONF.EXCLUDE_EJS_INDEX, CONF.EXCLUDE_EJS], CONF.DIST_DIR)
})

// ===== Function =====
function taskEJS(src, dist) {
    //config data
    const data = { setting: CONF }

    gulp.src(src)
        .pipe(changed(dist))
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(ejs(data))
        .pipe(rename({ extname: `.html` }))
        .pipe(gulpif(CONF.IS_PRODUCTION, minifyHTML({ empty: true })))
        .pipe(gulp.dest(dist))
}


/* ==================== PostCSS ==================== */

// ===== Index =====
gulp.task(CONF.TASK_POSTCSS_INDEX, () => {
    taskPostcss(CONF.SRC_DIR + CONF.EDIT_CSS_INDEX, `${CONF.DIST_DIR}/css`)
})

// ===== Underlayer =====
gulp.task(CONF.TASK_POSTCSS, () => {
    taskPostcss([CONF.SRC_DIR + CONF.EDIT_CSS, CONF.EXCLUDE_CSS_INDEX, CONF.EXCLUDE_CSS], CONF.DIST_DIR)
})

// ===== Function =====
function taskPostcss(src, dist) {

    const postcssImport = require('postcss-import')
    const postcssSimpleVars = require('postcss-simple-vars')
    const customProperties = require('postcss-custom-properties')
    const postcssMixin = require('postcss-mixins')
    const nested = require('postcss-nested')
    const postcssCalc = require('postcss-calc')
    const postcssFlexbugsFixes = require('postcss-flexbugs-fixes')
    const postcssMqpacker = require('css-mqpacker')
    const postcssSorting = require('postcss-sorting')
    const postcssExtend = require('postcss-extend')

    gulp.src(src)
        .pipe(changed(dist))
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(postcss([
            postcssImport,
            postcssSimpleVars,
            customProperties,
            postcssMixin,
            nested,
            postcssCalc,
            postcssFlexbugsFixes,
            postcssMqpacker,
            postcssSorting,
            postcssExtend
        ]))
        .pipe(autoprefixer({
            browsers: SUPPORT_BROWSERS,
            cascade: false
        }))
        .pipe(gulpif(CONF.IS_PRODUCTION, cssmin()))
        .pipe(gulp.dest(dist))
}


/* ==================== JS  ==================== */

gulp.task(CONF.TASK_JS, () => {
    return webpackStream(webpackConfig, webpack)
        .on(`error`, function handleError() {
            this.emit(`end`)
        })
        .pipe(gulp.dest(CONF.DIST_DIR))
})


/* ==================== JPG PNG GIF ==================== */

// ===== Index =====
gulp.task(CONF.TASK_IMG_INDEX, () => {
    imgTask(CONF.SRC_DIR + CONF.EDIT_IMG_INDEX, `${CONF.DIST_DIR}/img`)
})

// ===== Underlayer =====
gulp.task(CONF.TASK_IMG, () => {
    imgTask([CONF.SRC_DIR + CONF.EDIT_IMG, CONF.EXCLUDE_IMG_INDEX], CONF.DIST_DIR)
})

// ===== Function =====
function imgTask(src, dist) {
    gulp.src(src)
        .pipe(changed(dist))
        .pipe(imagemin([
            imageminPNG({
                quality: '65-80',
                speed: 1
            }),
            imageminJPG({
                quality: 85,
                progressive: true
            }),
            imageminGIF({
                interlaced: false,
                optimizationLevel: 3,
                colors: 180
            })
        ]))
        .pipe(gulp.dest(dist))
}


/* ==================== SVG ==================== */

// ===== Index =====
gulp.task(CONF.TASK_SVG_INDEX, () => {
    svgTask(CONF.SRC_DIR + CONF.EDIT_SVG_INDEX, `${CONF.DIST_DIR}/img`)
})

// ===== Underlayer =====
gulp.task(CONF.TASK_SVG, () => {
    svgTask([CONF.SRC_DIR + CONF.EDIT_SVG, CONF.EXCLUDE_SVG_INDEX], CONF.DIST_DIR)
})

// ===== Function =====
function svgTask(src, dist) {
    gulp.src(src)
        .pipe(changed(dist))
        .pipe(svgmin())
        .pipe(gulp.dest(dist))
}


/* ==================== Browser ==================== */

gulp.task(CONF.TASK_SERVER, () => {
    return browserSync.init({
        server: {
            baseDir: CONF.BASE_DIR
        }
    })
})

gulp.task(CONF.TASK_BS, () => {
    browserSync.reload()
})


/* ==================== Clean ==================== */

gulp.task(CONF.TASK_CLEAN, cb => {
    rimraf(CONF.DIST_DIR, cb)
})



/* ==================== Command ==================== */

// ===== Watch =====
gulp.task(CONF.TASK_DEFAULT, [CONF.TASK_SERVER], () => {
    gulp.watch(CONF.SRC_DIR + CONF.EDIT_EJS_INDEX, [CONF.TASK_EJS_INDEX, CONF.TASK_BS])
    gulp.watch(CONF.SRC_DIR + CONF.EDIT_CSS_INDEX, [CONF.TASK_POSTCSS_INDEX, CONF.TASK_BS])
    gulp.watch(CONF.SRC_DIR + CONF.EDIT_IMG_INDEX, [CONF.TASK_IMG_INDEX, CONF.TASK_BS])
    gulp.watch([CONF.SRC_DIR + CONF.EDIT_EJS, CONF.EXCLUDE_EJS_INDEX], [CONF.TASK_EJS, CONF.TASK_BS])
    gulp.watch([CONF.SRC_DIR + CONF.EDIT_CSS, CONF.EXCLUDE_CSS_INDEX], [CONF.TASK_POSTCSS, CONF.TASK_BS])
    gulp.watch([CONF.SRC_DIR + CONF.EDIT_IMG, CONF.EXCLUDE_IMG_INDEX], [CONF.TASK_IMG, CONF.TASK_BS])
    gulp.watch(CONF.SRC_DIR + CONF.EDIT_JS, [CONF.TASK_JS, CONF.TASK_BS])
})

// ===== Build =====
gulp.task(CONF.TASK_BUILD, callback => {
    return runSequence(
        CONF.TASK_CLEAN,
        CONF.BUILD,
        callback
    )
})