import { getCollection } from "astro:content";
import { parseDocId, t, type Locale } from "@i18n/index";

export interface DocEntry {
  id: string;
  data: {
    title: string;
    description?: string;
    category?: string;
    tags?: string[];
    created?: Date;
    order?: number;
    draft?: boolean;
  };
  render: () => Promise<{ Content: astroHTML.JSX.Element }>;
}

/**
 * Returns all published docs in the given locale.
 * Docs without `.ja` suffix are treated as `zh`; docs with `.ja` suffix are `ja`.
 */
export async function getPublishedDocs(locale: Locale): Promise<DocEntry[]> {
  const docs = await getCollection("docs");
  return docs
    .filter((doc) => !doc.data.draft)
    .filter((doc) => parseDocId(doc.id).locale === locale)
    .sort(
      (a, b) => (a.data.order ?? 999) - (b.data.order ?? 999),
    ) as unknown as DocEntry[];
}

export interface CategoryGroup {
  name: string;
  docs: DocEntry[];
  subCategories?: { name: string; docs: DocEntry[] }[];
}

export async function getDocsByCategory(
  locale: Locale,
): Promise<CategoryGroup[]> {
  const docs = await getPublishedDocs(locale);
  const categoryMap = new Map<string, DocEntry[]>();

  for (const doc of docs) {
    const { slug } = parseDocId(doc.id);
    const parts = slug.split("/");
    const category = parts.length > 1 ? parts[0] : "uncategorized";
    if (!categoryMap.has(category)) {
      categoryMap.set(category, []);
    }
    categoryMap.get(category)!.push(doc);
  }

  const groups: CategoryGroup[] = [];
  for (const [category, categoryDocs] of categoryMap) {
    const subCategoryMap = new Map<string, DocEntry[]>();
    const topLevelDocs: DocEntry[] = [];

    for (const doc of categoryDocs) {
      const { slug } = parseDocId(doc.id);
      const parts = slug.split("/");
      if (parts.length > 2) {
        const subCategory = parts[1];
        if (!subCategoryMap.has(subCategory)) {
          subCategoryMap.set(subCategory, []);
        }
        subCategoryMap.get(subCategory)!.push(doc);
      } else {
        topLevelDocs.push(doc);
      }
    }

    const subCategories =
      subCategoryMap.size > 0
        ? Array.from(subCategoryMap.entries()).map(([name, docs]) => ({
            name,
            docs,
          }))
        : undefined;

    groups.push({
      name: category,
      docs: topLevelDocs,
      subCategories,
    });
  }

  return groups;
}

/**
 * Builds breadcrumb items for a slug. The first segment is the localized "Home" label.
 */
export function buildBreadcrumbs(
  slug: string,
  base: string = "/",
  locale: Locale,
): { label: string; href?: string }[] {
  const parts = slug.split("/");
  const homeHref = locale === "zh" ? base : `${base}ja/`;
  const crumbs: { label: string; href?: string }[] = [
    { label: t("breadcrumb.home", locale), href: homeHref },
  ];

  for (let i = 0; i < parts.length; i++) {
    const label = parts[i]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ label });
  }

  return crumbs;
}
