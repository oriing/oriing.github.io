import mainJson from "@/data/main.json";
import skillsJson from "@/data/skills.json";
import tagsJson from "@/data/tags.json";
import timelineJson from "@/data/timeline.json";
import worksJson from "@/data/works.json";
import notionActivitiesJson from "@/data/notion-activities.json";
import notionCompetitionsAwardsJson from "@/data/notion-competitions-awards.json";
import notionLearningJson from "@/data/notion-learning.json";
import notionResearchProjectsJson from "@/data/notion-research-projects.json";
import type { Locale, LocalizedText } from "@/lib/i18n";

export type LinkItem = { label: LocalizedText; href: string };

export type ResearchAxis = {
  id: string;
  index: string;
  title: LocalizedText;
  overline: LocalizedText;
  description: LocalizedText;
  tags: string[];
};

export type MainData = {
  identity: {
    name: LocalizedText;
    roles: LocalizedText[];
    headline: LocalizedText;
    introduction: LocalizedText;
    location: LocalizedText;
    profileImage: { src: string; alt: LocalizedText };
  };
  motto: { primary: string; translation: LocalizedText; secondary: LocalizedText };
  current: LocalizedText[];
  researchAxes: ResearchAxis[];
  featuredSlugs: string[];
  quotes: LocalizedText[];
  links: LinkItem[];
  contact: { title: LocalizedText; description: LocalizedText; topics: LocalizedText[] };
  updated: string;
};

export type TimelineItem = {
  id: string;
  period: string;
  order: number;
  kind: "education" | "career";
  title: LocalizedText;
  organization: LocalizedText;
  description: LocalizedText;
  status: "ongoing" | "completed";
  tags: string[];
};

export type WorkKind = "research" | "project" | "teaching" | "leadership" | "experience" | "competition" | "award" | "certificate" | "media" | "volunteer";
export type WorkStatus = "ongoing" | "completed" | "presented" | "published";

export type WorkDetail = {
  context?: LocalizedText;
  role?: LocalizedText;
  approach?: LocalizedText[];
  outcomes?: LocalizedText[];
  takeaways?: LocalizedText[];
};

export type WorkImage = { src: string; alt: LocalizedText; caption?: LocalizedText };

export type WorkRecord = {
  slug: string;
  sortDate: string;
  kind: WorkKind;
  status: WorkStatus;
  period: string;
  title: LocalizedText;
  summary: LocalizedText;
  featured: boolean;
  tags: string[];
  links?: LinkItem[];
  images?: WorkImage[];
  detail?: WorkDetail;
};

export type SkillGroup = { title: LocalizedText; description: LocalizedText; items: string[] };

export const mainData = mainJson as MainData;
export const timeline = [...(timelineJson as TimelineItem[])].sort((a, b) => a.order - b.order);
export const works = [
  ...(worksJson as WorkRecord[]),
  ...(notionActivitiesJson as WorkRecord[]),
  ...(notionCompetitionsAwardsJson as WorkRecord[]),
  ...(notionLearningJson as WorkRecord[]),
  ...(notionResearchProjectsJson as WorkRecord[]),
].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
export const skillGroups = (skillsJson as { groups: SkillGroup[] }).groups;
const tagDictionary = tagsJson as Record<string, LocalizedText>;

export const featuredWorks = mainData.featuredSlugs
  .map((slug) => works.find((work) => work.slug === slug))
  .filter((work): work is WorkRecord => Boolean(work));

const kindLabels: Record<WorkKind, LocalizedText> = {
  research: { ko: "연구", en: "Research" },
  project: { ko: "프로젝트", en: "Project" },
  teaching: { ko: "교육", en: "Teaching" },
  leadership: { ko: "리더십", en: "Leadership" },
  experience: { ko: "활동", en: "Experience" },
  competition: { ko: "대회", en: "Competition" },
  award: { ko: "수상", en: "Award" },
  certificate: { ko: "자격", en: "Certification" },
  media: { ko: "미디어", en: "Media" },
  volunteer: { ko: "봉사", en: "Volunteer" },
};

const statusLabels: Record<WorkStatus, LocalizedText> = {
  ongoing: { ko: "진행 중", en: "In progress" },
  completed: { ko: "완료", en: "Completed" },
  presented: { ko: "발표", en: "Presented" },
  published: { ko: "게재", en: "Published" },
};

export function tagLabel(tag: string, locale: Locale) {
  return tagDictionary[tag]?.[locale] ?? tag;
}

export function workKindLabel(kind: WorkKind, locale: Locale) {
  return kindLabels[kind][locale];
}

export function workStatusLabel(status: WorkStatus, locale: Locale) {
  return statusLabels[status][locale];
}

export function getWork(slug: string) {
  return works.find((work) => work.slug === slug);
}

export function getRelatedWorks(work: WorkRecord, limit = 3) {
  return works
    .filter((candidate) => candidate.slug !== work.slug)
    .map((candidate) => ({ candidate, score: candidate.tags.filter((tag) => work.tags.includes(tag)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.candidate.sortDate.localeCompare(a.candidate.sortDate))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
