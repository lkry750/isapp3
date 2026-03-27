## 初期設定
- isapp.jsのAPPLICATION_DATABASE_NAME = '';がそのままの場合は，ユーザに注意を促す
- 日本語で会話するようにする

## プロセスに関するルール
- 要求事項に対して即時に作らず，仕様をユーザに確認してから作ること
- 大きい作業をしないこと．長くて１分以内の作業にする．１つ以上のページは作らないようにする．作業が大きくなりそうなときは，作業を小さく分割して進めるよう，対話すること

## ファイル規則
- / 一般ユーザ向け機能を配置
- /index.html 一般ユーザのトップページ
- /systemadmin システム管理者向け画面と機能を配置（一般ユーザ向けの管理機能は追加しないこと）
- /systemadmin/index.html システム管理者のトップページ
- /lib ライブラリ　中のファイルは原則変更しないこと

## リンク記述ルール
- 相対パスを使う．ルートからの絶対パスは使わないこと
- index.htmlは省略しない

## HTML記述ルール
- scriptタグはhead内に書く
- scriptタグの記述順は，jqeury, osql, isapp全ページに書くこと
- headタグ内は, style読込，script読込，scriptタグ，styleタグの順

## スタイル
- client/index.htmlにあるヘッダーを参考に，全てのページに同様のヘッダーを加える．
- 個別のstyleはひとまず当該ファイルのstyleタグ中へ記入
- 適宜，共通スタイルは style.cssにまとめる

## コーディング規約
- ES6+の記法を使用
- アロー関数は使わない
- テンプレートリテラルを積極的に利用する
- Promise.thenは使わず，async/awaitを使用する
- 初期化は，init()関数を作り，readyから呼び出す．ready->init関数定義の順に並べる
- buttonハンドラ登録は，可能な限りonclick="func()"のスタイルで書く
- 関数の最後の呼び出しでも，awaitは省略しない
- 個別のjavascriptプログラムは当該ファイルのscriptタグ中へ記入
- 適宜，共通scriptは isapp.jsにまとめる

## 命名規則
- 変数: camelCase
- 定数: UPPER_SNAKE_CASE
- コンポーネント: PascalCase
- ファイル: snake_case

## osqlアプリケーション
- osql.jsファイルがAPIへのアクセスファイルです．
- osql.requireLogin関数を呼ぶことで，ログイン画面に遷移し，OAuth認証が行われます．
- osql.requireLogin関数は必ずscriptタグの冒頭に書いてください．
- osql.jsのconnect関数でsqlを発行し，結果はJSONで受け取ります．
- osql.jsのconnect関数の引数はsql文かsql文の配列です．
- osql.jsのconnect関数の戻り値はオブジェクトの配列です．statusチェックは不要です．
- osql.jsのconnect関数呼び出しのtry catch文は不要です．

## データベース
- データベーススキーマは，systemadmin/initdb.htmlのscriptタグの中のinitSQL=``記述で管理する
- データベースソフトはMySQLを使用(リレーショナルデータベース)
- initSQL記述は直接SQLとして実行可能な形式で記述（マークダウン記号なし、SQLコメント使用）
- テーブル名の命名規則は，先頭大文字のCamelCaseで．テーブル名は複数形，連関テーブルは，Student_Lectureなどテーブル名の単数形を_でつなぐ
- カラム名の命名規則は，先頭小文字のcamelCaseで．例えば(userId)など．
- テーブルにidカラムが必要な場合，カラム名は単にidとする．
- 開発時の再実行を考慮し，各テーブル定義の前に「DROP TABLE IF EXISTS テーブル名;」を記述
- インデックスは各テーブルのCREATE文直下にALTER TABLE文で記述
- プロトタイピングのため，外部キー制約は，つけなくて良い．
- design.pngがあったら，そのデザインに従うようにする．ただし，Usersテーブルは初期のものそのまま使うこと．
