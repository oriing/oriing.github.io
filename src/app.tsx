import { useEffect, useSyncExternalStore } from "react";
import { ArchivePage } from "@/src/pages/archive-page";
import { ContactPage } from "@/src/pages/contact-page";
import { HomePage } from "@/src/pages/home-page";
import { ProfilePage } from "@/src/pages/profile-page";
import { WorkDetailPage } from "@/src/pages/work-detail-page";

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function getHash() {
  return window.location.hash.slice(1) || "/";
}

export function App() {
  const hash = useSyncExternalStore(subscribe, getHash, () => "/");
  const [rawPath, rawQuery = ""] = hash.split("?");
  const path = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  const params = new URLSearchParams(rawQuery);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [path]);

  if (path === "/profile") return <ProfilePage />;
  if (path === "/archive") return <ArchivePage initialTag={params.get("tag") ?? ""} />;
  if (path === "/contact") return <ContactPage />;
  if (path.startsWith("/work/")) return <WorkDetailPage slug={decodeURIComponent(path.slice(6))} />;
  return <HomePage />;
}
