import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useLocale } from "@/lib/i18n";
import { mainData, skillGroups, tagLabel, timeline, type TimelineItem } from "@/lib/portfolio-data";

const principles = [
  {
    index: "01",
    title: { ko: "먼저 만들어 보기", en: "Build it first" },
    body: {
      ko: "가능하면 직접 구현해 본 뒤, 확인한 결과와 한계를 적습니다.",
      en: "Whenever possible, I implement the idea and report both the result and its limits.",
    },
  },
  {
    index: "02",
    title: { ko: "숫자만 보지 않기", en: "Look beyond the metric" },
    body: {
      ko: "성능 수치뿐 아니라 장비, 통신 환경, 운영 조건도 함께 확인합니다.",
      en: "I check the hardware, network, and operating conditions behind a performance number.",
    },
  },
  {
    index: "03",
    title: { ko: "쉽게 쓰되 생략하지 않기", en: "Explain without omitting the point" },
    body: {
      ko: "어려운 내용을 설명할 때 핵심을 지우기보다 이해할 순서를 정합니다.",
      en: "When explaining a difficult topic, I change the order, not the substance.",
    },
  },
];

export function ProfilePage() {
  const { locale, t } = useLocale();
  const education = timeline.filter((item) => item.kind === "education");
  const career = timeline.filter((item) => item.kind === "career");
  const copy = locale === "ko"
    ? {
        skip: "본문으로 건너뛰기",
        overline: "학력 · 경력 · 기술",
        title: "공부한 것과\n맡아 온 일",
        degree: "학력",
        career: "경력과 활동",
        skills: "사용하는 기술",
        principles: "일할 때 지키는 원칙",
        cta: "관련 작업 보기",
        major: "전공",
        additional: "추가 전공·학위",
        focus: "관심 분야",
      }
    : {
        skip: "Skip to content",
        overline: "Education · Experience · Skills",
        title: "What I studied\nand the roles I took on",
        degree: "Education",
        career: "Experience and activities",
        skills: "Tools I use",
        principles: "How I work",
        cta: "See related work",
        major: "Fields of study",
        additional: "Additional study and degrees",
        focus: "Interests",
      };

  return <>
    <a className="skip-link" href="#main-content">{copy.skip}</a><SiteHeader current="profile" />
    <main id="main-content">
      <section className="page-hero profile-hero">
        <div className="page-index">01 / Profile</div><p className="page-overline">{copy.overline}</p>
        <div className="profile-hero-title"><h1>{copy.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1><img src={mainData.identity.profileImage.src} alt={t(mainData.identity.profileImage.alt)} /></div>
        <div className="page-hero-bottom"><p>{t(mainData.identity.introduction)}</p><dl>
          <div><dt>{copy.major}</dt><dd>Computer Science<br />Applied Mathematics<br />Space Science</dd></div>
          <div><dt>{copy.additional}</dt><dd>Korean Language<br />Multimedia Engineering<br />Business Administration</dd></div>
          <div><dt>{copy.focus}</dt><dd>System Science · Algorithmic Governance<br />Scientific Modeling · Data Science<br />Formal Verification · Pedagogy</dd></div>
          </dl></div>
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
