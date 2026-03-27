# アプリテンプレート

自分のアプリを作るためのテンプレートです。一般ユーザ向けページはルート（`/`）、管理者向けは `/systemadmin` 配下に分かれており、osql.js 経由で MySQL にアクセスする共通ルールを前提としています。

## 使いはじめ

1. `systemadmin/initdb.html` で `<script>` 内に書かれた `initSQL` を実行し、テーブルを作成する。
2. `isapp.js` の `APPLICATION_DATABASE_NAME` に接続したいデータベース名を書き込む。
3. 各ページの `<head>` で最初に `osql.requireLogin()` を呼んでログイン画面へ遷移させる。

## ディレクトリ構成

- `/index.html`：一般ユーザ向けトップ。`client/index.html` のヘッダーと共通のスクリプト順を再利用。
- `/systemadmin/index.html`：管理者のトップ画面。一般向け機能はここに含めない。
- `/systemadmin/initdb.html`：MySQL スキーマの初期化。
- `/lib`：共通ライブラリ（原則変更不要）。
- `/style.css`：共通スタイル。他は各 HTML の `<style>` に集約。

## ルール

- script は `<head>` にまとめ、`jquery` → `osql` → `isapp` → ページ固有の `<script>` の順に記述。
- JavaScript は ES6+ で書き、アロー関数を避けつつテンプレートリテラルや `async/await` を活用する。
- `ready()` から `init()` を呼び出し、その順で定義する。イベント登録は可能な限り `onclick="func()"` で行う。
- `index.html` と `systemadmin/index.html` の機能を混ぜないよう分離し、命名規則とヘッダー共通化を守る。

## 次のステップ

1. `index.html`／`systemadmin/index.html` に参考ヘッダーを入れてページを構築。
2. `systemadmin/initdb.html` の `initSQL` を微調整してテストデータを用意。
3. `isapp.js` のデータベース名を更新し、osql ログインと接続を確認。
