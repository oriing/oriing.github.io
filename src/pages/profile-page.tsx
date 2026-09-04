import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useLocale } from "@/lib/i18n";
import { mainData, skillGroups, tagLabel, timeline, type TimelineItem } from "@/lib/portfolio-data";

const principles = [
  { index: "01", title: { ko: "말하기 전에 만들어 보기", en: "Build before claiming" }, body: { ko: "직접 구현하고 실패 조건을 관찰한 뒤, 확인한 범위만 주장합니다.", en: "I implement first, observe failure conditions, and limit claims to what the evidence supports." } },
  { index: "02", title: { ko: "맥락 안에서 측정하기", en: "Measure systems in context" }, body: { ko: "알고리즘의 수치만 보지 않고 실제 자원·통신·조직 환경을 함께 봅니다.", en: "I consider resources, communication, and organizational constraints—not only algorithmic metrics." } },
  { index: "03", title: { ko: "깊이를 잃지 않고 설명하기", en: "Explain without flattening" }, body: { ko: "전문용어를 없애기보다 이해에 필요한 발판과 순서를 설계합니다.", en: "Rather than erasing technical language, I design the sequence and scaffolding needed to understand it." } },
];

export function ProfilePage() {
  const { locale, t } = useLocale();
  const education = timeline.filter((item) => item.kind === "education");
  const career = timeline.filter((item) => item.kind === "career");
  const copy = locale === "ko" ? { overline: "학력 · 경력 · 기반", title: "무엇을 공부했고,\n어떤 자리에서 일했는가", degree: "학위와 학습의 흐름", career: "역할과 경험의 흐름", skills: "도구보다 문제에 맞는 조합", principles: "연구하고 설명하는 방식", cta: "이 원칙이 적용된 작업 보기", major: "전공", additional: "추가전공", focus: "관심 분야" } : { overline: "Education · Career · Foundation", title: "What I studied,\nand where I contributed", degree: "Education and learning", career: "Roles and experience", skills: "Choosing tools around the problem", principles: "How I research and explain", cta: "See these principles in practice", major: "Major", additional: "Additional major", focus: "Interests" };

  return <>
    <a className="skip-link" href="#main-content">{copy.skip}</a><SiteHeader current="profile" />
    <main id="main-content">
      <section className="page-hero profile-hero">
        <div className="page-index">01 / Profile</div><p className="page-overline">{copy.overline}</p>
        <div className="profile-hero-title"><h1>{copy.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1><img src={mainData.identity.profileImage.src} alt={t(mainData.identity.profileImage.alt)} /></div>
        <div className="page-hero-bottom"><p>{t(mainData.identity.introduction)}</p><dl><div><dt>{copy.major}</dt><dd>Computer Engineering</dd></div><div><dt>{copy.additional}</dt><dd>Applied Mathematics</dd></div><div><dt>{copy.focus}</dt><dd>Systems · Data · Education</dd></div></dl></div>
      </section>
      <section className="detail-section timeline-section"><SectionHeading index="01" overline="Degree & study" title={copy.degree} /><Timeline items={education} /></section>
      <section className="detail-section timeline-section detail-section-muted"><SectionHeading index="02" overline="Career & leadership" title={copy.career} /><Timeline items={career} /></section>
      <section className="detail-section"><SectionHeading index="03" overline="Technical foundation" title={copy.skills} /><div className="skill-grid">{skillGroups.map((group, index) => <article key={t(group.title)}><span>{String(index + 1).padStart(2, "0")}</span><h3>{t(group.title)}</h3><p>{t(group.description)}</p><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></section>
      <section className="detail-section principles-section"><SectionHeading index="04" overline="Working principles" title={copy.principles} light /><div className="principle-grid">{principles.map((principle) => <article key={principle.index}><span>{principle.index}</span><h3>{t(principle.title)}</h3><p>{t(principle.body)}</p></article>)}</div><a className="light-cta" href="#/archive">{copy.cta} <ArrowRight aria-hidden="true" size={18} /></a></section>
    </main><SiteFooter />
  </>;
}

function SectionHeading({ index, overline, title, light = false }: { index: string; overline: string; title: string; light?: boolean }) {
  return <header className={`detail-section-heading${light ? " detail-section-heading-light" : ""}`}><span>{index}</span><div><p>{overline}</p><h2>{title}</h2></div></header>;
}

function Timeline({ items }: { items: TimelineItem[] }) {
  const { locale, t } = useLocale();
  return <div className="profile-timeline">{items.map((item, index) => <article key={item.id}><div className="profile-timeline-line" aria-hidden="true"><span /></div><div className="profile-timeline-period"><span>{String(index + 1).padStart(2, "0")}</span><p>{item.period}</p></div><div className="profile-timeline-body"><div className="profile-timeline-title"><h3>{t(item.title)}</h3><span>{item.status === "ongoing" ? item.kind === "education" ? locale === "ko" ? "재학 중" : "In progress" : locale === "ko" ? "활동 중" : "Active" : locale === "ko" ? "완료" : "Completed"}</span></div><p className="profile-timeline-org">{t(item.organization)}</p><p>{t(item.description)}</p><ul className="tag-list">{item.tags.map((tag) => <li key={tag}>#{tagLabel(tag, locale)}</li>)}</ul></div></article>)}</div>;
}
