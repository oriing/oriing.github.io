import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WorkCard } from "@/components/work-card";
import { useLocale } from "@/lib/i18n";
import { getRelatedWorks, getWork, tagLabel, workKindLabel, workStatusLabel } from "@/lib/portfolio-data";

export function WorkDetailPage({ slug }: { slug: string }) {
  const { locale, t } = useLocale();
  const work = getWork(slug);
  const copy = locale === "ko" ? {
    notFound: "해당 작업 기록을 찾을 수 없습니다.", archive: "전체 아카이브로 돌아가기", links: "관련 링크", context: "어떤 문제에서 시작했는가", role: "무엇을 맡았는가", approach: "진행 방식", output: "남긴 결과", takeaway: "배운 것", related: "같은 태그에서 이어지는 기록", skip: "본문으로 건너뛰기",
  } : {
    notFound: "This record could not be found.", archive: "Back to the full archive", links: "Related links", context: "Where the work began", role: "What I did", approach: "Approach", output: "Outputs", takeaway: "Takeaways", related: "Related records with shared tags", skip: "Skip to content",
  };

  if (!work) return <><SiteHeader current="archive" /><main><section className="work-detail-loading work-detail-not-found"><p>Record not found</p><h1>{copy.notFound}</h1><a href="#/archive"><ArrowLeft aria-hidden="true" size={17} /> {copy.archive}</a></section></main><SiteFooter /></>;

  const related = getRelatedWorks(work);
  const detail = work.detail;
  const hasIntro = Boolean(detail?.context || detail?.role);
  const hasApproach = Boolean(detail?.approach?.length);
  const hasOutcome = Boolean(detail?.outcomes?.length || detail?.takeaways?.length);

  return (
    <>
      <a className="skip-link" href="#main-content">{copy.skip}</a>
      <SiteHeader current="archive" />
      <main id="main-content">
        <article className="work-detail">
          <header className="work-detail-hero">
            <div className="work-detail-breadcrumb"><a href="#/archive"><ArrowLeft aria-hidden="true" size={16} /> Archive</a><span>/</span><p>{workKindLabel(work.kind, locale)}</p></div>
            <div className="work-detail-meta"><span>{work.period}</span><span>{workStatusLabel(work.status, locale)}</span></div>
            <h1>{t(work.title)}</h1><p className="work-detail-english">{work.title[locale === "ko" ? "en" : "ko"]}</p><p className="work-detail-summary">{t(work.summary)}</p>
            <ul className="tag-list work-detail-tags">{work.tags.map((tag) => <li key={tag}><a href={`#/archive?tag=${encodeURIComponent(tag)}`}>#{tagLabel(tag, locale)}</a></li>)}</ul>
            {work.links && work.links.length > 0 && <div className="work-detail-links" aria-label={copy.links}>{work.links.map((link) => <a href={link.href} key={link.href} rel="noreferrer" target="_blank"><span>{t(link.label)}</span><ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.6} /></a>)}</div>}
          </header>

          {work.images && work.images.length > 0 && (
            <section className={`work-image-gallery work-image-gallery-${Math.min(work.images.length, 2)}`} aria-label={locale === "ko" ? "관련 사진" : "Related images"}>
              {work.images.slice(0, 2).map((image) => <figure key={image.src}><img src={image.src} alt={t(image.alt)} loading="lazy" />{image.caption && <figcaption>{t(image.caption)}</figcaption>}</figure>)}
            </section>
          )}

          {hasIntro && <section className="work-detail-section work-detail-intro">
            {detail?.context && <div><span>01 / Context</span><h2>{copy.context}</h2><p>{t(detail.context)}</p></div>}
            {detail?.role && <div><span>02 / My role</span><h2>{copy.role}</h2><p>{t(detail.role)}</p></div>}
          </section>}
          {hasApproach && <section className="work-detail-section process-section"><header><span>03 / Approach</span><h2>{copy.approach}</h2></header><ol>{detail?.approach?.map((step, index) => <li key={`${work.slug}-step-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><p>{t(step)}</p></li>)}</ol></section>}
          {hasOutcome && <section className="work-detail-section outcome-section">
            {detail?.outcomes?.length ? <div><span>04 / Output</span><h2>{copy.output}</h2><ul>{detail.outcomes.map((outcome, index) => <li key={`${work.slug}-output-${index}`}>{t(outcome)}</li>)}</ul></div> : <div />}
            {detail?.takeaways?.length ? <div className="takeaway-panel"><span>05 / Takeaway</span><h2>{copy.takeaway}</h2>{detail.takeaways.map((takeaway, index) => <blockquote key={`${work.slug}-takeaway-${index}`}>{t(takeaway)}</blockquote>)}</div> : <div />}
          </section>}
          {related.length > 0 && <section className="work-detail-section related-section"><header><span>Related records</span><h2>{copy.related}</h2></header><div className="related-grid">{related.map((item) => <WorkCard compact key={item.slug} work={item} />)}</div><a className="section-cta" href="#/archive">{copy.archive} <ArrowRight aria-hidden="true" size={18} /></a></section>}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
