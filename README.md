# Venomous Study

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.12-brightgreen.svg?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Astro](https://img.shields.io/badge/Astro-v6-ff5d01.svg?logo=astro&logoColor=white)](https://astro.build/)
[![MDX](https://img.shields.io/badge/MDX-enabled-1b1f24.svg?logo=mdx&logoColor=white)](https://mdxjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-2088ff.svg?logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-deployed-222.svg?logo=github&logoColor=white)](https://pages.github.com/)

个人学习笔记站，配色取自战锤 40K 各军团。

基于 Astro + Content Collections 实现，Markdown/MDX 笔记、自动路由、响应式布局。

## 开发说明

### 快速开始

```bash
make install     # 安装依赖
make dev         # 启动开发服务器
make build       # 构建生产版本
make preview     # 预览构建产物
make lint        # 检查
make format      # 格式化
make clean       # 清理构建缓存
```

### 目录结构

```
venomous-study/
├── app/                          # Astro 应用（所有站点代码）
│   ├── src/
│   │   ├── components/           # UI 组件（可在 MDX 中直接 import 使用）
│   │   ├── layouts/              # BaseLayout、DocLayout
│   │   ├── pages/                # index、404、[...slug] 动态路由
│   │   ├── styles/               # tokens / reset / global / typography / responsive
│   │   ├── utils/                # 工具函数
│   │   └── content.config.ts     # 文档文件中 frontmatter 的 schema 字段管理
│   ├── public/
│   │   └── legions/              # 30 个军团 logo
│   ├── astro.config.mjs
│   └── ...
│
├── docs/                         # 笔记内容（目录层级即 URL 路径）
│   ├── <name>.mdx
│   ├── <name>.[lang].mdx
│   └── ...
│
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Pages 部署
│
└── ...
```

### 文档文件

文档文件需要定义为 `.mdx` 文件，目录层级会自动映射为 URL

文档支持中文以外的多语言版本，可通过 `.[语言名].mdx` 的形式定义

每个文件顶部必须包含 frontmatter，可通过 `{frontmatter.<变量名>}` 获取字段的值

```mdx
---
title: React Hooks        # 必填
description: ...          # 可选，SEO 用
category: ...             # 可选，分类标签
tags: [..., ..., ...]     # 可选
created: 2026-04-10       # 可选
order: 1                  # 可选，同级排序权重（小的在前）
draft: false              # 可选，true 时生产构建排除
---

# {frontmatter.title}

{frontmatter.description}
```

### 内置的组件

文档文件中可以导入并使用 Astro 的组件

```mdx
---
title: ...
---

import 组件 from "@components/组件.astro";

# {frontmatter.title}

<组件/>;
<组件/>;
```
 

#### `<Callout>`

提示框（战锤帝国公告风格）

```tsx
import Callout from "@components/Callout.astro";

<Callout>这里是提示内容，支持 **Markdown** 和其他组件。</Callout>;
```

#### `<CodeBlock>`

 增强代码块（支持语言标签和标题）

````tsx
import CodeBlock from "@components/CodeBlock.astro";

<CodeBlock lang="tsx" title="MyComponent.tsx">
  ```tsx
  function MyComponent({ name }: { name: string }) {
    return <h1>Hello, {name}!</h1>;
  }
  ```
</CodeBlock>
````
