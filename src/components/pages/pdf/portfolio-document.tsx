import { GithubIcon } from "@/components/icons/github-icon";
import { VelogIcon } from "@/components/icons/velog-icon";
import { SlidesCanvas } from "@/components/pages/slides/slides-canvas";
import { ProfilePhotoGallery } from "@/components/pages/slides/profile-photo-gallery";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  BookOpenText,
  BrainCircuit,
  BriefcaseBusiness,
  CirclePlay,
  Code2,
  Cpu,
  FileText,
  Globe,
  GraduationCap,
  Home,
  Link2,
  Mail,
  PanelsTopLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { PdfArchitecture } from "./pdf-architecture";
import { PrintButton } from "./print-button";
import "./print.css";

type DocumentProps = { dictionary: Dictionary; canvasMode?: boolean };
type StaticLink = { label: string; href: string };

function ContactIcon({ href, label }: StaticLink) {
  if (href.startsWith("https://pypi.org/")) {
    return (
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icons/tech/pypi.svg`}
        alt=""
        width={14}
        height={14}
        className="contact-icon"
      />
    );
  }
  const Icon = href.startsWith("mailto:")
    ? Mail
    : href.startsWith("https://github.com/")
      ? GithubIcon
      : href.startsWith("https://velog.io/")
        ? VelogIcon
        : href.startsWith("https://choi-hyk.github.io/portfolio/projects/")
          ? PanelsTopLeft
          : href.startsWith("https://www.youtube.com/") ||
              href.startsWith("https://youtu.be/")
            ? CirclePlay
            : label.toLowerCase() === "documentation"
              ? BookOpenText
              : href === "https://choi-hyk.github.io/portfolio/"
                ? Home
                : /\.pdf(?:[?#]|$)/i.test(href)
                  ? FileText
                  : Globe;
  return <Icon size={14} aria-hidden="true" className="contact-icon" />;
}

function ProjectTitle({
  title,
  period,
  icon,
}: {
  title: string;
  period: string;
  icon?: { iconSrc: string; iconAlt: string };
}) {
  return (
    <div className="project-title">
      {icon && (
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${icon.iconSrc}`}
          alt=""
          width={44}
          height={44}
          loading="eager"
        />
      )}
      <div className="project-heading-text">
        <h2>{title}</h2>
        <p className="project-period">{period}</p>
      </div>
    </div>
  );
}

function TextLinks({ links }: { links: StaticLink[] }) {
  return (
    <dl className="slide-links">
      {links.map((link) => (
        <div key={link.href}>
          <dt>
            <ContactIcon href={link.href} label={link.label} />
            <span>{link.label}</span>
          </dt>
          <dd>
            <a href={link.href}>{link.href.replace(/^mailto:/, "")}</a>
          </dd>
        </div>
      ))}
    </dl>
  );
}

function WritingTopicIcon({ category }: { category: string }) {
  const Icon =
    category === "DEVELOPMENT" ? Code2 : category === "AI" ? BrainCircuit : Cpu;
  return <Icon size={14} aria-hidden="true" />;
}

