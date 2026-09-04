import { useLocale } from "@/lib/i18n";

const navItems = [
  { href: "#/", label: { ko: "메인", en: "Main" }, key: "main" },
  { href: "#/profile", label: { ko: "프로필", en: "Profile" }, key: "profile" },
  { href: "#/archive", label: { ko: "아카이브", en: "Archive" }, key: "archive" },
  { href: "#/contact", label: { ko: "연락", en: "Contact" }, key: "contact" },
] as const;

export function SiteHeader({ current }: { current?: "main" | "profile" | "archive" | "contact" }) {
  const { locale, setLocale, t } = useLocale();
  return (
    <header className="site-header">
      <a className="wordmark" href="#/" aria-label={locale === "ko" ? "메인 페이지로 이동" : "Go to the main page"}>
        <img className="wordmark-image" src="public/favicon.webp" />
        <span className="wordmark-copy"><strong>Jeongsik Park</strong><small>Portfolio</small></span>
      </a>
      <div className="header-actions">
        <nav aria-label={locale === "ko" ? "메뉴" : "Navigation"}>
          {navItems.map((item) => (
            <a aria-current={current === item.key ? "page" : undefined} href={item.href} key={item.href}>{t(item.label)}</a>
          ))}
        </nav>
        <div className="language-switch" role="group" aria-label={locale === "ko" ? "언어 선택" : "Language selector"}>
          <button aria-pressed={locale === "ko"} onClick={() => setLocale("ko")} type="button">KO</button>
          <span aria-hidden="true">/</span>
          <button aria-pressed={locale === "en"} onClick={() => setLocale("en")} type="button">EN</button>
        </div>
      </div>
    </header>
  );
}
