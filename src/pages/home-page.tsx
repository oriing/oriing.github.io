import { ArrowRight, Mail, Search, UserRound } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WorkCard } from "@/components/work-card";
import { useLocale } from "@/lib/i18n";
import { featuredWorks, mainData, tagLabel, timeline } from "@/lib/portfolio-data";

export function HomePage() {
  const { locale, t } = useLocale();
  const careerPreview = timeline.filter((item) => item.kind === "career").slice(0, 3);
  const identityPoints = mainData.current.length > 0 ? mainData.current : mainData.identity.roles;
  const copy =
    locale === "ko"
      ? {
          skip: "본문으로 건너뛰기",
          profile: "프로필 보기",
          focusLabel: "요즘 관심 있는 것",
          focusTitle: "컴퓨터 중심의 융합 학문을 추구합니다.",
          focusCta: "관련 기록 보기",
          workLabel: "대표 기록",
          workTitle: "그동안 직접 해 본 것들",
          workBody:
            "몇 가지만 골랐습니다. 나머지는 아카이브에서 검색할 수 있습니다.",
          workCta: "아카이브 열기",
          journeyLabel: "학력과 경력",
          journeyTitle: "맡아 온 일",
          journeyCta: "전체 이력 보기",
          profileTitle: "프로필",
          profileBody: "전공, 경력, 기술과 관심 분야를 정리해 두었습니다.",
          archiveTitle: "전체 기록",
          archiveBody:
            "연구와 프로젝트부터 교육, 대회, 자격과 작은 활동까지 찾아볼 수 있습니다.",
          contactTitle: "연락하기",
          contactBody: "연구, 프로젝트, 교육과 관련된 제안이나 질문을 받습니다.",
        }
      : {
          skip: "Skip to content",
          profile: "View profile",
          focusLabel: "Current interests",
          focusTitle: "Pursuing computing-centered convergence studies.",
          focusCta: "See related records",
          workLabel: "Selected work",
          workTitle: "A few things I have worked on",
          workBody:
            "Here are selected activities I have worked on. The rest are in the archive.",
          workCta: "Open the archive",
          journeyLabel: "Education and experience",
          journeyTitle: "What I took on",
          journeyCta: "View the full timeline",
          profileTitle: "Profile",
          profileBody: "My studies, experience, skills, and current interests.",
          archiveTitle: "All records",
          archiveBody:
            "Research, projects, teaching, competitions, certificates, and smaller activities.",
          contactTitle: "Contact",
          contactBody: "I welcome questions and proposals about research, projects, or teaching.",
        };

  return (
    <>
      <a className="skip-link" href="#main-content">{copy.skip}</a>
      <SiteHeader current="main" />
      <main className="home-deck" id="main-content">
        <section className="home-slide hero-slide" id="intro">
          <div className="slide-kicker"><span>01</span><p>Introduction</p></div>
          <div className="hero-main">
            <p className="hero-name-en">{locale === "ko" ? mainData.identity.name.en : mainData.identity.name.ko}</p>
            <div className="hero-identity-row">
              <h1>{t(mainData.identity.name)}</h1>
              <img src={mainData.identity.profileImage.src} alt={t(mainData.identity.profileImage.alt)} />
            </div>
            <p className="hero-headline">{t(mainData.identity.headline)}</p>
          </div>
          <blockquote className="hero-motto"><p>{mainData.motto.primary}</p><small>{t(mainData.motto.translation)}</small></blockquote>
          <div className="hero-bottom">
            <div className="hero-intro"><p>{t(mainData.identity.introduction)}</p><a className="text-link" href="#/profile">{copy.profile} <ArrowRight aria-hidden="true" size={17} /></a></div>
            <dl className="current-list">
              {identityPoints.map((item, index) => <div key={t(item)}><dt>{String(index + 1).padStart(2, "0")}</dt><dd>{t(item)}</dd></div>)}
            </dl>
          </div>
        </section>

        <section className="home-slide focus-slide" id="focus">
          <div className="slide-kicker"><span>02</span><p>Interests</p></div>
          <header className="slide-heading"><p className="slide-label">{copy.focusLabel}</p><h2>{copy.focusTitle}</h2></header>
          <div className="axis-grid">
            {mainData.researchAxes.map((axis) => (
              <article className="axis-card" key={axis.id}>
                <div className="axis-topline"><span>{axis.index}</span><p>{t(axis.overline)}</p></div>
                <h3>{t(axis.title)}</h3><p>{t(axis.description)}</p>
                <div className="axis-tags">{axis.tags.map((tag) => <a href={`#/archive?tag=${encodeURIComponent(tag)}`} key={tag}>#{tagLabel(tag, locale)}</a>)}</div>
              </article>
            ))}
          </div>
          <a className="section-cta" href="#/archive">{copy.focusCta} <ArrowRight aria-hidden="true" size={18} /></a>
          <p className="closing-line">{t(mainData.quotes[0])}</p>
        </section>

        <section className="home-slide selected-slide" id="selected">
          <div className="slide-kicker"><span>03</span><p>Selected work</p></div>
          <header className="slide-heading slide-heading-row"><div><p className="slide-label">{copy.workLabel}</p><h2>{copy.workTitle}</h2></div><p>{copy.workBody}</p></header>
          <div className="featured-grid">{featuredWorks.map((work) => <WorkCard compact key={work.slug} work={work} />)}</div>
          <a className="section-cta" href="#/archive">{copy.workCta} <Search aria-hidden="true" size={17} /></a>
          <p className="closing-line">{t(mainData.quotes[1])}</p>
        </section>

        <section className="home-slide journey-slide" id="journey">
          <div className="slide-kicker"><span>04</span><p>Experience</p></div>
          <header className="slide-heading slide-heading-row"><div><p className="slide-label">{copy.journeyLabel}</p><h2>{copy.journeyTitle}</h2></div></header>
          <div className="timeline-preview">
            {careerPreview.map((item, index) => <article key={item.id}><span className="timeline-dot" aria-hidden="true" /><p className="timeline-preview-index">{String(index + 1).padStart(2, "0")}</p><p className="timeline-preview-period">{item.period}</p><h3>{t(item.title)}</h3><p className="timeline-preview-org">{t(item.organization)}</p><p>{t(item.description)}</p></article>)}
          </div>
          <a className="section-cta" href="#/profile">{copy.journeyCta} <ArrowRight aria-hidden="true" size={18} /></a>
          <p className="closing-line">{t(mainData.quotes[2])}</p>
        </section>

        <section className="home-slide more-slide" id="more">
          <div className="slide-kicker"><span>05</span><p>More</p></div>
          <blockquote className="closing-quote"><p>{t(mainData.motto.secondary)}</p></blockquote>
          <div className="more-grid">
            <a href="#/profile"><UserRound aria-hidden="true" size={28} strokeWidth={1.4} /><span>01 / Profile</span><h2>{copy.profileTitle}</h2><p>{copy.profileBody}</p><ArrowRight aria-hidden="true" size={24} /></a>
            <a href="#/archive"><Search aria-hidden="true" size={28} strokeWidth={1.4} /><span>02 / Archive</span><h2>{copy.archiveTitle}</h2><p>{copy.archiveBody}</p><ArrowRight aria-hidden="true" size={24} /></a>
            <a href="#/contact"><Mail aria-hidden="true" size={28} strokeWidth={1.4} /><span>03 / Contact</span><h2>{copy.contactTitle}</h2><p>{copy.contactBody}</p><ArrowRight aria-hidden="true" size={24} /></a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
