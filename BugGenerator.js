/**
 * BugGenerator.js - 意図的に面白いバグを生成するJSライブラリ
 * CDN経由で簡単に導入できるバージョン
 */

(function (global) {
  "use strict";

  // サウンドファイルのURL（実際のURLに変更する必要があります）
  const SOUNDS_URL = {
    pop: "https://soundbible.com/mp3/Blop-Mark_DiAngelo-79054334.mp3",
    error:
      "https://soundbible.com/mp3/Computer%20Error-SoundBible.com-399240927.mp3",
    surprise:
      "https://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3",
  };

  class BugGenerator {
    constructor(config = {}) {
      // デフォルト設定
      this.config = {
        frequency: 1, // 常に発生するように1に設定
        bugLevel: "chaos", // デフォルトでカオスレベル
        textBugs: true,
        uiBugs: true,
        soundBugs: true,
        styleBugs: true,
        ...config, // ユーザー設定で上書き可能
      };

      // 音声ファイルのプリロード
      this.sounds = {};
      if (this.config.soundBugs) {
        Object.keys(SOUNDS_URL).forEach((sound) => {
          this.sounds[sound] = new Audio(SOUNDS_URL[sound]);
          // 音量調整
          this.sounds[sound].volume = 0.3;
        });
      }

      // 変換用の辞書
      this.translations = {
        cat: {
          こんにちは: "にゃんにちは",
          私: "わたにゃん",
          です: "でにゃ",
          ます: "ません",
          はい: "にゃい",
          いいえ: "にゃいえ",
        },
        robot: {
          こんにちは: "コンニチハ-01",
          私: "ワタシ-UNIT",
          です: "デアル",
          ます: "マス-EXECUTE",
          はい: "AFFIRMATIVE",
          いいえ: "NEGATIVE",
        },
        // 英語の変換も追加
        catEn: {
          hello: "meowllo",
          hi: "meow",
          "i am": "i meow",
          you: "mew",
          please: "purrlease",
          yes: "meows",
          no: "hiss",
        },
        robotEn: {
          hello: "GREETINGS-HUMAN",
          hi: "ACKNOWLEDGING-PRESENCE",
          "i am": "THIS-UNIT-IS",
          you: "TARGET-ENTITY",
          please: "REQUEST-PROCESSING",
          yes: "AFFIRMATIVE",
          no: "NEGATIVE",
        },
      };

      this.activeEffects = [];

      // スタイルシートを追加
      this.addBugStyleSheet();

      // 初期化
      this.init();
    }

    init() {
      // テキスト入力を監視
      if (this.config.textBugs) {
        this.setupTextBugs();
      }

      // UIバグをセットアップ
      if (this.config.uiBugs) {
        this.setupUiBugs();
      }

      // 定期的にバグを発生させるインターバル
      this.bugInterval = setInterval(() => {
        // 確率チェックを削除して常に発生させる
        this.triggerRandomBug();
      }, 30000); // 30秒ごとにチェック
    }

    // スタイルシートを追加
    addBugStyleSheet() {
      const styleId = "bug-generator-styles";

      // すでにスタイルが存在する場合は追加しない
      if (document.getElementById(styleId)) {
        return;
      }

      const styleSheet = document.createElement("style");
      styleSheet.id = styleId;
      styleSheet.innerHTML = `
        .bug-shake {
          animation: bug-shake 0.5s infinite;
        }
        
        .bug-spin {
          animation: bug-spin 1s infinite;
        }
        
        .bug-dance {
          animation: bug-dance 2s infinite;
        }
        
        .bug-disappear {
          animation: bug-disappear 3s forwards;
        }
        
        @keyframes bug-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes bug-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes bug-dance {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes bug-disappear {
          0% { opacity: 1; }
          90% { opacity: 0.1; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .bug-color-invert {
          filter: invert(100%);
          transition: filter 1s;
        }
        
        .bug-wobble {
          animation: bug-wobble 3s infinite;
        }
        
        @keyframes bug-wobble {
          0%, 100% { transform: skewX(0deg); }
          25% { transform: skewX(3deg); }
          75% { transform: skewX(-3deg); }
        }
      `;
      document.head.appendChild(styleSheet);
    }

    // ランダムなバグを発生させる
    triggerRandomBug() {
      const bugTypes = [];
      if (this.config.textBugs) bugTypes.push("text");
      if (this.config.uiBugs) bugTypes.push("ui");
      if (this.config.soundBugs) bugTypes.push("sound");
      if (this.config.styleBugs) bugTypes.push("style");

      if (bugTypes.length === 0) return;

      const bugType = bugTypes[Math.floor(Math.random() * bugTypes.length)];

      switch (bugType) {
        case "text":
          this.triggerTextBug();
          break;
        case "ui":
          this.triggerUiBug();
          break;
        case "sound":
          this.triggerSoundBug();
          break;
        case "style":
          this.triggerStyleBug();
          break;
      }
    }

    // テキスト関連のバグをセットアップ
    setupTextBugs() {
      document.addEventListener("input", (e) => {
        // 入力要素かチェック
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
          // 確率チェックを削除
          setTimeout(() => {
            this.applyTextTransformation(e.target);
          }, 500);
        }
      });
    }

    // テキスト変換を適用
    applyTextTransformation(element) {
      const originalText = element.value;
      let newText = originalText;

      // 変換モードをランダムに選択
      const modes = Object.keys(this.translations);
      const selectedMode = modes[Math.floor(Math.random() * modes.length)];
      const dictionary = this.translations[selectedMode];

      // テキストを変換
      Object.keys(dictionary).forEach((key) => {
        const regex = new RegExp(key, "gi");
        newText = newText.replace(regex, dictionary[key]);
      });

      // 最後の単語だけ変換する場合
      if (this.config.bugLevel === "mild" && originalText.length > 5) {
        const words = originalText.split(/\s+/);
        if (words.length > 0) {
          const lastWord = words[words.length - 1];
          if (lastWord && lastWord.length > 2) {
            const transformedLastWord = this.transformWord(
              lastWord,
              selectedMode
            );
            // 最後の単語だけ置き換え
            words[words.length - 1] = transformedLastWord;
            newText = words.join(" ");
          }
        }
      }

      // テキストを更新
      element.value = newText;

      // サウンドを鳴らす
      if (this.config.soundBugs && this.sounds.pop) {
        this.sounds.pop.play().catch((e) => {
          // サウンド再生エラーは無視（ユーザーインタラクションが必要な場合がある）
        });
      }
    }

    // 単語を指定のモードで変換
    transformWord(word, mode) {
      switch (mode) {
        case "cat":
        case "catEn":
          return word + "にゃ";
        case "robot":
        case "robotEn":
          return word.toUpperCase() + "-UNIT";
        default:
          return word;
      }
    }

    // UIバグをセットアップ
    setupUiBugs() {
      // ボタンにイベントを追加
      document
        .querySelectorAll('button, a, input[type="submit"]')
        .forEach((button) => {
          button.addEventListener("mouseover", (e) => {
            // 確率チェックを削除
            this.makeElementEscape(button);
          });

          button.addEventListener("click", (e) => {
            // 確率チェックを削除
            // クリック時のランダムなUI効果
            const effects = ["shake", "spin", "dance", "disappear"];
            const effect = effects[Math.floor(Math.random() * effects.length)];
            this.applyUIEffect(button, effect);

            if (this.config.bugLevel !== "mild") {
              e.preventDefault(); // 中〜高レベルではクリックを阻止
            }
          });
        });
    }

    // 要素を逃げさせる
    makeElementEscape(element) {
      const originalPosition = {
        position: element.style.position,
        top: element.style.top,
        left: element.style.left,
      };

      // 位置を相対位置に変更して動かせるようにする
      element.style.position = "relative";

      // ランダムな方向に移動
      const moveX = (Math.random() - 0.5) * 100;
      const moveY = (Math.random() - 0.5) * 50;

      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      element.style.transition = "transform 0.3s ease-out";

      // サウンドを鳴らす
      if (this.config.soundBugs && this.sounds.surprise) {
        this.sounds.surprise.play().catch((e) => {
          // サウンド再生エラーは無視
        });
      }

      // 数秒後に元に戻す
      setTimeout(() => {
        element.style.transform = "translate(0, 0)";

        // 完全に元に戻すのは変化後
        setTimeout(() => {
          element.style.position = originalPosition.position;
          element.style.top = originalPosition.top;
          element.style.left = originalPosition.left;
        }, 300);
      }, 2000);
    }

    // UI効果を適用
    applyUIEffect(element, effectName) {
      // すでに効果がある場合は削除
      element.classList.remove(
        "bug-shake",
        "bug-spin",
        "bug-dance",
        "bug-disappear"
      );

      // 新しい効果を追加
      element.classList.add(`bug-${effectName}`);

      // サウンド効果
      if (this.config.soundBugs && this.sounds.error) {
        this.sounds.error.play().catch((e) => {
          // サウンド再生エラーは無視
        });
      }

      // 効果を一定時間後に削除
      setTimeout(() => {
        element.classList.remove(`bug-${effectName}`);
      }, 3000);
    }

    // テキストバグを発生させる
    triggerTextBug() {
      // ページ上のテキストを一時的に変換
      const textNodes = this.getTextNodes(document.body);
      if (textNodes.length === 0) return;

      // ランダムなテキストノードを選択
      const randomIndex = Math.floor(Math.random() * textNodes.length);
      const textNode = textNodes[randomIndex];

      // 元のテキストを保存
      const originalText = textNode.nodeValue;

      // 変換モードを選択
      const modes = Object.keys(this.translations);
      const selectedMode = modes[Math.floor(Math.random() * modes.length)];

      // テキストを変換
      let newText = originalText;
      Object.keys(this.translations[selectedMode]).forEach((key) => {
        const regex = new RegExp(key, "gi");
        newText = newText.replace(regex, this.translations[selectedMode][key]);
      });

      // テキストを更新
      textNode.nodeValue = newText;

      // 変換された要素を記録し、後で元に戻す
      this.activeEffects.push({
        type: "text",
        node: textNode,
        originalValue: originalText,
        timeout: setTimeout(() => {
          textNode.nodeValue = originalText;
          this.removeEffect("text", textNode);
        }, 5000),
      });
    }

    // UIバグを発生させる
    triggerUiBug() {
      const buttons = Array.from(
        document.querySelectorAll('button, a, input[type="submit"]')
      );
      if (buttons.length === 0) return;

      // ランダムな要素を選択
      const randomElement = buttons[Math.floor(Math.random() * buttons.length)];

      // ランダムな効果を適用
      const effects = ["shake", "spin", "dance", "disappear"];
      const effect = effects[Math.floor(Math.random() * effects.length)];

      this.applyUIEffect(randomElement, effect);
    }

    // サウンドバグを発生させる
    triggerSoundBug() {
      if (!this.config.soundBugs) return;

      const sounds = Object.values(this.sounds);
      if (sounds.length === 0) return;

      const randomSound = sounds[Math.floor(Math.random() * sounds.length)];

      // 音量を小さめに
      randomSound.volume = 0.3;
      randomSound.play().catch((e) => {
        // サウンド再生エラーは無視
      });
    }

    // スタイルバグを発生させる
    triggerStyleBug() {
      // ページ全体または特定要素のスタイルを変更
      const styleBugs = [
        // 色反転
        () => {
          document.body.classList.add("bug-color-invert");
          setTimeout(() => {
            document.body.classList.remove("bug-color-invert");
          }, 3000);
        },
        // 揺れる効果
        () => {
          document.body.classList.add("bug-wobble");
          setTimeout(() => {
            document.body.classList.remove("bug-wobble");
          }, 5000);
        },
        // テキストを大きくする
        () => {
          const originalFontSize = document.body.style.fontSize;
          document.body.style.fontSize = "1.2em";
          setTimeout(() => {
            document.body.style.fontSize = originalFontSize;
          }, 4000);
        },
      ];

      // ランダムなスタイルバグを実行
      const randomBug = styleBugs[Math.floor(Math.random() * styleBugs.length)];
      randomBug();
    }

    // テキストノードを取得する補助関数
    getTextNodes(node) {
      let textNodes = [];

      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
        // 少なくとも10文字以上のテキストノードを対象に
        if (node.nodeValue.length >= 10) {
          textNodes.push(node);
        }
      } else {
        const children = node.childNodes;
        for (let i = 0; i < children.length; i++) {
          textNodes = textNodes.concat(this.getTextNodes(children[i]));
        }
      }

      return textNodes;
    }

    // 効果を削除
    removeEffect(type, node) {
      this.activeEffects = this.activeEffects.filter((effect) => {
        if (effect.type === type && effect.node === node) {
          clearTimeout(effect.timeout);
          return false;
        }
        return true;
      });
    }

    // エフェクトをすべて削除
    clearAllEffects() {
      this.activeEffects.forEach((effect) => {
        clearTimeout(effect.timeout);
        if (effect.type === "text") {
          effect.node.nodeValue = effect.originalValue;
        }
      });

      document.body.classList.remove("bug-color-invert", "bug-wobble");
      document
        .querySelectorAll(".bug-shake, .bug-spin, .bug-dance, .bug-disappear")
        .forEach((el) => {
          el.classList.remove(
            "bug-shake",
            "bug-spin",
            "bug-dance",
            "bug-disappear"
          );
        });

      this.activeEffects = [];
    }

    // ライブラリを無効化
    disable() {
      clearInterval(this.bugInterval);
      this.clearAllEffects();
    }
  }

  // グローバルオブジェクトに公開
  global.BugGenerator = BugGenerator;
})(typeof window !== "undefined" ? window : this);
