import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useLocale } from "@/lib/i18n";
import { mainData } from "@/lib/portfolio-data";

export function ContactPage() {
  const { locale, t } = useLocale();
  const copy = locale === "ko" ? { channels: "연락 채널", open: "함께 이야기할 수 있는 주제" } : { channels: "Channels", open: "Open to" };
  return <><SiteHeader current="contact" /><main id="main-content"><section className="page-hero contact-hero"><div className="page-index">03 / Contact</div><p className="page-overline">Research · Project · Education</p><h1>{t(mainData.contact.title)}</h1><div className="page-hero-bottom contact-hero-bottom"><p>{t(mainData.contact.description)}</p><div className="contact-location"><MapPin aria-hidden="true" size={20} /><span>{t(mainData.identity.location)}</span></div></div></section><section className="detail-section contact-section"><header className="contact-section-heading"><span>01 / Channels</span><h2>{copy.channels}</h2></header><div className="contact-links">{mainData.links.map((link) => <a href={link.href} key={link.href} rel="noreferrer" target="_blank"><Mail aria-hidden="true" size={22} strokeWidth={1.5} /><span>{t(link.label)}</span><ArrowUpRight aria-hidden="true" size={22} strokeWidth={1.5} /></a>)}</div><div className="contact-topics"><p>{copy.open}</p><ul>{mainData.contact.topics.map((topic) => <li key={t(topic)}>{t(topic)}</li>)}</ul></div></section></main><SiteFooter /></>;
}
