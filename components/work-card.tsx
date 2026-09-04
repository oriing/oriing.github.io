import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { tagLabel, type WorkRecord, workKindLabel, workStatusLabel } from "@/lib/portfolio-data";

export function WorkCard({ work, compact = false }: { work: WorkRecord; compact?: boolean }) {
  const { locale, t } = useLocale();
  const title = t(work.title);
  return (
    <article className={`work-card${compact ? " work-card-compact" : ""}`}>
      <div className="work-card-meta">
        <span>{workKindLabel(work.kind, locale)}</span>
        <span>{workStatusLabel(work.status, locale)}</span>
      </div>

      <div className="work-card-body">
        <p className="work-period">{work.period}</p>
        <h3>{title}</h3>
        {!compact && <p className="work-english">{work.title[locale === "ko" ? "en" : "ko"]}</p>}
        <p className="work-summary">{t(work.summary)}</p>
      </div>

      <ul className="tag-list" aria-label={locale === "ko" ? `${title} 태그` : `${title} tags`}>
        {work.tags.slice(0, compact ? 4 : 7).map((tag) => {
          const label = tagLabel(tag, locale);
          return (
            <li key={tag} lang={/[가-힣]/.test(label) ? "ko" : "en"}>
              #{label}
            </li>
          );
        })}
      </ul>

      <a className="work-card-link" href={`#/work/${work.slug}`} aria-label={locale === "ko" ? `${title} 상세 보기` : `View details for ${title}`}>
        <span>{locale === "ko" ? "자세히 보기" : "View detail"}</span>
        <ArrowUpRight aria-hidden="true" size={19} strokeWidth={1.6} />
      </a>
    </article>
  );
}
