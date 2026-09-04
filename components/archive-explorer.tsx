import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { WorkCard } from "@/components/work-card";
import { useLocale } from "@/lib/i18n";
import { tagLabel, works, type WorkKind, type WorkStatus, workKindLabel, workStatusLabel } from "@/lib/portfolio-data";

type KindFilter = WorkKind | "all";
type StatusFilter = WorkStatus | "all";
const KIND_ORDER: WorkKind[] = [
  "research",
  "project",
  "teaching",
  "leadership",
  "experience",
  "award",
  "certificate",
  "competition",
  "volunteer",
  "completion",
  "media",
];

function getTagsByRecency() {
  const seen = new Set<string>();

  return [...works]
    .sort((a, b) => b.sortDate.localeCompare(a.sortDate))
    .flatMap((work) => work.tags)
    .filter((tag) => {
      if (seen.has(tag)) return false;
      seen.add(tag);
      return true;
    });
}

export function ArchiveExplorer({ initialTag = "" }: { initialTag?: string }) {
  const { locale, t } = useLocale();
  const validInitialTag = works.some((work) => work.tags.includes(initialTag)) ? initialTag : "";
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<KindFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>(validInitialTag ? [validInitialTag] : []);
  const [showAllTags, setShowAllTags] = useState(false);
  const [visibleLimit, setVisibleLimit] = useState(24);
  const [tags] = useState(getTagsByRecency);
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase(locale));

  const availableKinds = useMemo(() =>
    KIND_ORDER.filter((item) =>
      works.some((work) => work.kind === item)
    ),
  []);
  const availableStatuses = useMemo(() => (["ongoing", "published", "presented", "completed"] as WorkStatus[]).filter((item) => works.some((work) => work.status === item)), []);

  const filteredWorks = useMemo(() => works.filter((work) => {
    const detailText = Object.values(work.detail ?? {}).flatMap((value) => Array.isArray(value) ? value.flatMap((item) => [item.ko, item.en]) : value ? [value.ko, value.en] : []);
    const searchable = [work.title.ko, work.title.en, work.summary.ko, work.summary.en, work.period, workKindLabel(work.kind, locale), workStatusLabel(work.status, locale), ...detailText, ...(work.links ?? []).flatMap((link) => [link.label.ko, link.label.en]), ...work.tags.flatMap((tag) => [tag, tagLabel(tag, "ko"), tagLabel(tag, "en")])].join(" ").toLocaleLowerCase(locale);
    return (!deferredQuery || searchable.includes(deferredQuery))
      && (kind === "all" || work.kind === kind)
      && (status === "all" || work.status === status)
      && selectedTags.every((tag) => work.tags.includes(tag));
  }), [deferredQuery, kind, locale, status, selectedTags]);

  const hasFilter = Boolean(query || kind !== "all" || status !== "all" || selectedTags.length);
  const visibleWorks = filteredWorks.slice(0, visibleLimit);
  const visibleTags = showAllTags ? tags : tags.slice(0, 18);
  const toggleTag = (tag: string) => setSelectedTags((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]);
  const resetFilters = () => { setQuery(""); setKind("all"); setStatus("all"); setSelectedTags([]); };

  const copy = locale === "ko" ? {
    label: "아카이브 검색과 필터", search: "작업 검색", placeholder: "제목, 분야, 기술, 경험을 검색하세요", clear: "검색어 지우기",
    kind: "형식", status: "상태", tags: "태그 · 복수 선택 시 모두 포함", all: "전체", more: "개 더 보기", fold: "태그 접기",
    result: "검색 결과", reset: "필터 초기화", selected: "선택된 태그", empty: "조건에 맞는 기록이 없습니다.", hint: "검색어를 줄이거나 태그를 하나씩 해제해 보세요.", viewAll: "전체 기록 보기", loadMore: "기록 더 보기",
  } : {
    label: "Archive search and filters", search: "Search records", placeholder: "Search titles, fields, tools, and experiences", clear: "Clear search",
    kind: "Format", status: "Status", tags: "Tags · multiple selections use AND", all: "All", more: " more", fold: "Show fewer tags",
    result: "Matching records", reset: "Reset filters", selected: "Selected tags", empty: "No records match these filters.", hint: "Try a shorter query or remove one tag at a time.", viewAll: "View all records", loadMore: "Load more records",
  };

  useEffect(() => { setVisibleLimit(24); }, [deferredQuery, kind, status, selectedTags]);

  return (
    <div className="archive-explorer">
      <section className="archive-controls" aria-label={copy.label}>
        <div className="archive-search">
          <Search aria-hidden="true" size={21} strokeWidth={1.6} />
          <label className="sr-only" htmlFor="archive-search-input">{copy.search}</label>
          <input id="archive-search-input" onChange={(event) => setQuery(event.target.value)} placeholder={copy.placeholder} type="search" value={query} />
          {query && <button aria-label={copy.clear} onClick={() => setQuery("")} type="button"><X aria-hidden="true" size={18} /></button>}
        </div>
        <FilterBlock index="01" label={copy.kind}>
          <div className="filter-pills" role="group" aria-label={copy.kind}>
            <button aria-pressed={kind === "all"} onClick={() => setKind("all")} type="button">{copy.all}</button>
            {availableKinds.map((item) => <button aria-pressed={kind === item} key={item} onClick={() => setKind(item)} type="button">{workKindLabel(item, locale)}</button>)}
          </div>
        </FilterBlock>
        <FilterBlock index="02" label={copy.status}>
          <div className="filter-pills" role="group" aria-label={copy.status}>
            <button aria-pressed={status === "all"} onClick={() => setStatus("all")} type="button">{copy.all}</button>
            {availableStatuses.map((item) => <button aria-pressed={status === item} key={item} onClick={() => setStatus(item)} type="button">{workStatusLabel(item, locale)}</button>)}
          </div>
        </FilterBlock>
        <FilterBlock index="03" label={copy.tags} className="filter-block-tags">
          <div className="tag-filter" role="group" aria-label={copy.tags}>
            {visibleTags.map((tag) => <button aria-pressed={selectedTags.includes(tag)} key={tag} onClick={() => toggleTag(tag)} type="button">#{tagLabel(tag, locale)}</button>)}
            {tags.length > 18 && <button className="tag-more" onClick={() => setShowAllTags((value) => !value)} type="button">{showAllTags ? copy.fold : locale === "ko" ? `+${tags.length - 18}${copy.more}` : `+${tags.length - 18}${copy.more}`}</button>}
          </div>
        </FilterBlock>
      </section>

      <section className="archive-results" aria-live="polite">
        <header className="archive-results-header">
          <div><p>{copy.result}</p><h2><strong>{filteredWorks.length}</strong> / {works.length}</h2></div>
          {hasFilter && <button className="reset-button" onClick={resetFilters} type="button">{copy.reset} <X aria-hidden="true" size={16} /></button>}
        </header>
        {selectedTags.length > 0 && <div className="active-filters" aria-label={copy.selected}>{selectedTags.map((tag) => <button key={tag} onClick={() => toggleTag(tag)} type="button">#{tagLabel(tag, locale)} <X aria-hidden="true" size={13} /></button>)}</div>}
        {filteredWorks.length > 0 ? <><div className="archive-grid">{visibleWorks.map((work) => <WorkCard key={work.slug} work={work} />)}</div>{visibleWorks.length < filteredWorks.length && <button className="archive-load-more" onClick={() => setVisibleLimit((value) => value + 24)} type="button">{copy.loadMore} · {visibleWorks.length}/{filteredWorks.length}</button>}</> : (
          <div className="empty-state"><Search aria-hidden="true" size={32} strokeWidth={1.3} /><h3>{copy.empty}</h3><p>{copy.hint}</p><button onClick={resetFilters} type="button">{copy.viewAll}</button></div>
        )}
      </section>
    </div>
  );
}

function FilterBlock({ index, label, className = "", children }: { index: string; label: string; className?: string; children: React.ReactNode }) {
  return <div className={`filter-block ${className}`.trim()}><div className="filter-label"><span>{index}</span><p>{label}</p></div>{children}</div>;
}
