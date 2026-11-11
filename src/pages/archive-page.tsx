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
          skip: "본문으로 건너뛰기",
          overline: "기록 찾기",
          title: "분야가 달라도,\n태그로 다시 연결됩니다.",
          body: "연구, 프로젝트, 교육, 수상, 대외활동을 한곳에 모았습니다. 이름이나 기관을 검색하고 형식·상태·태그로 좁혀 볼 수 있습니다.",
          records: "기록",
          formats: "형식",
          tags: "태그",
          search: "검색",
          searchTitle: "기록 찾기",
          searchHint: "활동명, 기관, 분야, 기술과 본문 내용을 검색할 수 있습니다.",
          placeholder: "예: 위성, 보안, 교육, 동아리",
          clear: "검색어 지우기",
        }
      : {
          skip: "Skip to content",
          overline: "Find a record",
          title: "Different fields,\nconnected again by tags.",
          body: "Research, projects, teaching, awards, and other activities are collected here. Search by name or organization, then narrow the results by format, status, or tag.",
          records: "Records",
          formats: "Formats",
          tags: "Tags",
          search: "Search",
          searchTitle: "Find a record",
          searchHint: "Search titles, organizations, fields, tools, and descriptions.",
          placeholder: "Try satellite, security, teaching, or club",
          clear: "Clear search",
        };

  return (
    <>
      <a className="skip-link" href="#main-content">{copy.skip}</a>
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
