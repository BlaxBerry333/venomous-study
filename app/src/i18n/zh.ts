// Chinese (zh-CN) dictionary. Keys are the canonical set; ja.ts must provide all of them.
export const zh = {
  site: {
    name: "Venomous Study",
    description: "个人学习笔记站，配色取自战锤 40K 各军团",
  },
  nav: {
    openMenu: "打开导航",
    closeMenu: "关闭导航",
    skipToContent: "跳至正文",
  },
  sidebar: {
    chooseLanguage: "选择语言",
    langZh: "简体中文",
    langJa: "日本語",
    ariaLabel: "侧边栏",
    docsAriaLabel: "文档导航",
  },
  breadcrumb: {
    home: "首页",
    ariaLabel: "面包屑",
  },
  toc: {
    title: "本页目录",
    ariaLabel: "本页目录",
  },
  legion: {
    modalTitle: "选择你的军团",
    loyal: "忠诚军团",
    traitor: "叛乱军团",
    close: "关闭",
    selectAria: "选择军团配色方案",
    toggleHeresy: "切换至 Heresy 时代",
  },
  errors: {
    "404": {
      pageTitle: "404 - 页面未找到",
      pageDesc: "请求的页面不存在。",
      title: "页面未找到",
      desc: "请求的记录不存在于档案库中。此路径已被清除或从未被批准。",
      returnHome: "返回首页",
      goBack: "返回上一页",
    },
  },
  fallback: {
    notTranslatedTitle: "此文档尚未翻译",
    notTranslatedDesc: "日语版本暂未提供。你可以查看中文版本或返回首页。",
    viewZhVersion: "查看中文版",
    returnHome: "返回首页",
  },
  categories: {
    frontend: "Web前端",
    backend: "Web后端",
    uncategorized: "未分类",
  },
} as const;

// Widen leaf string literals to `string` so other dictionaries can use different text
// while still requiring the exact same key structure.
type WidenStrings<T> = {
  [K in keyof T]: T[K] extends string ? string : WidenStrings<T[K]>;
};

export type Dictionary = WidenStrings<typeof zh>;
