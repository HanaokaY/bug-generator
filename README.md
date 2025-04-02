# BugGenerator.js - 面白いバグ生成ライブラリ

## 概要


BugGenerator.jsは、ウェブページに意図的に「面白いバグ」を追加するJavaScriptライブラリです。ユーザー体験に予測不可能な要素を加え、ユニークなインタラクションを生み出します。


## 主な機能


### テキストバグ


- 入力フィールドのテキストを猫語やロボット語に変換
- ページ上のテキストをランダムに変換

### UIバグ
- ボタンやリンクがマウスホバー時に「逃げる」
- 要素に振動、回転、ダンスなどのアニメーション効果を適用

### サウンドバグ
- ランダムなタイミングで音声効果を再生

### スタイルバグ
- 画面の色を一時的に反転
- ページ全体を揺らす
- フォントサイズを一時的に変更

## 使用方法

```html
<script src="BugGenerator.js"></script>
<script>
 document.addEventListener("DOMContentLoaded", () => {
    // シンプルな初期化（すべてのバグが常に発生）
    const buggy = new BugGenerator();
    
    // または、カスタム設定で初期化
    /*
    const buggy = new BugGenerator({
      bugLevel: 'mild',    // 'mild', 'medium', 'chaos'
      textBugs: true,
      uiBugs: true,
      soundBugs: false,
      styleBugs: true
    });
    */
  });
</script>
```


## バグレベル
mild: 軽微なバグ効果（ユーザー操作を妨げない）
medium: 中程度のバグ効果（一部の操作が困難になる）
chaos: 最大限のバグ効果（予測不可能な動作）

## デバッグモード
Ctrl+Alt+Dを押すと、手動でランダムなバグを発生させることができます。

---
注: このライブラリはユーモアや実験的な目的で作成されています。本番環境での使用は推奨されません。
