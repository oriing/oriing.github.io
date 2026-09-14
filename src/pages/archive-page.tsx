import { useState } from "react";
import { Search, X } from "lucide-react";
import { ArchiveExplorer } from "@/components/archive-explorer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useLocale } from "@/lib/i18n";
import { works } from "@/lib/portfolio-data";

export function ArchivePage({ initialTag = "" }: { initialTag?: string }) {
  const { locale } = useLocale();
  const [query, setQuery] = useState("");

  const kinds = new Set(works.map((work) => work.kind)).size;
  const tags = new Set(works.flatMap((work) => work.tags)).size;

  const copy =
    locale === "ko"
      ? {
          overline: "검색 · 필터 · 연결",
          title: "분야가 달라도,\n태그로 다시 연결됩니다.",
          body: "연구·프로젝트·교육·수상·대외활동을 같은 기록 구조에 넣었습니다. 한국어와 영어 검색어, 형식, 상태, 태그를 조합해 필요한 맥락만 모아볼 수 있습니다.",
          records: "기록",
          formats: "형식",
          tags: "태그",
          search: "전체 기록 검색",
          searchTitle: "무엇을 찾고 있나요?",
          searchHint:
            "활동명·기관·분야·기술·경험·내용을 한 번에 검색합니다.",
          placeholder: "예: 위성, 보안, 교육, 동아리",
          clear: "검색어 지우기",
        }
      : {
          overline: "Search · Filter · Connect",
          title: "Different fields,\nconnected again by tags.",
          body: "Research, projects, teaching, awards, and activities share one record structure. Combine Korean or English search terms, formats, status, and tags to collect the context you need.",
          records: "Records",
          formats: "Formats",
          tags: "Tags",
          search: "Search all records",
          searchTitle: "What are you looking for?",
          searchHint:
            "Search activities, organizations, fields, tools, experiences, and details.",
          placeholder: "Try satellite, security, teaching, or club",
          clear: "Clear search",
        };

  return (
    <>
      <SiteHeader current="archive" />

      <main id="main-content">
        <section className="page-hero archive-hero">
          <div className="page-index">02 / Archive</div>

          <p className="page-overline">{copy.overline}</p>

          <h1>
            {copy.title.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>

          <div className="archive-hero-bottom">
            <p>{copy.body}</p>

            <dl>
              <div>
                <dt>{copy.records}</dt>
                <dd>{String(works.length).padStart(2, "0")}</dd>
              </div>

              <div>
                <dt>{copy.formats}</dt>
                <dd>{String(kinds).padStart(2, "0")}</dd>
              </div>

              <div>
                <dt>{copy.tags}</dt>
                <dd>{String(tags).padStart(2, "0")}</dd>
              </div>
            </dl>
          </div>

          <div className="archive-search-panel archive-hero-search-panel">
            <div className="archive-search-copy">
              <p>{copy.search}</p>
              <h2>{copy.searchTitle}</h2>
              <span>{copy.searchHint}</span>
            </div>

            <div className="archive-search">
              <Search aria-hidden="true" size={24} strokeWidth={1.8} />

              <label className="sr-only" htmlFor="archive-search-input">
                {copy.search}
              </label>

              <input
                id="archive-search-input"
                type="search"
                value={query}
                placeholder={copy.placeholder}
                autoComplete="off"
                onChange={(event) => setQuery(event.target.value)}
              />

              {query && (
                <button
                  type="button"
                  aria-label={copy.clear}
                  onClick={() => setQuery("")}
                >
                  <X aria-hidden="true" size={18} />
                </button>
              )}
            </div>
          </div>
        </section>

        <ArchiveExplorer
          key={initialTag}
          initialTag={initialTag}
          query={query}
          onQueryChange={setQuery}
        />
      </main>

      <SiteFooter />
    </>
  );
}