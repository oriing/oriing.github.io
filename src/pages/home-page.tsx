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
  const copy = locale === "ko" ? {
    profile: "프로필 자세히 보기", focusLabel: "서로 다른 작업을 잇는 축", focusTitle: "경계를 넘나들며, 문제를 끝까지 파고듭니다.",
    focusCta: "전체 작업에서 연구축 따라가기", workLabel: "대표 활동", workTitle: "기록으로 남긴 연구와 경험", workBody: "메인에는 대표 작업만 남겼습니다. 전체 연구·프로젝트·교육·활동은 아카이브에서 검색하거나 태그로 모아볼 수 있습니다.", workCta: "전체 아카이브 검색하기",
    journeyLabel: "배움에서 운영까지", journeyTitle: "학습을 조직하고 경험으로 남긴 시간", journeyBody: "학위, 연구, 교육, 리더 경험은 열거된 목록이 아니라 문제를 보는 관점을 넓혀 온 흐름입니다.", journeyCta: "학위·경력 타임라인 보기",
    profileTitle: "학위와 경력의 흐름", profileBody: "학력, 경력, 기술 기반과 작업 원칙을 타임라인으로 확인합니다.", archiveTitle: "모든 경험을 태그로 탐색", archiveBody: "분야와 형식이 다른 연구·프로젝트·교육·활동을 검색하고 연결합니다.", contactTitle: "함께 이야기할 주제", contactBody: "연구·프로젝트·교육 제안과 대화를 위한 연락 채널을 확인합니다.",
  } : {
    profile: "View full profile", focusLabel: "Axes connecting different kinds of work", focusTitle: "Crossing boundaries, staying with the question.",
    focusCta: "Follow these axes through the archive", workLabel: "Representative activities", workTitle: "Research and experiences, made tangible", workBody: "Only selected work appears here. Search the archive or combine tags to explore every research, project, teaching, and activity record.", workCta: "Search the full archive",
    journeyLabel: "From learning to operating", journeyTitle: "Organizing learning and turning it into experience", journeyBody: "Degrees, research, teaching, and leader experience form one path that has expanded how I frame and solve problems.", journeyCta: "View the education and career timeline",
    profileTitle: "Education and career", profileBody: "Review education, work, technical foundations, and working principles as a timeline.", archiveTitle: "Explore every record by tag", archiveBody: "Search and connect research, projects, teaching, and activities across fields and formats.", contactTitle: "Start a conversation", contactBody: "Find contact channels for research, project, and education proposals.",
  };

  return (
    <>
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
          <div className="slide-kicker"><span>02</span><p>Research focus</p></div>
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
        </section>

        <section className="home-slide selected-slide" id="selected">
          <div className="slide-kicker"><span>03</span><p>Selected work</p></div>
          <header className="slide-heading slide-heading-row"><div><p className="slide-label">{copy.workLabel}</p><h2>{copy.workTitle}</h2></div><p>{copy.workBody}</p></header>
          <div className="featured-grid">{featuredWorks.map((work) => <WorkCard compact key={work.slug} work={work} />)}</div>
          <a className="section-cta" href="#/archive">{copy.workCta} <Search aria-hidden="true" size={17} /></a>
        </section>

        <section className="home-slide journey-slide" id="journey">
          <div className="slide-kicker"><span>04</span><p>Experience</p></div>
          <header className="slide-heading slide-heading-row"><div><p className="slide-label">{copy.journeyLabel}</p><h2>{copy.journeyTitle}</h2></div><p>{copy.journeyBody}</p></header>
          <div className="timeline-preview">
            {careerPreview.map((item, index) => <article key={item.id}><span className="timeline-dot" aria-hidden="true" /><p className="timeline-preview-index">{String(index + 1).padStart(2, "0")}</p><p className="timeline-preview-period">{item.period}</p><h3>{t(item.title)}</h3><p className="timeline-preview-org">{t(item.organization)}</p><p>{t(item.description)}</p></article>)}
          </div>
          <a className="section-cta" href="#/profile">{copy.journeyCta} <ArrowRight aria-hidden="true" size={18} /></a>
        </section>

        <section className="home-slide more-slide" id="more">
          <div className="slide-kicker"><span>05</span><p>Explore more</p></div>
          <blockquote className="closing-quote"><p>{t(mainData.motto.secondary)}</p></blockquote>
          <div className="more-grid">
            <a href="#/profile"><UserRound aria-hidden="true" size={28} strokeWidth={1.4} /><span>01 / Profile</span><h2>{copy.profileTitle}</h2><p>{copy.profileBody}</p><ArrowRight aria-hidden="true" size={24} /></a>
            <a href="#/archive"><Search aria-hidden="true" size={28} strokeWidth={1.4} /><span>02 / Archive</span><h2>{copy.archiveTitle}</h2><p>{copy.archiveBody}</p><ArrowRight aria-hidden="true" size={24} /></a>
            <a href="#/contact"><Mail aria-hidden="true" size={28} strokeWidth={1.4} /><span>03 / Contact</span><h2>{copy.contactTitle}</h2><p>{copy.contactBody}</p><ArrowRight aria-hidden="true" size={24} /></a>
          </div>
          <p className="closing-line">{t(mainData.quotes[2])}</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