function Slide({
  children,
  number,
  total,
  section,
  dark = false,
}: {
  children: ReactNode;
  number: number;
  total: number;
  section: string;
  dark?: boolean;
}) {
  return (
    <section
      className={`portfolio-slide${dark ? " slide-dark" : ""}`}
      aria-label={`${number}. ${section}`}
    >
      <header className="slide-topline">
        <span>{section}</span>
      </header>
      <div className="slide-body">{children}</div>
      <footer className="slide-footer">
        <span>CHOI HYUK / PORTFOLIO</span>
        <span>
          {String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </footer>
    </section>
  );
}

export function PortfolioDocument({ dictionary, canvasMode = false }: DocumentProps) {
  const { professional: content, profile, slides } = dictionary;
  const projects = slides.projects.flatMap((project) => {
    const story = content.projects.find((item) => item.slug === project.slug);
    const metadata = dictionary.projects.find((item) => item.slug === project.slug);
    return story && metadata
      ? [
          {
            project,
            story,
            icon: dictionary.home.featuredProjects.find(
              (item) => item.slug === project.slug,
            ),
            architecture: dictionary.pdfArchitectures[project.slug],
          },
        ]
      : [];
  });
  const total = projects.length * 2 + 5;
  const contact = [
    { label: "GitHub", href: profile.links.github },
    { label: "Velog", href: profile.links.velog },
    { label: "Portfolio", href: "https://choi-hyk.github.io/portfolio/" },
    { label: "Email", href: `mailto:${profile.email}` },
  ];
  return (
    <main
      className={
        canvasMode ? "portfolio-slides" : "portfolio-document portfolio-slides"
      }
      data-renderer={canvasMode ? "workflow-canvas" : "slide-document"}
    >
      {canvasMode ? (
        <div className="slides-canvas-toolbar">
          <PrintButton label={content.labels.print} />
        </div>
      ) : null}
      {!canvasMode ? (
        <div className="document-toolbar">
          <Link href="/">← {content.labels.back}</Link>
          <PrintButton label={content.labels.print} />
          <p>{slides.deckHint}</p>
        </div>
      ) : null}
      <SlidesCanvas
        canvasMode={canvasMode}
        label={dictionary.nav.document}
        labels={dictionary.home.canvas}
        interactionHint={dictionary.home.interactionHint}
      >
        <Slide number={1} total={total} section={slides.kicker}>
          <div className="cover-content">
            <h1>
              PORTFOLIO<span>.</span>
            </h1>
            <div className="cover-identity">
              <p className="cover-name">{dictionary.home.profileCard.koreanName}</p>
              <p>CHOI HYUK</p>
            </div>
          </div>
        </Slide>
        <Slide number={2} total={total} section="INTRODUCTION">
          <div className="intro-grid">
            <div>
              <h2 className="intro-headline">{slides.introTitle}</h2>
              <div className="intro-bio">
                <p>{slides.introBody}</p>
                <p>{slides.introNote}</p>
                <p>{slides.introNote2}</p>
              </div>
            </div>
            <ProfilePhotoGallery label={slides.aboutLabel} />
            <div className="intro-background">
              <section>
                <h3 className="intro-section-title" aria-label={slides.educationLabel}>
                  <GraduationCap size={16} aria-hidden="true" />
                </h3>
                <p className="intro-education">
                  <strong>{content.education}</strong>
                  <span>{content.educationPeriod}</span>
                </p>
              </section>
              <section>
                <h3 className="intro-section-title" aria-label={slides.careerLabel}>
                  <BriefcaseBusiness size={16} aria-hidden="true" />
                </h3>
                <p className="intro-education">
                  <strong>
                    {content.company} · {content.position}
                  </strong>
                  <span>{content.period}</span>
                </p>
              </section>
            </div>
            <section>
              <h3 className="intro-section-title">
                <Code2 size={16} aria-hidden="true" />
                {slides.skillsTitle}
              </h3>
              <ul className="intro-skills">
                {slides.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
            <section className="intro-contacts">
              <h3 className="intro-section-title">
                <Link2 size={16} aria-hidden="true" />
                {slides.linksTitle}
              </h3>
              <TextLinks links={contact} />
            </section>
          </div>
        </Slide>
        {projects.flatMap(({ project, story, icon, architecture }, index) => [
          <Slide
            key={`${project.slug}-overview`}
            number={index * 2 + 3}
            total={total}
            section={`${slides.projectLabel} / ${story.title}`}
          >
            <div className="selected-project-content">
              <div className="project-overview">
                <div className="project-top">
                  <ProjectTitle title={story.title} period={story.period} icon={icon} />
                  <div className="project-meta">
                    <TextLinks
                      links={[
                        { label: "GitHub", href: story.href },
                        {
                          label: slides.detailLabel,
                          href: `https://choi-hyk.github.io/portfolio/projects/${project.slug}/`,
                        },
                        ...story.evidence,
                      ].filter(
                        (link, index, links) =>
                          links.findIndex((item) => item.href === link.href) === index,
                      )}
                    />
                    <ul className="intro-skills project-stack">
                      {story.stack.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="project-copy">
                  <h3 className="project-headline">{project.headline}</h3>
                  <section className="project-problem">
                    <p>{project.problem}</p>
                  </section>
                  <section className="project-definition">
                    <p>{project.definition}</p>
                  </section>
                </div>
                <figure className="project-preview">
                  <div className="project-preview-images">
                    {project.images.map((image) => (
                      <div
                        className="project-preview-image"
                        key={image.src}
                        style={{ flexGrow: image.width / image.height }}
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${image.src}`}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          sizes={project.images.length > 1 ? "300px" : "600px"}
                          loading="eager"
                        />
                      </div>
                    ))}
                  </div>
                  <figcaption>{project.caption}</figcaption>
                </figure>
              </div>
              <div className="design-decisions">
                {project.decisions.map((item, n) => (
                  <section key={item.title}>
                    <span className="slide-label">0{n + 1}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </section>
                ))}
              </div>
            </div>
          </Slide>,
          <Slide
            key={`${project.slug}-architecture`}
            number={index * 2 + 4}
            total={total}
            section={`${slides.architectureLabel} / ${story.title}`}
          >
            <PdfArchitecture
              slug={project.slug}
              title={story.title}
              content={architecture}
            />
          </Slide>,
        ])}
        <Slide number={total - 2} total={total} section="EXPERIENCE">
          <div className="experience-top">
            <h2 className="section-headline">{slides.experienceTitle}</h2>
            <p className="experience-meta">
              <strong>{content.company}</strong>
              <br />
              {content.position}
              <br />
              {content.period}
            </p>
            <p className="experience-summary">{content.experienceSummary}</p>
          </div>
          <p className="experience-kicker">WORK EXPERIENCE</p>
          <div className="experience-grid">
            {content.experience.map((item, index) => (
              <section key={item.title}>
                <span className="experience-number">0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p className="experience-problem">{item.problem}</p>
                  <p>{item.work.join(" ")}</p>
                  <p className="experience-result">{item.outcome}</p>
                </div>
              </section>
            ))}
          </div>
        </Slide>
        <Slide number={total - 1} total={total} section="WRITING & COMMUNITY">
          <h2 className="section-headline">{slides.writingTitle}</h2>
          <div className="writing-intro">
            <TextLinks links={[{ label: "Velog", href: profile.links.velog }]} />
            <p>{slides.writingNote}</p>
          </div>
          <div className="writing-grid writing-topic-grid">
            {["DEVELOPMENT", "AI", "CS / ENGINEERING"].map((category) => {
              const topics = slides.writingTopics.filter(
                (topic) => topic.category === category,
              );
              return (
                <section className="writing-topic-group" key={category}>
                  <h3 className="writing-topic-category">
                    <WritingTopicIcon category={category} />
                    {category}
                  </h3>
                  <div className="writing-topic-list">
                    {topics.map((topic) => (
                      <article key={topic.title}>
                        <div className="writing-topic-link">
                          <ContactIcon href={topic.href} label={topic.title} />
                          <a href={topic.href}>{topic.title}</a>
                        </div>
                        <p>{topic.summary}</p>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </Slide>
        <Slide number={total} total={total} section="LET'S CONNECT" dark>
          <div className="closing-title">
            <h2>{slides.thankYou}</h2>
            <p>{slides.closing}</p>
            <p>{slides.closingNote}</p>
          </div>
          <section className="intro-contacts closing-contacts">
            <h3 className="intro-section-title">
              <Link2 size={16} aria-hidden="true" />
              {slides.linksTitle}
            </h3>
            <TextLinks links={contact} />
          </section>
        </Slide>
      </SlidesCanvas>
    </main>
  );
}
