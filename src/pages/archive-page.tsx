import { ArchiveExplorer } from "@/components/archive-explorer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useLocale } from "@/lib/i18n";
import { works } from "@/lib/portfolio-data";

export function ArchivePage({ initialTag = "" }: { initialTag?: string }) {
  const { locale } = useLocale();
  const kinds = new Set(works.map((work) => work.kind)).size;
  const tags = new Set(works.flatMap((work) => work.tags)).size;
  const copy = locale === "ko" ? { skip: "본문으로 건너뛰기", overline: "검색 · 필터 · 연결", title: "분야가 달라도,\n태그로 다시 연결됩니다.", body: "연구·프로젝트·교육·수상·대외활동을 같은 기록 구조에 넣었습니다. 한국어와 영어 검색어, 형식, 상태, 태그를 조합해 필요한 맥락만 모아볼 수 있습니다.", records: "기록", formats: "형식", tags: "태그" } : { skip: "Skip to content", overline: "Search · Filter · Connect", title: "Different fields,\nconnected again by tags.", body: "Research, projects, teaching, awards, and activities share one record structure. Combine Korean or English search terms, formats, status, and tags to collect the context you need.", records: "Records", formats: "Formats", tags: "Tags" };
  return <><a className="skip-link" href="#main-content">{copy.skip}</a><SiteHeader current="archive" /><main id="main-content"><section className="page-hero archive-hero"><div className="page-index">02 / Archive</div><p className="page-overline">{copy.overline}</p><h1>{copy.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1><div className="archive-hero-bottom"><p>{copy.body}</p><dl><div><dt>{copy.records}</dt><dd>{String(works.length).padStart(2, "0")}</dd></div><div><dt>{copy.formats}</dt><dd>{String(kinds).padStart(2, "0")}</dd></div><div><dt>{copy.tags}</dt><dd>{String(tags).padStart(2, "0")}</dd></div></dl></div></section><ArchiveExplorer initialTag={initialTag} key={initialTag} /></main><SiteFooter /></>;
}
