import type { Dictionary } from "./zh";

// Japanese dictionary. Type-bound to zh to enforce key parity at compile time.
export const ja: Dictionary = {
  site: {
    name: "Venomous Study",
    description:
      "Warhammer 40K の各軍団カラーをテーマにした個人学習ノートサイト",
  },
  nav: {
    openMenu: "ナビゲーションを開く",
    closeMenu: "ナビゲーションを閉じる",
    skipToContent: "本文へスキップ",
  },
  sidebar: {
    chooseLanguage: "言語を選択",
    langZh: "简体中文",
    langJa: "日本語",
    ariaLabel: "サイドバー",
    docsAriaLabel: "ドキュメントナビゲーション",
  },
  breadcrumb: {
    home: "ホーム",
    ariaLabel: "パンくずリスト",
  },
  toc: {
    title: "このページの目次",
    ariaLabel: "このページの目次",
  },
  legion: {
    modalTitle: "軍団を選択",
    loyal: "忠誠軍団",
    traitor: "反逆軍団",
    close: "閉じる",
    selectAria: "軍団カラースキームを選択",
    toggleHeresy: "Heresy 時代に切り替え",
  },
  errors: {
    "404": {
      pageTitle: "404 - ページが見つかりません",
      pageDesc: "指定されたページは存在しません。",
      title: "ページが見つかりません",
      desc: "要求された記録はアーカイブに存在しません。このパスは抹消されたか、承認されたことがありません。",
      returnHome: "ホームへ戻る",
      goBack: "前のページに戻る",
    },
  },
  fallback: {
    notTranslatedTitle: "このドキュメントはまだ翻訳されていません",
    notTranslatedDesc:
      "日本語版は現在提供されていません。中国語版を見るか、ホームへ戻ってください。",
    viewZhVersion: "中国語版を見る",
    returnHome: "ホームへ戻る",
  },
  categories: {
    frontend: "Webフロントエンド",
    backend: "Webバックエンド",
    uncategorized: "未分類",
  },
};
