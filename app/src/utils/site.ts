import {
  PUBLIC_SITE_URL,
  PUBLIC_SITE_BASE,
  PUBLIC_SITE_LANG,
} from "astro:env/client";
import pkg from "../../package.json";

/**
 * Site-level constants that don't vary per locale.
 * Localized strings (name, description) live in `@i18n/{zh,ja}` and must be
 * read with `t("site.name", locale)` / `t("site.description", locale)`.
 */
export const site = {
  url: PUBLIC_SITE_URL,
  base: PUBLIC_SITE_BASE,
  /** Default html lang for SSR before locale detection. Runtime should prefer `localeToHtmlLang[locale]`. */
  defaultLang: PUBLIC_SITE_LANG,
  author: pkg.author,
} as const;
