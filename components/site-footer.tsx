import { useLocale } from "@/lib/i18n";
import { mainData } from "@/lib/portfolio-data";

export function SiteFooter() {
  const { locale, t } = useLocale();
  return (
    <footer className="site-footer">
      <div className="footer-identity"><p>{mainData.motto.primary}</p></div>
      <div className="footer-navigation">
        <a href="#/profile">{locale === "ko" ? "프로필" : "Profile"}</a>
        <a href="#/archive">{locale === "ko" ? "아카이브" : "Archive"}</a>
        <a href="#/contact">{locale === "ko" ? "연락" : "Contact"}</a>
        {mainData.links.slice(0, 2).map((link) => <a href={link.href} key={link.href} rel="noreferrer" target="_blank">{t(link.label)} ↗</a>)}
      </div>
      <p className="footer-update">{locale === "ko" ? "최근 수정" : "Last update"} · {mainData.updated}</p>
    </footer>
  );
}
