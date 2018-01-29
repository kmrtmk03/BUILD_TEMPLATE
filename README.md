## Version
* node(9.4.0)
* npm(5.6.0)
* gulp(3.9.1)
* webpack(3.10.0)

## Command
* **npm run start** （ウォッチ開始)
* **npm run build** （すべての環境でビルド）
* **npm run build:local** （ローカル環境でビルド）
* **npm run build:development** （開発環境でビルド）
* **npm run build:production** （本番環境でビルド）
* **npm run clean** （すべての環境を削除）
* **npm run clean:local** （ローカル環境を削除）
* **npm run clean:development** （開発環境を削除）
* **npm run clean:production** （本番環境を削除）

## Direcotry
* **src**（編集フォルダ）
* **local**（ローカル環境用）
* **development**（開発環境用）
* **production**（本番環境用）
* **config**（設定ファイル用フォルダ）

## HTML(EJS)
* "common/template"に共通コンポーネントを格納
* コンポーネントのファイル名は必ず_から始める

## CSS
* 共通CSSは"common/css/common.css"に、  
ページ固有のCSSは"各ページ/css/index.css"に各ファイルを@importで読み込む
* 読み込まれるCSSのファイル名は必ず_から始める

## JavaScript
* 共通JSは"common/js/common.js"に、  
ページ固有のJSは"各ページ/js/index.js"に各ファイルをrequire()で読み込む

## PostCSS Config
* postcss-import
* postcss-custom-properties
* postcss-mixins
* postcss-nested
* postcss-calc

## Javascript Plugin