import { defineConfig, envField } from "astro/config";
import mdx from "@astrojs/mdx";
import { loadEnv } from "vite";

const { PUBLIC_SITE_URL, PUBLIC_SITE_BASE } = loadEnv(
  process.env.NODE_ENV ?? "",
  process.cwd(),
  "",
);

export default defineConfig({
  integrations: [mdx()],
  output: "static",
  site: PUBLIC_SITE_URL,
  base: PUBLIC_SITE_BASE,
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "ja"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: false,
    },
  },
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({ context: "client", access: "public" }),
      PUBLIC_SITE_BASE: envField.string({ context: "client", access: "public" }),
      PUBLIC_SITE_LANG: envField.string({ context: "client", access: "public" }),
    },
  },
});
