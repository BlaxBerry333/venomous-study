import { zh } from "./zh";
import { ja } from "./ja";

export type Locale = "zh" | "ja";

export const LOCALES = ["zh", "ja"] as const satisfies readonly Locale[];
export const DEFAULT_LOCALE: Locale = "zh";

export const localeToHtmlLang: Record<Locale, string> = {
  zh: "zh-CN",
  ja: "ja",
};

const dictionaries: Record<Locale, unknown> = { zh, ja };

/**
 * Parses a Content Collection doc id into { slug, locale }.
 * Only the trailing `.ja` suffix on the final path segment is treated as locale marker.
 * Examples:
 *   "frontend/react/hooks"     -> { slug: "frontend/react/hooks", locale: "zh" }
 *   "frontend/react/hooks.ja"  -> { slug: "frontend/react/hooks", locale: "ja" }
 *   "foo.jam/bar"              -> { slug: "foo.jam/bar",         locale: "zh" }  (not treated as ja)
 */
export function parseDocId(rawId: string): { slug: string; locale: Locale } {
  const lastSlash = rawId.lastIndexOf("/");
  const basename = lastSlash >= 0 ? rawId.slice(lastSlash + 1) : rawId;
  if (basename.endsWith(".ja")) {
    const stripped = basename.slice(0, -".ja".length);
    const slug =
      lastSlash >= 0 ? `${rawId.slice(0, lastSlash)}/${stripped}` : stripped;
    return { slug, locale: "ja" };
  }
  return { slug: rawId, locale: "zh" };
}

/**
 * Derives the current locale from a URL, independent of Astro.currentLocale,
 * as a safety net when currentLocale is undefined (e.g. in some edge contexts).
 */
export function getLocaleFromUrl(url: URL): Locale {
  const base = import.meta.env.BASE_URL;
  let pathname = url.pathname;
  if (base && pathname.startsWith(base)) {
    pathname = pathname.slice(base.length);
  }
  // Normalise leading slash
  if (!pathname.startsWith("/")) pathname = `/${pathname}`;
  if (pathname === "/ja" || pathname.startsWith("/ja/")) return "ja";
  return DEFAULT_LOCALE;
}

/**
 * Translates a dot-separated key in the given locale.
 * Falls back to zh, then returns the key itself with a console.warn.
 */
export function t(key: string, locale: Locale): string {
  const fromPrimary = lookup(dictionaries[locale], key);
  if (typeof fromPrimary === "string") return fromPrimary;
  if (locale !== DEFAULT_LOCALE) {
    const fromFallback = lookup(dictionaries[DEFAULT_LOCALE], key);
    if (typeof fromFallback === "string") return fromFallback;
  }
  if (import.meta.env.DEV) {
    console.warn(
      `[i18n] missing translation for key="${key}" locale="${locale}"`,
    );
  }
  return key;
}

function lookup(dict: unknown, key: string): unknown {
  const parts = key.split(".");
  let cur: unknown = dict;
  for (const part of parts) {
    if (
      cur &&
      typeof cur === "object" &&
      part in (cur as Record<string, unknown>)
    ) {
      cur = (cur as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return cur;
}

/**
 * Given the current pathname (with or without base prefix) and a target locale,
 * returns the equivalent path in the target locale.
 * Default locale (zh) has no prefix; ja uses `<base>ja/<slug>`.
 */
export function resolveLocalizedPath(
  currentPathname: string,
  targetLocale: Locale,
  base: string,
): string {
  // Normalise base to ensure trailing slash.
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  let path = currentPathname;
  if (path.startsWith(normalizedBase)) {
    path = path.slice(normalizedBase.length);
  } else if (path.startsWith("/")) {
    path = path.slice(1);
  }
  // Strip any existing locale prefix
  if (path === "ja" || path.startsWith("ja/")) {
    path = path === "ja" ? "" : path.slice("ja/".length);
  }
  // Trim leading/trailing slashes already handled; re-assemble.
  const localePrefix =
    targetLocale === DEFAULT_LOCALE ? "" : `${targetLocale}/`;
  return `${normalizedBase}${localePrefix}${path}`;
}
