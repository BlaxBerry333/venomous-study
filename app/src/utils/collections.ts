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

/**
 * Recursive navigation tree node, consumed by Sidebar and the category grid.
 *
 * - Directory nodes are produced for every intermediate path segment.
 * - A directory becomes clickable when its folder ships an `index.mdx`: we hoist
 *   that doc's title/order onto the directory node and strip the leaf child so
 *   it is not rendered twice.
 * - `href` preserves the literal trailing `/index` segment (see design §3.3
 *   decision 2 plan A); URL beautification is deferred.
 */
export interface NavNode {
  /** Path segment at this level, e.g. "api-communication". */
  segment: string;
  /** Full slug path from docs root, e.g. "web-backend/api-communication". */
  path: string;
  /** Display label (already i18n/frontmatter resolved). */
  label: string;
  /** Click target. Absent for directories without an `index.mdx`. */
  href?: string;
  /** Sort key (frontmatter.order, falls back to 999). */
  order: number;
  /** Child nodes (undefined for leaves). */
  children?: NavNode[];
  /** Whether this node represents a directory (vs a document leaf). */
  isDirectory: boolean;
}

const DEFAULT_ORDER = 999;

interface MutableNode {
  segment: string;
  path: string;
  label: string;
  href?: string;
  order: number;
  isDirectory: boolean;
  /** Keyed by child segment for O(1) upsert. */
  children?: Map<string, MutableNode>;
}

function capitalize(s: string): string {
  return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Resolves the display label for a directory node.
 * - Top-level (depth 0): dictionary lookup, then capitalized segment.
 * - Deeper:  index.mdx title (already applied by caller if present), else
 *            dictionary lookup, else raw segment.
 */
function directoryLabel(
  segment: string,
  locale: Locale,
  depth: number,
  indexTitle?: string,
): string {
  if (indexTitle && indexTitle.length > 0) return indexTitle;
  const key = `categories.${segment}`;
  const translated = t(key, locale);
  if (translated !== key) return translated;
  return depth === 0 ? capitalize(segment) : segment;
}

function ensureDirectory(
  parentChildren: Map<string, MutableNode>,
  segment: string,
  parentPath: string,
  depth: number,
  locale: Locale,
): MutableNode {
  const existing = parentChildren.get(segment);
  if (existing) return existing;
  const path = parentPath ? `${parentPath}/${segment}` : segment;
  const node: MutableNode = {
    segment,
    path,
    label: directoryLabel(segment, locale, depth),
    order: DEFAULT_ORDER,
    isDirectory: true,
    children: new Map(),
  };
  parentChildren.set(segment, node);
  return node;
}

function sortAndFreeze(node: MutableNode): NavNode {
  const childMap = node.children;
  let children: NavNode[] | undefined;
  if (childMap && childMap.size > 0) {
    children = Array.from(childMap.values())
      .map(sortAndFreeze)
      .sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order;
        return a.segment.localeCompare(b.segment);
      });
  }
  return {
    segment: node.segment,
    path: node.path,
    label: node.label,
    href: node.href,
    order: node.order,
    children,
    isDirectory: node.isDirectory,
  };
}

/**
 * Builds the recursive NavNode tree for the given locale. Consumed by
 * Sidebar.astro and the two home pages (index.astro, ja/index.astro).
 */
export async function getNavTree(locale: Locale): Promise<NavNode[]> {
  const docs = await getPublishedDocs(locale);
  const base = import.meta.env.BASE_URL;
  const localePrefix = locale === "zh" ? "" : "ja/";

  const roots = new Map<string, MutableNode>();

  for (const doc of docs) {
    const { slug } = parseDocId(doc.id);
    const parts = slug.split("/").filter((p) => p.length > 0);

    // Root-level orphan doc (e.g. `docs/foo.mdx`) → virtual "uncategorized" group.
    const effectiveParts =
      parts.length === 1 ? ["uncategorized", parts[0]] : parts;

    const leafSegment = effectiveParts[effectiveParts.length - 1];
    const parentSegments = effectiveParts.slice(0, -1);
    const href = `${base}${localePrefix}${slug}`;
    const order = doc.data.order ?? DEFAULT_ORDER;
    const isIndex = leafSegment === "index" && parentSegments.length > 0;

    // Walk/create parent directory chain.
    let currentChildren = roots;
    let currentPath = "";
    for (let depth = 0; depth < parentSegments.length; depth++) {
      const seg = parentSegments[depth];
      const dir = ensureDirectory(
        currentChildren,
        seg,
        currentPath,
        depth,
        locale,
      );
      currentPath = dir.path;
      if (!dir.children) dir.children = new Map();
      currentChildren = dir.children;
    }

    if (isIndex) {
      // Hoist the `{dir}/index.mdx` onto its owning directory node.
      const parentPath = parentSegments.slice(0, -1).join("/");
      const ownerSegment = parentSegments[parentSegments.length - 1];
      // Walk back to owner's children map (one level up from `currentChildren`).
      // Since `currentChildren` is the owner's children map, we need the owner
      // itself to patch label/href/order. Re-resolve via a second pass:
      let ownerParentChildren = roots;
      for (let i = 0; i < parentSegments.length - 1; i++) {
        const parentDir = ownerParentChildren.get(parentSegments[i]);
        if (!parentDir || !parentDir.children) break;
        ownerParentChildren = parentDir.children;
      }
      const owner = ownerParentChildren.get(ownerSegment);
      if (owner) {
        owner.href = href;
        owner.order = order;
        owner.label = directoryLabel(
          owner.segment,
          locale,
          parentSegments.length - 1,
          doc.data.title,
        );
      }
      // `parentPath` retained for clarity; no further use.
      void parentPath;
    } else {
      // Attach leaf doc node.
      const leafNode: MutableNode = {
        segment: leafSegment,
        path: currentPath ? `${currentPath}/${leafSegment}` : leafSegment,
        label: doc.data.title,
        href,
        order,
        isDirectory: false,
      };
      currentChildren.set(leafSegment, leafNode);
    }
  }

  return Array.from(roots.values())
    .map(sortAndFreeze)
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return a.segment.localeCompare(b.segment);
    });
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
